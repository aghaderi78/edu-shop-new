
"""
کلاینت سبک برای زرین‌پال (API v4).
مستندات رسمی: https://www.zarinpal.com/docs/paymentGateway/connectToGateway
"""

import requests
from django.conf import settings


class ZarinpalError(Exception):
    """وقتی زرین‌پال خطا برمی‌گرداند یا اتصال برقرار نمی‌شود."""


def _domain() -> str:
    return "sandbox.zarinpal.com" if settings.ZARINPAL_SANDBOX else "payment.zarinpal.com"


def request_payment(amount: int, description: str, callback_url: str, mobile: str = "", email: str = "") -> dict:
    url = f"https://{_domain()}/pg/v4/payment/request.json"
    payload = {
        "merchant_id": settings.ZARINPAL_MERCHANT_ID,
        "amount": amount,
        "currency": settings.ZARINPAL_CURRENCY,
        "callback_url": callback_url,
        "description": description,
        "metadata": {"mobile": mobile, "email": email},
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        data = response.json()
    except (requests.RequestException, ValueError) as exc:
        raise ZarinpalError(f"اتصال به زرین‌پال برقرار نشد: {exc}") from exc

    if data.get("errors"):
        raise ZarinpalError(data["errors"])

    return data["data"]


def get_payment_redirect_url(authority: str) -> str:
    return f"https://{_domain()}/pg/StartPay/{authority}"


def verify_payment(amount: int, authority: str) -> dict:
    url = f"https://{_domain()}/pg/v4/payment/verify.json"
    payload = {
        "merchant_id": settings.ZARINPAL_MERCHANT_ID,
        "amount": amount,
        "currency": settings.ZARINPAL_CURRENCY,
        "authority": authority,
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        data = response.json()
    except (requests.RequestException, ValueError) as exc:
        raise ZarinpalError(f"اتصال به زرین‌پال برقرار نشد: {exc}") from exc

    if data.get("errors"):
        raise ZarinpalError(data["errors"])

    return data["data"]
