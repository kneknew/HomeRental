import json
from django.http import JsonResponse
from datetime import datetime

from useraccount.serializers import UserDetailSerializer
from .payment import PaymentModel, create_pay_url, create_payment_payos_request, isValidData
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from .forms import PropertyForm
from .models import Property, Reservation
from .serializers import PropertiesListSerializer, PropertiesDetailSerializer, ReservationDetailSerializer, ReservationsListSerializer
from useraccount.models import User
from django.conf import settings

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    #
    # Auth

    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None

    #
    #

    favorites = []
    properties = Property.objects.all()

    #
    # Filter

    is_favorites = request.GET.get('is_favorites', '')
    landlord_id = request.GET.get('landlord_id', '')

    country = request.GET.get('country', '')
    category = request.GET.get('category', '')
    checkin_date = request.GET.get('checkIn', '')
    checkout_date = request.GET.get('checkOut', '')
    bedrooms = request.GET.get('numBedrooms', '')
    guests = request.GET.get('numGuests', '')
    bathrooms = request.GET.get('numBathrooms', '')

    print('country', country)

    if checkin_date and checkout_date:
        exact_matches = Reservation.objects.filter(start_date=checkin_date) | Reservation.objects.filter(end_date=checkout_date)
        overlap_matches = Reservation.objects.filter(start_date__lte=checkout_date, end_date__gte=checkin_date)
        all_matches = []

        for reservation in exact_matches | overlap_matches:
            all_matches.append(reservation.property_id)
        
        properties = properties.exclude(id__in=all_matches)

    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)

    if is_favorites:
        properties = properties.filter(favorited__in=[user])
    
    if guests:
        properties = properties.filter(guests__gte=guests)
    
    if bedrooms:
        properties = properties.filter(bedrooms__gte=bedrooms)
    
    if bathrooms:
        properties = properties.filter(bathrooms__gte=bathrooms)
    
    if country:
        properties = properties.filter(country=country)
    
    if category and category != 'undefined':
        properties = properties.filter(category=category)
    
    #
    # Favorites
        
    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)

    #
    #

    serializer = PropertiesListSerializer(properties, many=True)

    return JsonResponse({
        'data': serializer.data,
        'favorites': favorites
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request, pk):
    property = Property.objects.get(pk=pk)

    serializer = PropertiesDetailSerializer(property, many=False)

    return JsonResponse(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, pk):
    property = Property.objects.get(pk=pk)
    reservations = property.reservations.all()

    serializer = ReservationsListSerializer(reservations, many=True)

    return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'FILES'])
def create_property(request):
    if not request.user.is_staff:
        return JsonResponse({'error': 'You do not have permission to add a property.'}, status=403)
    form = PropertyForm(request.POST, request.FILES)
    
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)



@api_view(['POST'])
def book_property(request, pk):
    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_nights = request.POST.get('number_of_nights', '')
        total_price = request.POST.get('total_price', '')
        guests = request.POST.get('guests', '')

        property = Property.objects.get(pk=pk)

        count = Reservation.objects.count()
        reservation = Reservation.objects.create(
            reservation_code=count+3000+1,
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )
        booking_obj = ReservationDetailSerializer(reservation, many=False)

        user_obj = UserDetailSerializer(request.user, many=False)
    
        request_payment = {
            'amount': total_price,
            'order_code': booking_obj["reservation_code"].value,
            'buyer_name': user_obj["name"].value,
        }
        print('request_payment', request_payment)
        
        payUrl = create_pay_url(request_payment)
        return JsonResponse({'success': True, 'payment_url': payUrl })
    except Exception as e:
        print('Error', e)

        return JsonResponse({'success': False})


@api_view(['POST'])
def toggle_favorite(request, pk):
    property = Property.objects.get(pk=pk)

    if request.user in property.favorited.all():
        property.favorited.remove(request.user)

        return JsonResponse({'is_favorite': False})
    else:
        property.favorited.add(request.user)

        return JsonResponse({'is_favorite': True})
    
    
@api_view(['GET'])
def cancel_reservation(request, reservation_id):
    reservation = Reservation.objects.get(pk=reservation_id)

    reservation.status = 'CANCELLED'
    reservation.save()

    return JsonResponse({'success': True})


@api_view(['POST'])
@authentication_classes([])  # No authentication
@permission_classes([]) 
def payment_webhook(request):
    webhook_data = json.loads(request.body)
 
    # check the signature
    #signature = webhook_data.get('signature', '')
    # is_valid = isValidData(webhook_data, signature, settings.PAYMENT['CHECKSUM_KEY'])
    # if not is_valid:
    #     return JsonResponse({'success': False})


    # Save the payment data
    data = webhook_data.get('data', '')
    order_code = data['orderCode']
    print('order_code', order_code)
    Reservation.objects.filter(reservation_code=order_code).update(status='PAID')
    return JsonResponse({'success': True})
