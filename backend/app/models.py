from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, name, email, phone, is_renter=False, password="1234", **extra_fields):
        extra_fields.setdefault('name', name)
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, is_renter=is_renter, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_renter(self, name, email, phone, password="1234", **extra_fields):
        return self.create_user(name, email, phone, True, password, **extra_fields)

    def create_superuser(self, name, email, phone, is_renter=False, password="1234", **extra_fields):
        extra_fields.setdefault('is_moderator', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, phone, is_renter, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, null=True)
    passport_field1 = models.CharField(max_length=25, blank=True, null=True)
    passport_field2 = models.CharField(max_length=100, blank=True, null=True)
    passport_field3 = models.CharField(max_length=100, blank=True, null=True)
    is_moderator = models.BooleanField(default=False)
    is_renter = models.BooleanField(default=False)

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

    description = models.TextField(default="Описание", verbose_name="Описание", null=True)
    address = models.CharField(max_length=100, default="ул. Ломоносовский проспект, 25к2", verbose_name="Адрес", null=True)
    rooms = models.IntegerField(default=1, verbose_name="Кол-во комнат", choices=ROOMS_CHOICES, null=True)
    price = models.IntegerField(default=25000, verbose_name="Цена", null=True)
    floor = models.CharField(default=1, verbose_name="Этаж", null=True)
    square = models.IntegerField(default=1, verbose_name="Площадь", null=True)
    balcony = models.IntegerField(default=1, verbose_name="Балкон/лоджия", choices=BALCONY_CHOICES, null=True)
    parking = models.IntegerField(default=1, verbose_name="Парковка", choices=PARKING_CHOICES, null=True)
    renter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Арендодатель", null=True)
    image = models.ImageField(default="default.jpeg", verbose_name="Картинка", null=True)

    def __str__(self):
        return f"Квартира {self.pk}"

    class Meta:
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"


class Deal(models.Model):
    STATUS_CHOICES = (
        (1, 'В работе'),
        (2, 'Завершена')
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Покупатель", null=True, related_name='user')
    renter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Риелтор", null=True, related_name='renter')
    flat = models.ForeignKey(Flat, on_delete=models.CASCADE, verbose_name="Квартира", null=True)
    status = models.IntegerField(default=1, choices=STATUS_CHOICES, verbose_name="Статус", null=True)
    date = models.DateTimeField(verbose_name="Дата", null=True)

    def __str__(self):
        return f"Сделка {self.pk}"

    class Meta:
        verbose_name = "Сделка"
        verbose_name_plural = "Сделки"


class Order(models.Model):
    TYPE_CHOICES = (
        (1, 'Покупка'),
        (2, 'Продажа')
    )

    STATUS_CHOICES = (
        (1, 'Сформирована'),
        (2, 'Рассматривается'),
        (3, 'Завершена')
    )

    ROOMS_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4)
    )

    type = models.IntegerField(default=1, choices=TYPE_CHOICES, verbose_name="Тип", null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Клиент", null=True)
    status = models.IntegerField(default=1, choices=STATUS_CHOICES, verbose_name="Статус", null=True)
    date = models.DateTimeField(verbose_name="Дата создания", null=True)
    rooms = models.IntegerField(default=1, verbose_name="Кол-во комнат", choices=ROOMS_CHOICES, null=True)
    price = models.IntegerField(default=1, verbose_name="Цена", null=True)
    square = models.IntegerField(default=1, verbose_name="Площадь", null=True)

    def __str__(self):
        return f"Заявка {self.pk}"

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявка"

