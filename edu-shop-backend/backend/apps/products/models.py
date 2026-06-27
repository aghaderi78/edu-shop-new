
from django.db import models
from django.utils.text import slugify


class Course(models.Model):
    title = models.CharField(max_length=200, verbose_name="عنوان دوره")
    slug = models.SlugField(
        max_length=220, unique=True, blank=True, allow_unicode=True, verbose_name="نشانی (slug)"
    )
    description = models.TextField(verbose_name="توضیحات", blank=True)
    thumbnail = models.ImageField(
        upload_to="courses/thumbnails/", blank=True, null=True, verbose_name="تصویر کاور"
    )
    price = models.PositiveIntegerField(default=0, verbose_name="قیمت (تومان)")
    is_published = models.BooleanField(default=False, verbose_name="منتشر شده")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ساخت")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="آخرین ویرایش")

    class Meta:
        verbose_name = "دوره"
        verbose_name_plural = "دوره‌ها"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    @property
    def lessons_count(self):
        return self.lessons.count()

    @property
    def total_duration_seconds(self):
        return sum(self.lessons.values_list("duration_seconds", flat=True))


class Lesson(models.Model):
    course = models.ForeignKey(
        Course, related_name="lessons", on_delete=models.CASCADE, verbose_name="دوره"
    )
    title = models.CharField(max_length=200, verbose_name="عنوان درس")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب نمایش")
    video_file = models.FileField(
        upload_to="courses/raw_videos/",
        blank=True,
        null=True,
        verbose_name="فایل ویدیو (خام)",
        help_text="فعلاً آپلود خام. در قدم بعدی به HLS رمزنگاری‌شده تبدیل می‌شود.",
    )
    duration_seconds = models.PositiveIntegerField(default=0, verbose_name="مدت زمان (ثانیه)")
    is_free_preview = models.BooleanField(
        default=False, verbose_name="پیش‌نمایش رایگان (بدون نیاز به خرید)"
    )

    class Meta:
        verbose_name = "درس"
        verbose_name_plural = "درس‌ها"
        ordering = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - {self.title}"
