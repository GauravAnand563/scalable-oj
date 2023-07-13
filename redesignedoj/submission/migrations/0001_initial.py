# Generated by Django 3.2.12 on 2022-06-30 06:50

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
        ('problem', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usercode', models.TextField()),
                ('useroutput', models.TextField()),
                ('verdict', models.CharField(max_length=20)),
                ('language', models.CharField(max_length=20)),
                ('status', models.CharField(max_length=20)),
                ('submissionTime', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('score', models.IntegerField()),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
        ),
    ]
