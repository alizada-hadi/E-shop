from rest_framework import serializers
from .models import (
    Category, 
    Product, 
    ProductImage, 
    Order, 
    OrderItem, 
    ShippingAddress,
    ProductColor, 
    ProductSize, 
    Review
    )
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    number_of_products = serializers.SerializerMethodField(read_only=False)
    class Meta:
        model = Category
        fields = [
            'id',
            'category_name',
            'created_at',
            'updated_at',
            'number_of_products'
        ]

    def get_number_of_products(self, obj):
        return obj.product_set.all().count()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = '__all__'


class ReviewSerializer (serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'

    


class ProductSizeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductSize
        fields = '__all__'
    
    



class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(read_only=True)
    colors = serializers.SerializerMethodField(read_only=True)
    sizes = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)
    category = CategorySerializer()
    owner = UserSerializer()
    class Meta:
        model = Product
        fields = [
            'id',
            'category',
            'owner',
            'name',
            'brand',
            'description',
            'price',
            'countInStock',
            'cover_image',
            'numOfReviews',
            'rating',
            'images', 
            'colors',
            'sizes',
            'reviews'
        ]
    def get_images(self, obj):
        images = obj.productimage_set.all()
        serializer = ProductImageSerializer(images, many=True)
        return serializer.data
    
    def get_colors(self, obj):
        colors = obj.productcolor_set.all()
        serializer = ProductColorSerializer(colors, many=True)
        return serializer.data

    def get_sizes(self, obj):
        sizes = obj.productsize_set.all()
        serializer = ProductSizeSerializer(sizes, many=True)
        return serializer.data

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data



class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'




class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=False)
    shippingAddress = serializers.SerializerMethodField(read_only=False)
    user = serializers.SerializerMethodField(read_only=False)
    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingAddress, many=False)
        except:
            address = False

        return address
     

    def get_user(self, obj):
        user=obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data



