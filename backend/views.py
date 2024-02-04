"""
Views.py
This file contains the route handlers for the Django app.
"""
import json
import jwt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User


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
    data = json.loads(req.body)
    user = jwt.decode(data['credential'], options={"verify_signature": False}, algorithms=['RS256'])
    User.objects.filter(email=user['email']).update_or_create(
        email=user['email'],
        name=user['name'],
        username=user['email'].split('@')[0]
    )
    return JsonResponse({'message': f'Hello {user['name']}'})
