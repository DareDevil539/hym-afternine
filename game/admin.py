from django.contrib import admin
from game.models import *

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'born_in_fifties')