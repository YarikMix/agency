# Generated by Django 5.0.4 on 2024-05-10 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_deal_delete_ffasdfaf_delete_mortgage_delete_sale'),
    ]

    operations = [
        migrations.AddField(
            model_name='deal',
            name='date',
            field=models.DateField(null=True, verbose_name='Дата'),
        ),
        migrations.AddField(
            model_name='deal',
            name='status',
            field=models.IntegerField(choices=[(1, 'В работе'), (2, 'Завершена')], default=1, null=True, verbose_name='Статус'),
        ),
    ]
