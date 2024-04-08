from rest_framework import serializers
from .models import Profile, Favorite

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'location', 'profile_picture']

class FavouriteProductSerializer(serializers.ModelSerializer):
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
    
class FavouriteRecipeSerializer(serializers.ModelSerializer):
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