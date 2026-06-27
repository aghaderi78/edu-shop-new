"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "همه دوره‌ها", href: "/", icon: "📚" },
  { label: "برنامه‌نویسی", href: "/cat/programming", icon: "💻" },
  { label: "هوش مصنوعی", href: "/cat/ai", icon: "🤖" },
  { label: "زبان‌شناسی", href: "/cat/language", icon: "🌐" },
  { label: "دوره‌های من", href: "/my-courses", icon: "🎓" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "176px",
        flexShrink: 0,
        background: "var(--color-sidebar-bg)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        position: "relative",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, left: 0,
        height: "3px",
        background: "linear-gradient(90deg, var(--color-primary-mid), var(--color-gold))",
      }} />

      <p style={{
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "var(--color-muted)",
        letterSpacing: "0.06em",
        padding: "0 10px",
        marginBottom: "10px",
        marginTop: "8px",
        textTransform: "uppercase",
      }}>
        دسته‌بندی‌ها
      </p>

      {NAV.map((item, i) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`animate-slide-in delay-${i + 1}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: active ? 700 : 500,
              color: active ? "var(--color-sidebar-active)" : "var(--color-sidebar-text)",
              background: active
                ? "rgba(240,217,138,0.12)"
                : "transparent",
              borderRight: active
                ? "3px solid var(--color-gold)"
                : "3px solid transparent",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--color-sidebar-text)";
              }
            }}
          >
            <span style={{ fontSize: "1rem" }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}

      {/* bottom section */}
      <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link
          href="/support"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          <span>💬</span> پشتیبانی
        </Link>
      </div>
    </aside>
  );
}
