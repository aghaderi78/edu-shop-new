
from rest_framework import serializers

from .access import has_course_access
from .models import Course, Lesson


class LessonSerializer(serializers.ModelSerializer):
    locked = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "order",
            "duration_seconds",
            "is_free_preview",
            "locked",
            "video_url",
        ]

    def get_locked(self, obj) -> bool:
        if obj.is_free_preview:
            return False
        request = self.context.get("request")
        user = getattr(request, "user", None)
        return not has_course_access(user, obj.course)

    def get_video_url(self, obj):
        if self.get_locked(obj) or not obj.video_file:
            return None
        request = self.context.get("request")
        url = obj.video_file.url
        return request.build_absolute_uri(url) if request else url


class CourseListSerializer(serializers.ModelSerializer):
    lessons_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "slug", "thumbnail", "price", "lessons_count"]


class CourseDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    has_access = serializers.SerializerMethodField()
    lessons_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "thumbnail",
            "price",
            "lessons_count",
            "lessons",
            "has_access",
        ]

    def get_has_access(self, obj) -> bool:
        request = self.context.get("request")
        user = getattr(request, "user", None)
        return has_course_access(user, obj)
