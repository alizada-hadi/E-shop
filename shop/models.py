from django.db import models
from accounts.models import User



class Category(models.Model):
    category_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name



class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    countInStock = models.DecimalField(max_digits=6, decimal_places=2)
    cover_image  = models.ImageField(upload_to="product/cover", default="product.jpg")
    numOfReviews = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=6, decimal_places=2, default=0)


    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image  = models.ImageField(upload_to="product/images")

    def __str__(self):
        return f"{self.product.name}'s images"

class ProductColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color_hex = models.CharField(max_length=50, null=True, blank=True)


    def __str__(self):
        return f'{self.product} color'


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=150, null=True, blank=True)


    def __str__(self):
        return f'{self.product} color'





class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating  = models.IntegerField()
    comment = models.TextField()
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name}'s reviews by {self.user.username}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentMethod = models.CharField(max_length=200)
    taxPrice = models.DecimalField(max_digits=8, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=8, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=8, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False,null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s order "




class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=20)
    country  = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.order}'s shipping address "


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    image = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return f"{self.order}'s order item"

