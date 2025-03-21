from rest_framework import serializers

from .models import Property, Reservation

from useraccount.serializers import UserDetailSerializer


class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url',
            'category'
        )


class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)

    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'price_per_night',
            'image_url',
            'bedrooms',
            'bathrooms',
            'guests',
            'landlord',
            # 'country_code',
            'category'
        )


class ReservationsListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True, many=False)
    
    class Meta:
        model = Reservation
        fields = (
            'id', 'start_date', 'end_date', 'number_of_nights', 'status', 'total_price', 'property'
        )

class ReservationDetailSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Reservation
        fields = (
            'id', 'reservation_code', 'start_date', 'end_date', 'number_of_nights', 'status', 'total_price', 'property'
        )