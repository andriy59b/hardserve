# Generated by Django 5.0.3 on 2024-04-02 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_remove_recipe_ingredients_recipe_step'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe_equipment',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='recipe_ingredients',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
