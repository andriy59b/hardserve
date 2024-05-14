# Generated by Django 5.0.3 on 2024-05-14 22:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0008_profile_basic_plan_profile_gold_plan_and_more'),
        ('ration', '0004_alter_profile_basic_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='active_ration',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='ration.ration_basic'),
        ),
    ]
