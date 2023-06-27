from django.db import models
from problem.models import Problem
from user.models import Stats, User
from django.utils.timezone import now


from django.contrib.auth.models import User as UserModel
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class Submission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=False)
    usersubmissionfile = models.TextField(null=False)
    verdict = models.CharField(max_length=20)
    language = models.CharField(null=False, max_length=20)
    status = models.CharField(null=False, max_length=20)
    submissionTime = models.DateTimeField(
        default=now, editable=False, blank=True)
    score = models.IntegerField()


@receiver(post_save, sender=Submission)
def update_statistics(sender, instance, created, **kwargs):
    user = instance.user
    statistics, created = Stats.objects.get_or_create(user=user)

    if created:
        # List all the problem objects and make a list of their problem codes
        problems = Problem.objects.all()
        problemcodes = [problem.problemcode for problem in problems]

        # Add the problem codes to the unsolved list
        for problemcode in problemcodes:
            statistics.add_to_array('unsolved', problemcode)

        if instance.verdict == "ACCEPTED":
            statistics.add_to_array('solved', instance.problem.problemcode)
        else:
            statistics.add_to_array('attempted', instance.problem.problemcode)

        # Remove the problem code from the unsolved list
        statistics.remove_from_array('unsolved', instance.problem.problemcode)

        statistics.save()
    else:
        if instance.verdict == "ACCEPTED":
            statistics.add_to_array('solved', instance.problem.problemcode)
        else:
            # Go through all the submissions and check if the verdict for this problem is accepted or not
            submissions = Submission.objects.filter(
                user=user, problem=instance.problem)
            verdicts = [submission.verdict for submission in submissions]

            if "ACCEPTED" in verdicts:
                statistics.add_to_array('solved', instance.problem.problemcode)
            else:
                statistics.add_to_array(
                    'attempted', instance.problem.problemcode)

        # Remove the problem code from the unsolved list
        statistics.remove_from_array('unsolved', instance.problem.problemcode)

        statistics.save()
