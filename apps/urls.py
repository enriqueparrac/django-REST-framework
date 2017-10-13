from django.conf.urls import url, include
from .views import (
    personas_view,
    departamentos_view,
    empleados_view,
)

urlpatterns = [
    url(r'^personas/$', personas_view, name="personas"),
    url(r'^departamentos/$', departamentos_view, name="departamentos"),
    url(r'^empleados/$', empleados_view, name="empleados"),
]
