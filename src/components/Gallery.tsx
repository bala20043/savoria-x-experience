import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
];

const heights = ["h-72", "h-96", "h-80", "h-64", "h-96", "h-72", "h-80", "h-72"];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-sans-ui text-xs uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            ✦ Atmosphere ✦
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient-gold glow-gold gold-underline">
            The Experience
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 [column-fill:_balance]">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`mb-5 break-inside-avoid relative group overflow-hidden rounded-xl ${heights[i]}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />
              <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-[var(--color-gold)]/60 rounded-xl transition-all" style={{ boxShadow: "inset 0 0 60px transparent" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
