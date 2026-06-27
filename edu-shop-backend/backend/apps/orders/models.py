
from django.conf import settings
from django.db import models


class Order(models.Model):
    """
    هر بار که کاربر روی «خرید» می‌زند، یک Order با status=pending ساخته می‌شود.
    بعد از verify موفق زرین‌پال، status می‌شود paid و همین رکورد به‌عنوان
    «ثبت‌نام» (Enrollment) کاربر در دوره در نظر گرفته می‌شود.
    """

    STATUS_PENDING = "pending"
    STATUS_PAID = "paid"
    STATUS_FAILED = "failed"

    STATUS_CHOICES = [
        (STATUS_PENDING, "در انتظار پرداخت"),
        (STATUS_PAID, "پرداخت‌شده"),
        (STATUS_FAILED, "ناموفق"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name="کاربر",
    )
    course = models.ForeignKey(
        "products.Course",
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name="دوره",
    )
    amount = models.PositiveIntegerField(verbose_name="مبلغ (تومان)")
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING, verbose_name="وضعیت"
    )
    authority = models.CharField(
        max_length=64, blank=True, null=True, unique=True, verbose_name="Authority زرین‌پال"
    )
    ref_id = models.CharField(max_length=64, blank=True, null=True, verbose_name="کد رهگیری (ref_id)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ساخت")
    paid_at = models.DateTimeField(blank=True, null=True, verbose_name="تاریخ پرداخت")

    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "سفارش‌ها"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.course} - {self.get_status_display()}"
