import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[200] hidden md:block"
        style={{
          left: pos.x, top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 2.4 : 1})`,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: 8, height: 8,
            background: "#f0d080",
            boxShadow: "0 0 18px #c9a84c, 0 0 40px #c9a84c",
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[199] hidden md:block rounded-full border"
        style={{
          left: pos.x, top: pos.y,
          width: hover ? 64 : 36, height: hover ? 64 : 36,
          borderColor: "rgba(201,168,76,0.5)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, left 0.15s linear, top 0.15s linear, border-color 0.3s",
        }}
      />
    </>
  );
}
