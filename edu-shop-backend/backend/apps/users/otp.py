import random
from datetime import timedelta

from django.utils import timezone

from .models import OTPCode

OTP_LENGTH = 5
OTP_EXPIRE_MINUTES = 2


def generate_otp_code() -> str:
    return "".join(random.choices("0123456789", k=OTP_LENGTH))


def create_otp(phone_number: str) -> OTPCode:
    """
    یک کد جدید می‌سازد و کدهای قبلیِ استفاده‌نشده‌ی همان شماره را باطل می‌کند
    تا کاربر همیشه فقط آخرین کد را معتبر بداند.
    """
    OTPCode.objects.filter(phone_number=phone_number, is_used=False).update(
        is_used=True
    )

    code = generate_otp_code()
    expires_at = timezone.now() + timedelta(minutes=OTP_EXPIRE_MINUTES)

    return OTPCode.objects.create(
        phone_number=phone_number, code=code, expires_at=expires_at
    )


def verify_otp(phone_number: str, code: str) -> bool:
    otp = (
        OTPCode.objects.filter(phone_number=phone_number, code=code, is_used=False)
        .order_by("-created_at")
        .first()
    )

    if not otp:
        return False

    if otp.expires_at < timezone.now():
        return False

    otp.is_used = True
    otp.save(update_fields=["is_used"])
    return True
