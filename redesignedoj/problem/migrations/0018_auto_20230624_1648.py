# Generated by Django 3.2.12 on 2023-06-24 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problem', '0017_problem_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='constraints',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='problem',
            name='testcases',
            field=models.JSONField(default=list),
        ),
    ]
