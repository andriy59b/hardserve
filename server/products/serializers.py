from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    proteins = serializers.FloatField(read_only=True)
    carbs = serializers.FloatField(read_only=True)
    fats = serializers.FloatField(read_only=True)
    calories = serializers.FloatField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'product_id', 'name', 'image', 'category', 'short_description', 'proteins', 'fats', 'carbs', 'calories','glycemic_index']

class NutrientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrients
        fields = ['name', 'unit']

class ProductNutrientsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    nutrient = NutrientsSerializer(read_only=True)

    class Meta:
        model = Product_Nutrients
        fields = ['product', 'nutrient', 'amount']