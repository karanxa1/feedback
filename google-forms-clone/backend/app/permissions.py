from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'


class IsFacultyUser(permissions.BasePermission):
    """
    Allows access only to faculty users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.role == 'faculty'


class IsAdminOrFacultyUser(permissions.BasePermission):
    """
    Allows access to both admin and faculty users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role in ['admin', 'faculty']

class CanCreateUser(permissions.BasePermission):
    """
    Allows only admin users to create other users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'

class CanViewAllFormsAndResponses(permissions.BasePermission):
    """
    Allows only admin users to view all forms and responses.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'

class CanCreateFormsAndViewOwnResponses(permissions.BasePermission):
    """
    Allows faculty users to create forms and view responses for forms they created.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == 'faculty'

    def has_object_permission(self, request, view, obj):
        # Check if the user is the creator of the form (for viewing responses)
        if hasattr(obj, 'created_by'): #For forms
            return obj.created_by == request.user
        if hasattr(obj,'form'): # For responses
            return obj.form.created_by == request.user
        return False