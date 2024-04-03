from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)
    short_description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=255)

class Recipe_Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    step_number = models.IntegerField()
    description = models.TextField()

class Recipe_Ingredients(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.IntegerField()
    ingredient = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)
    amount = models.FloatField()
    unit = models.CharField(max_length=255)

class Recipe_Equipment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    equipment_id = models.IntegerField()
    equipment = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)