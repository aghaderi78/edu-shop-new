from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import UserManager


class User(AbstractUser):
    """
    مدل کاربر سفارشی پروژه.
    ورود با phone_number انجام می‌شود.
    username را خودمان تولید می‌کنیم.
    """

    # حذف username پیش‌فرض AbstractUser
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True,
        verbose_name="نام کاربری"
    )

    phone_number = models.CharField(
        max_length=15,
        unique=True,
        verbose_name="شماره موبایل"
    )

    first_name = models.CharField(max_length=50, blank=True, verbose_name="نام")
    last_name = models.CharField(max_length=50, blank=True, verbose_name="نام خانوادگی")
    email = models.EmailField(blank=True, null=True, verbose_name="ایمیل")

    is_phone_verified = models.BooleanField(
        default=False,
        verbose_name="شماره موبایل تأیید شده"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="تاریخ ساخت"
    )

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = "کاربر"
        verbose_name_plural = "کاربران"

    def __str__(self):
        return self.phone_number


class OTPCode(models.Model):
    """
    کد یک‌بارمصرف برای ورود/تأیید شماره موبایل.
    """

    phone_number = models.CharField(max_length=15, db_index=True, verbose_name="شماره موبایل")
    code = models.CharField(max_length=6, verbose_name="کد")
    is_used = models.BooleanField(default=False, verbose_name="استفاده‌شده")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ساخت")
    expires_at = models.DateTimeField(verbose_name="تاریخ انقضا")

    class Meta:
        verbose_name = "کد تأیید"
        verbose_name_plural = "کدهای تأیید"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.phone_number} - {self.code}"