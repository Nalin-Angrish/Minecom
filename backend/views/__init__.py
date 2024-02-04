"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .server import *
from .creation import *

def index(_):
    """
    Index route handler. Returns a simple JSON response.
    """
    return JsonResponse({'message': 'Hello, world!'})

@csrf_exempt
def login(req):
    """
    Login with Google - Callback handler
    """
    user = get_user(req)
    return JsonResponse({'message': f'Hello {user.name}'})
