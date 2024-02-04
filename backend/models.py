from django.db import models

class User(models.Model):
    """
    A user of the Minecom platform. 
    This is linked with the user's minecraft profile.
    """
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.EmailField()
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
    icon = models.ForeignKey('Media', on_delete=models.DO_NOTHING, null=True, blank=True)
    description = models.TextField()

class Creation(models.Model):
    """
    A user's creation on Minecraft presented on the Minecom platform. 
    This is linked with the creation's media and it's author.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    media = models.ManyToManyField('Media')
    author = models.ManyToManyField('User', related_name='creation_author')

class Media(models.Model):
    """
    A media file on the Minecom platform.
    It is used for user's avatars, server icons, project images and creation screenshots.
    """
    name = models.CharField(max_length=100)
    url = models.URLField()