"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "../../lib/api";

export default function CompleteProfile() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateProfile({ full_name: fullName });
      router.push("/dashboard");
    } catch (err) {
      setError("خطا در ذخیره اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm mt-10">
      <h1 className="text-xl font-bold mb-4">تکمیل اطلاعات</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="نام شما"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "در حال ذخیره..." : "ثبت نام"}
        </button>
      </form>
    </div>
  );
}
