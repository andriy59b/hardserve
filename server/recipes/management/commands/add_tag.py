import requests
from django.core.management.base import BaseCommand
from recipes.models import *
from .tags import tags_recipe

class Command(BaseCommand):
    help = 'Add tag for meal time to the recipe from array of tags'
    
    def handle(self, *args, **kwargs):
        for tag in tags_recipe:
            try:
                recipe = Recipe.objects.get(id=tag['id'])
                recipe.meal_time = tag['meal']
                recipe.save()
            except Recipe.DoesNotExist:
                print(f"Recipe with id {tag['id']} does not exist")  