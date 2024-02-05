"""
This file contains the route handlers for the Django app.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ._util import get_user_and_data

from ..models import Message, Server

@csrf_exempt
def get_chat(req):
    """
    Get chat of a server
    """
    server_id = req.GET.get('id')
    server = Server.objects.get(id=server_id)
    messages = Message.objects.filter(server=server).order_by('timestamp')
    return JsonResponse({
        'messages': [
            {
                'message': message.message,
                'author': message.author.username,
                'timestamp': message.timestamp
            }
            for message in messages
        ]
    })

@csrf_exempt
def send_chat(req):
    """
    Send a message to a server
    """
    user, data = get_user_and_data(req)
    server_id = data.get('id')
    print(server_id)
    server = Server.objects.get(id=server_id)
    message = data.get('message')
    message = Message(server=server, author=user, message=message)
    message.save()
    return JsonResponse({'status': 'ok'})
