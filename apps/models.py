# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Create your models here.

class Persona(models.Model):
    SOLTERO = 1
    CASADO = 2
    VIUDO = 3
    DIVORCIADO = 4

    estado_civil_choices = (
        (SOLTERO, 'Soltero'),
        (CASADO, 'Casado'),
        (VIUDO, 'Viudo'),
        (DIVORCIADO, 'Divorciado'),
    )

    nombre = models.CharField(
        max_length=250,
    )
    edad = models.IntegerField()
    estatura = models.DecimalField(
        decimal_places=4,
        max_digits=1000,
    )
    fecha_nacimiento = models.DateField(
        default=timezone.now,
    )
    hora_nacimiento = models.CharField(
        max_length=250,
    )
    estado_civil = models.IntegerField(
        choices=estado_civil_choices,
        default=SOLTERO,
    )

    class Meta:
        db_table = 'pruebas_persona'
        verbose_name = 'Persona'
        verbose_name_plural = 'Personas'

    def __unicode__(self):
        return self.nombre


class Departamento(models.Model):
    nombre = models.CharField(max_length=250,)
    descripcion = models.CharField(max_length=250, default='',) #Se agrega default porque ya existía el modelo cuando se creó este campo.
    fecha_creacion = models.DateTimeField(default=timezone.now,)
    fecha_modificacion = models.DateTimeField(auto_now=True,)

    class Meta:
        db_table = 'pruebas_departamento'

    def __unicode__(self):
        return self.nombre


class Empleado(models.Model):
    MATUTINO = 1
    VESPERTINO = 2
    NOCTURNO = 3

    turno_choices = (
        (MATUTINO, 'MATUTINO'),
        (VESPERTINO, 'VESPERTINO'),
        (NOCTURNO, 'NOCTURNO'),
    )
    departamento = models.ForeignKey(
        Departamento,
        on_delete=models.PROTECT,
    )
    nombre = models.CharField(max_length=250,)
    turno = models.IntegerField(
        choices=turno_choices,
        default=MATUTINO,
    )
    fecha_hora_inicio_turno = models.DateTimeField()
    fecha_creacion = models.DateTimeField(default=timezone.now,)
    fecha_modificacion = models.DateTimeField(auto_now=True,)

    class Meta:
        db_table = 'pruebas_empleado'

    def __unicode__(self):
        return self.nombre