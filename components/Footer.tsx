import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-12 dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-2xl font-black tracking-tighter">SKYLRK</div>
          <p className="text-sm text-black/60 dark:text-white/60">
            &copy; {new Date().getFullYear()} SKYLRK. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium uppercase tracking-wider">
            <Link href="/policies" className="hover:underline">
              Terms
            </Link>
            <Link href="/policies" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
