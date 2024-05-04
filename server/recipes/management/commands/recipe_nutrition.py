from django.core.management.base import BaseCommand
from recipes.models import *
import re

class Command(BaseCommand):
    help = 'Calculate nutrition data for recipes'

    def handle(self, *args, **options):
        recipes = Recipe.objects.all()

        for recipe in recipes:
            short_description = recipe.short_description
            
            calories_match = re.search(r'(\d+)\s+calories', short_description)
            protein_match = re.search(r'(\d+)g\s+of\s+protein', short_description)
            fat_match = re.search(r'(\d+)g\s+of\s+fat', short_description)

            if calories_match:
                calories = int(calories_match.group(1))
            else:
                calories = 0
                
            if protein_match:
                protein = int(protein_match.group(1))
            else:
                protein = 0
                
            if fat_match:
                fat = int(fat_match.group(1))
            else:
                fat = 0

            nutrition_data = RecipeNutrition.objects.create(
                recipe=recipe,
                calories=calories,
                protein=protein,
                fat=fat,
            )