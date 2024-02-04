"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import Creation
from ._util import get_data

@csrf_exempt
def create_creation(req):
    """
    Create a new creation
    """
    user, data = get_data(req)
    creation = Creation.objects.create(
        name=data['name'],
        description=data['description'],
        author=user
    )
    creation.save()

    user.creations.add(creation)
    user.save()

    return JsonResponse({'message': 'Creation created successfully!'})

@csrf_exempt
def get_creations(req):
    """
    Get all creations
    """
    user, _ = get_data(req)
    creations = Creation.objects.filter(author=user)
    return JsonResponse({
        'message': 'Creations fetched successfully!',
        'creations': [
            {
                'id': creation.id,
                'name': creation.name,
                'description': creation.description
            }
            for creation in creations
        ]
    })

@csrf_exempt
def delete_creation(req):
    """
    Delete a creation
    """
    user, data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    creation.delete()
    return JsonResponse({'message': 'Creation deleted successfully!'})

@csrf_exempt
def update_creation(req):
    """
    Update a creation
    """
    user, data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    creation.name = data['name']
    creation.description = data['description']
    creation.save()
    return JsonResponse({'message': 'Creation updated successfully!'})

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
                'description': creation.description
            }
            for creation in creations
        ]
    })

@csrf_exempt
def get_creation(req):
    """
    Get a creation
    """
    _, data = get_data(req)
    creation = Creation.objects.get(id=data['creation_id'])
    return JsonResponse({
        'message': 'Creation fetched successfully!',
        'creation': {
            'id': creation.id,
            'name': creation.name,
            'description': creation.description
        }
    })

@csrf_exempt
def get_user_creations(req):
    """
    Get all creations for a user
    """
    user, _ = get_data(req)
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