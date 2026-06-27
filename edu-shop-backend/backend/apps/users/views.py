from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .otp import create_otp, verify_otp
from .serializers import RequestOTPSerializer, VerifyOTPSerializer
import uuid


class RequestOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = RequestOTPSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        phone = s.validated_data["phone_number"]
        otp = create_otp(phone)

        print("OTP:", otp.code)  # برای تست

        return Response({"detail": "کد ارسال شد"}, status=200)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = VerifyOTPSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        phone = s.validated_data["phone_number"]
        code = s.validated_data["code"]

        if not verify_otp(phone, code):
            return Response({"detail": "کد اشتباه است"}, status=400)

        user, created = User.objects.get_or_create(phone_number=phone)

        # ساخت username اگر وجود نداشت
        if created or not user.username:
            user.username = f"user_{uuid.uuid4().hex[:8]}"
            user.is_phone_verified = True
            user.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "created": created,
            },
            status=200,
        )


class CompleteProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        full_name = request.data.get("full_name")

        if full_name:
            user.first_name = full_name
            user.save()

        return Response({"detail": "ok"}, status=200)