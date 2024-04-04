from django.urls import path
from Profile.views import ProfileView, FavouriteProductsView, RemoveFavouriteProductsView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('favorites/', FavouriteProductsView.as_view(), name='favorite-products'),
    path('favorites/<int:product_id>/remove/', RemoveFavouriteProductsView.as_view(), name='remove-favorite-product'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


