from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from ration.models import Ration_Basic
from .serializers import *
from rest_framework.permissions import IsAuthenticated


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FavoriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        favorite_products = Favorite.objects.filter(user=request.user)
        serializer = FavoriteProductSerializerInfo(favorite_products, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Request Data:", request.data)
        print("User:", request.user)
        serializer = FavoriteProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RemoveFavoriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        favorite = Favorite.objects.filter(user=request.user, product_id=product_id)
        if not favorite.exists():
            return Response({'error': 'Favorite product not found'}, status=status.HTTP_404_NOT_FOUND)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class FavoriteRecipesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        favorite_recipes = Favorite.objects.filter(user=request.user)
        serializer = FavoriteRecipeSerializerInfo(favorite_recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Request Data:", request.data)
        print("User:", request.user)
        serializer = FavoriteRecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RemoveFavoriteRecipesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, recipe_id):
        favorite = Favorite.objects.filter(user=request.user, recipe_id=recipe_id)
        if not favorite.exists():
            return Response({'error': 'Favorite recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NotFavoriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        not_favorite_products = Not_Favorite.objects.filter(user=request.user)
        serializer = NotFavoriteProductSerializerInfo(not_favorite_products, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Request Data:", request.data)
        print("User:", request.user)
        serializer = NotFavoriteProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RemoveNotFavoriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        not_favorite = Not_Favorite.objects.filter(user=request.user, product_id=product_id)
        
        if not not_favorite.exists():
            return Response({'error': 'Not favorite product not found'}, status=status.HTTP_404_NOT_FOUND)
        not_favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserWeightHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        weight_history = UserWeightHistory.objects.filter(user=request.user)
        serializer = UserWeightHistorySerializer(weight_history, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserWeightHistorySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            weight_history = serializer.save(user=request.user)
            request.user.weight = weight_history.weight
            request.user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        plan_type = request.data.get('plan_type')
        if plan_type == 'premium':
            if profile.premium_plan:
                return Response({"detail": "User already has the premium plan."}, status=status.HTTP_400_BAD_REQUEST)
            profile.premium_plan = True
        elif plan_type == 'gold':
            if profile.gold_plan:
                return Response({"detail": "User already has the gold plan."}, status=status.HTTP_400_BAD_REQUEST)
            profile.premium_plan = True
            profile.gold_plan = True
        else:
            return Response({"detail": "Invalid plan_type. Must be 'premium' or 'gold'."}, status=status.HTTP_400_BAD_REQUEST)
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
class CancelPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        plan_type = request.data.get('plan_type')
        if plan_type == 'premium':
            if not profile.premium_plan:
                return Response({"detail": "User does not have the premium plan."}, status=status.HTTP_400_BAD_REQUEST)
            if profile.gold_plan:
                return Response({"detail": "Cannot cancel premium plan while gold plan is active."}, status=status.HTTP_400_BAD_REQUEST)
            profile.premium_plan = False
        elif plan_type == 'gold':
            if not profile.gold_plan:
                return Response({"detail": "User does not have the gold plan."}, status=status.HTTP_400_BAD_REQUEST)
            profile.premium_plan = False
            profile.gold_plan = False
        else:
            return Response({"detail": "Invalid plan_type. Must be 'premium' or 'gold'."}, status=status.HTTP_400_BAD_REQUEST)
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
class ActiveRationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, ration_id):
        try:
            ration = Ration_Basic.objects.get(pk=ration_id)
        except Ration_Basic.DoesNotExist:
            return Response({"error": "Ration with given id does not exist."}, status=400)

        profile, created = Profile.objects.get_or_create(user=request.user)
        if profile.active_ration is not None:
            return Response({"error": "An active ration already exists for the user."}, status=400)

        profile.active_ration = ration
        profile.save()  
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=201)
    
    def delete(self, request, ration_id):
        try:
            ration = Ration_Basic.objects.get(pk=ration_id)
        except Ration_Basic.DoesNotExist:
            return Response({"error": "Ration with given id does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        profile, created = Profile.objects.get_or_create(user=request.user)
        if profile.active_ration != ration:
            return Response({"error": "This ration is not associated with the user's active ration."}, status=status.HTTP_400_BAD_REQUEST)

        profile.active_ration = None
        profile.save()
        return Response({"message": "Ration successfully removed from the user's active ration."}, status=status.HTTP_204_NO_CONTENT)