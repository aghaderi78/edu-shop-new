import Link from "next/link";
import { getCourses } from "../lib/api";
import Faq from "../components/Faq";
import Hero from "../components/Hero";

export default async function HomePage() {
  const { results: courses } = await getCourses();

  const stats = [
    { label: "دانشجو", value: "+۲۰۰", icon: "👥" },
    { label: "امتیاز دوره‌ها", value: "۴.۸", icon: "⭐" },
    { label: "دسترسی به ویدیو", value: "۲۴/۷", icon: "🎬" },
    { label: "ضمانت بازگشت وجه", value: "✓", icon: "🛡️" },
  ];

  const features = [
    { icon: "🎬", title: "ویدیوهای حرفه‌ای", desc: "محتوای باکیفیت که مفاهیم پیچیده را ساده می‌کند." },
    { icon: "💬", title: "پشتیبانی سریع", desc: "تیم پشتیبانی همیشه آماده پاسخ به سوالات شماست." },
    { icon: "🏆", title: "گواهی‌نامه", desc: "پس از اتمام هر دوره گواهینامه معتبر دریافت کنید." },
    { icon: "♾️", title: "دسترسی مادام‌العمر", desc: "یک‌بار بخرید، تا ابد دسترسی داشته باشید." },
    { icon: "📱", title: "در همه دستگاه‌ها", desc: "موبایل، تبلت یا کامپیوتر — هر جا که بخواهی." },
    { icon: "🔄", title: "بروزرسانی مداوم", desc: "محتوا مرتب بروزرسانی می‌شود تا به‌روز بمانید." },
  ];

  const testimonials = [
    { name: "محمد رضایی", course: "دوره پایتون", initial: "م", text: "توضیحات خیلی روان بود، تمرین‌ها هم کمک کرد بهتر یاد بگیرم." },
    { name: "سارا احمدی", course: "دوره طراحی وب", initial: "س", text: "بعد از خرید بلافاصله به ویدیوها دسترسی داشتم، تجربه‌ی خوبی بود." },
    { name: "علی کریمی", course: "دوره علم داده", initial: "ع", text: "کیفیت ویدیوها عالی بود و پشتیبانی هم سریع جواب داد." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "64px", paddingBottom: "64px" }}>

      {/* ── Hero ── */}
      <Hero />

      {/* ── Stats ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}
        className="stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--color-surface)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
            <p style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--color-primary)",
              lineHeight: 1.1,
            }}>
              {stat.value}
            </p>
            <p style={{
              marginTop: "6px",
              fontSize: "0.78rem",
              color: "var(--color-muted)",
              fontWeight: 500,
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section>
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--color-primary-mid)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            چرا ما؟
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "6px" }}>
            یادگیری متفاوت
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
            همه چیزی که برای رسیدن به هدفت نیاز داری.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="features-grid">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover"
              style={{
                background: "var(--color-surface)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
              }}
            >
              <div style={{
                width: "46px",
                height: "46px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary-tint)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: "14px",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "6px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses">
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--color-primary-mid)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            دوره‌های آموزشی
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "6px" }}>
            شروع یادگیری کن
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
            از مبتدی تا حرفه‌ای — مسیر پیشرفت برای همه آماده‌ست.
          </p>
        </div>

        {courses.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "48px 24px",
            background: "var(--color-surface)",
            border: "1.5px dashed var(--color-border)",
            borderRadius: "var(--radius-lg)",
            color: "var(--color-muted)",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📭</div>
            <p style={{ fontWeight: 600 }}>هنوز دوره‌ای منتشر نشده.</p>
            <p style={{ fontSize: "0.85rem", marginTop: "6px" }}>به زودی دوره‌های جدید اضافه می‌شوند.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }} className="courses-grid">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="card-hover"
                style={{
                  background: "var(--color-surface)",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: "130px",
                  background: "linear-gradient(135deg, var(--color-sidebar-bg), var(--color-sidebar-mid))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  position: "relative",
                }}>
                  🎬
                  <span style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "linear-gradient(135deg, var(--color-gold-light), var(--color-gold))",
                    color: "#3D2A00",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "99px",
                  }}>
                    جدید
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "16px" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px", lineHeight: 1.4 }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-muted)", marginBottom: "12px" }}>
                    {course.lessons_count} درس
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "12px",
                  }}>
                    <span style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "var(--color-primary)",
                    }}>
                      {course.price.toLocaleString("fa-IR")} تومان
                    </span>
                    <span style={{
                      fontSize: "0.75rem",
                      color: "var(--color-primary-mid)",
                      fontWeight: 600,
                      background: "var(--color-primary-tint)",
                      padding: "4px 10px",
                      borderRadius: "99px",
                    }}>
                      مشاهده دوره
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--color-primary-mid)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            نظرات
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            دانشجوها چه می‌گویند
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="testimonials-grid">
          {testimonials.map((item) => (
            <div
              key={item.name}
              style={{
                background: "var(--color-surface)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Stars */}
              <div style={{ color: "var(--color-gold)", fontSize: "0.9rem", letterSpacing: "2px" }}>
                ★★★★★
              </div>

              {/* Quote mark */}
              <div style={{
                fontSize: "2rem",
                lineHeight: 1,
                color: "var(--color-primary-tint)",
                marginBottom: "-8px",
              }}>
                ❝
              </div>

              <p style={{
                fontSize: "0.875rem",
                color: "var(--color-text-soft)",
                lineHeight: 1.8,
                flexGrow: 1,
              }}>
                {item.text}
              </p>

              {/* Author */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "14px",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-primary-mid), var(--color-primary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}>
                  {item.initial}
                </div>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700 }}>{item.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--color-muted)" }}>{item.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section>
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--color-primary-mid)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            سوالات
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>سوالات متداول</h2>
        </div>
        <Faq />
      </section>

      {/* ── CTA Banner ── */}
      <section style={{
        background: "linear-gradient(135deg, var(--color-sidebar-bg), var(--color-sidebar-mid))",
        borderRadius: "var(--radius-xl)",
        padding: "52px 40px",
        textAlign: "center",
        border: "1px solid rgba(201,162,39,0.2)",
      }}>
        <div style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--color-gold-light)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}>
          شروع کن
        </div>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: 900,
          color: "#F0ECE0",
          marginBottom: "12px",
          lineHeight: 1.3,
        }}>
          آماده شروع هستی؟
        </h2>
        <p style={{
          fontSize: "0.9rem",
          color: "rgba(240,236,224,0.6)",
          marginBottom: "28px",
          lineHeight: 1.7,
        }}>
          همین الان ثبت‌نام کن و اولین قدم را بردار
        </p>
        <Link href="#courses" className="btn-gold" style={{ fontSize: "0.95rem", padding: "12px 36px" }}>
          مشاهده دوره‌ها
        </Link>
      </section>

      {/* ── Responsive Styles ── */}
      <style>{`
        @media (max-width: 900px) {
          .features-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .courses-grid   { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid        { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid     { grid-template-columns: 1fr !important; }
          .courses-grid      { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}