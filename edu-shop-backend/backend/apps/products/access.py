
def has_course_access(user, course) -> bool:
    if not user or not getattr(user, "is_authenticated", False):
        return False

    if user.is_staff:
        return True

    from apps.orders.models import Order

    return Order.objects.filter(
        user=user, course=course, status=Order.STATUS_PAID
    ).exists()
