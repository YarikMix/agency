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

    description = models.TextField(max_length=500, default="Описание", verbose_name="Описание", null=True)
    address = models.CharField(max_length=100, default="ул. Ломоносовский проспект, 25к2", verbose_name="Адрес", null=True)
    rooms = models.IntegerField(default=1, verbose_name="Кол-во комнат", choices=ROOMS_CHOICES, null=True)
    price = models.IntegerField(default=25000, verbose_name="Цена", null=True)
    floor = models.CharField(default=1, verbose_name="Этаж", null=True)
    square = models.IntegerField(default=1, verbose_name="Площадь", null=True)
    balcony = models.IntegerField(default=1, verbose_name="Балкон/лоджия", choices=BALCONY_CHOICES, null=True)
    parking = models.IntegerField(default=1, verbose_name="Парковка", choices=PARKING_CHOICES, null=True)
    image = models.ImageField(default="default.jpeg", verbose_name="Картинка", null=True)
    renter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Арендодатель", null=True)

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


class Mortgage(models.Model):
    name = models.CharField(default="Жильё от застройщика с господдержкой по 2 документам", max_length=100, verbose_name="Название")
    bank_name = models.CharField(default="Сбербанк", max_length=100, verbose_name="Название")
    bank_image = models.ImageField(default="default.png", verbose_name="Логотип банка")
    min_credit_period = models.IntegerField(default=1, verbose_name="Минимальный срок кредита", null=True)
    max_credit_period = models.IntegerField(default=30, verbose_name="Максимальный срок кредита", null=True)
    min_credit_amount = models.IntegerField(default=100000, verbose_name="Минимальный размер кредита", null=True)
    max_credit_amount = models.IntegerField(default=6000000, verbose_name="Максимальный размер кредита", null=True)
    price = models.IntegerField(default="23995", verbose_name="Платёж", null=True)
    percent = models.FloatField(default="7.7", verbose_name="Ставка", null=True)

    def __str__(self):
        return "Ипотека №" + str(self.pk)

    class Meta:
        verbose_name = "Ипотека"
        verbose_name_plural = "Ипотеки"

class Ffasdfaf(models.Model):
    name = models.CharField(default="Жильё от застройщика с господдержкой по 2 документам", max_length=100, verbose_name="Название")

    def __str__(self):
        return "Ипотека №" + str(self.pk)

    class Meta:
        verbose_name = "asdfasdf"
        verbose_name_plural = "asdfasdf"