from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q

from agency import settings
from app.jwt_helper import create_access_token, get_access_token, get_jwt_payload
from app.permisions import IsAuthenticated
from app.serializers import *
from app.utils import identity_user

access_token_lifetime = settings.JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()


@api_view(["GET"])
def get_flats(request):
    flats = Flat.objects.all()

    rooms = request.GET.get("rooms", "-1")

    if rooms != "-1":
        flats = flats.filter(rooms=rooms)

    serializer = FlatSerializer(flats, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_flat(request, flat_id):
    flats = Flat.objects.get(pk=flat_id)

    serializer = FlatSerializer(flats)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_flat(request):
    serializer = FlatSerializer(data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        flat = Flat.objects.last()
        flat.renter = identity_user(request)
        flat.save()

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_deals(request):
    user = identity_user(request)
    deals = Deal.objects.filter(Q(user=user) | Q(renter=user))

    serializer = DealSerializer(deals, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_deal(request, deal_id):
    deal = Deal.objects.get(pk=deal_id)

    serializer = DealSerializer(deal)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_deal(request):
    deal = Deal.objects.create()
    deal.user = identity_user(request)
    deal.renter = CustomUser.objects.get(pk=request.data["renter"])
    deal.flat = Flat.objects.get(pk=request.data["flat"])
    deal.date = timezone.now()
    deal.save()

    serializer = DealSerializer(deal)

    return Response(serializer.data, status=200)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_deal_status(request, deal_id):
    deal = Deal.objects.get(pk=deal_id)

    serializer = DealSerializer(deal, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order(request):
    order = Order.objects.create()
    order.user = identity_user(request)
    order.date = timezone.now()
    order.save()

    serializer = OrderSerializer(order, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders(request):
    user = identity_user(request)
    orders = Order.objects.filter(user=user)

    serializer = OrderSerializer(orders, many=True)

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


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = identity_user(request)

    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=200)