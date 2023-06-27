from django.db import models
from problem.models import Problem
from user.models import User
from django.utils.timezone import now


from django.contrib.auth.models import User as UserModel


# Create your models here.
class Submission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=False)
    usersubmissionfile = models.TextField(null=False)
    verdict = models.CharField(max_length=20)
    language = models.CharField(null=False, max_length=20)
    status = models.CharField(null=False, max_length=20)
    submissionTime = models.DateTimeField(default=now, editable=False, blank=True)
    score=models.IntegerField()  