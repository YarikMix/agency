from django.urls import path
from .views import *

urlpatterns = [
    # Аутентификация и авторизация
    path("api/register/", register),
    path("api/login/", login),
    path("api/check/", check),
    path("api/logout/", logout),

    # Квартиры
    path("api/flats/", get_flats),
    path("api/flats/add/", add_flat),
    path("api/flats/<int:flat_id>/", get_flat),

    # Сделки
    path("api/deals/<int:deal_id>/", get_deal),
    path("api/deals/", get_deals),
    path("api/deals/add/", add_deal),
    path("api/deals/<int:deal_id>/update_status/", update_deal_status)
]
