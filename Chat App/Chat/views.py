# filepath: /Users/nitin/Documents/90 North Assignment/Chat_App/chat/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from .models import ChatMessage

def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        User.objects.create_user(username=username, password=password)
        messages.success(request, 'Signup successful! Please log in.')
        return redirect('login')
    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('chat_home')
        messages.error(request, 'Invalid credentials!')
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def chat_home(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'chat_home.html')

def users(request):
    users = User.objects.all().values('id', 'username')
    return JsonResponse(list(users), safe=False)

def chat_messages(request, user_id):
    messages = ChatMessage.objects.filter(sender_id=user_id, receiver_id=request.user.id) | ChatMessage.objects.filter(sender_id=request.user.id, receiver_id=user_id)
    messages = messages.order_by('timestamp').values('text')
    return JsonResponse(list(messages), safe=False)