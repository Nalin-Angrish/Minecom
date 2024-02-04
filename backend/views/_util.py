"""
Utility functions for the backend
"""
import json
import jwt
from ..models import User



def get_data(req):
    """
    Get data from the request. This returns form fields.
    """
    data = json.loads(req.body)
    return data

def get_user_and_data(req):
    """
    Get data from the request. This returns user details and form fields.
    """
    data = json.loads(req.body)
    user_data = jwt.decode(
        data['credential'],
        options={"verify_signature": False},
        algorithms=['RS256']
    )
    del data['credential']
    user, created = User.objects.get_or_create(email=user_data['email'])
    if created:
        user.name = user_data['name']
        user.username = user_data['email'].split('@')[0]
        user.save()
    return user, data

def get_user(req):
    """
    Get user from the request
    """
    data = json.loads(req.body)
    if 'credential' not in data:
        return None
    try:
        user_data = jwt.decode(
            data['credential'],
            options={"verify_signature": False},
            algorithms=['RS256']
        )
        user, created = User.objects.get_or_create(email=user_data['email'])
        if created:
            user.name = user_data['name']
            user.username = user_data['email'].split('@')[0]
            user.save()
        return user
    except (jwt.ExpiredSignatureError, jwt.DecodeError, jwt.InvalidTokenError):
        return None
