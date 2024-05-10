from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save
from Profile.models import Favorite, UserWeightHistory
from products.models import Product
from recipes.models import Recipe
from django.conf import settings

user = get_user_model()
class Profile_Gold(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile_gold')
    products = models.ManyToManyField(Product, blank=True)
    recipes = models.ManyToManyField(Recipe, blank=True)
    
class Ration_Basic(models.Model):
    name = models.CharField(max_length=255)

class Ration_Basic_Components(models.Model):
    ration = models.ForeignKey(Ration_Basic, on_delete=models.CASCADE)
    recipe = models.ManyToManyField(Recipe, blank=True)
    meal_time = models.CharField(max_length=255)