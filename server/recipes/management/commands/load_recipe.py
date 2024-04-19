import requests
import random
from django.core.management.base import BaseCommand
from requests.exceptions import HTTPError
from recipes.models import *
from products.models import Product
import json
from .load_product import product_load
from requests.exceptions import HTTPError

class Command(BaseCommand):
    help = 'Load initial recipe into the database from Spoonacular API'

    def check_product_in_db(product_name, self):
        return Product.objects.filter(name=product_name).exists()

    def handle(self, *args, **kwargs):

        # recipe_term = [
        #     'muffin', 'sushi', 
        #     'pasta', 'ketchup', 
        #     'buckwheat', 'rice', 
        #     'borscht', 'pizza', 
        #     'broccoli soup', 'kebab', 
        #     'tiramisu', 'napoleon', 
        #     'goulash', 'dumplings',
        #     'cabbage', 'sorbet',
        #     'pancakes', 'omelette',
        #     'lasagna', 'burger',
        #     'salad', 'steak',
        #     'chicken soup', 'apple pie',
        #     'chocolate cake', 'cheesecake',
        # ]

        def generate_recipe_ids(num_ids):
            return random.sample(range(1000, 177088), num_ids)

        api_keys = [
            # '339a5df078aa48f2aa831ec1413f7537',
            # '60c5617260b84b1fb7ba939f0cdad2a6',
            # 'dbb41dcdd4ef4c6dacfd8e6c9b1db54c',
            # '87f459c41b2542809173f185926cec62',
            # 'e258317c18264d14ba91f8f215d80f62',
            # '42d94788e6dd4b2c81ee247449c38820',
            # 'a138058ae37d4ccca881bc5d16de0cb9',
            # '6671ad70419945a98ff3cfdfbc3660cc',
            # 'cc07a7223956433b86fab413e0b50441',
            # 'c4fc74022f1d4f1784e8a9e24e2d5057',
            # 'ac4d3645af68446ba5c18803eab8ceba',
            # '1486d9ee3a974928863b2c30ab03a4cb',
            # '9a8591a469104de1ae08592f7f5eb4ba',
            # 'aa0d4c3d6fa94c5ea61c19ee37cd3ddd',
            # '57010081ce5b425db23ee3a5bdb973f2',
            # '7fbec0dd4fe647a8a4a310ed9e88d709',
            # '4216d55fb6f34871843ba5a98b5f8671',
            # 'fd54be1078cc47f0994fc2c436a860bc',
            # '856b9633b2d44c9dbacb4debe966be8c',
            # 'f49f8cea0ab442bfa319e7e08091e899',
            # 'f7c46ef7324e46d0b8d68ffd4fdf7eae',
            # '56c998fadf1c430d923670ff8384988e',
            # '513f1a8a6a1d461a93809770aef53aa2',
            # '8ef9c74df9994e8b844d152432750adc',
            # '8c09d241744842278486fd7b3659d26e',
            # '249da33077b347f2ab4a951e0e427b9b',
            # 'f10d3e30136c47ae9bfb85d05d0aa0d7',
            # '9188670f93a04588b429172f94328602',
            # '01b10dec07ce4d6c85cf48e198aced4b',
            # '69a072ee4f4a4de0a169d8aeaa6c2052',
            # 'e48773ce4c7d477bacadc9d957e3b6cf',
            # '382080f680bd487ca746f21e32790a37',
            '7585feec79da4c76a87ca5696fcfb028'
        ]

        recipe_name = ''

        for api_key in api_keys:
            recipe_ids = generate_recipe_ids(10)
            print(api_key + '------------')
            for recipe_id in recipe_ids:
                try:
                    # recipes = 'muffin'
                    # url = 'https://api.spoonacular.com/recipes/complexSearch' 
                    # params = {'apiKey': api_key, f'query': {recipes}}
                    # response = requests.get(url, params=params)
                    # response.raise_for_status()
                    
                    # data = response.json()

                    # recipe_id = data['results'][0]['id']

                    url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
                    params = {'apiKey': api_key}
                    response = requests.get(url, params=params)
                    response.raise_for_status()

                    recipe_data = response.json()

                    recipe_name = recipe_data['title']
                    
                    if Recipe.objects.filter(name=recipe_name).exists():
                        self.stdout.write(self.style.WARNING('Recipe already loaded into the database'))
                        continue

                    # Create Recipe object outside of the loop
                    recipe, created = Recipe.objects.get_or_create(
                        name=recipe_name,  
                        image=recipe_data['image'],
                        short_description=recipe_data['summary'],
                    )

                    for key in ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'veryHealthy', 'cheap', 'veryPopular', 'sustainable', 'lowFodmap']:
                        if recipe_data.get(key, False):
                            category, _ = Category.objects.get_or_create(name=key)
                            recipe.categories.add(category)

                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Successfully created recipe: {recipe_name}'))
                    else:
                        self.stdout.write(self.style.ERROR(f'Recipe already exists: {recipe_name}'))

                    analyzedInstructions = recipe_data['analyzedInstructions']

                    if not analyzedInstructions:
                        response.status_code = 404
                        raise HTTPError(f'Error 404: No preparation steps found for recipe: {recipe_name}')

                    # Dictionary to store the ingredients and their corresponding image URLs
                    ingredients = recipe_data['extendedIngredients']        

                    # First, create Recipe_Ingredients for all ingredients without a step
                    for ingredient in ingredients:
                        if not self.check_product_in_db(ingredient['name']):
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
                                product_load(ingredient['id'], image_name, api_key, self)
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
                except HTTPError as http_err:
                    if response.status_code in [402, 404]:
                        # Delete the recipe and all related objects
                        Recipe.objects.filter(name=recipe_name).delete()
                        self.stdout.write(self.style.ERROR(f'HTTP error occurred: {http_err}. Recipe {recipe_name} and all related objects have been deleted.'))
                    else:
                        self.stdout.write(self.style.ERROR(f'HTTP error occurred: {http_err}'))