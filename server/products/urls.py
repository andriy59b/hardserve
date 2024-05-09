from django.urls import path
from products.views import *

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:product_id>/', ProductNutrientsListView.as_view(), name='product-nutrients-by-product-id'),
    path('images/<str:image_name>/', GetImageByName, name='get-image-by-name'),
]   