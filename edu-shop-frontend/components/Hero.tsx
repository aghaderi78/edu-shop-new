export default function Hero() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #1e2a0f 0%, #2e3a19 50%, #1a2409 100%)",
      borderRadius: "var(--radius-xl)",
      padding: "72px 48px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* gold radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(201,162,39,0.25) 0%, transparent 65%)",
      }} />
      {/* subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>

        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          fontSize: "0.72rem", fontWeight: 700, color: "#e8c046",
          letterSpacing: "1.5px", background: "rgba(201,162,39,0.12)",
          border: "1px solid rgba(201,162,39,0.28)", borderRadius: "99px",
          padding: "6px 18px", marginBottom: "28px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e8c046", display: "inline-block" }} />
          آموزش آنلاین برنامه‌نویسی فارسی
        </div>

        {/* headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 4.5vw, 3rem)",
          fontWeight: 900,
          color: "#F5F1E8",
          lineHeight: 1.2,
          marginBottom: "20px",
          letterSpacing: "-1.5px",
        }}>
          از صفر تا استخدام با{" "}
          <span style={{
            color: "transparent",
            backgroundImage: "linear-gradient(90deg, #e8c046, #c9a227)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            پایتون
          </span>
        </h1>

        {/* sub */}
        <p style={{
          fontSize: "1rem", color: "rgba(240,236,224,0.58)",
          maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.9,
        }}>
          دوره‌های ویدیویی ساختارمند، تمرین عملی، پشتیبانی مستقیم —
          مسیر روشنی برای ورود به بازار کار برنامه‌نویسی.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "52px" }}>
          <a href="#courses" className="btn-gold" style={{ fontSize: "0.95rem", padding: "13px 34px" }}>
            شروع یادگیری ←
          </a>
          <a href="/about" style={{
            fontSize: "0.9rem", fontWeight: 600, color: "#F0ECE0",
            padding: "13px 28px", borderRadius: "var(--radius-md)",
            border: "1.5px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.05)", textDecoration: "none",
          }}>
            درباره آکادمی
          </a>
        </div>

        {/* stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "0",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}>
          {[
            { value: "+۲۰۰", label: "دانشجو فعال" },
            { value: "۴.۸", label: "امتیاز میانگین" },
            { value: "۲۴/۷", label: "دسترسی ویدیو" },
            { value: "۱۰۰٪", label: "ضمانت بازگشت" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, padding: "20px 8px", textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{ fontSize: "1.35rem", fontWeight: 900, color: "#e8c046", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontSize: "0.68rem", color: "rgba(240,236,224,0.45)", marginTop: "6px", fontWeight: 500 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
