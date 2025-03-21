from django.urls import path

from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from . import api


urlpatterns = [
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('myreservations/', api.reservations_list, name='api_reservations_list'),
    path('<uuid:pk>/', api.landlord_detail, name='api_landlrod_detail'),
    # path('api/check-staff-status/', check_staff_status, name='check-staff-status'),
]

# def check_staff_status(request):
#     user = request.user
#     if user.is_authenticated and user.is_staff:
#         return JsonResponse({'is_staff': True})
#     else:
#         return JsonResponse({'is_staff': False})