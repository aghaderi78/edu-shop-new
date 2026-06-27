
"use client";

import { useState } from "react";

const faqs = [
  {
    q: "بعد از خرید چطور به ویدیوها دسترسی پیدا می‌کنم؟",
    a: "بلافاصله بعد از پرداخت موفق، دوره برای حساب کاربری‌تون فعال می‌شه و می‌تونید همون لحظه ویدیوها رو ببینید.",
  },
  {
    q: "روش پرداخت چیه؟",
    a: "پرداخت از طریق درگاه امن زرین‌پال انجام می‌شه.",
  },
  {
    q: "اگه پرداختم ناموفق بود ولی پول از حسابم کم شد چی؟",
    a: "نگران نباشید، طی ۷۲ ساعت به حسابتون برمی‌گرده. اگه برنگشت، با پشتیبانی تماس بگیرید.",
  },
  {
    q: "آیا امکان دیدن پیش‌نمایش رایگان دوره هست؟",
    a: "بله، بعضی از درس‌ها به‌صورت پیش‌نمایش رایگان و بدون نیاز به خرید قابل مشاهده‌ان.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-4 py-3 text-right text-sm font-medium"
            >
              <span>{item.q}</span>
              <span className="text-[var(--color-muted)]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="px-4 pb-3 text-sm text-[var(--color-muted)]">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
