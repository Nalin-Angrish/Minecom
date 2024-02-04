from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),

    # Server Routes
    path('server/create', views.create_server, name='create_server'),
    path('server/join', views.join_server, name='join_server'),
    path('server/leave', views.leave_server, name='leave_server'),
    path('server/get', views.get_servers, name='get_servers'),
    path('server/get_user', views.get_user_servers, name='get_user_server'),
    path('server/get_owned', views.get_user_owned_servers, name='get_user_owned_server'),
]
