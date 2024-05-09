from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = None
        
        if '@' in username:
            try:
                user_obj = User.objects.get(email=username)
                username = user_obj.username
            except User.DoesNotExist:
                raise serializers.ValidationError("Неправильні облікові дані")
                
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Неправильні облікові дані")
        
        return {'user': user}



class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'gender', 'age', 'height', 'weight', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        user.is_active = False
        user.save()

        return user
    
class UserGoogleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('gender', 'age', 'height', 'weight')

    def update(self, instance, validated_data):
        instance.gender = validated_data.get('gender', instance.gender)
        instance.age = validated_data.get('age', instance.age)
        instance.height = validated_data.get('height', instance.height)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.save()
        return instance

