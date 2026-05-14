const reviews = [
  { name: "Aarav Mehta", text: "Cinematic from the moment we walked in. The wagyu is unforgettable.", initial: "AM" },
  { name: "Priya Iyer", text: "Every plate is a sculpture. Service is poetry. A new benchmark.", initial: "PI" },
  { name: "Rohan Das", text: "The molten gold cake is reason enough to fly to Chennai.", initial: "RD" },
  { name: "Lakshmi N.", text: "Lighting, music, food — all in perfect harmony. Magic.", initial: "LN" },
  { name: "Jonathan W.", text: "Better than any Michelin spot I've tried this year.", initial: "JW" },
  { name: "Saanvi K.", text: "I came for dinner. Left feeling like I'd lived a film.", initial: "SK" },
];

function Card({ r }: { r: typeof reviews[number] }) {
  return (
    <div className="shrink-0 w-[340px] md:w-[420px] glass rounded-2xl p-7 mx-3 relative">
      <div className="absolute -top-3 -left-2 font-display text-6xl text-[var(--color-gold)]/40 leading-none">"</div>
      <div className="flex gap-1 mb-3 text-[var(--color-gold)]">{"★★★★★"}</div>
      <p className="font-serif-elegant text-lg italic text-cream/85 leading-relaxed mb-5">{r.text}</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-orange-glow)] flex items-center justify-center font-display text-background text-sm">
          {r.initial}
        </div>
        <div className="font-sans-ui text-xs uppercase tracking-[0.2em] text-cream/80">{r.name}</div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[var(--color-purple-accent)]/8 via-transparent to-transparent" />
      <div className="text-center mb-16 px-6">
        <p className="font-sans-ui text-xs uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
          ✦ Voices ✦
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-gradient-gold glow-gold gold-underline">
          Loved by Guests
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee w-max">
          {loop.map((r, i) => <Card key={i} r={r} />)}
        </div>
      </div>
    </section>
  );
}
