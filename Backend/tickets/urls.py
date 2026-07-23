from django.urls import path
from .views import (
    TicketListCreateView, TicketDetailView,
    CambiarEstadoView, AsignarAgenteView,
    ComentarioCreateView, ComentarioListView,
    CategoriaListView, EvidenciaCreateView, EvidenciaListView
)

urlpatterns = [
    path('', TicketListCreateView.as_view(), name='tickets'),
    path('<int:pk>/', TicketDetailView.as_view(), name='ticket_detail'),
    path('<int:pk>/estado/', CambiarEstadoView.as_view(), name='cambiar_estado'),
    path('<int:pk>/asignar/', AsignarAgenteView.as_view(), name='asignar_agente'),
    path('<int:pk>/comentarios/', ComentarioCreateView.as_view(), name='crear_comentario'),
    path('<int:pk>/comentarios/lista/', ComentarioListView.as_view(), name='lista_comentarios'),
    path('<int:pk>/evidencias/', EvidenciaCreateView.as_view(), name='subir_evidencia'),
    path('<int:pk>/evidencias/lista/', EvidenciaListView.as_view(), name='lista_evidencias'),
    path('categorias/', CategoriaListView.as_view(), name='categorias'),
]