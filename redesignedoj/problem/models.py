from email.policy import default
from pyexpat import model
from random import choice, choices
from statistics import mode
from django.db import models
from pkg_resources import require

from django.contrib.auth.models import User as UserModel
# Create your models here.

from user.models import User

class Tag(models.Model):
    tagname = models.CharField(max_length=20)



class Problem(models.Model):

    author = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=False)

    class DifficultyLevel(models.TextChoices):
        EASY='EASY'
        MEDIUM='MEDIUM'
        HARD='HARD'
        NOTDEFINED='NOTDEFINED'
    

    problemcode = models.CharField(max_length=20, null=False, unique=True, default='')
    title = models.CharField(max_length=100, null=False, default='', unique=True)
    description = models.TextField(null=False)
    difficulty = models.CharField(choices=DifficultyLevel.choices, null=False, max_length=20)
    score = models.IntegerField(null=False)

    # Commented for safety purpose it doesnt contribute to current logic
    # testcasesinputandoutput = models.TextField(null=False, default='')
    testcases = models.JSONField(null = False ,default = list)
    constraints = models.TextField(null = False, default = '')
    tags = models.ManyToManyField(Tag)


class Testcase(models.Model):
    
    title = models.CharField(null=False, default='', max_length=50, unique=True)
    input_path = models.TextField(null=False, default='')
    output_path = models.TextField(null=False, default='')

    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

