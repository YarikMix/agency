from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from agency import settings
from app.jwt_helper import create_access_token, get_access_token, get_jwt_payload
from app.models import *
from app.permisions import IsAuthenticated
from app.serializers import *

access_token_lifetime = settings.JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()


@api_view(["GET"])
def get_flats(request):
    flats = Flat.objects.all()

    serializer = FlatSerializer(flats, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_flat(request, flat_id):
    flats = Flat.objects.get(pk=flat_id)

    serializer = FlatSerializer(flats)

    return Response(serializer.data)


@api_view(["GET"])
def get_mortgages(request):
    mortgages = Mortgage.objects.all()

    serializer = MortgageSerializer(mortgages, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_mortgage(request, mortgage_id):
    mortgage = Mortgage.objects.get(pk=mortgage_id)

    serializer = MortgageSerializer(mortgage)

    return Response(serializer.data)


@api_view(["POST"])
def login(request):
    serializer = UserLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(**serializer.data)
    if user is None:
        message = {"message": "invalid credentials"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    access_token = create_access_token(user.id)

    serializer = UserSerializer(
        user,
        context={
            "access_token": access_token
        }
    )

    response = Response(serializer.data, status=status.HTTP_201_CREATED)

    response.set_cookie('access_token', access_token, httponly=True, expires=access_token_lifetime)

    return response


@api_view(["POST"])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_409_CONFLICT)

    user = serializer.save()

    access_token = create_access_token(user.id)

    message = {
        'message': 'User registered successfully',
        'user_id': user.id
    }

    response = Response(message, status=status.HTTP_201_CREATED)

    response.set_cookie('access_token', access_token, httponly=True, expires=access_token_lifetime)

    return response


@api_view(["POST"])
def check(request):
    token = get_access_token(request)

    if token is None:
        message = {"message": "Token is not found"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    payload = get_jwt_payload(token)
    user_id = payload["user_id"]

    user = CustomUser.objects.get(pk=user_id)
    serializer = UserSerializer(user)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    response = Response(status=status.HTTP_200_OK)

    response.delete_cookie('access_token')

    return response
