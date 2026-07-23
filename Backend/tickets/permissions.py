from rest_framework.permissions import BasePermission

class EsSolicitante(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'SOLICITANTE'

class EsAgente(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'AGENTE'

class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'ADMIN'

class EsAgenteOAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol in ['AGENTE', 'ADMIN']

class EsPropietarioOAgenteOAdmin(BasePermission):
    """Permite acceso si el usuario es dueño del ticket, agente o admin"""
    def has_object_permission(self, request, view, obj):
        if request.user.rol in ['AGENTE', 'ADMIN']:
            return True
        return obj.solicitante == request.user