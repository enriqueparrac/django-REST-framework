# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-05 21:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0002_persona_estado_civil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='hora_nacimiento',
            field=models.CharField(max_length=250),
        ),
    ]
