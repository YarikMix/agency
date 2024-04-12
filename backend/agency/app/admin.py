from django.contrib import admin

# Register your models here.
from app.models import CustomUser, Flat, Sale, Building

admin.site.register(CustomUser)
admin.site.register(Flat)
admin.site.register(Sale)
admin.site.register(Building)