from django.db import models

class User(models.Model):
    """
    A user of the Minecom platform. 
    This is linked with the user's minecraft profile.
    """
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    image = models.TextField()
    description = models.TextField()
    servers = models.ManyToManyField('Server', related_name='server_membership')
    owned_servers = models.ManyToManyField('Server', related_name='ownership')
    creations = models.ManyToManyField('Creation', related_name='creation_author')

class Server(models.Model):
    """
    A minecraft server. 
    This is linked with the server's configuration and the users that are part of it.
    """
    name = models.CharField(max_length=100)
    ip = models.GenericIPAddressField()
    port = models.PositiveIntegerField()
    owner = models.ManyToManyField('User', related_name='ownership')
    users = models.ManyToManyField('User', related_name='server_membership')
    max_players = models.PositiveIntegerField()
    icon = models.TextField()
    description = models.TextField()

class Creation(models.Model):
    """
    A user's creation on Minecraft presented on the Minecom platform. 
    This is linked with the creation's media and it's author.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    media = models.TextField()
    author = models.ManyToManyField('User', related_name='creation_author')
