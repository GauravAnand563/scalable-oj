import json
from django.db import models
from django.contrib.auth.models import User as UserModel

# Create your models here.


class User(models.Model):

    UserModel._meta.get_field('email')._unique = True
    UserModel._meta.get_field('username')._unique = True

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    status = models.BooleanField(default=1)
    country = models.CharField(max_length=20)
    token = models.TextField(null=False)


class Stats(models.Model):

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    solved = models.TextField(default='[]')
    attempted = models.TextField(default='[]')
    unsolved = models.TextField(default='[]')

    def add_to_array(self, array_name, value):
        array = getattr(self, array_name)
        array_list = json.loads(array)
        if value not in array_list:
            array_list.append(value)
            setattr(self, array_name, json.dumps(array_list))
            self.save()

    def remove_from_array(self, array_name, value):
        array = getattr(self, array_name)
        array_list = json.loads(array)
        if value in array_list:
            array_list.remove(value)
            setattr(self, array_name, json.dumps(array_list))
            self.save()

    def is_in_array(self, array_name, value):
        array = getattr(self, array_name)
        array_list = json.loads(array)
        return value in array_list
