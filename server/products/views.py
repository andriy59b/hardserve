from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import *
from products.serializers import *
from django.http import FileResponse,  JsonResponse
from django.shortcuts import get_object_or_404

class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        response = super(ProductListView, self).list(request, *args, **kwargs)
        response.data = {
            'message': 'Список продуктів успішно отримано.',
            'products': response.data,
        }
        return response
    
# class NutrientsListView(ListAPIView):
#     queryset = Nutrients.objects.all()
#     serializer_class = NutrientsSerializer

#     def list(self, request, *args, **kwargs):
#         response = super(NutrientsListView, self).list(request, *args, **kwargs)
#         response.data = {
#             'message': 'Список поживних речовин успішно отримано.',
#             'nutrients': response.data,
#         }
#         return response
    
class ProductNutrientsListView(ListAPIView):
    queryset = Product_Nutrients.objects.all()
    serializer_class = ProductNutrientsSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        product = get_object_or_404(Product, product_id=product_id)
        return Product_Nutrients.objects.filter(product_id=product.id)

    def list(self, request, *args, **kwargs):
        response = super(ProductNutrientsListView, self).list(request, *args, **kwargs)
        response.data = {
            'message': 'Детальну інформацію про продукт успішно отримано.',
            'product_nutrients': response.data,
        }
        return response

def GetImageByName(request, image_name):
    image_path = f"./products/images/{image_name}"
    try:
        image_file = open(image_path, 'rb')
    except FileNotFoundError:
        return JsonResponse({'error': 'Image not found'}, status=404)

    return FileResponse(image_file)
