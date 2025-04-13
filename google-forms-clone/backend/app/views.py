from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Form, Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            return JsonResponse({'error': 'Please provide all required fields'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(f"Attempting login for username: {username}")  # Debug logging
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print(f"Login successful for user: {username}")  # Debug logging
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            print(f"Login failed for username: {username}")  # Debug logging
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
@login_required
def create_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        questions = data.get('questions')  # Expecting a JSON array of questions
        if not title or not questions:
            return JsonResponse({'error': 'Please provide title and questions'}, status=400)

        form = Form.objects.create(title=title, description=description, created_by=request.user, questions=questions)
        return JsonResponse({'message': 'Form created successfully', 'form_id': form.id}, status=201)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def submit_response(request, form_id):
    if request.method == 'POST':
        try:
            form = Form.objects.get(pk=form_id)
        except Form.DoesNotExist:
            return JsonResponse({'error': 'Form not found'}, status=404)

        data = json.loads(request.body)
        answers = data.get('answers')  # Expecting a JSON array of answers
        if not answers:
            return JsonResponse({'error': 'Please provide answers'}, status=400)
        
        # Associate response with user if authenticated, otherwise leave user as None
        user = request.user if request.user.is_authenticated else None
        response = Response.objects.create(form=form, user=user, answers=answers)
        return JsonResponse({'message': 'Response submitted successfully'}, status=201)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@login_required
def get_form_responses(request, form_id):
    try:
        form = Form.objects.get(pk=form_id)
    except Form.DoesNotExist:
        return JsonResponse({'error': 'Form not found'}, status=404)
    
    # Basic check: Only allow form creator or admin to view responses (adjust as needed)
    if form.created_by != request.user and not request.user.is_staff:  # is_staff indicates admin in Django
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    responses = Response.objects.filter(form=form).values('user__username', 'answers') # Adjust fields as needed
    return JsonResponse(list(responses), safe=False, status=200)