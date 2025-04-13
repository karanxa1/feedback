from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.user_login, name='login'),
    path('forms/', views.create_form, name='create_form'),
    path('forms/<int:form_id>/responses/', views.submit_response, name='submit_response'),
    path('forms/<int:form_id>/', views.get_form_responses, name='get_form_responses'),
]