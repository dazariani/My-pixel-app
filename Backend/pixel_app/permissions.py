from rest_framework import permissions


class ObjLevelPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True
        if request.user.id == obj.author.id:
            return True
        return False


class ModelLevelPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_authenticated:
            return True
        return False
