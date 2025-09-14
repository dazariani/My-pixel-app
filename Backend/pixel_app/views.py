from rest_framework import viewsets
from .models import Photo, Collection, UserProfile
from .serializers import (
    PhotoSerializer,
    CollectionSerializer,
    CustomUserSerializer,
    MyTokenObtainPairSerializer,
)
from .permissions import ObjLevelPermission, ModelLevelPermission
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [
        ObjLevelPermission,
        ModelLevelPermission,
    ]

    def create(self, request, *args, **kwargs):
        img_id = request.data.get("img_id")
        if img_id:
            try:
                photo = self.queryset.get(img_id=img_id)
                serializer = self.get_serializer(photo)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Photo.DoesNotExist:
                pass
        return super().create(request, *args, **kwargs)


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [ModelLevelPermission, ObjLevelPermission]


# MyTokenObtainPairView
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Current user
class UserView(APIView):
    def get(self, request):
        if not request.user.id:
            raise AuthenticationFailed("Unauthenticated :(")

        user = UserProfile.objects.filter(id=request.user.id).first()
        print(request.user.id)

        serializer = CustomUserSerializer(user)

        return Response(serializer.data)


# Register
class Register(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            user = serializer.save()
        else:
            return Response(status=status.HTTP_409_CONFLICT)

        # # Add m2m field
        # if request.data.get("bookmarked"):
        #     for movie_id in request.data.get("bookmarked"):
        #         try:
        #             movie = Movie.objects.get(id=movie_id)
        #             print(movie)
        #             user.bookmarked.add(movie)
        #             print(user)
        #         except Movie.DoesNotExist:
        #             raise NOT_FOUND()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
