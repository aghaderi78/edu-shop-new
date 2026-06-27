import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

app = Celery("config")

# تمام تنظیماتی که با CELERY_ شروع می‌شوند از settings.py خوانده می‌شوند
app.config_from_object("django.conf:settings", namespace="CELERY")

# پیدا کردن خودکار tasks.py در تمام اپ‌های INSTALLED_APPS
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")