from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    image_for_verification = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = models.User
        fields = [
            'first_name', 'last_name', 'password',
            'phoneNumber', 'email', 'type', 'verification',
            'location', 'image_for_verification'
        ]

    
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = models.User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Storage
        fields = '__all__'

class FirstNameSerializer(serializers.Serializer):
    first_name = serializers.CharField()



