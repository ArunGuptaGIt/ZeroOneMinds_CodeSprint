from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from . import models
from . import serializers

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def UserSignup(request):
    serializer = serializers.UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status= 201)
    return Response(serializer.errors,status = 400)

@api_view(['POST'])
def StorageMethods(request):
    if request.method == "POST":
        serializer = serializers.StorageSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,)
