# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models.deletion import ProtectedError
from rest_framework import status

from apps.models import (
    Persona,
    Departamento,
    Empleado,
)
from .serializers import (
    PersonaSerializer,
    DepartamentoSerializer,
    EmpleadoSerializer,
)


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all().order_by('id')
    serializer_class = PersonaSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        nombre = request.GET.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(
                nombre__icontains=nombre
            )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PersonaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = PersonaSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instancia = self.get_object()
        try:
            self.perform_destroy(instancia)
            success = True
            msg = "Registro Eliminado Correctamente"
        except ProtectedError as error:
            success = True
            msg = "No se Puede borrar Registro Ya Que cuenta con Registros Ligados"

        return Response({
            'success': success,
            'msg': msg
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            obj.usuario_alta = request.user
            obj.save()
            msg = "Persona Creada Correctamente"
            success = True
        else:
            msg = "Error al Crear Persona, Contactar con TI"
            success = False

        return Response({
            'msg': msg,
            'success': success,
        })

    def update(self, request, *args, **kwargs):
        instancia = self.get_object()
        serializer = self.get_serializer(instancia, data=request.data,)
        if serializer.is_valid():
            self.perform_update(serializer)
            instancia.usuario_mod = request.user
            instancia.save()
            success = True
            msg = "Persona Modificada Correctamente"
        else:
            success = False
            msg = "Error al Modificar Persona, Contactar con TI"

        return Response({
            'success': success,
            'msg': msg
        })


class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all().order_by('id')
    serializer_class = DepartamentoSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        nombre = request.GET.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(
                nombre__icontains=nombre
            )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = DepartamentoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = DepartamentoSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instancia = self.get_object()
        try:
            self.perform_destroy(instancia)
            success = True
            msg = "Registro Eliminado Correctamente"
        except ProtectedError as error:
            success = True
            msg = "No se Puede borrar Registro Ya Que cuenta con Registros Ligados"

        return Response({
            'success': success,
            'msg': msg
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            obj.usuario_alta = request.user
            obj.save()
            msg = "Departamento Creado Correctamente"
            success = True
        else:
            msg = "Error al Crear Departamento, Contactar con TI"
            success = False

        return Response({
            'msg': msg,
            'success': success,
        })

    def update(self, request, *args, **kwargs):
        instancia = self.get_object()
        serializer = self.get_serializer(instancia, data=request.data,)
        if serializer.is_valid():
            self.perform_update(serializer)
            instancia.usuario_mod = request.user
            instancia.save()
            success = True
            msg = "Departamento Modificado Correctamente"
        else:
            success = False
            msg = "Error al Modificar Departamento, Contactar con TI"

        return Response({
            'success': success,
            'msg': msg
        })


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all().order_by('id')
    serializer_class = EmpleadoSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        nombre = request.GET.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(
                nombre__icontains=nombre
            )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = EmpleadoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = EmpleadoSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instancia = self.get_object()
        try:
            self.perform_destroy(instancia)
            success = True
            msg = "Registro Eliminado Correctamente"
        except ProtectedError as error:
            success = True
            msg = "No se Puede borrar Registro Ya Que cuenta con Registros Ligados"

        return Response({
            'success': success,
            'msg': msg
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            obj.usuario_alta = request.user
            obj.save()
            msg = "Empleado Creado Correctamente"
            success = True
        else:
            msg = "Error al Crear Empleado, Contactar con TI"
            success = False

        return Response({
            'msg': msg,
            'success': success,
        })

    def update(self, request, *args, **kwargs):
        instancia = self.get_object()
        serializer = self.get_serializer(instancia, data=request.data,)
        if serializer.is_valid():
            self.perform_update(serializer)
            instancia.usuario_mod = request.user
            instancia.save()
            success = True
            msg = "Empleado Modificado Correctamente"
        else:
            success = False
            msg = "Error al Modificar Empleado, Contactar con TI"

        return Response({
            'success': success,
            'msg': msg
        })