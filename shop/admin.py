from django.contrib import admin
from .models import Category, Product, ProductImage, Order, OrderItem, ShippingAddress, ProductSize, ProductColor, Review


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(ProductColor)
admin.site.register(ProductSize)
admin.site.register(Review)