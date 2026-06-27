from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views import View
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Course
from .models import Order
from .zarinpal import ZarinpalError, get_payment_redirect_url, request_payment, verify_payment


class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id, is_published=True)

        order = Order.objects.create(
            user=request.user,
            course=course,
            amount=course.price,
            status=Order.STATUS_PENDING,
        )

        callback_url = request.build_absolute_uri("/api/v1/orders/verify/")

        try:
            data = request_payment(
                amount=order.amount,
                description=f"خرید دوره: {course.title}",
                callback_url=callback_url,
                mobile=getattr(request.user, "phone_number", ""),
            )
        except ZarinpalError as exc:
            order.status = Order.STATUS_FAILED
            order.save(update_fields=["status"])
            return Response(
                {"detail": f"خطا در اتصال به درگاه پرداخت: {exc}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        order.authority = data["authority"]
        order.save(update_fields=["authority"])

        return Response(
            {
                "order_id": order.id,
                "payment_url": get_payment_redirect_url(order.authority),
            },
            status=status.HTTP_200_OK,
        )


class VerifyPaymentCallbackView(View):
    def get(self, request):
        authority = request.GET.get("Authority")
        zp_status = request.GET.get("Status")
        frontend_base = settings.FRONTEND_BASE_URL.rstrip("/")

        order = Order.objects.filter(authority=authority).first()
        if not order:
            return HttpResponseRedirect(f"{frontend_base}/payment/result?status=not_found")

        if zp_status != "OK":
            order.status = Order.STATUS_FAILED
            order.save(update_fields=["status"])
            return HttpResponseRedirect(
                f"{frontend_base}/payment/result?status=failed&course={order.course.slug}"
            )

        try:
            data = verify_payment(amount=order.amount, authority=authority)
        except ZarinpalError:
            order.status = Order.STATUS_FAILED
            order.save(update_fields=["status"])
            return HttpResponseRedirect(
                f"{frontend_base}/payment/result?status=failed&course={order.course.slug}"
            )

        if data.get("code") in (100, 101):
            order.status = Order.STATUS_PAID
            order.ref_id = data.get("ref_id")
            order.paid_at = timezone.now()
            order.save(update_fields=["status", "ref_id", "paid_at"])
            return HttpResponseRedirect(
                f"{frontend_base}/payment/result?status=success&course={order.course.slug}"
            )

        order.status = Order.STATUS_FAILED
        order.save(update_fields=["status"])
        return HttpResponseRedirect(
            f"{frontend_base}/payment/result?status=failed&course={order.course.slug}"
        )
