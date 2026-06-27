
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-36 shrink-0 bg-[var(--color-sidebar)] px-3 py-5">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className="rounded-lg bg-black/15 px-3 py-2 text-sm font-medium text-[var(--color-sidebar-active)]"
        >
          همه دوره‌ها
        </Link>
        <span className="rounded-lg px-3 py-2 text-sm text-[var(--color-sidebar-text)] opacity-60">
          برنامه‌نویسی
        </span>
        <span className="rounded-lg px-3 py-2 text-sm text-[var(--color-sidebar-text)] opacity-60">
          زبان
        </span>
      </nav>
    </aside>
  );
}
