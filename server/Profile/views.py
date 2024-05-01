from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
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
        not_favorite = Favorite.objects.filter(user=request.user, product_id=product_id)
        if not not_favorite.exists():
            return Response({'error': 'Not favorite product not found'}, status=status.HTTP_404_NOT_FOUND)
        not_favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)