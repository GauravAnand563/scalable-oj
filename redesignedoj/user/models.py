from django.db import models
from django.contrib.auth.models import User as UserModel

# Create your models here.
class User(models.Model):


    UserModel._meta.get_field('email')._unique = True
    UserModel._meta.get_field('username')._unique = True


    user=models.OneToOneField(UserModel, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    status = models.BooleanField(default=1)
    country = models.CharField(max_length=20)
    token = models.TextField(null=False)

# class Stats(models.Model)
    
