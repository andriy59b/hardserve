from django.views import View
from django.shortcuts import redirect, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserGoogleUpdateSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import TokenError, AccessToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import LoginSerializer
from django.db import transaction
from django.conf import settings
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import TokenError, UntypedToken
from rest_framework_simplejwt.state import token_backend
import requests

User = get_user_model()


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': "Користувач успішно ввійшов.",
                "user_id": user.id,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Недійсні дані.", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    def post(self, request):
        with transaction.atomic():
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()

                try:
                    send_mail(
                        'Підтвердіть вашу електронну пошту',
                        'Натисніть на посилання нижче, щоб підтвердити вашу електронну пошту:\nhttp://localhost:8000/confirm/' + str(user.confirmation_token),
                        'your-email@gmail.com',
                        [user.email],
                        fail_silently=False,
                    )
                except Exception as e:
                    return Response({"message": "Помилка при відправці електронної пошти.", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                return Response({"message": "Користувач успішно зареєстрований. Будь ласка, підтвердіть вашу електронну пошту."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Недійсні дані.", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"message": "Користувача з такою електронною поштою не знайдено."}, status=status.HTTP_404_NOT_FOUND)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        mail_subject = 'Скидання пароля'
        message = 'Вітаю {0},\n\nВи надіслали запит на скидання пароля. Натисніть посилання нижче, щоб скинути пароль:\n\nhttp://localhost:3000/accounts/password-reset-confirm/{1}/{2}'.format(user.username, uid, token)

        try:
            send_mail(mail_subject, message, 'your-email@gmail.com', [user.email])
        except Exception as e:
            return Response({"message": "Помилка при відправці електронної пошти.", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Посилання для скидання пароля було відправлено на вашу електронну пошту."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            new_password = request.data.get('new_password')
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({"message": "Пароль успішно скинуто."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Новий пароль не надано."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Посилання для скидання пароля недійсне."}, status=status.HTTP_400_BAD_REQUEST)
        

class GoogleAuthRedirect(View):
    permission_classes = [AllowAny]
    
    def get(self, request):
        redirect_url = f"https://accounts.google.com/o/oauth2/v2/auth?client_id={settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&access_type=offline&redirect_uri=http://localhost:8000/accounts/google-signup/callback"
        return redirect(redirect_url)
    
class GoogleRedirectURIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        code = request.GET.get('code')
        
        if code:
            token_endpoint = 'https://oauth2.googleapis.com/token'
            token_params = {
                'code': code,
                'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
                'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
                'redirect_uri': 'http://localhost:8000/accounts/google-signup/callback',  
                'grant_type': 'authorization_code',
            }

            response = requests.post(token_endpoint, data=token_params)
            
            if response.status_code == 200:
                access_token = response.json().get('access_token')
                
                if access_token:
                    profile_endpoint = 'https://www.googleapis.com/oauth2/v1/userinfo'
                    headers = {'Authorization': f'Bearer {access_token}'}
                    profile_response = requests.get(profile_endpoint, headers=headers)
                    
                    if profile_response.status_code == 200:
                        data = {}
                        profile_data = profile_response.json()
                        user = User.objects.create_user(username=profile_data["given_name"],
                                                                    email=profile_data["email"])
                        if "family_name" in profile_data:
                            user.last_name = profile_data["family_name"]
                            user.save
                        refresh = RefreshToken.for_user(user)
                        data['access'] = str(refresh.access_token)
                        data['refresh'] = str(refresh)
                        return redirect(f'http://localhost:8000/accounts/google-signup/compete-profile/?access={refresh.access_token}&refresh={refresh}')
        
        return Response({}, status.HTTP_400_BAD_REQUEST)
    

class GoogleRegCompeteProfileView(APIView):
    def post(self, request):
        access_token = request.GET.get('access')
        refresh_token = request.GET.get('refresh')

        try:
            UntypedToken(access_token)
        except (TokenError, ValueError, TypeError):
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        user_id = token_backend.decode(access_token)['user_id']
        user = User.objects.get(id=user_id)

        serializer = UserGoogleUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            user.is_email_verified = True 
            user.save()
            return Response({'message': 'Профіль успішно заповнено'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
