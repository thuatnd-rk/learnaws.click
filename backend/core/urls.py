from django.urls import path
from core.views import hello_world

urlpatterns = [
    path('api/hello/', hello_world),
]
