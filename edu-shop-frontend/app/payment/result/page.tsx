
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentResultContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const course = params.get("course");
  const isSuccess = status === "success";

  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="text-2xl font-bold">
        {isSuccess ? "پرداخت موفق بود" : "پرداخت ناموفق بود"}
      </h1>
      <p className="mt-2 text-[var(--color-muted)]">
        {isSuccess
          ? "دوره برات فعال شد، می‌تونی ویدیوها رو ببینی."
          : "اگه پولی از حسابت کم شده، نگران نباش و دوباره تلاش کن یا با پشتیبانی تماس بگیر."}
      </p>
      {course && (
        <Link
          href={`/courses/${course}`}
          className="mt-6 inline-block rounded-lg bg-[var(--color-primary)] px-6 py-2.5 font-medium text-white"
        >
          رفتن به صفحه‌ی دوره
        </Link>
      )}
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultContent />
    </Suspense>
  );
}
