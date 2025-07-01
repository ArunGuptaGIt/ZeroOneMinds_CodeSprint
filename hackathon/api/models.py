from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None

    phoneNumber = models.CharField(max_length=50, null=False)
    email = models.EmailField(null=False, unique=True)
    type = models.BooleanField(null=False,default=False)  # vendor=0, farmer=1
    image_for_verification = models.FileField(upload_to='user_verifications/', null=True, blank=True)
    location = models.CharField(max_length=255, null=False, blank=False)
    verification = models.BooleanField(null=True)
    price = models.IntegerField(default= 0)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Storage(models.Model):
    first_name = models.CharField()
    item = models.CharField()
    count = models.IntegerField()
    weightOfEachPacket = models.IntegerField()
    description = models.CharField(max_length=500)
    type = models.BooleanField(null=False) # vendor = 0 farmer = 1
    item_photo = models.ImageField(upload_to='storage_photos/', null=True, blank=True)
    rating = models.FloatField(default=0.0)
