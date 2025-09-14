from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, Photo, Collection


class CustomUserAdmin(UserAdmin):
    model = UserProfile

    fieldsets = UserAdmin.fieldsets + (("Additional data", {"fields": ("avatar",)}),)

    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password1",
                    "password2",
                    "avatar",
                )
            },
        ),
    )


admin.site.register(UserProfile, CustomUserAdmin)
admin.site.register(Photo)
admin.site.register(Collection)
