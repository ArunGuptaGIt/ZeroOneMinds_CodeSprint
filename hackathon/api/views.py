from rest_framework.decorators import api_view,parser_classes,permission_classes
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.db import transaction


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
            return Response(serializer.data,status=200)
        return Response(serializer.errors,status=400)


@api_view(['POST'])
def GetItems(request):
    serializer = serializers.EmailSerializer(data = request.data)
    if serializer.is_valid():
        items = models.Storage.objects.filter(
            Q(email = serializer.validated_data['email']) |
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
            
@api_view(['PUT','DELETE'])
def UpdateDeleteItem(request,item_id):
    if request.method == 'PUT':
        if item_id != None:
            try:
                item = models.Storage.objects.get(id = item_id)
            except models.Storage.DoesNotExist:
                return Response({"message" : "The item does not exist"},status=404)
            
            serializer = serializers.StorageSerializer(item,data = request.data,partial = True)
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
            

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def BuyProduct(request):
    buyer_email = request.data.get('buyer_email')
    seller_email = request.data.get('seller_email')
    item = request.data.get('item')
    count = int(request.data.get('count', 0))

    if not (buyer_email and seller_email and item and count > 0):
        return Response({"error": "All fields are required and count must be positive."}, status=400)

    try:
        seller_product = models.Storage.objects.get(email=seller_email, item=item)
    except models.Storage.DoesNotExist:
        return Response({"error": "Seller does not have this item."}, status=404)

    if seller_product.count < count:
        return Response({"error": "Seller does not have enough items in stock."}, status=400)

    try:
        buyer = models.User.objects.get(email=buyer_email)
        seller = models.User.objects.get(email=seller_email)
    except models.User.DoesNotExist:
        return Response({"error": "Buyer or seller does not exist."}, status=404)

    total_price = count * seller_product.price

    if buyer.price < total_price:
        return Response({"error": "Buyer does not have enough balance."}, status=400)

    with transaction.atomic():
        seller_product.count -= count
        seller_product.save()

        buyer_product, created = models.Storage.objects.get_or_create(
            email=buyer_email,
            item=item,
            defaults={
                'count': count,
                'weightOfEachPacket': seller_product.weightOfEachPacket,
                'description': seller_product.description,
                'type': buyer.type,
                'item_photo': seller_product.item_photo,
                'rating': 0.0,
                'price': seller_product.price,
            }
        )

        if not created:
            buyer_product.count += count
            buyer_product.save()

        buyer.price -= total_price
        seller.price += total_price

        buyer.save()
        seller.save()

    return Response({
        "message": "Purchase successful.",
        "total_price": total_price,
        "buyer_remaining_balance": buyer.price
    }, status=200)


@api_view(['POST'])
@parser_classes([JSONParser])
def UserDashboardInfo(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=400)

    try:
        user = models.User.objects.get(email=email)
    except models.User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

    # Get user's products
    user_products = models.Storage.objects.filter(email=email)

    # Total products listed
    total_products = user_products.count()

    # Revenue is from User model
    revenue = user.price

    # Low stock products (count < 10)
    low_stock = user_products.filter(count__lt=10)

    low_stock_serialized = serializers.StorageSerializer(low_stock, many=True).data

    data =         {
        "email": user.email,
        "revenue": revenue,
        "total_products": total_products,
        "low_stock_products": low_stock_serialized
    }
    
    print(data)

    return Response({
        "email": user.email,
        "revenue": revenue,
        "total_products": total_products,
        "low_stock_products": low_stock_serialized
    }, status=200)


@api_view(['POST'])
@parser_classes([JSONParser])
def UserDashboardInfo(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=400)

    try:
        user = models.User.objects.get(email=email)
    except models.User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

    # Get user's products
    user_products = models.Storage.objects.filter(email=email)

    # Total products listed
    total_products = user_products.count()

    # Revenue is from User model
    revenue = user.price

    # Low stock products (count < 10)
    low_stock = user_products.filter(count__lt=10)

    low_stock_serialized = serializers.StorageSerializer(low_stock, many=True).data

    return Response({
        "email": user.email,
        "revenue": revenue,
        "total_products": total_products,
        "low_stock_products": low_stock_serialized
    }, status=200)

