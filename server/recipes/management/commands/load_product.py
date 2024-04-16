import requests
from django.core.management.base import BaseCommand
from products.models import *

def product_load(product_id, image_name, self, *args, **kwargs):

    # api_key = '339a5df078aa48f2aa831ec1413f7537'
    # api_key = '60c5617260b84b1fb7ba939f0cdad2a6'
    # api_key = 'dbb41dcdd4ef4c6dacfd8e6c9b1db54c'
    # api_key = 'e258317c18264d14ba91f8f215d80f62'
    api_key = '87f459c41b2542809173f185926cec62'
    # api_key = '42d94788e6dd4b2c81ee247449c38820'

    url = f'https://api.spoonacular.com/food/ingredients/{product_id}/information'
    params = {'apiKey': api_key, 'amount': '100', 'unit': 'g'}
    response = requests.get(url, params=params)
    response.raise_for_status()

    product_data = response.json()

    product_name = product_data['name']

    if Product.objects.filter(name=product_name).exists():
        self.stdout.write(self.style.WARNING('Products already loaded into the database'))

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