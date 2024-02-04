from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),

    # Server Routes
    path('server/create', views.create_server, name='create_server'),
    path('server/update', views.update_server, name='update_server'),
    path('server/delete', views.delete_server, name='delete_server'),
    path('server/join', views.join_server, name='join_server'),
    path('server/leave', views.leave_server, name='leave_server'),
    path('server/get_all', views.get_servers, name='get_servers'),
    path('server/get_user', views.get_user_servers, name='get_user_server'),
    path('server/get_owned', views.get_user_owned_servers, name='get_user_owned_server'),
    path('server/get', views.get_server, name='get_all_servers'),

    # Creation Routes
    path('creation/create', views.create_creation, name='create_creation'),
    path('creation/update', views.update_creation, name='update_creation'),
    path('creation/delete', views.delete_creation, name='delete_creation'),
    path('creation/get_all', views.get_creations, name='get_creations'),
    path('creation/get', views.get_creation, name='get_creation'),
    path('creation/get_user', views.get_user_creations, name='get_user_creations'),
]
