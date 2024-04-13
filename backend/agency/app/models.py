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

    ROOMS_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4)
    )

    name = models.CharField(max_length=100, default="Название", verbose_name="Название", null=True)
    description = models.TextField(max_length=500, default="Описание", verbose_name="Описание", null=True)
    address = models.CharField(max_length=100, default="ул. Ломоносовский проспект, 25к2", verbose_name="Адрес", null=True)
    metro = models.CharField(max_length=50, default="Люберцы", null=True)
    rooms = models.IntegerField(default=1, verbose_name="Кол-во комнат", choices=ROOMS_CHOICES, null=True)
    price = models.IntegerField(default=25000, verbose_name="Цена", null=True)
    floor = models.CharField(default=1, verbose_name="Этаж", null=True)
    balcony = models.IntegerField(default=1, verbose_name="Балкон/лоджия", choices=BALCONY_CHOICES, null=True)
    parking = models.IntegerField(default=1, verbose_name="Парковка", choices=PARKING_CHOICES, null=True)
    image = models.ImageField(default="flats/default.jpeg", verbose_name="Картинка", null=True)
    renter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Арендодатель", null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"


class Sale(models.Model):
    REALTY_CHOICES = (
        (1, "Квартира"),
        (2, "Команат"),
        (3, "Дом"),
        (4, "Земельный участок"),
        (5, "Дача"),
        (6, "Гараж")
    )

    realty_type = models.IntegerField(default=1, verbose_name="Тип недвижимости")
    description = models.TextField(max_length=500, verbose_name="Описание")
    image = models.ImageField(default="flats/default.png", verbose_name="Картинка")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь", null=True)
    price = models.IntegerField(default="Цена", null=True)

    class Meta:
        verbose_name = "Продажа"
        verbose_name_plural = "Продажи"


class Building(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    metro = models.CharField(max_length=50)
    image = models.ImageField(default="flats/default.png", verbose_name="Картинка")
    #flats = models.ManyToManyField(Flat, verbose_name="Квартиры", null=False)
    price = models.IntegerField(verbose_name="Минимальная цена квартир", null=False)
    mortgage = models.FloatField(verbose_name="Минимальный процент ипотеки", null=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Новостройка"
        verbose_name_plural = "Новостройки"