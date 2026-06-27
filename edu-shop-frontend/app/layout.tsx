
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "آکادمی پایتون",
  description: "دوره‌های آموزشی ویدیویی با دسترسی بعد از خرید",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 bg-[var(--color-bg)] px-6 py-8">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
