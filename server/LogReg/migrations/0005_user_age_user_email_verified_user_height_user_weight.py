# Generated by Django 5.0.2 on 2024-03-05 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LogReg', '0004_remove_user_email_verified_remove_user_height_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='age',
            field=models.IntegerField(default=20),
        ),
        migrations.AddField(
            model_name='user',
            name='email_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='height',
            field=models.DecimalField(decimal_places=2, default=175, max_digits=5),
        ),
        migrations.AddField(
            model_name='user',
            name='weight',
            field=models.DecimalField(decimal_places=2, default=70, max_digits=5),
        ),
    ]
