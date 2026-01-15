from rest_framework import serializers 
from .models import Cart, CartItem, Order, Orderitem, Product, ShippingInfo 


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        elif obj.image:
            return obj.image.url
        return None


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    sub_total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem 
        fields = ["id", "product", "quantity", "sub_total"]

    
    def get_sub_total(self, cartitem):
        total = cartitem.product.price * cartitem.quantity 
        return total



class CartSerializer(serializers.ModelSerializer):
    cartitems = CartItemSerializer(read_only=True, many=True)
    cart_total = serializers.SerializerMethodField()
    class Meta:
        model = Cart 
        fields = ["id", "cart_code", "cartitems", "cart_total"]

    def get_cart_total(self, cart):
        items = cart.cartitems.all()
        total = sum([item.quantity * item.product.price for item in items])
        return total


class ShippingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInfo
        exclude = ['user']



class OrderitemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Orderitem
        fields = ["id", "product", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    orderitems = OrderitemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ["id", "reference", "sku", "total_amount", "status", "orderitems", "created_at", "updated_at"]
        