from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class RecipeIngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe_Ingredients
        fields = ['recipe_id', 'ingredient_id', 'ingredient', 'image', 'amount', 'unit']

class RecipeSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    ingredient_ids = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='ingredient_id',
        source='recipe_ingredients_set'
     )
    
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'categories', 'short_description', 'ingredient_ids']

class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe_Step
        fields = ['recipe_id', 'step_number', 'description']


class RecipeEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe_Equipment
        fields = ['recipe_id', 'equipment_id', 'equipment', 'image']