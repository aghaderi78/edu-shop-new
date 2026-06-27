
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourse, createPayment, CourseDetail } from "../../../lib/api";
import { getToken } from "../../../lib/auth";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [error, setError] = useState("");
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const token = getToken();
    getCourse(slug, token)
      .then(setCourse)
      .catch((err) => setError(err instanceof Error ? err.message : "خطا در بارگذاری دوره"));
  }, [slug]);

  async function handleBuy() {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    if (!course) return;

    setBuying(true);
    setError("");
    try {
      const { payment_url } = await createPayment(course.id, token);
      window.location.href = payment_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "خرید با خطا مواجه شد");
      setBuying(false);
    }
  }

  if (error && !course) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!course) {
    return <p className="text-[var(--color-muted)]">در حال بارگذاری...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{course.lessons_count} درس</p>
      <p className="mt-4 text-[var(--color-muted)]">{course.description}</p>

      {!course.has_access && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <span className="text-lg font-bold text-[var(--color-accent-text)]">
            {course.price.toLocaleString("fa-IR")} تومان
          </span>
          <button
            onClick={handleBuy}
            disabled={buying}
            className="rounded-lg bg-[var(--color-primary)] px-5 py-2.5 font-medium text-white disabled:opacity-50"
          >
            {buying ? "در حال انتقال..." : "خرید دوره"}
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <ul className="mt-6 flex flex-col gap-2">
        {course.lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{lesson.title}</p>
              <p className="text-xs text-[var(--color-muted)]">
                {formatDuration(lesson.duration_seconds)}
              </p>
            </div>

            {lesson.locked ? (
              <span className="text-xs text-[var(--color-muted)]">قفل</span>
            ) : lesson.video_url ? (
              <video controls src={lesson.video_url} className="h-9 w-14 rounded-md bg-black" />
            ) : (
              <span className="text-xs text-[var(--color-muted)]">بدون فایل</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
