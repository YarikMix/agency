# Generated by Django 5.0.4 on 2024-04-12 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_building_options_remove_building_flats'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sale',
            options={'verbose_name': 'Продажа', 'verbose_name_plural': 'Продажи'},
        ),
        migrations.AlterField(
            model_name='building',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Название'),
        ),
    ]
