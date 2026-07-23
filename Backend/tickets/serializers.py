from rest_framework import serializers
from .models import Ticket, Categoria, Comentario, HistorialEstado, Evidencia
from usuarios.serializers import UsuarioSerializer

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    autor = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'autor', 'contenido', 'fecha_publicacion']

class HistorialEstadoSerializer(serializers.ModelSerializer):
    cambiado_por = UsuarioSerializer(read_only=True)

    class Meta:
        model = HistorialEstado
        fields = ['id', 'estado_anterior', 'estado_nuevo', 'cambiado_por', 'fecha_cambio']

class EvidenciaSerializer(serializers.ModelSerializer):
    subido_por = UsuarioSerializer(read_only=True)
    archivo_url = serializers.SerializerMethodField()

    class Meta:
        model = Evidencia
        fields = ['id', 'archivo', 'archivo_url', 'descripcion', 'subido_por', 'fecha_subida']

    def get_archivo_url(self, obj):
        request = self.context.get('request')
        if obj.archivo and request:
            return request.build_absolute_uri(obj.archivo.url)
        return None

class TicketSerializer(serializers.ModelSerializer):
    solicitante = UsuarioSerializer(read_only=True)
    agente_asignado = UsuarioSerializer(read_only=True)
    categoria = CategoriaSerializer(read_only=True)
    comentarios = ComentarioSerializer(many=True, read_only=True)
    historial = HistorialEstadoSerializer(many=True, read_only=True)
    evidencias = EvidenciaSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'

class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['titulo', 'descripcion', 'prioridad', 'categoria']