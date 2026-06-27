
from django.contrib import admin

from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "course", "amount", "status", "ref_id", "created_at", "paid_at"]
    list_filter = ["status"]
    search_fields = ["user__phone_number", "course__title", "authority", "ref_id"]
    readonly_fields = ["authority", "ref_id", "created_at", "paid_at"]
