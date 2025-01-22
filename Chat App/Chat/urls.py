# filepath: /Users/nitin/Documents/90 North Assignment/Chat_App/chat/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('chat_home/', views.chat_home, name='chat_home'),
    path('users/', views.users, name='users'),
    path('chat/<int:user_id>/messages/', views.chat_messages, name='chat_messages'),
]