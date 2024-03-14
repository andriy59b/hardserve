import requests
from django.core.management.base import BaseCommand
from products.models import Product, Nutriens, Product_Nutriens
from .image_finder import find_image

class Command(BaseCommand):
    help = 'Load initial products into the database from Spoonacular API'

    def handle(self, *args, **kwargs):

        product = 'tomato'
        api_key = '339a5df078aa48f2aa831ec1413f7537'

        url = 'https://api.spoonacular.com/food/ingredients/search' 
        params = {'apiKey': api_key, f'query': {product}, 'number': '1'}
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        product_id = data['results'][0]['id']

        url = f'https://api.spoonacular.com/food/ingredients/{product_id}/information'
        params = {'apiKey': api_key, 'amount': '100', 'unit': 'g'}
        response = requests.get(url, params=params)
        response.raise_for_status()

        product_data = response.json()

        if Product.objects.filter(name=product_data['name']).exists():
            self.stdout.write(self.style.WARNING('Products already loaded into the database'))
            return

        product_image = find_image(product, self)

        if len(product_data['categoryPath']) == 2:
            n = 1
            category = product_data['categoryPath'][n]
        elif len(product_data['categoryPath']) == 1:
            n = 0
            category = product_data['categoryPath'][n]
        else: 
            category = '——'  

        product = Product.objects.create(
            name=product_data['name'],  
            category=category,
            glycemic_index=product_data['nutrition']['properties'][0]['amount'], 
            image=product_image,
        )

        for nutrient in product_data['nutrition']['nutrients']:
            nutrient_obj, _ = Nutriens.objects.get_or_create(name=nutrient['name'], unit=nutrient['unit'])
            Product_Nutriens.objects.create(
                product=product,
                nutrient=nutrient_obj,
                amount=nutrient['amount']
            )

        self.stdout.write(self.style.SUCCESS('Successfully loaded products into the database'))