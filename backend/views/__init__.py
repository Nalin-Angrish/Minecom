"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .server import *
from .creation import *
from .profile import *

def index(_):
    """
    Index route handler. Returns a simple JSON response.
    """
    return JsonResponse({'message': 'Hello, world!'})
