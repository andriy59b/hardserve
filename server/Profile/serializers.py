from rest_framework import serializers
from .models import Profile, Favorite

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

class FavoriteProductSerializer(serializers.ModelSerializer):
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