# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-03-25 14:28
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0031_auto_20200317_1122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='logoutviewconfiguration',
            name='changed_by',
        ),
        migrations.DeleteModel(
            name='LogoutViewConfiguration',
        ),
    ]
