from django.urls import path
from Profile.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('favorites/', FavoriteProductsView.as_view(), name='favorite-products'),
    path('favorites/recipes', FavoriteRecipesView.as_view(), name='favorite-recipes'),
    path('not-favorites/', NotFavoriteProductsView.as_view(), name='not-favorite-products'),
    path('favorites/<int:product_id>/remove/', RemoveFavoriteProductsView.as_view(), name='remove-favorite-product'),
    path('favorites/recipes/<int:recipe_id>/remove/', RemoveFavoriteRecipesView.as_view(), name='remove-favorite-recipe'),
    path('not-favorites/<int:product_id>/remove/', RemoveNotFavoriteProductsView.as_view(), name='remove-not-favorite-product'),
    path('weight/', UserWeightHistoryView.as_view(), name='weight-history'),
    path('update-plan/', UpdatePlanView.as_view(), name='update-plan'),
    path('cancel-plan/', CancelPlanView.as_view(), name='cancel-plan'),
    path('active-ration/<int:ration_id>/', ActiveRationView.as_view(), name='active-ration'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)