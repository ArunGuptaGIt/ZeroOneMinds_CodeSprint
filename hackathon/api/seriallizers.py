from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    passwor1 = serializers.CharField(write_only = True)
    image_for_verification = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = models.User
        fields = [
            'first_name', 'last_name', 'password', 'password1',
            'phoneNumber', 'email', 'type', 'verification',
            'location', 'image_for_verification'
        ]

    def validate(self, attrs):
        if (attrs.get('password') != attrs.get('password1')):
            raise serializers.ValidationError({"message" : "password do not match"})
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password1")
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



