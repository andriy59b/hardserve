from django.urls import path
from . import views

urlpatterns = [
    path('query-openai/', views.query_openai, name='query_openai')
]
