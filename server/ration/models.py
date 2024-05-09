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
    
