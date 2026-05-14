import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export function Splash() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
        >
          <div className="aurora opacity-60" />
          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-6 h-20 w-20 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]"
              style={{ boxShadow: "0 0 60px var(--color-gold)" }}
            >
              <span className="font-display text-2xl">S</span>
            </motion.div>
            <motion.div
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.6em", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="font-display text-2xl md:text-4xl text-gradient-gold glow-gold"
            >
              SAVORIA X
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: 0.5 }}
              className="mt-4 mx-auto h-px w-40 bg-[var(--color-gold)] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-orange-glow)] to-[var(--color-gold)] z-[150] origin-left"
      style={{ scaleX: x, boxShadow: "0 0 10px var(--color-gold)" }}
    />
  );
}
