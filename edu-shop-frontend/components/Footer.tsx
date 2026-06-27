import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    دوره‌ها: [
      { label: "پایتون مقدماتی", href: "/courses/python-beginner" },
      { label: "پایتون پیشرفته", href: "/courses/python-advanced" },
      { label: "علم داده", href: "/courses/data-science" },
      { label: "طراحی وب", href: "/courses/web-design" },
    ],
    آکادمی: [
      { label: "درباره ما", href: "/about" },
      { label: "تماس با ما", href: "/contact" },
      { label: "وبلاگ", href: "/blog" },
      { label: "سوالات متداول", href: "/#faq" },
    ],
    پشتیبانی: [
      { label: "راهنمای خرید", href: "/help/purchase" },
      { label: "ضمانت بازگشت وجه", href: "/help/refund" },
      { label: "قوانین و مقررات", href: "/terms" },
      { label: "حریم خصوصی", href: "/privacy" },
    ],
  };

  return (
    <footer style={{
      background: "var(--color-sidebar-bg)",
      borderTop: "1px solid rgba(201,162,39,0.15)",
      marginTop: "80px",
    }}>

      {/* ── Top strip ── */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        <div>
          <p style={{
            fontSize: "0.78rem",
            color: "var(--color-sidebar-text)",
            fontWeight: 600,
            letterSpacing: "1px",
            marginBottom: "6px",
            opacity: 0.7,
          }}>
            آموزش آنلاین برنامه‌نویسی
          </p>
          <h3 style={{
            fontSize: "1.1rem",
            fontWeight: 900,
            color: "var(--color-gold-light)",
            margin: 0,
          }}>
            همین الان شروع به یادگیری کن
          </h3>
        </div>
        <Link
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, var(--color-gold-light), var(--color-gold))",
            color: "#3D2A00",
            fontWeight: 800,
            fontSize: "0.9rem",
            padding: "11px 28px",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          مشاهده دوره‌ها ←
        </Link>
      </div>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px 40px",
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
        gap: "40px",
      }} className="footer-grid">

        {/* Brand column */}
        <div>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            marginBottom: "18px",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--color-primary-mid), var(--color-primary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              flexShrink: 0,
            }}>
              🐍
            </div>
            <div>
              <span style={{
                fontWeight: 800,
                fontSize: "1rem",
                color: "#F0ECE0",
                display: "block",
                lineHeight: 1.1,
              }}>
                آکادمی پایتون
              </span>
              <span style={{ fontSize: "0.62rem", color: "var(--color-sidebar-text)", opacity: 0.65 }}>
                یادگیری حرفه‌ای
              </span>
            </div>
          </Link>

          <p style={{
            fontSize: "0.83rem",
            color: "var(--color-sidebar-text)",
            lineHeight: 1.8,
            opacity: 0.75,
            marginBottom: "22px",
          }}>
            آموزش برنامه‌نویسی با ویدیوهای باکیفیت فارسی، پشتیبانی سریع و گواهینامه معتبر.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "تلگرام", icon: "✈️", href: "#" },
              { label: "اینستاگرام", icon: "📷", href: "#" },
              { label: "یوتیوب", icon: "▶️", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--color-gold-light)",
              letterSpacing: "1px",
              marginBottom: "16px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(201,162,39,0.2)",
            }}>
              {title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--color-sidebar-text)",
                      textDecoration: "none",
                      opacity: 0.75,
                      transition: "opacity 0.15s, color 0.15s",
                      display: "inline-block",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Trust badges ── */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px 32px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        {[
          { icon: "🛡️", label: "ضمانت بازگشت وجه" },
          { icon: "🔒", label: "پرداخت امن" },
          { icon: "⭐", label: "امتیاز ۴.۸ از ۵" },
          { icon: "👥", label: "بیش از ۲۰۰ دانشجو" },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "99px",
              padding: "6px 14px",
              fontSize: "0.75rem",
              color: "var(--color-sidebar-text)",
              opacity: 0.8,
            }}
          >
            <span>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "18px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        <p style={{ fontSize: "0.78rem", color: "var(--color-sidebar-text)", opacity: 0.5, margin: 0 }}>
          © {year} آکادمی پایتون — تمام حقوق محفوظ است
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "قوانین", href: "/terms" },
            { label: "حریم خصوصی", href: "/privacy" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.75rem",
                color: "var(--color-sidebar-text)",
                opacity: 0.5,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
