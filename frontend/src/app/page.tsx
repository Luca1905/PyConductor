import Link from "next/link";
import { Hand } from "lucide-react";

export default function Page() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),rgba(0,0,0,0.6))]" />
      </div>

      <section
        id="main"
        className="relative z-10 grid min-h-[100dvh] place-items-center px-6"
      >
        <Link href="/conduct" className="relative">
          <div className="relative grid h-44 w-44 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-emerald-500 p-[3px] shadow-[0_0_60px_-10px_rgba(217,70,239,0.45)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:outline-none md:h-56 md:w-56">
            <div className="relative grid h-full w-full place-items-center rounded-full bg-black">
              <div className="absolute inset-0 animate-[pulse_2.4s_ease-in-out_infinite] rounded-full ring-1 ring-fuchsia-500/30" />
              <div className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,197,94,0.18)_120deg,transparent_240deg)]" />
              <Hand className="relative h-16 w-16 text-white md:h-20 md:w-20" />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
