from django.urls import path
from Profile.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('favorites/', FavoriteProductsView.as_view(), name='favorite-products'),
    path('favorites/recipes', FavoriteRecipesView.as_view(), name='favorite-recipes'),
    path('favorites/<int:product_id>/remove/', RemoveFavoriteProductsView.as_view(), name='remove-favorite-product'),
    path('favorites/recipes/<int:recipe_id>/remove/', RemoveFavoriteRecipesView.as_view(), name='remove-favorite-recipe'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)