from rest_framework import serializers
from .models import *

class RationBasicComponents(serializers.ModelSerializer):
    class Meta:
        model = Ration_Basic_Components
        fields = ['id', 'ration', 'recipe', 'meal_time']
        
class RationBasic(serializers.ModelSerializer):
    components = RationBasicComponents(source='ration_basic_components_set', many=True)

    class Meta:
        model = Ration_Basic
        fields = ['id', 'name', 'components']
