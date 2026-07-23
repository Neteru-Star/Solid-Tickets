from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import RegistroSerializer, UsuarioSerializer, CustomTokenObtainPairSerializer
from .models import CustomUser
from tickets.permissions import EsAdmin

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegistroView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = [permissions.AllowAny]

class PerfilView(generics.RetrieveUpdateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ListaUsuariosView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [EsAdmin]