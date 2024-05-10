from django.urls import path
from .views import *

urlpatterns = [
    path('query-openai/', QueryOpenAIView.as_view(), name='QueryOpenAIView'),
    path('basic', RationBasicView.as_view(), name='basic'),
]
