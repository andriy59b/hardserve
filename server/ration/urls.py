from django.urls import path
from .views import *

urlpatterns = [
    path('query-openai/', QueryOpenAIView.as_view(), name='QueryOpenAIView'),
    path('basic', RationBasicView.as_view(), name='basic'),
    path('basic/profile/<int:ration_id>/', ProfileBasicView.as_view(), name='profile_basic_add'),
    path('basic/profile/', UserBasicRationsView.as_view(), name='profile_basic'),

]
