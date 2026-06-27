from rest_framework import serializers

from .models import User


class RequestOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

    def validate_phone_number(self, value):
        if not (value.isdigit() and len(value) == 11 and value.startswith("09")):
            raise serializers.ValidationError(
                "شماره موبایل باید ۱۱ رقمی باشد و با ۰۹ شروع شود."
            )
        return value


class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    code = serializers.CharField(max_length=6)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "phone_number",
            "first_name",
            "last_name",
            "email",
            "is_phone_verified",
        ]
        read_only_fields = ["id", "phone_number", "is_phone_verified"]
