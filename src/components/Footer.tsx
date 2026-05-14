import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10 px-6 overflow-hidden border-t border-[var(--color-gold)]/15">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="font-display text-2xl tracking-[0.4em] text-gradient-gold glow-gold mb-4">SAVORIA X</div>
            <p className="font-serif-elegant text-cream/70 italic text-sm leading-relaxed">
              Where flavor meets art. A cinematic dining experience in the heart of Chennai.
            </p>
          </div>

          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">Quick Links</h4>
            <ul className="space-y-3 font-sans-ui text-sm text-cream/70">
              {["Home", "Menu", "Reservations", "Gallery", "About"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-[var(--color-gold)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">Contact</h4>
            <ul className="space-y-3 font-sans-ui text-sm text-cream/70">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-[var(--color-gold)] mt-0.5"/>12 Marina Boulevard,<br/>Chennai 600004</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-[var(--color-gold)]"/>+91 44 4000 0000</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-[var(--color-gold)]"/>hello@savoriax.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">Newsletter</h4>
            <p className="font-sans-ui text-sm text-cream/70 mb-4">Get exclusive seasonal menus & private events.</p>
            <form className="flex glass rounded-full p-1.5">
              <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-4 text-sm text-cream placeholder:text-cream/40 focus:outline-none"/>
              <button type="submit" className="btn-luxury rounded-full px-5 py-2 text-[10px]">Join</button>
            </form>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-[var(--color-gold)] hover:scale-110 transition-all">
                  <Icon size={16}/>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 font-sans-ui text-xs text-cream/50">
          <span>© 2025 Savoria X. All rights reserved.</span>
          <span className="tracking-[0.3em] uppercase">Crafted with ✦ in Chennai</span>
        </div>
      </div>
    </footer>
  );
}
