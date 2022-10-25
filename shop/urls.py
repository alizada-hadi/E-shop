from django.urls import path
from . import views

urlpatterns  = [
    path("category/list/", views.category_list, name="category_list"),
    path("category/create/", views.create_category, name="create_category"),
    path("category/update/<str:id>/", views.update_category, name="update_category"),
    path("category/delete/<str:id>/", views.delete_category, name="delete_category"),

    # ! product routes
    path("product/list/", views.get_products, name="products"),
    path("product/detail/<str:id>/", views.product_detail, name="product_detail"),
    path("product/create/", views.create_product, name="product_create"),

    path("product/<str:id>/delete/", views.deleteProduct, name="remove_product"),


    # ! order routes
    path("order/create/", views.create_order, name="create_order"),
    path("order/list/", views.order_views, name="order_list"),
    path("order/detail/<str:id>/", views.order_detail, name="order_detail"),
    path("order/pay/<str:id>/", views.update_order, name="update_order"),
    path("order/deliver/<str:id>/", views.update_order_as_delivered, name="deliver"),

    path("payment/intent/", views.payment_intent, name="payment_intent"),
    path("payment/info/", views.save_stripe_info, name="payment_info"),

    path("orders/mine/", views.my_order_view, name="order_mine"),

    path("order/<str:id>/delete/", views.delete_order, name="delete_order"),


    # ! review
    path("product/<str:id>/review/", views.create_review, name="create_review")



]