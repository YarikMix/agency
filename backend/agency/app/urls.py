from django.urls import path
from .views import *

urlpatterns = [
    # Аутентификация и авторизация
    path("api/register/", register),
    path("api/login/", login),
    path("api/check/", check),
    path("api/logout/", logout),

    path("api/flats/", get_flats),
    path("api/flats/<int:flat_id>/", get_flat),
]
