import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── Data ─── */
const FOTOS_LED = [
  '/fotos/6.jpg',
  '/fotos/3.jpg',
  '/fotos/11.jpg',
  '/fotos/8.jpg',
  '/fotos/7.jpg',
  '/fotos/9.jpg',
  '/fotos/12.jpg',
  '/fotos/5.jpg',
];

const MINISTERIOS = [
  {
    nombre: 'Hombres',
    actividades: [
      { nombre: 'Recupera', horario: 'Lunes, Miércoles y Viernes 7:00 PM' },
      { nombre: 'Oración', horario: 'Sábados 8:00 AM' },
    ],
  },
  {
    nombre: 'Mujeres',
    actividades: [
      { nombre: 'Recupera', horario: 'Miércoles 5:00 PM' },
      { nombre: 'Oración', horario: 'Sábados 9:00 AM' },
    ],
  },
  {
    nombre: 'Jóvenes',
    actividades: [
      { nombre: 'Teens (12-15 años)', horario: 'Viernes 7:00 PM' },
      { nombre: 'Young (15-18 años)', horario: 'Viernes 7:00 PM' },
      { nombre: 'Unis (18-22 años)', horario: 'Jueves 7:30 PM' },
      { nombre: 'Pros (23-31 años)', horario: 'Jueves 7:30 PM' },
      { nombre: 'Life (32-39 años)', horario: 'Jueves 7:30 PM' },
    ],
  },
  {
    nombre: 'Florece',
    actividades: [
      { nombre: 'Mujeres jóvenes (25-39 años)', horario: 'Sábados 10:30 AM' },
    ],
  },
  {
    nombre: 'Raíces',
    actividades: [
      { nombre: 'Discipulado integral', horario: 'Consulta horarios' },
    ],
  },
];

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Soy Nuevo', href: '#nuevo' },
  { label: 'Ministerios', href: '#ministerios' },
  { label: 'Donativos', href: '#donativos' },
];

const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/ICShalomOficial/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'Instagram', url: 'https://www.instagram.com/icshalom/', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 10a2 2 0 110-4 2 2 0 010 4zm4.5-6a.5.5 0 110-1 .5.5 0 010 1z' },
  { name: 'YouTube', url: 'https://www.youtube.com/@icshalom6683', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88.46-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88-.46 8.6-.42a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
];

/* ─── Main ─── */
export default function LandingV3() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0a', color: '#fff' }}>
      {/* ── Navbar - SÓLIDO, no se sobrepone ── */}
      <NavbarV3 menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ── Hero LED Screen ── */}
      <HeroLED />

      {/* ── Nosotros ── */}
      <NosotrosV3 />

      {/* ── Primera Vez ── */}
      <NuevoV3 />

      {/* ── Ministerios ── */}
      <MinisteriosV3 />

      {/* ── Donativos ── */}
      <DonativosV3 />

      {/* ── Footer ── */}
      <FooterV3 />

      {/* Global styles for V3 */}
      <style>{`
        .v3-nav-mobile { display: none; }
        @media (max-width: 768px) {
          .v3-nav-desktop { display: none !important; }
          .v3-nav-mobile { display: block !important; }
        }

        @keyframes v3-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes v3-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }

        @keyframes v3-glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(30, 144, 255, 0.15), inset 0 0 30px rgba(30, 144, 255, 0.05); }
          50% { box-shadow: 0 0 50px rgba(30, 144, 255, 0.25), inset 0 0 50px rgba(30, 144, 255, 0.08); }
        }

        @keyframes v3-rgb-shift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(3deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Navbar: sólido, NO superpuesto ─── */
function NavbarV3({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 2rem',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '4.5rem',
      }}>
        {/* Logo */}
        <a href="#inicio" style={{ textDecoration: 'none' }}>
          <img
            src="/logo1.png" alt="Shalom"
            style={{ height: '2.5rem', width: 'auto', filter: 'invert(1)' }}
          />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="v3-nav-desktop">
          {NAV_LINKS.map(l => (
            <a
              key={l.label} href={l.href}
              style={{
                textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {l.label}
            </a>
          ))}

          {/* Live button */}
          <a
            href="https://www.youtube.com/@icshalom6683/live"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', borderRadius: '999px',
              background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444', fontSize: '0.8rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s',
            }}
          >
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444',
              animation: 'v3-flicker 2s infinite',
            }} />
            EN VIVO
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="v3-nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#fff' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ padding: '1rem 0' }}>
              {NAV_LINKS.map(l => (
                <a
                  key={l.label} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block', padding: '0.75rem 0', textDecoration: 'none',
                    color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero: Pantalla LED con fotos ─── */
function HeroLED() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ledPhase, setLedPhase] = useState<'pixelated' | 'dissolving' | 'clear'>('pixelated');
  const [introPlayed, setIntroPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animFrameRef = useRef<number>(0);

  // LED pixelation effect using canvas
  const drawPixelated = useCallback((pixelSize: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw image small then scale up = pixelation
    ctx.imageSmoothingEnabled = false;
    const sw = Math.max(1, Math.floor(w / pixelSize));
    const sh = Math.max(1, Math.floor(h / pixelSize));

    // Draw tiny version
    ctx.drawImage(img, 0, 0, sw, sh);
    // Scale it up (pixelated)
    ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, w, h);

    // Add LED dot effect - draw circles for each "pixel"
    if (pixelSize >= 6) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, w, h);

      // Re-draw as dots
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sw;
      tempCanvas.height = sh;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0, sw, sh);
        const imageData = tempCtx.getImageData(0, 0, sw, sh);
        const data = imageData.data;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        const dotRadius = pixelSize * 0.38;
        for (let y = 0; y < sh; y++) {
          for (let x = 0; x < sw; x++) {
            const idx = (y * sw + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Draw LED dot
            ctx.beginPath();
            ctx.arc(
              x * pixelSize + pixelSize / 2,
              y * pixelSize + pixelSize / 2,
              dotRadius, 0, Math.PI * 2
            );
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fill();

            // Add glow
            if (pixelSize >= 10) {
              ctx.beginPath();
              ctx.arc(
                x * pixelSize + pixelSize / 2,
                y * pixelSize + pixelSize / 2,
                dotRadius * 1.5, 0, Math.PI * 2
              );
              ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
              ctx.fill();
            }
          }
        }
      }
    }
  }, []);

  // Animate LED dissolve: pixelated -> clear (solo en intro)
  const animateLedDissolve = useCallback(() => {
    const startTime = Date.now();
    const holdDuration = 2000;  // 2s se queda full pixelado
    const dissolveDuration = 4000; // 4s para desvanecerse lento
    const totalDuration = holdDuration + dissolveDuration;

    setLedPhase('pixelated');

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Fase 1: mantener pixelado puro
      if (elapsed < holdDuration) {
        drawPixelated(20);
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Fase 2: disolver lentamente
      const dissolveProgress = Math.min(1, (elapsed - holdDuration) / dissolveDuration);

      // Ease out quint (más lento al final)
      const eased = 1 - Math.pow(1 - dissolveProgress, 5);

      // pixelSize goes from 20 -> 1
      const pixelSize = Math.max(1, Math.round(20 - eased * 19));

      if (dissolveProgress > 0.15) {
        setLedPhase('dissolving');
      }

      if (pixelSize <= 1 || elapsed >= totalDuration) {
        setLedPhase('clear');
        setIntroPlayed(true);
        return;
      }

      drawPixelated(pixelSize);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [drawPixelated]);

  // Load image and start LED effect (solo la primera vez)
  useEffect(() => {
    if (introPlayed) {
      // Ya pasó el intro, solo fade normal
      setLedPhase('clear');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        animateLedDissolve();
      }
    };
    img.src = FOTOS_LED[current];

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [current, animateLedDissolve, introPlayed]);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance slides (fade normal, sin LED)
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(c => (c + 1) % FOTOS_LED.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="inicio" ref={containerRef} style={{ position: 'relative' }}>
      {/* LED Screen Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/7',
        minHeight: '500px',
        maxHeight: '85vh',
        background: '#000',
        overflow: 'hidden',
        animation: 'v3-glow-pulse 4s ease-in-out infinite',
        borderBottom: '2px solid rgba(30, 144, 255, 0.1)',
      }}>

        {/* Canvas for LED pixel effect */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            zIndex: 1,
            opacity: ledPhase === 'clear' ? 0 : 1,
            transition: 'opacity 2s ease-out',
            imageRendering: 'pixelated',
          }}
        />

        {/* Clean photo underneath (revealed as LED dissolves / normal fade after intro) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: introPlayed ? 1 : 0.5 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <img
              src={FOTOS_LED[current]} alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.7) contrast(1.1) saturate(1.1)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Scan line effect - stronger during LED phase */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          overflow: 'hidden',
          opacity: ledPhase === 'clear' ? 0.3 : 1,
          transition: 'opacity 1s',
        }}>
          <div style={{
            width: '100%', height: ledPhase === 'clear' ? '2px' : '6px',
            background: ledPhase === 'clear'
              ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.02), transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(100,200,255,0.08), transparent)',
            animation: 'v3-scanline 4s linear infinite',
            transition: 'all 1s',
          }} />
        </div>

        {/* LED pixel grid overlay - fades out */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '3px 3px',
          opacity: ledPhase === 'clear' ? 0 : ledPhase === 'dissolving' ? 0.5 : 1,
          transition: 'opacity 1.5s ease-out',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* LED "glitch" flash on transition */}
        {isTransitioning && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 6,
            background: 'rgba(30, 144, 255, 0.08)',
            mixBlendMode: 'screen',
          }} />
        )}

        {/* Content overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: ledPhase === 'clear'
            ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)',
          padding: '2rem',
          textAlign: 'center',
          transition: 'background 1s',
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5 }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 800,
              lineHeight: 1, color: '#fff', margin: '0 0 1rem',
              letterSpacing: '-0.03em',
              textShadow: '0 0 40px rgba(0,0,0,0.5)',
            }}
          >
            Hay un lugar<br />para ti
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.7)',
              maxWidth: '500px', lineHeight: 1.5, marginBottom: '2rem',
            }}
          >
            En Shalom, todos son bienvenidos
          </motion.p>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}
          >
            {['DOM 9AM', 'DOM 11AM', 'DOM 1PM'].map(h => (
              <span key={h} style={{
                padding: '0.5rem 1.25rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em',
                backdropFilter: 'blur(10px)',
              }}>
                {h}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.2 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a href="#nuevo" style={{
              padding: '0.9rem 2.5rem', background: '#fff', color: '#0a0a0a',
              borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none',
            }}>
              Soy nuevo
            </a>
            <a href="#donativos" style={{
              padding: '0.9rem 2.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', backdropFilter: 'blur(10px)',
            }}>
              Donar
            </a>
          </motion.div>
        </div>

        {/* Slide indicators - bottom */}
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 11, display: 'flex', gap: '6px',
        }}>
          {FOTOS_LED.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsTransitioning(true); setLedPhase('pixelated'); setTimeout(() => { setCurrent(i); setIsTransitioning(false); }, 300); }}
              style={{
                width: i === current ? '1.5rem' : '6px', height: '6px',
                borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* LED frame edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(30,144,255,0.3), transparent)',
          zIndex: 12,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(30,144,255,0.2), transparent)',
          zIndex: 12,
        }} />
      </div>

      {/* "Cuernavaca, Morelos" location bar below LED */}
      <div style={{
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem',
        background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.04)',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
          CUERNAVACA, MORELOS
        </span>
        <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
          30 AÑOS RESTAURANDO FAMILIAS
        </span>
        <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
          IGLESIA CRISTIANA
        </span>
      </div>
    </section>
  );
}

/* ─── Nosotros ─── */
function NosotrosV3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section id="nosotros" ref={ref} style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
      <motion.div style={{ opacity, y, maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'center',
        }}>
          {/* Photos mosaic */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
          }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '3/4' }}>
              <img src="/fotos/7.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '3/4', marginTop: '2rem' }}>
              <img src="/fotos/9.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem',
            }}>
              Quiénes somos
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
              color: '#fff', marginBottom: '1.5rem',
            }}>
              30 años siendo un refugio de fe en Cuernavaca
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem' }}>
              Creemos en la restauración del corazón de cada persona y de las familias, ya que
              sabemos que la familia es la base de la sociedad. Nuestra enseñanza se basa en la
              Biblia, la palabra de Dios, y vivimos nuestra fe como una comunidad con influencia
              e impacto en la sociedad, que ama a todos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>Misión</p>
                <p style={{ fontWeight: 600, color: '#fff', fontSize: '1.05rem' }}>Acoger, sanar y transformar vidas en familia.</p>
              </div>
              <div style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>Visión</p>
                <p style={{ fontWeight: 600, color: '#fff', fontSize: '1.05rem' }}>Familias restauradas transformando su ciudad.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Primera vez ─── */
function NuevoV3() {
  return (
    <section id="nuevo" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem',
          }}>
            Primera vez
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
            color: '#fff', marginBottom: '1rem',
          }}>
            Estamos contentos de que llegues
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Creemos en un plan que Dios tiene para ti y en un propósito para tu vida. Queremos
            acompañarte en tu primera visita.
          </p>
        </div>

        {/* Photo + steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem', alignItems: 'center',
        }}>
          {/* Photo */}
          <div style={{
            borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <img src="/fotos/4.jpg" alt="Equipo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Info */}
          <div>
            {/* Horarios */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
                Domingos
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['9:00 AM', '11:00 AM', '1:00 PM'].map(h => (
                  <span key={h} style={{
                    padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem',
                    fontWeight: 600, color: '#fff', fontSize: '0.95rem',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              La reunión de la 1:00 PM se transmite en línea. Además, tenemos espacios para cada
              miembro de la familia: hombres, mujeres, jóvenes y niños.
            </p>

            <a
              href="https://www.youtube.com/@icshalom6683/live"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.25rem', borderRadius: '999px',
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
              Ver en línea
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Ministerios ─── */
function MinisteriosV3() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="ministerios" style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem',
          }}>
            Ministerios
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
            color: '#fff', marginBottom: '1rem',
          }}>
            Hay un espacio para cada etapa de vida
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: '600px' }}>
            Sin importar tu edad o momento, tenemos un lugar donde puedes crecer, conectar y
            ser parte de algo más grande.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {MINISTERIOS.map((m, idx) => (
            <div key={m.nombre} style={{
              borderTop: idx === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <button
                onClick={() => setExpanded(expanded === m.nombre ? null : m.nombre)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', color: '#fff',
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{m.nombre}</span>
                <motion.span
                  animate={{ rotate: expanded === m.nombre ? 45 : 0 }}
                  style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {expanded === m.nombre && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {m.actividades.map(a => (
                        <div key={a.nombre} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)',
                          borderRadius: '0.75rem', flexWrap: 'wrap', gap: '0.5rem',
                          border: '1px solid rgba(255,255,255,0.04)',
                        }}>
                          <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>{a.nombre}</span>
                          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>{a.horario}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Donativos ─── */
function DonativosV3() {
  return (
    <section id="donativos" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, #0f0f0f 0%, #111 50%, #0a0a0a 100%)',
    }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem',
        }}>
          Donativos
        </p>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2,
          color: '#fff', marginBottom: '2rem',
        }}>
          Gracias por tu generosidad
        </h2>

        <div style={{
          padding: '2rem', background: 'rgba(255,255,255,0.03)',
          borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '2rem',
        }}>
          <p style={{
            fontSize: '1.15rem', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '0.75rem',
          }}>
            "Traigan los diezmos al alfolí"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>— Malaquías 3:10</p>
        </div>

        <p style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '2.5rem',
        }}>
          Tu donativo permite que nuestra iglesia siga adelante, alcanzando vidas y restaurando familias.
        </p>

        <a href="#" style={{
          display: 'inline-block', padding: '1rem 3rem',
          background: '#fff', color: '#0a0a0a',
          borderRadius: '999px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
        }}>
          Dona ahora
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FooterV3() {
  return (
    <footer style={{
      padding: '3rem 2rem 1.5rem', background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
      }}>
        <img src="/logo1.png" alt="Shalom" style={{ height: '3rem', width: 'auto', filter: 'invert(1)' }} />
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>Cuernavaca, Morelos</p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {SOCIAL.map(s => (
            <a
              key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.04)' }} />
        <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Iglesia Cristiana Shalom. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
