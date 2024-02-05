"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import Server
from ._util import get_user_and_data, get_user, get_data


@csrf_exempt
def login(req):
    """
    Login with Google - Callback handler
    """
    user = get_user(req)
    return JsonResponse({'message': f'Hello {user.name}'})

@csrf_exempt
def get_profile(req):
    """
    Get user profile
    """
    user = get_user(req)
    return JsonResponse({'message': 'Success', 'data': {
        'name': user.name,
        'username': user.username,
        'email': user.email,
        'image': user.image,
        'description': user.description,
        'servers': [{
            'id': server.id,
            'name': server.name,
            'description': server.description,
            'image': server.icon,
            'ip': server.ip,
            'max_players': server.max_players,
        } for server in user.servers.all()[:min(5, user.servers.count())]],
        'creations': [{
            'id': creation.id,
            'name': creation.name,
            'description': creation.description,
            'image': creation.media,
        } for creation in user.creations.all()[:min(5, user.creations.count())]],
    }})

@csrf_exempt
def update_profile(req):
    """
    Update user profile
    """
    user, data = get_user_and_data(req)
    user.username = data.get('username', user.username)
    user.description = data.get('description', user.description)
    user.image = data.get('image', user.image)
    user.save()
    return JsonResponse({'message': 'Success'})
