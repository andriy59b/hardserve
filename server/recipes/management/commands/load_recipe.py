import requests
from django.core.management.base import BaseCommand
from recipes.models import *
import json

class Command(BaseCommand):
    help = 'Load initial recipe into the database from Spoonacular API'

    def handle(self, *args, **kwargs):

        recipe_term = [
                        'muffin', 'sushi', 
                        'pasta', 'ketchup', 
                        'buckwheat', 'rice', 
                        'borscht', 'pizza', 
                        'broccoli soup', 'kebab', 
                        'tiramisu', 'napoleon', 
                        'goulash', 'dumplings',
                        'cabbage', 'sorbet',
                       ]

        # api_key = '339a5df078aa48f2aa831ec1413f7537'
        # api_key = '60c5617260b84b1fb7ba939f0cdad2a6'
        # api_key = 'dbb41dcdd4ef4c6dacfd8e6c9b1db54c'
        # api_key = 'e258317c18264d14ba91f8f215d80f62'
        # api_key = '87f459c41b2542809173f185926cec62'
        api_key = '42d94788e6dd4b2c81ee247449c38820'

        for recipes in recipe_term:

            url = 'https://api.spoonacular.com/recipes/complexSearch' 
            params = {'apiKey': api_key, f'query': {recipes}}
            response = requests.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()

            recipe_id = data['results'][0]['id']

            recipe_name = data['results'][0]['title']

            url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
            params = {'apiKey': api_key}
            response = requests.get(url, params=params)
            response.raise_for_status()

            recipe_data = response.json()

            for key in ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'veryHealthy', 'cheap', 'veryPopular', 'sustainable', 'lowFodmap']:
                if recipe_data.get(key, False):
                    recipe, created = Recipe.objects.get_or_create(
                        name=recipe_name,  
                        image=recipe_data['image'],
                        short_description=recipe_data['summary'],
                        category=key, 
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Successfully created recipe: {recipe_name}'))
                    else:
                        self.stdout.write(self.style.ERROR(f'Recipe already exists: {recipe_name}'))

            analyzedInstructions = recipe_data['analyzedInstructions']

            # Dictionary to store the ingredients and their corresponding image URLs
            ingredients = recipe_data['extendedIngredients']        

            # First, create Recipe_Ingredients for all ingredients without a step
            for ingredient in ingredients:
                image_name = ingredient['image']
                image = f'https://img.spoonacular.com/ingredients_100x100/{image_name}'
                recipe_ingredient, created = Recipe_Ingredients.objects.get_or_create(
                    recipe=recipe,
                    ingredient_id=ingredient['id'],
                    ingredient=ingredient['name'],
                    image=image,
                    amount=ingredient['measures']['metric']['amount'],
                    unit=ingredient['measures']['metric']['unitShort'],
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created ingredient: {ingredient["name"]}'))
                else:
                    self.stdout.write(self.style.ERROR(f'Ingredient already exists: {ingredient["name"]}'))

            # Then, update the step for the ingredients used in each step
            for instruction in analyzedInstructions:
                for step in instruction['steps']:
                    # Create Recipe_Step objects
                    recipe_step, created = Recipe_Step.objects.get_or_create(
                        recipe=recipe,
                        step_number=step['number'],
                        description=step['step'],
                    )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created steps'))
            else:
                self.stdout.write(self.style.ERROR(f'Steps already exists'))

            for instruction in analyzedInstructions:
                for step in instruction['steps']:
                    for equipment in step['equipment']:
                        recipe_equipment, created = Recipe_Equipment.objects.get_or_create(
                            recipe=recipe,
                            equipment_id=equipment['id'],
                            defaults={
                                'equipment': equipment['name'],
                                'image': equipment['image'],
                            }
                        )
                        if created:
                            self.stdout.write(self.style.SUCCESS(f'Successfully created equipment: {equipment["name"]}'))
                        else:
                            self.stdout.write(self.style.ERROR(f'Equipment already exists: {equipment["name"]}, skipping...'))