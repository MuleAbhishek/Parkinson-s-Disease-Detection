from django.urls import path
from .views import predict_api_view, predict_spiral_api_view

urlpatterns = [
    path('mri/', predict_api_view),   
    path('spiral/', predict_spiral_api_view),
]
