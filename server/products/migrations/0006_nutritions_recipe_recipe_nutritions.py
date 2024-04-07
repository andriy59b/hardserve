# Generated by Django 5.0.3 on 2024-03-28 10:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_remove_product_glycemic_index'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nutritions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('unit', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to='recipes/image/')),
                ('short_description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe_Nutritions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=5, max_digits=10)),
                ('nutrient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_nutrients', to='products.nutritions')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_nutrients', to='products.recipe')),
            ],
        ),
    ]
