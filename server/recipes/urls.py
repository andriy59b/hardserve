from django.urls import path
from recipes.views import *

urlpatterns = [
    path('', RecipeListView.as_view(), name='recipe-list'),
    # path('steps/', RecipeStepView.as_view(), name='recipe-steps'),
    # path('ingredients/', RecipeIngredientView.as_view(), name='recipe-ingredients'),
    # path('equipments/', RecipeEquipmentView.as_view(), name='recipe-equipment'),
    path('<int:pk>/', RecipeView.as_view(), name='recipe-detail'),
]   