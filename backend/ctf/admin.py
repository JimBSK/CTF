from django.contrib import admin
from .models import Challenge

@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'points', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')