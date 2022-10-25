from datetime import datetime
from locale import currency
from math import prod
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer
from .models import (
     Category,  
     Product, 
     Order, 
     OrderItem, 
     ProductImage, 
     ShippingAddress, 
     ProductColor, 
     ProductSize,
     Review
)

from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings



stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['GET'])
def category_list(request):
    query = request.query_params.get('keyword')
    print(f"hi this is m yquery {query}")
    categories = Category.objects.all().order_by('-created_at')
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_category(request):
    data = request.data
    category_name = data["name"]
    category = Category.objects.create(category_name=category_name)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_category(request, id):
    data = request.data
    category = Category.objects.get(id=id)
    category_name = data["name"]
    category.category_name = category_name
    category.save()
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_category(request, id):
    category = Category.objects.get(id=id)
    category.delete()
    return Response({"message" : f"category {category} removed"})


# ! product views

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request, *args, **kwargs):


    user = request.user
    data = request.data

    category = Category.objects.get(id=data['category'])
    name = data['name']
    brand = data['brand']
    description = data['description']
    price = data['price']
    countInStock = data['countInStock']
    cover_image = request.FILES.get("cover_image")


    colorLength = data["colorLength"]
    sizeLength = data["sizeLength"]
    imageLength = data["imageLength"]

    colorLength = int(colorLength)
    sizeLength = int(sizeLength)
    imageLength = int(imageLength)

    product = Product.objects.create(
        category=category, 
        owner=user,
        name=name,
        brand=brand, 
        description=description, 
        price=price, 
        countInStock=countInStock,
        cover_image=cover_image
    )

    for i in range(colorLength):
        color = "productColors." + f"{i}."+"color_hex"
        color_hex = data[color]
        ProductColor.objects.create(
            product=product,
            color_hex = color_hex
        )

    for j in range(sizeLength):
        s = "productSizes." + f"{j}." + "size"
        size = data[s]
        ProductSize.objects.create(
            product=product,
            size=size
        )

    for k in range(imageLength):
        img = "selectedImages." + f"{k}"
        image = data[img]
        ProductImage.objects.create(
            product=product,
            image=image
        )

    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return Response({"message" : "Product removed successfully "})


# ! order views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    paymentMethod = data['paymentMethod']
    shippingPrice = data['shippingPrice']
    taxPrice = data['taxPrice']
    totalPrice = data['totalPrice']
    address = data['shippingAddress']['address']
    city = data['shippingAddress']['city']
    postalCode = data['shippingAddress']['postalCode']
    country = data['shippingAddress']['country']
    if orderItems and len(orderItems) == 0:
        return Response({"message" : "No order items found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1- create the order
        order = Order.objects.create(
            user=user,
            paymentMethod=paymentMethod,
            taxPrice=taxPrice,
            shippingPrice=shippingPrice,
            totalPrice=totalPrice
        )
        # 2- create the shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=address,
            city=city, 
            postalCode=postalCode,
            country=country,
        )

        # 3- create the order items

        for i in orderItems:
            product = Product.objects.get(id=i['id'])
            item = OrderItem.objects.create(
                product=product, 
                order=order,
                name=product.name,
                qty=i['quantity'],
                price=i['price'],
                image = product.cover_image.url
            )
    
        serializer = OrderSerializer(order, many=False)

        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def order_views(request):
    orders = Order.objects.exclude(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, id):
    user = request.user
    order = Order.objects.get(id=id)
    if user.is_staff or user == order.user:
        serializer = OrderSerializer(order, many=False)
    
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order(request,id):
    order = Order.objects.get(id=id)
    order.is_paid = True
    order.paid_at = datetime.now()
    
    order.save()
    serailizer = OrderSerializer(order, many=False)
    return Response(serailizer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_as_delivered(request,id):
    order = Order.objects.get(id=id)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    
    order.save()
    serailizer = OrderSerializer(order, many=False)
    return Response(serailizer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def payment_intent(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount =1000,
        currency = 'usd',
        payment_method_types=['card'],
        receipt_email='test@example.com'
    )

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    name = data['name']
    amount = data["amount"]
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    customer_data = stripe.Customer.list(email=email).data
    if len(customer_data) == 0:
        customer = stripe.Customer.create(
        name=name,email=email, payment_method=payment_method_id)

    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."
    
    stripe.PaymentIntent.create(
        customer=customer,
        payment_method = payment_method_id,
        currency = 'USD',
        amount = int(float(amount)),
        confirm=True
    )
     
    return Response(status=status.HTTP_200_OK, 
      data={
        'message': 'Success', 
        'data': {'customer_id': customer.id, 'extra_msg' : extra_msg, "email" : email}
      }   
    )  



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_order_view(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, id):
    order = Order.objects.get(id=id)
    order.delete()

    return Response({"message" : "Order deleted successfully "})



# ! create reviews for product
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, id):
    user = request.user
    data = request.data
    product = Product.objects.get(id=id)

    # check if user already reviewed the product

    is_reviewed = product.review_set.filter(user=user).exists()
    if is_reviewed:
        return Response({
            "message" : "Product already reviewed ", 
        },status=status.HTTP_400_BAD_REQUEST)
    
    # check if no rating added

    elif data['rating'] == 0:
        return Response({
            "message" : "Please select a rating "
        }, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user, 
            product=product, 
            name = user.first_name,
            rating=data['rating'],
            comment=data["comment"]
        )

        reviews = product.review_set.all()
        product.numOfReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({"message" : 'Review added'}, status=status.HTTP_200_OK)