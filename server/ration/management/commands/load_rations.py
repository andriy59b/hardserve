from django.core.management.base import BaseCommand
from ration.models import *

class Command(BaseCommand):
    help = 'Loads rations into the database'

    ration1, created = Ration_Basic.objects.get_or_create(name='Energy Boost')
    ration2, created = Ration_Basic.objects.get_or_create(name='Balanced Diet')
    ration3, created = Ration_Basic.objects.get_or_create(name='Fitness Challenge')
    ration4, created = Ration_Basic.objects.get_or_create(name='Healthy Eating')
    ration5, created = Ration_Basic.objects.get_or_create(name='Dynamic Endurance')

    try:
        #Раціон 1
        recipe1 = Recipe.objects.get(id=24) # breakfast 1
        recipe2 = Recipe.objects.get(id=34) # breakfast 1
        recipe3 = Recipe.objects.get(id=185) # breakfast 1

        recipe4 = Recipe.objects.get(id=2) # lunch 1
        recipe5 = Recipe.objects.get(id=7) # lunch 1
        recipe6 = Recipe.objects.get(id=13) # lunch 1

        recipe7 = Recipe.objects.get(id=15) # snack 1
        recipe8 = Recipe.objects.get(id=58) # snack 1
        recipe9 = Recipe.objects.get(id=162) # snack 1

        recipe10 = Recipe.objects.get(id=33) # dinner 1 
        recipe11 = Recipe.objects.get(id=95) # dinner 1
        recipe12 = Recipe.objects.get(id=1553) # dinner 1


        component1 = Ration_Basic_Components.objects.create(ration=ration1, meal_time='breakfast')
        component1.recipe.add(recipe1, recipe2, recipe3)

        component1 = Ration_Basic_Components.objects.create(ration=ration1, meal_time='lunch')
        component1.recipe.add(recipe4, recipe5, recipe6)

        component1 = Ration_Basic_Components.objects.create(ration=ration1, meal_time='snack')
        component1.recipe.add(recipe7, recipe8, recipe9)

        component1 = Ration_Basic_Components.objects.create(ration=ration1, meal_time='dinner')
        component1.recipe.add(recipe10, recipe11, recipe12)

        print("Раціон 1 успішно додано.")
    except Exception as e:
        print(f"Помилка при додаванні раціону 1: {e}")


    try:
        #Раціон 2
        recipe1 = Recipe.objects.get(id=47) # breakfast 2
        recipe2 = Recipe.objects.get(id=432) # breakfast 2
        recipe3 = Recipe.objects.get(id=419) # breakfast 2

        recipe4 = Recipe.objects.get(id=8) # lunch 2
        recipe5 = Recipe.objects.get(id=1140) # lunch 2
        recipe6 = Recipe.objects.get(id=1780) # lunch 2

        recipe7 = Recipe.objects.get(id=79) # snack 2
        recipe8 = Recipe.objects.get(id=73) # snack 2
        recipe9 = Recipe.objects.get(id=60) # snack 2

        recipe10 = Recipe.objects.get(id=264) # dinner 2 
        recipe11 = Recipe.objects.get(id=246) # dinner 2
        recipe12 = Recipe.objects.get(id=683) # dinner 2


        component2 = Ration_Basic_Components.objects.create(ration=ration2, meal_time='breakfast')
        component2.recipe.add(recipe1, recipe2, recipe3)

        component2 = Ration_Basic_Components.objects.create(ration=ration2, meal_time='lunch')
        component2.recipe.add(recipe4, recipe5, recipe6)

        component2 = Ration_Basic_Components.objects.create(ration=ration2, meal_time='snack')
        component2.recipe.add(recipe7, recipe8, recipe9)

        component2 = Ration_Basic_Components.objects.create(ration=ration2, meal_time='dinner')
        component2.recipe.add(recipe10, recipe11, recipe12)

        print("Раціон 2 успішно додано.")
    except Exception as e:
        print(f"Помилка при додаванні раціону 2: {e}")


    try:
        #Раціон 3
        recipe1 = Recipe.objects.get(id=1567) # breakfast 3
        recipe2 = Recipe.objects.get(id=1111) # breakfast 3
        recipe3 = Recipe.objects.get(id=967) # breakfast 3

        recipe4 = Recipe.objects.get(id=857) # lunch 3
        recipe5 = Recipe.objects.get(id=989) # lunch 3
        recipe6 = Recipe.objects.get(id=1604) # lunch 3

        recipe7 = Recipe.objects.get(id=1331) # snack 3
        recipe8 = Recipe.objects.get(id=1537) # snack 3
        recipe9 = Recipe.objects.get(id=1449) # snack 3

        recipe10 = Recipe.objects.get(id=1112) # dinner 3 
        recipe11 = Recipe.objects.get(id=806) # dinner 3
        recipe12 = Recipe.objects.get(id=1684) # dinner 3


        component3 = Ration_Basic_Components.objects.create(ration=ration3, meal_time='breakfast')
        component3.recipe.add(recipe1, recipe2, recipe3)

        component3 = Ration_Basic_Components.objects.create(ration=ration3, meal_time='lunch')
        component3.recipe.add(recipe4, recipe5, recipe6)

        component3 = Ration_Basic_Components.objects.create(ration=ration3, meal_time='snack')
        component3.recipe.add(recipe7, recipe8, recipe9)

        component3 = Ration_Basic_Components.objects.create(ration=ration3, meal_time='dinner')
        component3.recipe.add(recipe10, recipe11, recipe12)

        print("Раціон 3 успішно додано.")
    except Exception as e:
        print(f"Помилка при додаванні раціону 3: {e}")

    try:
        # #Раціон 4
        recipe1 = Recipe.objects.get(id=133) # breakfast 4
        recipe2 = Recipe.objects.get(id=82) # breakfast 4
        recipe3 = Recipe.objects.get(id=1360) # breakfast 4

        recipe4 = Recipe.objects.get(id=110) # lunch 4
        recipe5 = Recipe.objects.get(id=30) # lunch 4
        recipe6 = Recipe.objects.get(id=428) # lunch 4

        recipe7 = Recipe.objects.get(id=63) # snack 4
        recipe8 = Recipe.objects.get(id=165) # snack 4
        recipe9 = Recipe.objects.get(id=151) # snack 4

        recipe10 = Recipe.objects.get(id=40) # dinner 4 
        recipe11 = Recipe.objects.get(id=128) # dinner 4
        recipe12 = Recipe.objects.get(id=148) # dinner 4


        component4 = Ration_Basic_Components.objects.create(ration=ration4, meal_time='breakfast')
        component4.recipe.add(recipe1, recipe2, recipe3)

        component4 = Ration_Basic_Components.objects.create(ration=ration4, meal_time='lunch')
        component4.recipe.add(recipe4, recipe5, recipe6)

        component4 = Ration_Basic_Components.objects.create(ration=ration4, meal_time='snack')
        component4.recipe.add(recipe7, recipe8, recipe9)

        component4 = Ration_Basic_Components.objects.create(ration=ration4, meal_time='dinner')
        component4.recipe.add(recipe10, recipe11, recipe12)
        print("Раціон 4 успішно додано.")
    except Exception as e:
        print(f"Помилка при додаванні раціону 4: {e}")

    try:
        # #Раціон 5
        recipe1 = Recipe.objects.get(id=587) # breakfast 5
        recipe2 = Recipe.objects.get(id=29) # breakfast 5
        recipe3 = Recipe.objects.get(id=24) # breakfast 5

        recipe4 = Recipe.objects.get(id=213) # lunch 5
        recipe5 = Recipe.objects.get(id=154) # lunch 5
        recipe6 = Recipe.objects.get(id=683) # lunch 5

        recipe7 = Recipe.objects.get(id=507) # snack 5
        recipe8 = Recipe.objects.get(id=515) # snack 5
        recipe9 = Recipe.objects.get(id=73) # snack 5

        recipe10 = Recipe.objects.get(id=806) # dinner 5 
        recipe11 = Recipe.objects.get(id=1065) # dinner 5
        recipe12 = Recipe.objects.get(id=164) # dinner 5


        component5 = Ration_Basic_Components.objects.create(ration=ration5, meal_time='breakfast')
        component5.recipe.add(recipe1, recipe2, recipe3)

        component5 = Ration_Basic_Components.objects.create(ration=ration5, meal_time='lunch')
        component5.recipe.add(recipe4, recipe5, recipe6)

        component5 = Ration_Basic_Components.objects.create(ration=ration5, meal_time='snack')
        component5.recipe.add(recipe7, recipe8, recipe9)

        component5 = Ration_Basic_Components.objects.create(ration=ration5, meal_time='dinner')
        component5.recipe.add(recipe10, recipe11, recipe12)
        print("Раціон 5 успішно додано.")
    except Exception as e:
        print(f"Помилка при додаванні раціону 5: {e}")