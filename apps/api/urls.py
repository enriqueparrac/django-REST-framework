# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url, include
from rest_framework import routers
from .views import (
    PersonaViewSet,
    DepartamentoViewSet,
    EmpleadoViewSet,
)

router = routers.DefaultRouter()
router.register(r'personas', PersonaViewSet)
router.register(r'departamentos', DepartamentoViewSet)
router.register(r'empleados', EmpleadoViewSet)

urlpatterns = router.urls