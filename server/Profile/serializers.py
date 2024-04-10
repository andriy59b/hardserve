from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['username', 'email', 'bio', 'location', 'profile_picture']
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_email(self, obj):
        return obj.user.email


class ProductSerializer(serializers.ModelSerializer):
    glycemic_index = serializers.SerializerMethodField()
    proteins = serializers.SerializerMethodField()
    carbs = serializers.SerializerMethodField()
    fats = serializers.SerializerMethodField()
    calories = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('product_id', 'name', 'category', 'short_description', 'image', 'glycemic_index', 'proteins', 'carbs', 'fats', 'calories')

    def get_glycemic_index(self, obj):
        return obj.glycemic_index

    def get_proteins(self, obj):
        return obj.proteins

    def get_carbs(self, obj):
        return obj.carbs

    def get_fats(self, obj):
        return obj.fats

    def get_calories(self, obj):
        return obj.calories

class FavoriteProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ['product']

    def create(self, validated_data):
        user = self.context['request'].user
        product = validated_data.get('product')

        if not product:
            raise serializers.ValidationError({"product": "This field is required."})

        favorite, created = Favorite.objects.get_or_create(user=user, product=product)
        if not created:
            raise serializers.ValidationError({"product": "This product is already in your favorites."})
        
        return favorite
    
class FavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['recipe']

    def create(self, validated_data):
        user = self.context['request'].user
        recipe = validated_data.get('recipe')

        if not recipe:
            raise serializers.ValidationError({"recipe": "This field is required."})

        favorite, created = Favorite.objects.get_or_create(user=user, recipe=recipe)
        if not created:
            raise serializers.ValidationError({"recipe": "This recipe is already in your favorites."})
        
        return favorite