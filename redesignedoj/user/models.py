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

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    solved = models.JSONField(default=list)
    attempted = models.JSONField(default=list)
    unsolved = models.JSONField(default=list)

    def add_solved(self, problem_id):
        """Adds a problem to the solved list."""
        if problem_id not in self.solved:
            self.solved.append(problem_id)
            self.unsolved.remove(problem_id)

    def remove_solved(self, problem_id):
        """Removes a problem from the solved list."""
        if problem_id in self.solved:
            self.solved.remove(problem_id)
            self.unsolved.append(problem_id)

    def add_attempted(self, problem_id):
        """Adds a problem to the attempted list."""
        if problem_id not in self.attempted:
            self.attempted.append(problem_id)

    def remove_attempted(self, problem_id):
        """Removes a problem from the attempted list."""
        if problem_id in self.attempted:
            self.attempted.remove(problem_id)

    def add_unsolved(self, problem_id):
        """Adds a problem to the unsolved list."""
        if problem_id not in self.unsolved:
            self.unsolved.append(problem_id)

    def remove_unsolved(self, problem_id):
        """Removes a problem from the unsolved list."""
        if problem_id in self.unsolved:
            self.unsolved.remove(problem_id)