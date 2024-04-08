from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, name, email, password="1234", **extra_fields):
        extra_fields.setdefault('name', name)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, name, email, password="1234", **extra_fields):
        extra_fields.setdefault('is_moderator', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    is_moderator = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Flat(models.Model):
    BALCONY_CHOICES = (
        (1, "Балкон"),
        (2, "Лоджия")
    )

    PARKING_CHOICES = (
        (1, "Наземная"),
        (2, "Подземная")
    )

    name = models.CharField(max_length=100, default="Название", verbose_name="Название")
    description = models.TextField(max_length=500, default="Описание", verbose_name="Описание")
    rooms = models.IntegerField(default=1, verbose_name="Кол-во комнат")
    price = models.IntegerField(default=25000, verbose_name="Цена")
    floor = models.CharField(default=1, verbose_name="Этаж")
    square_general = models.IntegerField(default=34, verbose_name="Площадь общая")
    squere_residential = models.IntegerField(default=18, verbose_name="Площадь жилая")
    squere_kitchen = models.IntegerField(default=6, verbose_name="Площадь жилая")
    balcony = models.IntegerField(default=1, verbose_name="Балкон/лоджия", choices=BALCONY_CHOICES)
    parking = models.IntegerField(default=1, verbose_name="Парковка", choices=PARKING_CHOICES)
    image = models.ImageField(default="flats/default.png", verbose_name="Картинка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"
