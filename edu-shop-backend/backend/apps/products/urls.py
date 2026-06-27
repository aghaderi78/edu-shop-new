
from django.urls import path

from .views import CourseDetailView, CourseListView

urlpatterns = [
    path("", CourseListView.as_view(), name="course-list"),
    path("<str:slug>/", CourseDetailView.as_view(), name="course-detail"),
]
