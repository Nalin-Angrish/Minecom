"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import Creation
from ._util import get_data, get_user, get_user_and_data

@csrf_exempt
def create_creation(req):
    """
    Create a new creation
    """
    user, data = get_user_and_data(req)
    if user is None:
        return JsonResponse({'message': 'You are not authorized to create a creation!'}, status=403)
    creation = Creation.objects.create(
        name=data['name'],
        description=data['description'],
    )
    creation.author.set([user])
    creation.save()

    user.creations.add(creation)
    user.save()

    return JsonResponse({'message': 'Creation created successfully!'})

@csrf_exempt
def update_creation(req):
    """
    Update a creation
    """
    data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    creation.name = data['name']
    creation.description = data['description']
    creation.save()
    return JsonResponse({'message': 'Creation updated successfully!'})

@csrf_exempt
def delete_creation(req):
    """
    Delete a creation
    """
    data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    creation.delete()
    return JsonResponse({'message': 'Creation deleted successfully!'})

@csrf_exempt
def get_all_creations(req):
    """
    Get all creations
    """
    creations = Creation.objects.all()
    return JsonResponse({
        'message': 'Creations fetched successfully!',
        'creations': [
            {
                'id': creation.id,
                'name': creation.name,
                'description': creation.description,
                'author': {
                    'id': creation.author.all()[0].id,
                    'username': creation.author.all()[0].username
                }
            }
            for creation in creations
        ]
    })

@csrf_exempt
def get_creation(req):
    """
    Get a creation
    """
    data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    return JsonResponse({
        'message': 'Creation fetched successfully!',
        'creation': {
            'name': creation.name,
            'description': creation.description,
            'author': {
                'id': creation.author.all()[0].id,
                'username': creation.author.all()[0].username
            }
        }
    })

@csrf_exempt
def get_user_creations(req):
    """
    Get all creations for a user
    """
    user = get_user(req)
    return JsonResponse({
        'message': 'Creations fetched successfully!',
        'creations': [
            {
                'id': creation.id,
                'name': creation.name,
                'description': creation.description
            }
            for creation in user.creations.all()
        ]
    })
