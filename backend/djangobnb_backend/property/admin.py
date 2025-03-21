from django.contrib import admin

from .models import Property, Reservation

class PropertyAdmin(admin.ModelAdmin):
    list_display = ( 'title', 'price_per_night', 'bedrooms', 'bathrooms', 'guests', 'country', 'category', 'landlord')
    
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reservation_code', 'property_title', 'property_landlord', 'start_date', 'end_date', 'number_of_nights', 'guests', 'total_price', 'status', 'created_by', 'created_at')
admin.site.register(Property, PropertyAdmin)
admin.site.register(Reservation, ReservationAdmin)