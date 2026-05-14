import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Reservations", href: "#reserve" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-[oklch(0.78_0.14_85/0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="font-display text-xl md:text-2xl tracking-[0.4em] text-gradient-gold glow-gold">
            SAVORIA <span className="text-[var(--color-gold)]">X</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-sans-ui text-xs uppercase tracking-[0.2em] text-cream/80 hover:text-[var(--color-gold)] transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_var(--color-gold)]" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#reserve" className="btn-outline-gold rounded-full px-5 py-2 text-xs">Reserve</a>
            <a href="#menu" className="btn-luxury rounded-full px-5 py-2 text-xs">Order Now</a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[var(--color-gold)] p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-display tracking-[0.4em] text-gradient-gold">SAVORIA X</span>
              <button onClick={() => setOpen(false)} className="text-[var(--color-gold)] p-2">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display text-3xl tracking-[0.3em] text-cream hover:text-[var(--color-gold)]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
