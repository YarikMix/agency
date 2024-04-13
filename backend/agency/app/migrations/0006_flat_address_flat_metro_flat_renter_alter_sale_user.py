# Generated by Django 5.0.4 on 2024-04-13 16:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_sale_options_alter_building_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='flat',
            name='address',
            field=models.CharField(default='Адрес', max_length=100, verbose_name='Адрес'),
        ),
        migrations.AddField(
            model_name='flat',
            name='metro',
            field=models.CharField(default='Люберцы', max_length=50),
        ),
        migrations.AddField(
            model_name='flat',
            name='renter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Арендодатель'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
    ]
