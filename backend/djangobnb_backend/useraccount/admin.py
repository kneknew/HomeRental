from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_staff')  # Đảm bảo rằng thuộc tính đúng là is_staff

admin.site.register(User, UserAdmin)  # Đăng ký mô hình User với UserAdmin
