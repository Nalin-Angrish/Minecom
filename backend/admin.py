from django.contrib import admin

from .models import User, Server, Creation, Media

admin.site.register(User)
admin.site.register(Server)
admin.site.register(Creation)
admin.site.register(Media)
