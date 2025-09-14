from rest_framework import serializers
from .models import Photo, Collection, UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class PhotoSerializer(serializers.ModelSerializer):
    # Set current user as author
    author = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), queryset=UserProfile.objects.all()
    )

    class Meta:
        model = Photo
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    photos = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Photo.objects.all(), required=False
    )
    # Set current user as author
    author = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), queryset=UserProfile.objects.all()
    )

    class Meta:
        model = Collection
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:  # If instance is passed, it's an update
            self.fields["title"].required = False
            self.fields["author"].required = False

    def update(self, instance, validated_data):
        user = self.context["request"].user

        # If user is not the author, restrict fields
        if instance.author != user:
            allowed_fields = {"photos"}
            incoming_fields = set(validated_data.keys())
            if not incoming_fields.issubset(allowed_fields):
                raise serializers.ValidationError(
                    "You can only modify photos in a collection you do not own."
                )

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["photos"] = PhotoSerializer(
            instance.photos.all(), many=True
        ).data
        return representation


# My tokenObtain serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username

        return token


# CustomUser serializer
class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "password",
            "avatar",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # print(self.context["request"].data)
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if UserProfile.objects.filter(
            username=self.context["request"].data["username"]
        ).exists():
            raise serializers.ValidationError("User Already exists.")
        else:
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance
