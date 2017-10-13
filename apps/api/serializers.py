from rest_framework import serializers
from apps.models import (
    Persona,
    Departamento,
    Empleado,
)

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = (
            'id',
            'nombre',
            'edad',
            'estatura',
            'fecha_nacimiento',
            'hora_nacimiento',
            'estado_civil',
        )

    def create(self, validated_data):
        instance, _ = Persona.objects.get_or_create(**validated_data)
        return instance


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = (
            'id',
            'nombre',
            'descripcion',
        )

    def create(self, validated_data):
        instance, _ = Departamento.objects.get_or_create(**validated_data)
        return instance


class EmpleadoSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.SerializerMethodField()

    def get_departamento_nombre(self, obj):
        return obj.departamento.nombre

    class Meta:
        model = Empleado
        fields = (
            'id',
            'nombre',
            'turno',
            'departamento',
            'departamento_nombre',
            'fecha_hora_inicio_turno',
        )

    def create(self, validated_data):
        instance, _ = Empleado.objects.get_or_create(**validated_data)
        return instance