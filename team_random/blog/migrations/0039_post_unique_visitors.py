# Generated by Django 3.0.5 on 2020-11-13 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0038_auto_20201112_1844'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='unique_visitors',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
