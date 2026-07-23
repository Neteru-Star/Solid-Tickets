from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Ticket, Categoria, Comentario, HistorialEstado, Evidencia
from .serializers import (
    TicketSerializer, TicketCreateSerializer,
    CategoriaSerializer, ComentarioSerializer, EvidenciaSerializer
)
from .permissions import EsAgenteOAdmin, EsAdmin, EsPropietarioOAgenteOAdmin

class CategoriaListView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [EsAdmin()]
        return [permissions.IsAuthenticated()]

class TicketListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TicketCreateSerializer
        return TicketSerializer

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'SOLICITANTE':
            return Ticket.objects.filter(solicitante=user)
        if user.rol == 'AGENTE':
            return Ticket.objects.filter(
                agente_asignado=user
            ) | Ticket.objects.filter(estado='ABIERTO')
        return Ticket.objects.all()

    def perform_create(self, serializer):
        serializer.save(solicitante=self.request.user)

class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated, EsPropietarioOAgenteOAdmin]

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [EsAdmin()]
        return [permissions.IsAuthenticated(), EsPropietarioOAgenteOAdmin()]

class CambiarEstadoView(APIView):
    permission_classes = [EsAgenteOAdmin]
    ESTADOS_VALIDOS = ['ABIERTO', 'EN_PROCESO', 'RESUELTO', 'CERRADO']

    def patch(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket no encontrado'}, status=404)

        nuevo_estado = request.data.get('estado')
        if not nuevo_estado:
            return Response({'error': 'El campo estado es requerido'}, status=400)
        if nuevo_estado not in self.ESTADOS_VALIDOS:
            return Response({'error': f'Estado inválido. Opciones: {self.ESTADOS_VALIDOS}'}, status=400)
        if ticket.estado == nuevo_estado:
            return Response({'error': 'El ticket ya tiene ese estado'}, status=400)

        HistorialEstado.objects.create(
            ticket=ticket,
            estado_anterior=ticket.estado,
            estado_nuevo=nuevo_estado,
            cambiado_por=request.user
        )
        ticket.estado = nuevo_estado
        ticket.save()
        return Response({'mensaje': f'Estado cambiado a {nuevo_estado}', 'ticket_id': ticket.id})

class AsignarAgenteView(APIView):
    permission_classes = [EsAdmin]

    def patch(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket no encontrado'}, status=404)

        agente_id = request.data.get('agente_id')
        if not agente_id:
            return Response({'error': 'agente_id es requerido'}, status=400)

        from usuarios.models import CustomUser
        try:
            agente = CustomUser.objects.get(pk=agente_id, rol='AGENTE')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Agente no encontrado'}, status=404)

        # Registrar en historial
        HistorialEstado.objects.create(
            ticket=ticket,
            estado_anterior=ticket.estado,
            estado_nuevo=ticket.estado,
            cambiado_por=request.user
        )

        ticket.agente_asignado = agente
        ticket.save()
        return Response({'mensaje': f'Ticket asignado a {agente.email}', 'ticket_id': ticket.id})

class ComentarioCreateView(generics.CreateAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        ticket = Ticket.objects.get(pk=self.kwargs['pk'])
        serializer.save(autor=self.request.user, ticket=ticket)

class ComentarioListView(generics.ListAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comentario.objects.filter(ticket_id=self.kwargs['pk'])

class EvidenciaCreateView(generics.CreateAPIView):
    serializer_class = EvidenciaSerializer
    permission_classes = [EsAgenteOAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        ticket = Ticket.objects.get(pk=self.kwargs['pk'])
        serializer.save(subido_por=self.request.user, ticket=ticket)

class EvidenciaListView(generics.ListAPIView):
    serializer_class = EvidenciaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Evidencia.objects.filter(ticket_id=self.kwargs['pk'])