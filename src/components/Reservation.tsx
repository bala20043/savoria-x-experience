import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";

export function Reservation() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('reservations').insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: parseInt(form.guests),
          notes: form.notes
        }
      ]);

      if (error) throw error;

      setSent(true);
      toast.success("Reservation confirmed!");
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (error: any) {
      console.error('Error saving reservation:', error);
      toast.error(error.message || "Failed to save reservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reserve"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="aurora opacity-50" />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-sans-ui text-xs uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4">
            ✦ Reserve Your Evening ✦
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient-gold glow-gold gold-underline">
            Book a Table
          </h2>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={onSubmit}
          className="glass-strong rounded-3xl p-8 md:p-12 gold-border-glow"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { k: "name", t: "text", l: "Full Name", ph: "Your name" },
              { k: "email", t: "email", l: "Email", ph: "you@email.com" },
              { k: "phone", t: "tel", l: "Phone", ph: "+91 ..." },
              { k: "guests", t: "number", l: "Guests", ph: "2" },
              { k: "date", t: "date", l: "Date", ph: "" },
              { k: "time", t: "time", l: "Time", ph: "" },
            ].map((f) => (
              <label key={f.k} className="block">
                <span className="font-sans-ui text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">{f.l}</span>
                <input
                  required
                  type={f.t}
                  placeholder={f.ph}
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="mt-2 w-full bg-transparent border-b border-[var(--color-gold)]/30 py-3 font-serif-elegant text-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </label>
            ))}
          </div>
          <label className="block mt-5">
            <span className="font-sans-ui text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">Special Requests</span>
            <textarea
              rows={3}
              placeholder="Allergies, occasion, seating preference..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-[var(--color-gold)]/30 py-3 font-serif-elegant text-lg text-cream placeholder:text-cream/30 focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
            />
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-luxury rounded-full px-12 py-4 text-sm mt-10 mx-auto block disabled:opacity-50"
          >
            {loading ? "Reserving..." : sent ? "✓ Reserved" : "Confirm Reservation"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
