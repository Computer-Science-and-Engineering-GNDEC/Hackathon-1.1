# Generated by Django 3.0.5 on 2020-11-18 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0066_auto_20201118_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='image',
            field=models.ImageField(blank=True, default='default/author.png', null=True, upload_to='author'),
        ),
    ]
