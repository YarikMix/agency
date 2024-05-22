from rest_framework import serializers

from app.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


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
    image = serializers.SerializerMethodField()

    def get_image(self, flat):
        return flat.image.url.replace("minio", "localhost", 1)

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


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['date'] = timezone.now()
    #     return representation

    class Meta:
        model = Order
        fields = "__all__"