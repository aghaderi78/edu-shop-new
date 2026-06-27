from django.urls import path
from .views import RequestOTPView, VerifyOTPView, CompleteProfileAPIView

urlpatterns = [
    path("otp/request/", RequestOTPView.as_view()),
    path("otp/verify/", VerifyOTPView.as_view()),
    path("complete-profile/", CompleteProfileAPIView.as_view()),
]