from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone
import datetime
import uuid

class User(AbstractUser):
    GENDER_CHOICES = [
        ('Male', 'male'),
        ('Female', 'female'),
    ]
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, default=175)
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=70)
    is_email_verified = models.BooleanField(default=False)
    confirmation_token = models.UUIDField(default=uuid.uuid4)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    def age(self):
        today = timezone.now().date()
        born = self.date_of_birth
        return today.year - born.year - ((today.month, today.day) < (born.month, born.day))