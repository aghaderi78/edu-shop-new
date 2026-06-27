from celery import shared_task

from apps.sms.services import get_sms_service


@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def send_otp_sms_task(self, phone_number: str, code: str):
    """
    ارسال پیامک به‌صورت async تا کاربر منتظر پاسخ API نماند.
    در صورت خطا (مثلاً قطعی موقت پنل پیامک)، تا ۳ بار با ۱۰ ثانیه فاصله تلاش مجدد می‌شود.
    """
    service = get_sms_service()
    success = service.send_otp(phone_number, code)

    if not success:
        raise self.retry(exc=Exception("ارسال پیامک OTP ناموفق بود"))

    return success
