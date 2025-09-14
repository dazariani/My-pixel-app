from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class UserProfile(AbstractUser):
    avatar = models.ImageField(
        upload_to="images/user_avatars/",
        blank=True,
        default="images/user_avatars/default.png",
    )
    groups = models.ManyToManyField(
        Group,
        verbose_name="groups",
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        related_name="userprofile_groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name="user permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        related_name="userprofile_permissions",
    )

    def __str__(self):
        return self.username


class Photo(models.Model):
    img_id = models.CharField(max_length=30, unique=True)
    link_small = models.URLField(max_length=200, blank=True, null=True)
    link_medium = models.URLField(max_length=200, blank=True, null=True)
    link_large = models.URLField(max_length=200, blank=True, null=True)
    link_original = models.URLField(max_length=200, blank=True, null=True)
    author = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="photo"
    )
    alt = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.alt} by {self.author}"


class Collection(models.Model):
    title = models.CharField(max_length=50)
    photos = models.ManyToManyField(Photo, related_name="collection", blank=True)
    author = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="collection"
    )

    def __str__(self):
        return self.title
