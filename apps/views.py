# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
def personas_view(request):
    return render(request, 'apps/personas/personas.html', {})


def departamentos_view(request):
    return render(request, 'apps/departamentos/departamentos.html', {})


def empleados_view(request):
    return render(request, 'apps/empleados/empleados.html', {})
