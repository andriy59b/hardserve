from django.shortcuts import render
from django.http import JsonResponse
from openai import OpenAI
from Profile.models import *
from .models import *
from .serializers import *
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class QueryOpenAIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prompt = request.GET.get('prompt', '')
        profile, created = Profile.objects.get_or_create(user=request.user)
        favorites = Favorite.objects.filter(user=request.user)

        favorite_products = ', '.join([favorite.product.name for favorite in favorites if favorite.product]) if favorites.exists() else "No favorite products"
        favorite_recipes = ', '.join([favorite.recipe.name for favorite in favorites if favorite.recipe]) if favorites.exists() else "No favorite recipes"
        weight_history = ', '.join([str(weight.weight) for weight in UserWeightHistory.objects.filter(user=request.user)]) if UserWeightHistory.objects.filter(user=request.user).exists() else "No weight history recorded"
        
        client = OpenAI(
            base_url = "https://integrate.api.nvidia.com/v1",
            api_key = "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"
        )

        system_message = f"You are a helpful assistant that specializes in discussing products, rations, ingredients, and related topics. You can provide information, answer questions, and offer suggestions. You do not answer on other topics. Here`s more information about user - {request.user.username}, his favorite products are {favorite_products}, favorite recipes are {favorite_recipes}, his weight history is {weight_history}"

        completion = client.chat.completions.create(
            model="meta/llama3-70b-instruct",
            messages=[
                {"role":"system","content": system_message},
                {"role":"user","content": prompt}
            ],
            temperature=0.5,
            top_p=1,
            max_tokens=1024,
            stream=True
        )

        response_text = ''
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_text += chunk.choices[0].delta.content

        return Response({'response': response_text})
    
class RationBasicView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rations = Ration_Basic.objects.all()
        serializer = RationBasic(rations, many=True)
        return Response(serializer.data)