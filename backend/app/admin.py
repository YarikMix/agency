from django.contrib import admin

from app.models import *

admin.site.register(CustomUser)
admin.site.register(Flat)
admin.site.register(Deal)
admin.site.register(Order)