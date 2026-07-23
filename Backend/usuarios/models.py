from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    class Rol(models.TextChoices):
        SOLICITANTE = 'SOLICITANTE', 'Solicitante'
        AGENTE = 'AGENTE', 'Agente'
        ADMIN = 'ADMIN', 'Administrador'

    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=20, choices=Rol.choices, default=Rol.SOLICITANTE)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.rol})"
    
