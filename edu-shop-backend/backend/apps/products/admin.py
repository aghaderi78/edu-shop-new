
from django.contrib import admin

from .models import Course, Lesson


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ["title", "order", "video_file", "duration_seconds", "is_free_preview"]


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "lessons_count", "is_published", "created_at"]
    list_filter = ["is_published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [LessonInline]


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ["title", "course", "order", "is_free_preview", "duration_seconds"]
    list_filter = ["course", "is_free_preview"]
    search_fields = ["title"]
