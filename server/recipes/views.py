from django.shortcuts import *
from rest_framework.generics import ListAPIView
from .models import *
from recipes.serializers import *
from django.http import FileResponse,  JsonResponse
from rest_framework.response import Response


class RecipeListView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request, *args, **kwargs):
        response = super(RecipeListView, self).list(request, *args, **kwargs)
        response.data = {
            'message': 'Список рецептів успішно отримано.',
            'recipes': response.data,
        }
        return response
    
# class RecipeStepView(ListAPIView):
#     queryset = Recipe_Step.objects.all()
#     serializer_class = RecipeStepSerializer

#     def list(self, request, *args, **kwargs):
#         response = super(RecipeStepView, self).list(request, *args, **kwargs)
#         response.data = {
#             'message': 'Інформацію про рецепт успішно отримано.',
#             'recipe': response.data,
#         }
#         return response
    
# class RecipeIngredientView(ListAPIView):
#     queryset = Recipe_Ingredients.objects.all()
#     serializer_class = RecipeIngredientsSerializer

#     def list(self, request, *args, **kwargs):
#         response = super(RecipeIngredientView, self).list(request, *args, **kwargs)
#         response.data = {
#             'message': 'Інформацію про інгредієнти успішно отримано.',
#             'ingredients': response.data,
#         }
#         return response
    
# class RecipeEquipmentView(ListAPIView):
#     queryset = Recipe_Equipment.objects.all()
#     serializer_class = RecipeEquipmentSerializer

#     def list(self, request, *args, **kwargs):
#         response = super(RecipeEquipmentView, self).list(request, *args, **kwargs)
#         response.data = {
#             'message': 'Інформацію про обладнання успішно отримано.',
#             'equipment': response.data,
#         }
#         return response
    
class RecipeView(ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Recipe.objects.filter(id=pk)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        recipe = self.get_queryset().first()

        if recipe:
            recipe_steps = Recipe_Step.objects.filter(recipe=recipe)
            recipe_ingredients = Recipe_Ingredients.objects.filter(recipe=recipe)
            recipe_equipments = Recipe_Equipment.objects.filter(recipe=recipe)

            recipe_step_serializer = RecipeStepSerializer(recipe_steps, many=True)
            recipe_ingredient_serializer = RecipeIngredientsSerializer(recipe_ingredients, many=True)
            recipe_equipment_serializer = RecipeEquipmentSerializer(recipe_equipments, many=True)

            response.data = {
                'message': 'Інформацію успішно отримано.',
                'recipe': response.data[0],
                'recipe_steps': recipe_step_serializer.data,
                'recipe_ingredients': recipe_ingredient_serializer.data,
                'recipe_equipments': recipe_equipment_serializer.data,
            }
        else:
            response.data = {
                'message': 'Рецепт не знайдено.',
            }

        return response