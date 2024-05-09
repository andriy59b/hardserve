from django.urls import path
from . import views

urlpatterns = [
    path('query-openai/', views.QueryOpenAIView.as_view(), name='QueryOpenAIView')
]
