from django.contrib import admin
from .models import User, Storage

admin.site.register([User, Storage])
