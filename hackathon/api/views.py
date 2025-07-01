from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth import authenticate

from . import models
from . import serializers

@api_view(['POST'])
@parser_classes([JSONParser,MultiPartParser, FormParser])
def UserSignup(request):
    serializer = serializers.UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status= 201)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors,status = 400)

@api_view(['POST'])
def StorageMethods(request):
    if request.method == "POST":
        serializer = serializers.StorageSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,)


@api_view(['POST'])
def GetItemsForVendors(request):
    serializer = serializers.FirstNameSerializer(data = request.data)
    if serializer.is_valid():
        items = models.Storage.objects.filter(
            Q(first_name = serializer.validated_data['first_name']) |
            Q(type = 1)
        )
        serializer_ = serializers.StorageSerializer(items,many = True)
        return Response(serializer_.data,status=200)
    return Response(serializer.errors,status=400)
            
@api_view(['POST'])
def UserLogin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"detail": "Email and password required."}, status=400)

    user = authenticate(request, email=email, password=password)
    if user is not None:
        # User is valid, serialize and return user data (excluding sensitive info)
        serializer = serializers.UserReadSerializer(user)
        return Response(serializer.data, status=200)
    else:
        return Response({"detail": "Invalid credentials."}, status=401)

@api_view(['POST'])
def GetItemsForFarmers(request):
    serializer = serializers.FirstNameSerializer(data = request.data)
    if serializer.is_valid():
        items = models.Storage.objects.filter(
            Q(first_name = serializer.validated_data['first_name']) |
            Q(type = 0)
        )
        serializer_ = serializers.StorageSerializer(items,many = True)
        return Response(serializer_.data,status=200)
    return Response(serializer.errors,status=400)
            
@api_view(['PUT','DELETE'])
def UpdateDeleteItem(request,item_id):
    if request.method == 'PUT':
        if item_id != None:
            try:
                item = models.Storage.objects.get(id = item_id)
            except models.Storage.DoesNotExist:
                return Response({"message" : "The item does not exist"},status=404)
            
            serializer = serializers.storage_serializer(item,data = request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=200)
            return Response(serializer.errors,status=201)
        return Response({"message" : "venue id requried"})
    if request.method == "DELETE":
        if item_id != None:
            try:
                item = models.Storage.objects.get(id = item_id)
                item.delete()
                return Response({"message" : "item deleted"})
            except models.Storage.DoesNotExist:
                return Response({"message" : "The item does not exist"},status=404)