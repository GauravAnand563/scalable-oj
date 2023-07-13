# Generated by Django 3.2.12 on 2022-07-02 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_fullname'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='', max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
    ]
