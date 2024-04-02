from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile, Favorite
from .serializers import ProfileSerializer, FavouriteProductSerializer
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


class FavouriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        favourite_products = Favorite.objects.filter(user=request.user)
        serializer = FavouriteProductSerializer(favourite_products, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("Request Data:", request.data)
        print("User:", request.user)
        serializer = FavouriteProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RemoveFavouriteProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        favorite = Favorite.objects.filter(user=request.user, product_id=product_id)
        if not favorite.exists():
            return Response({'error': 'Favorite product not found'}, status=status.HTTP_404_NOT_FOUND)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)