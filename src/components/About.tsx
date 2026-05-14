import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[560px]"
        >
          <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden gold-border-glow">
            <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80" alt="Chef" className="w-full h-full object-cover" />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden gold-border-glow"
          >
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" alt="Interior" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute -top-4 -right-4 glass-strong rounded-full w-32 h-32 flex flex-col items-center justify-center gold-border-glow">
            <span className="font-display text-4xl text-gradient-gold">12+</span>
            <span className="font-sans-ui text-[9px] uppercase tracking-[0.2em] text-cream/80 mt-1">Years</span>
          </div>
          <div className="absolute top-1/2 -left-6 w-12 h-12 rounded-full bg-[var(--color-gold)]/20 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-sans-ui text-xs uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            ✦ Our Story ✦
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight mb-6">
            A <span className="text-gradient-gold glow-gold">cinematic</span> approach to dining.
          </h2>
          <p className="font-serif-elegant text-lg md:text-xl text-cream/75 italic leading-relaxed mb-5">
            Born in 2012 in the heart of Chennai, Savoria X reimagines fine dining as theater —
            where every plate tells a story, every flavor performs, and every guest is the lead.
          </p>
          <p className="font-sans-ui text-sm text-cream/60 leading-loose mb-10">
            Our chefs travel the world to source the rarest ingredients, then transform them through
            a marriage of traditional craft and futuristic technique. The result is a sensory journey
            you'll remember long after the last bite.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "Michelin", l: "Recognized" },
              { v: "Local", l: "Sourced" },
              { v: "Seasonal", l: "Menus" },
            ].map((x) => (
              <div key={x.v} className="glass rounded-xl p-4 text-center">
                <div className="font-display text-lg text-[var(--color-gold)]">{x.v}</div>
                <div className="font-sans-ui text-[10px] uppercase tracking-widest text-cream/60 mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
