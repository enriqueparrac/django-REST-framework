# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (
    Persona,
    Departamento,
    Empleado,
)

# Register your models here.
@admin.register(Persona)
class PersonaAdmin(admin.ModelAdmin):
    list_display = (
        'nombre',
        'edad',
        'estatura',
        'fecha_nacimiento',
        'hora_nacimiento',
        'estado_civil',
    )
    list_filter = ('nombre', 'estado_civil',)
    search_fields = ('nombre', 'estado_civil',)

@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    list_display = (
        'nombre',
        'descripcion',
        'fecha_creacion',
        'fecha_modificacion',
    )
    list_filter = ('nombre',)
    search_fields = ('nombre',)


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = (
        'nombre',
        'turno',
        'departamento',
        'fecha_creacion',
        'fecha_modificacion',
    )
    list_filter = ('nombre',)
    search_fields = ('nombre',)