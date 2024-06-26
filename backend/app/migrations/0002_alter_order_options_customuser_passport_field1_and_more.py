# Generated by Django 5.0.6 on 2024-05-22 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'verbose_name': 'Заявка', 'verbose_name_plural': 'Заявка'},
        ),
        migrations.AddField(
            model_name='customuser',
            name='passport_field1',
            field=models.CharField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='passport_field2',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='passport_field3',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Сформирована'), (2, 'Рассматривается'), (3, 'Завершена')], default=1, null=True, verbose_name='Статус'),
        ),
    ]
