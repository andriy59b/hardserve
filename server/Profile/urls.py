from django.urls import path
from Profile.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('favourites/', FavouriteProductsView.as_view(), name='favorite-products'),
    path('favourites/recipes', FavouriteRecipesView.as_view(), name='favorite-recipes'),
    path('favorites/<int:product_id>/remove/', RemoveFavouriteProductsView.as_view(), name='remove-favorite-product'),
    path('favorites/<int:recipe_id>/remove/', RemoveFavouriteRecipesView.as_view(), name='remove-favorite-recipe'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)