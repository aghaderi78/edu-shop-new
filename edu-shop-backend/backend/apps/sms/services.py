"""
لایه‌ی abstract برای ارسال پیامک.

هدف: اگر روزی پنل پیامک عوض شد (مثلاً از کاوه‌نگار به ملی‌پیامک)،
فقط کافیست یک کلاس جدید اینجا بنویسی و خروجی get_sms_service() را عوض کنی؛
هیچ‌جای دیگر پروژه (views، tasks و ...) دست نمی‌خورد.
"""

import logging
from abc import ABC, abstractmethod

from django.conf import settings

logger = logging.getLogger(__name__)


class BaseSMSService(ABC):
    @abstractmethod
    def send_otp(self, phone_number: str, code: str) -> bool:
        """ارسال کد یک‌بارمصرف از طریق پترن/قالب پیامک"""
        raise NotImplementedError

    @abstractmethod
    def send_text(self, phone_number: str, text: str) -> bool:
        """ارسال پیامک متنی ساده (مثلاً اعلان فعال‌سازی دوره)"""
        raise NotImplementedError


class KavenegarSMSService(BaseSMSService):
    def __init__(self):
        from kavenegar import KavenegarAPI

        self.api = KavenegarAPI(settings.KAVENEGAR_API_KEY)

    def send_otp(self, phone_number: str, code: str) -> bool:
        try:
            self.api.verify_lookup(
                {
                    "receptor": phone_number,
                    "token": code,
                    "template": settings.KAVENEGAR_OTP_TEMPLATE,
                }
            )
            return True
        except Exception as exc:  # noqa: BLE001
            logger.error("خطا در ارسال OTP از طریق کاوه‌نگار: %s", exc)
            return False

    def send_text(self, phone_number: str, text: str) -> bool:
        try:
            self.api.sms_send(
                {
                    "receptor": phone_number,
                    "message": text,
                }
            )
            return True
        except Exception as exc:  # noqa: BLE001
            logger.error("خطا در ارسال پیامک از طریق کاوه‌نگار: %s", exc)
            return False


class ConsoleSMSService(BaseSMSService):
    """
    برای توسعه‌ی محلی، بدون نیاز به اعتبار واقعی کاوه‌نگار.
    کد را در لاگ/کنسول چاپ می‌کند تا بتوانی تست کنی.
    """

    def send_otp(self, phone_number: str, code: str) -> bool:
        logger.warning("[SMS-DEV] OTP برای %s: %s", phone_number, code)
        return True

    def send_text(self, phone_number: str, text: str) -> bool:
        logger.warning("[SMS-DEV] پیامک برای %s: %s", phone_number, text)
        return True


def get_sms_service() -> BaseSMSService:
    """
    نقطه‌ی مرکزی برای گرفتن سرویس پیامک فعال پروژه.
    اگر KAVENEGAR_API_KEY ست نشده باشد (مثلاً در توسعه)، از حالت کنسول استفاده می‌کند.
    """
    if settings.KAVENEGAR_API_KEY:
        return KavenegarSMSService()
    return ConsoleSMSService()