from django.urls import path
from Profile.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('favorites/', FavouriteProductsView.as_view(), name='favorite-products'),
    path('favorites/recipes', FavouriteRecipesView.as_view(), name='favorite-recipes'),
    path('favorites/<int:product_id>/remove/', RemoveFavouriteProductsView.as_view(), name='remove-favorite-product'),
    path('favorites/recipes/<int:recipe_id>/remove/', RemoveFavouriteRecipesView.as_view(), name='remove-favorite-recipe'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)