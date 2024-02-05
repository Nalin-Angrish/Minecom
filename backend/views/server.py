"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..models import Server
from ._util import get_user_and_data, get_user, get_data

@csrf_exempt
def create_server(req):
    """
    Create a new server
    """
    user, data = get_user_and_data(req)
    if user is None:
        return JsonResponse({'message': 'You are not authorized to create a server!'}, status=403)
    server = Server.objects.create(
        name=data['name'],
        ip=data['ip'],
        port=data['port'],
        max_players=data['max_players'],
        description=data['description'],
        icon=data['image'],
    )
    server.users.add(user)
    server.owner.set([user])
    server.save()

    user.owned_servers.add(server)
    user.servers.add(server)
    user.save()
    # TODO: Support Server Icon
    return JsonResponse({'message': 'Server created successfully!'})

@csrf_exempt
def update_server(req):
    """
    Update a server
    """
    user, data = get_user_and_data(req)
    server = Server.objects.get(id=data['server_id'])
    if user != server.owner:
        return JsonResponse({'message': 'You do not have permission to update this server!'}, status=403)
    if 'name' in data:
        server.name = data['name']
    if 'ip' in data:
        server.ip = data['ip']
    if 'port' in data:
        server.port = data['port']
    if 'max_players' in data:
        server.max_players = data['max_players']
    if 'description' in data:
        server.description = data['description']
    server.save()
    return JsonResponse({'message': 'Server updated successfully!'})

@csrf_exempt
def delete_server(req):
    """
    Delete a server
    """
    server = Server.objects.get(id=req.GET['server_id'])
    # if user != server.owner:
    #     return JsonResponse({'message': 'You do not have permission to delete this server!'}, status=403)
    server.delete()
    return JsonResponse({'message': 'Server deleted successfully!'})

@csrf_exempt
def join_server(req):
    """
    Join an existing server
    """
    user, data = get_user_and_data(req)
    server = Server.objects.get(id=data['server_id'])
    server.users.add(user)
    server.save()
    user.servers.add(server)
    user.save()
    return JsonResponse({'message': f'You have joined {server.name} successfully!'})

@csrf_exempt
def leave_server(req):
    """
    Leave a server
    """
    user, data = get_user_and_data(req)
    server = Server.objects.get(id=data['server_id'])
    server.users.remove(user)
    server.save()
    user.servers.remove(server)
    user.save()
    return JsonResponse({'message': f'You have left {server.name} successfully!'})

@csrf_exempt
def get_servers(req):
    """
    Get all servers
    """
    servers = Server.objects.all()
    return JsonResponse({'servers': [{
        "id": server.id,
        "name": server.name,
        "ip": server.ip,
        "port": server.port,
        "max_players": server.max_players,
        "description": server.description
    } for server in servers]})

@csrf_exempt
def get_user_servers(req):
    """
    Get all servers for a user
    """
    user = get_user(req)
    return JsonResponse({'servers': [server.name for server in user.servers.all()]})

@csrf_exempt
def get_user_owned_servers(req):
    """
    Get all servers owned by a user
    """
    user = get_user(req)
    return JsonResponse({'servers': [server.name for server in user.owned_servers.all()]})

@csrf_exempt
def get_server(req):
    """
    Get a server
    """
    data = get_data(req)
    server = Server.objects.get(id=data['server_id'])
    return JsonResponse({
        'message': 'Server fetched successfully!',
        'server': {
            'name': server.name,
            'ip': server.ip,
            'port': server.port,
            'max_players': server.max_players,
            'description': server.description
        }
    })
