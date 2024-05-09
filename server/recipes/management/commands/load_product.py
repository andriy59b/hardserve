import requests
from django.core.management.base import BaseCommand
from products.models import *

def product_load(product_id, image_name, api_key, self, *args, **kwargs):
    
    if Product.objects.filter(product_id=product_id).exists():
        self.stdout.write(self.style.WARNING('Products already loaded into the database'))
        return

    url = f'https://api.spoonacular.com/food/ingredients/{product_id}/information'
    params = {'apiKey': api_key, 'amount': '100', 'unit': 'g'}
    response = requests.get(url, params=params)
    response.raise_for_status()

    product_data = response.json()

    product_name = product_data['name']

    if len(product_data['categoryPath']) == 2:
        n = 1
        category = product_data['categoryPath'][n]
    elif len(product_data['categoryPath']) == 1:
        n = 0
        category = product_data['categoryPath'][n]
    else: 
        category = '——'  

    product = Product.objects.create(
        product_id=product_id,
        name=product_name,  
        category=category,
        image = f'https://img.spoonacular.com/ingredients_100x100/{image_name}'
    )

    categories = ['nutrients', 'properties', 'flavonoids']

    for category in categories:
        for item in product_data['nutrition'][category]:
            nutrient_obj, _ = Nutrients.objects.get_or_create(name=item['name'], unit=item['unit'])
            Product_Nutrients.objects.create(
                product=product,
                nutrient=nutrient_obj,
                amount=item['amount']
            )

    self.stdout.write(self.style.SUCCESS('Successfully loaded products into the database'))