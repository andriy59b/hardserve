from django.db import models
from django.conf import settings
from products.models import Product
from recipes.models import Recipe

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
        
    def __str__(self):
        return self.user.username + " " + self.user.email
    
    

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True)
    
    class Meta:
        unique_together = ('user', 'product', 'recipe')

    def __str__(self):
        return f'{self.user.username} - {self.product.name if self.product else self.recipe.name}'
