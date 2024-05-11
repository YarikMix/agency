from rest_framework import serializers

from app.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email', 'is_renter', "phone")


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'name', "phone")
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            name=validated_data['name'],
            phone=validated_data['phone']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class FlatSerializer(serializers.ModelSerializer):
    renter = UserSerializer()

    class Meta:
        model = Flat
        fields = "__all__"


class DealSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    renter = UserSerializer()
    flat = FlatSerializer()

    class Meta:
        model = Deal
        fields = "__all__"


