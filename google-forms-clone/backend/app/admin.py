# google-forms-clone/backend/app/admin.py
from django.contrib import admin
from .models import User, Form

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_staff')  # Display these fields in the admin list view
    list_filter = ('role', 'is_staff', 'is_superuser')       # Add filters based on role and staff status
    search_fields = ('username', 'email')                  # Enable searching by username and email
    ordering = ('username',)                                # Default ordering by username
    filter_horizontal = ()                                  # Add if you have ManyToMany fields
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'created_at')
    list_filter = ('created_by', 'created_at')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    def save_model(self, request, obj, form, change):
        if not obj.pk:  # If creating a new form
            obj.created_by = request.user
        super().save_model(request, obj, form, change)