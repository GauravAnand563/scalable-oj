# Generated by Django 3.2.12 on 2022-06-30 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problem', '0007_remove_problem_problemcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='problemcode',
            field=models.CharField(default='', max_length=20, unique=True),
        ),
    ]