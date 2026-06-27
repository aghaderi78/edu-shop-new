"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestOtp, verifyOtp } from "../../lib/api";
import { saveToken } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestOtp(phone);
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await verifyOtp(phone, code);

      // ذخیره توکن
      saveToken(data.access);

      // 🔥 تصمیم‌گیری مسیر
      if (data.created) {
        router.push("/complete-profile");   // کاربر جدید
      } else {
        router.push("/dashboard");          // کاربر قدیمی
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "کد نامعتبر است");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-xl font-bold">ورود به حساب کاربری</h1>

      {step === "phone" && (
        <form onSubmit={handleRequestOtp} className="flex flex-col gap-3">
          <label className="text-sm text-[var(--color-muted)]">شماره موبایل</label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 outline-none focus:border-[var(--color-primary)]"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 font-medium text-white disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "دریافت کد"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
          <p className="text-sm text-[var(--color-muted)]">
            کد ارسال‌شده به {phone} را وارد کن
          </p>
          <input
            type="text"
            inputMode="numeric"
            placeholder="کد ۵ رقمی"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 outline-none focus:border-[var(--color-primary)]"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 font-medium text-white disabled:opacity-50"
          >
            {loading ? "در حال بررسی..." : "ورود"}
          </button>
          <button
            type="button"
            onClick={() => setStep("phone")}
            className="text-sm text-[var(--color-muted)] underline"
          >
            شماره رو عوض کن
          </button>
        </form>
      )}
    </div>
  );
}