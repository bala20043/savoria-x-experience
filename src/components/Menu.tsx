import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "../integrations/supabase/client";

type Dish = {
  name: string;
  desc: string;
  price: number;
  img: string;
  cat: "Starters" | "Mains" | "Desserts" | "Drinks";
  pick?: boolean;
};

const cats = ["All", "Starters", "Mains", "Desserts", "Drinks"] as const;

type CartItem = { name: string; price: number; qty: number };

export function Menu() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [active, setActive] = useState<typeof cats[number]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*');
        
        if (error) throw error;

        if (data) {
          const formattedDishes: Dish[] = data.map((item: any) => ({
            name: item.name,
            desc: item.description,
            price: Number(item.price),
            img: item.image_url,
            cat: item.category as any,
            pick: item.is_chefs_pick
          }));
          setDishes(formattedDishes);
        }
      } catch (error: any) {
        console.error('Error fetching menu:', error);
        toast.error("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filtered = active === "All" ? dishes : dishes.filter((d) => d.cat === active);
  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const addToCart = (d: Dish) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.name === d.name);
      if (ex) return prev.map((i) => (i.name === d.name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { name: d.name, price: d.price, qty: 1 }];
    });
    toast.success(`${d.name} added to your order`);
    setOpen(true);
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const placeOrder = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill in your name, phone and address");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your order is empty");
      return;
    }
    
    setPlacing(true);
    try {
      // 1. Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          customer_phone: form.phone,
          delivery_address: form.address,
          total_amount: total
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        item_name: item.name,
        quantity: item.qty,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const orderId = orderData.id.split('-')[0].toUpperCase();
      toast.success(`Order ${orderId} placed!`, {
        description: `Thank you ${form.name}. Total $${total}. We'll call ${form.phone} shortly.`,
        duration: 6000,
      });
      
      setCart([]);
      setForm({ name: "", phone: "", address: "" });
      setOpen(false);
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section id="menu" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-gold)]/5 blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans-ui text-xs uppercase tracking-[0.4em] text-[var(--color-gold)] mb-4"
          >
            ✦ The Collection ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl text-gradient-gold glow-gold gold-underline"
          >
            Our Specialties
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative font-sans-ui text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 ${
                active === c
                  ? "bg-[var(--color-gold)] text-background shadow-[0_0_30px_var(--color-gold)]"
                  : "glass text-cream/80 hover:text-[var(--color-gold)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((d) => (
              <motion.article
                key={d.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-2xl overflow-hidden gold-border-glow"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[var(--color-gold)]/20 via-transparent to-[var(--color-purple-accent)]/20" />
                  {d.pick && (
                    <div className="absolute top-3 left-3 glass-strong rounded-full px-3 py-1 flex items-center gap-1.5">
                      <span className="text-[var(--color-gold)] text-xs">★</span>
                      <span className="font-sans-ui text-[9px] uppercase tracking-widest text-cream">Chef's Pick</span>
                    </div>
                  )}
                </div>
                <div className="p-6 -mt-4 relative">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl text-cream group-hover:text-[var(--color-gold)] transition-colors">{d.name}</h3>
                    <span className="font-display text-lg text-[var(--color-gold)]">${d.price}</span>
                  </div>
                  <p className="font-serif-elegant text-sm text-cream/60 italic leading-relaxed">{d.desc}</p>
                  <button
                    onClick={() => addToCart(d)}
                    className="mt-5 w-full btn-outline-gold rounded-full py-2.5 text-[11px]"
                  >
                    Add to Order
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating cart button */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 30 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-[var(--color-gold)] text-background rounded-full px-6 py-4 font-sans-ui text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_var(--color-gold)] flex items-center gap-3"
          >
            <span>🛒 View Order</span>
            <span className="bg-background text-[var(--color-gold)] rounded-full px-2 py-0.5 text-[10px] font-bold">{count}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Order drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-[var(--color-gold)]/30 overflow-y-auto"
            >
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-3xl text-gradient-gold">Your Order</h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-cream/60 hover:text-[var(--color-gold)] text-2xl leading-none"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="font-serif-elegant italic text-cream/60 py-12 text-center">
                    Your order is empty. Add a dish to begin.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((i) => (
                      <li key={i.name} className="glass rounded-xl p-4 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-cream truncate">{i.name}</p>
                          <p className="text-[var(--color-gold)] text-sm">${i.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(i.name, -1)}
                            className="w-8 h-8 rounded-full glass text-cream hover:text-[var(--color-gold)]"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-sans-ui text-cream">{i.qty}</span>
                          <button
                            onClick={() => updateQty(i.name, 1)}
                            className="w-8 h-8 rounded-full glass text-cream hover:text-[var(--color-gold)]"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="border-t border-[var(--color-gold)]/20 pt-4 flex items-center justify-between">
                  <span className="font-sans-ui text-xs uppercase tracking-[0.3em] text-cream/70">Total</span>
                  <span className="font-display text-3xl text-gradient-gold">${total}</span>
                </div>

                <div className="space-y-3">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full glass rounded-xl px-4 py-3 bg-transparent text-cream placeholder:text-cream/40 outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                  />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone number"
                    className="w-full glass rounded-xl px-4 py-3 bg-transparent text-cream placeholder:text-cream/40 outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                  />
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Delivery address"
                    rows={2}
                    className="w-full glass rounded-xl px-4 py-3 bg-transparent text-cream placeholder:text-cream/40 outline-none focus:ring-1 focus:ring-[var(--color-gold)] resize-none"
                  />
                </div>

                <button
                  onClick={placeOrder}
                  disabled={placing || cart.length === 0}
                  className="w-full bg-[var(--color-gold)] text-background font-sans-ui uppercase tracking-[0.25em] text-xs py-4 rounded-full shadow-[0_0_30px_var(--color-gold)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_50px_var(--color-gold)] transition-shadow"
                >
                  {placing ? "Placing Order…" : `Place Order • $${total}`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
