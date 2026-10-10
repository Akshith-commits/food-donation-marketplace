import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 96;
const frameSrc = (i) => `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

function Beat({ progress, range, last = false, children }) {
  const opacity = useTransform(progress, range, last ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, range, last ? [30, 0, 0, 0] : [30, 0, 0, -30]);
  return (
    <motion.div className="beat" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

export default function ScrollHero({ onEnter }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const ready = loaded >= FRAME_COUNT;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const draw = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      const done = () => setLoaded((n) => n + 1);
      img.onload = done;
      img.onerror = done;
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      draw(currentRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready]);

  useEffect(() => {
    if (ready) draw(0);
  }, [ready]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(p * FRAME_COUNT)));
    if (i !== currentRef.current) {
      currentRef.current = i;
      requestAnimationFrame(() => draw(i));
    }
  });

  return (
    <section ref={sectionRef} className="hero">
      <div className="sticky">
        <canvas ref={canvasRef} />
        {!ready && (
          <div className="loader">
            Loading... {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        )}
        {ready && (
          <>
            <Beat progress={scrollYProgress} range={[0.0, 0.05, 0.2, 0.28]}>
              <h2>Surplus food shouldn't go to waste.</h2>
            </Beat>
            <Beat progress={scrollYProgress} range={[0.3, 0.38, 0.5, 0.58]}>
              <h2>List it in 60 seconds.</h2>
            </Beat>
            <Beat progress={scrollYProgress} range={[0.6, 0.68, 0.78, 0.86]}>
              <h2>NGOs nearby claim it.</h2>
            </Beat>
            <Beat progress={scrollYProgress} range={[0.88, 0.93, 0.98, 1]} last>
              <h2>Enter FoodBridge</h2>
              <button
                type="button"
                className="cta"
                onClick={() => {
                  if (onEnter) onEnter();
                }}
              >
                Enter FoodBridge →
              </button>
            </Beat>
          </>
        )}
      </div>
    </section>
  );
}
