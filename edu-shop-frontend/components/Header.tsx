"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken, clearToken } from "../lib/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getToken());
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogout() {
    clearToken();
    setLoggedIn(false);
    router.push("/");
  }

  const navLinks = [
    { href: "/", label: "خانه" },
    { href: "/#courses", label: "دوره‌ها" },
    { href: "/about", label: "درباره ما" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--color-surface)",
          borderBottom: "1.5px solid var(--color-border)",
          boxShadow: scrolled ? "0 4px 20px rgba(46,61,40,0.10)" : "none",
          transition: "box-shadow 0.25s",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "var(--radius-md)",
                background:
                  "linear-gradient(135deg, var(--color-primary-mid), var(--color-primary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(74,103,65,0.25)",
              }}
            >
              🐍
            </div>
            <div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                آکادمی پایتون
              </span>
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "var(--color-muted)",
                  fontWeight: 500,
                }}
              >
                یادگیری حرفه‌ای
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexGrow: 1,
              justifyContent: "center",
            }}
            className="hd-nav"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.875rem",
                    fontWeight: active ? 700 : 500,
                    color: active
                      ? "var(--color-primary)"
                      : "var(--color-text-soft)",
                    background: active
                      ? "var(--color-primary-tint)"
                      : "transparent",
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <div
            className="hd-search"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--color-surface-2)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "7px 14px",
              fontSize: "0.82rem",
              color: "var(--color-muted)",
              width: "190px",
              cursor: "text",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "0.95rem" }}>🔍</span>
            جستجوی دوره...
          </div>

          {/* Auth */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            {loggedIn ? (
              <>
                <Link
                  href="/my-courses"
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "var(--color-text-soft)",
                    textDecoration: "none",
                    padding: "7px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-surface-2)",
                    border: "1.5px solid var(--color-border)",
                  }}
                >
                  دوره‌هام
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    border: "1.5px solid var(--color-border)",
                    background: "transparent",
                    color: "var(--color-text-soft)",
                    borderRadius: "var(--radius-sm)",
                    padding: "7px 14px",
                    fontSize: "0.83rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontFamily: "inherit",
                  }}
                >
                  خروج
                </button>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  fontSize: "0.83rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  padding: "7px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1.5px solid var(--color-primary-tint)",
                  background: "var(--color-primary-tint)",
                  whiteSpace: "nowrap",
                }}
              >
                ورود
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="hd-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "1rem",
              color: "var(--color-text)",
              display: "none",
              fontFamily: "inherit",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: "var(--color-surface)",
              borderTop: "1px solid var(--color-border)",
              padding: "12px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color:
                    pathname === link.href
                      ? "var(--color-primary)"
                      : "var(--color-text-soft)",
                  background:
                    pathname === link.href
                      ? "var(--color-primary-tint)"
                      : "transparent",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                marginTop: "8px",
                paddingTop: "12px",
                display: "flex",
                gap: "8px",
              }}
            >
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: "0.9rem", fontFamily: "inherit" }}
                >
                  خروج
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "var(--radius-sm)",
                    border: "1.5px solid var(--color-primary-tint)",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    background: "var(--color-primary-tint)",
                  }}
                >
                  ورود
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hd-nav    { display: none !important; }
          .hd-search { display: none !important; }
          .hd-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
