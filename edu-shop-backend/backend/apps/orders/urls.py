from django.urls import path
from .views import CreatePaymentView, VerifyPaymentCallbackView

urlpatterns = [
    path("pay/<int:course_id>/", CreatePaymentView.as_view(), name="order-pay"),
    path("verify/", VerifyPaymentCallbackView.as_view(), name="order-verify"),
]