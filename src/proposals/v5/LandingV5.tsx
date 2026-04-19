import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

/* ─── Data ─── */
const HERO_IMAGES = [
  '/fotos/6.jpg', '/fotos/3.jpg', '/fotos/11.jpg', '/fotos/8.jpg', '/fotos/7.jpg',
];

const MINISTERIOS = [
  { nombre: 'Hombres', img: '/fotos/7.jpg', actividades: ['Recupera — Lun, Mié, Vie 7PM', 'Oración — Sáb 8AM'] },
  { nombre: 'Mujeres', img: '/fotos/9.jpg', actividades: ['Recupera — Mié 5PM', 'Oración — Sáb 9AM'] },
  { nombre: 'Jóvenes', img: '/fotos/5.jpg', actividades: ['Teens 12-15 — Vie 7PM', 'Young 15-18 — Vie 7PM', 'Unis 18-22 — Jue 7:30PM', 'Pros 23-31 — Jue 7:30PM', 'Life 32-39 — Jue 7:30PM'] },
  { nombre: 'Florece', img: '/fotos/12.jpg', actividades: ['Mujeres jóvenes 25-39 — Sáb 10:30AM'] },
  { nombre: 'Raíces', img: '/fotos/8.jpg', actividades: ['Discipulado integral — Consulta horarios'] },
];

const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/ICShalomOficial/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'Instagram', url: 'https://www.instagram.com/icshalom/', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 10a2 2 0 110-4 2 2 0 010 4zm4.5-6a.5.5 0 110-1 .5.5 0 010 1z' },
  { name: 'YouTube', url: 'https://www.youtube.com/@icshalom6683', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88.46-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88-.46 8.6-.42a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
];

/* ─── Letter-by-letter reveal ─── */
function RevealText({ text, className, style, delay = 0 }: {
  text: string; className?: string; style?: React.CSSProperties; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <span ref={ref} className={className} style={{ ...style, display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['RESTAURANDO FAMILIAS', 'CUERNAVACA', '30 AÑOS', 'COMUNIDAD DE FE', 'HAY UN LUGAR PARA TI', 'DOMINGOS 9AM · 11AM · 1PM'];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden', padding: '1.25rem 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: '#09090b',
    }}>
      <motion.div
        animate={{ x: [0, -50 * items.length + '%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', width: 'fit-content' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 600,
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', gap: '4rem',
          }}>
            {item}
            <span style={{ color: 'rgba(124,58,237,0.4)' }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main ─── */
export default function LandingV5() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="v5">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Marquee />
      <Nosotros />
      <StickyShowcase />
      <Ministerios />
      <Donativos />
      <Footer />
      <Styles />
    </div>
  );
}

/* ─── Styles ─── */
function Styles() {
  return (
    <style>{`
      .v5 {
        font-family: 'Inter', system-ui, sans-serif;
        background: #09090b;
        color: #fafafa;
        overflow-x: hidden;
      }
      .v5 *, .v5 *::before, .v5 *::after { box-sizing: border-box; margin: 0; }
      .v5 a { color: inherit; }

      .v5-nav-mobile { display: none; }
      @media (max-width: 768px) {
        .v5-nav-desktop { display: none !important; }
        .v5-nav-mobile { display: block !important; }
        .v5-hero-title { font-size: clamp(3rem, 14vw, 5rem) !important; }
        .v5-split { grid-template-columns: 1fr !important; }
        .v5-sticky-inner { flex-direction: column !important; }
        .v5-sticky-inner > div { width: 100% !important; }
        .v5-min-cards { grid-template-columns: 1fr !important; }
      }

      @keyframes v5-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes v5-ken { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
      @keyframes v5-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2.5); opacity: 0; } }

      .v5-img-reveal {
        clip-path: inset(100% 0 0 0);
        animation: v5-clip-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
      }
      @keyframes v5-clip-reveal {
        to { clip-path: inset(0 0 0 0); }
      }
    `}</style>
  );
}

/* ─── Navbar (transparent, minimal) ─── */
function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Soy Nuevo', href: '#nuevo' },
    { label: 'Ministerios', href: '#ministerios' },
    { label: 'Donativos', href: '#donativos' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 clamp(1.5rem, 4vw, 3rem)',
      background: scrolled ? 'rgba(9,9,11,0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto', height: '5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#inicio" style={{ textDecoration: 'none' }}>
          <img src="/logo1.png" alt="Shalom" style={{ height: '2rem', filter: 'invert(1)' }} />
        </a>

        <div className="v5-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500,
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.3s',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{l.label}</a>
          ))}
          <a href="https://www.youtube.com/@icshalom6683/live" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.1rem', borderRadius: '999px',
              background: 'rgba(255,59,48,0.12)', border: '1px solid rgba(255,59,48,0.2)',
              color: '#ff6b6b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
              textDecoration: 'none',
            }}>
            <span style={{ position: 'relative', width: '7px', height: '7px' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#ff4444' }} />
              <span style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid rgba(255,68,68,0.5)', animation: 'v5-pulse 2s infinite' }} />
            </span>
            LIVE
          </a>
        </div>

        <button className="v5-nav-mobile" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: '0.5rem' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(20px)' }}>
            <div style={{ padding: '2rem 0' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block', padding: '1rem 0', textDecoration: 'none',
                    fontSize: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero: Cinematic fullscreen ─── */
function Hero() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" ref={ref} style={{ position: 'relative', height: '100vh', minHeight: '700px', overflow: 'hidden' }}>
      {/* BG images with crossfade */}
      {HERO_IMAGES.map((src, i) => (
        <motion.div
          key={src}
          style={{ y }}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <img src={src} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover',
            animation: 'v5-ken 25s ease-in-out infinite alternate',
            filter: 'brightness(0.45) saturate(1.2)',
          }} />
        </motion.div>
      ))}

      {/* Film grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to top, #09090b 0%, rgba(9,9,11,0.4) 40%, rgba(9,9,11,0.1) 70%, rgba(9,9,11,0.3) 100%)',
      }} />

      {/* Content */}
      <motion.div style={{ opacity, position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem, 5vw, 5rem)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {/* Oversized title */}
          <h1 className="v5-hero-title" style={{
            fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.05em', margin: '0 0 2rem',
          }}>
            <RevealText text="HAY UN" style={{ display: 'block', color: '#fff' }} />
            <RevealText text="LUGAR" delay={0.4} style={{
              display: 'block',
              background: 'linear-gradient(90deg, #c084fc, #818cf8, #60a5fa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} />
            <RevealText text="PARA TI" delay={0.7} style={{ display: 'block', color: '#fff' }} />
          </h1>

          {/* Bottom row: info + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '2rem', paddingBottom: '2rem',
            }}
          >
            <div>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '450px', marginBottom: '1.5rem' }}>
                Iglesia Cristiana Shalom — Más de 30 años restaurando familias en Cuernavaca, Morelos.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['DOM 9AM', 'DOM 11AM', 'DOM 1PM'].map(h => (
                  <span key={h} style={{
                    padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px',
                  }}>{h}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#nuevo" style={{
                padding: '1rem 2.5rem', background: '#fff', color: '#09090b',
                borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
                textDecoration: 'none', transition: 'transform 0.3s',
                letterSpacing: '0.02em',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >Soy Nuevo</a>
              <a href="#donativos" style={{
                padding: '1rem 2.5rem',
                border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
                borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >Donar</a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 11, height: '3px', background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          key={idx}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #60a5fa)' }}
        />
      </div>
    </section>
  );
}

/* ─── Nosotros: split screen ─── */
function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nosotros" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 3rem)',
      background: '#09090b',
    }}>
      <div className="v5-split" style={{
        maxWidth: '1400px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 8rem)',
        alignItems: 'center',
      }}>
        {/* Left: large photo with cinematic crop */}
        <motion.div
          initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative' }}
        >
          <div style={{
            borderRadius: '4px', overflow: 'hidden', aspectRatio: '3/4',
            position: 'relative',
          }}>
            <img src="/fotos/7.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Cinematic bars */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8%', background: '#09090b' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8%', background: '#09090b' }} />
          </div>
          {/* Caption */}
          <p style={{
            position: 'absolute', bottom: '-2rem', left: 0,
            fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
          }}>
            IC Shalom — Cuernavaca, Morelos
          </p>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '2rem',
          }}>
            ( Quiénes somos )
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: '2rem',
          }}>
            30 años siendo<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>un refugio de fe</span>
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.4)', marginBottom: '3rem', maxWidth: '500px' }}>
            Creemos en la restauración del corazón de cada persona y de las familias.
            Nuestra enseñanza se basa en la Biblia y vivimos nuestra fe como una comunidad
            con influencia e impacto en la sociedad.
          </p>

          {/* Mission / Vision - horizontal */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Misión', text: 'Acoger, sanar y transformar vidas en familia.' },
              { label: 'Visión', text: 'Familias restauradas transformando su ciudad.' },
            ].map(item => (
              <div key={item.label} style={{ flex: '1 1 200px' }}>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(124,58,237,0.7)', marginBottom: '0.75rem',
                }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sticky Showcase: horizontal scroll section for "Soy Nuevo" ─── */
function StickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const steps = [
    { title: 'Llega cualquier\ndomingo', desc: 'No necesitas reservar. Ven como eres. Tenemos servicio a las 9AM, 11AM y 1PM.', img: '/fotos/6.jpg' },
    { title: 'Conoce a la\ncomunidad', desc: 'Nuestra gente te recibirá con los brazos abiertos. Hay espacio para toda tu familia.', img: '/fotos/3.jpg' },
    { title: 'Crece con\nnosotros', desc: 'Tenemos ministerios para cada etapa: hombres, mujeres, jóvenes y más.', img: '/fotos/11.jpg' },
  ];

  return (
    <section id="nuevo" ref={containerRef} style={{ height: `${(steps.length + 1) * 100}vh`, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Title on left (fixed) */}
        <div style={{
          position: 'absolute', top: '50%', left: 'clamp(1.5rem, 4vw, 4rem)',
          transform: 'translateY(-50%)', zIndex: 10, maxWidth: '350px',
        }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem',
          }}>
            ( Primera vez )
          </p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.02em', marginBottom: '1.5rem',
          }}>
            Tu primera<br />visita
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
            Creemos en un plan que Dios tiene para ti.
          </p>

          {/* Step indicators */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {steps.map((_, i) => {
              const start = i / steps.length;
              const end = (i + 1) / steps.length;
              return <StepIndicator key={i} index={i + 1} progress={scrollYProgress} start={start} end={end} />;
            })}
          </div>
        </div>

        {/* Cards that transition */}
        <div style={{ position: 'absolute', right: 'clamp(1.5rem, 4vw, 6rem)', top: '50%', transform: 'translateY(-50%)', width: 'min(550px, 55vw)' }}>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* Live badge */}
        <a
          href="https://www.youtube.com/@icshalom6683/live"
          target="_blank" rel="noopener noreferrer"
          style={{
            position: 'absolute', bottom: '2rem', left: 'clamp(1.5rem, 4vw, 4rem)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.2rem', borderRadius: '999px',
            background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.15)',
            color: '#ff6b6b', fontSize: '0.8rem', fontWeight: 600,
            textDecoration: 'none', zIndex: 10,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4444' }} />
          El servicio de 1PM también es en línea
        </a>
      </div>
    </section>
  );
}

function StepIndicator({ index, progress, start, end }: { index: number; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.2, 1, 1, 0.2]);
  const barWidth = useTransform(progress, [start, end], ['0%', '100%']);
  return (
    <motion.div style={{ opacity, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', minWidth: '1.5rem' }}>0{index}</span>
      <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
        <motion.div style={{ width: barWidth, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #60a5fa)', borderRadius: '1px' }} />
      </div>
    </motion.div>
  );
}

function StepCard({ step, index, total, progress }: { step: any; index: number; total: number; progress: any }) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, start + 0.08, mid, end - 0.08, end], [0, 1, 1, 1, index === total - 1 ? 1 : 0]);
  const y = useTransform(progress, [start, start + 0.1], [80, 0]);
  const scale = useTransform(progress, [end - 0.1, end], [1, index === total - 1 ? 1 : 0.95]);

  return (
    <motion.div style={{ opacity, y, scale, position: 'absolute', inset: 0 }}>
      <div style={{
        borderRadius: '8px', overflow: 'hidden', position: 'relative',
        aspectRatio: '4/5',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
      }}>
        <img src={step.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) saturate(1.1)' }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.3) 50%, transparent 100%)',
        }} />
        {/* Text on card */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <p style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
            color: 'rgba(124,58,237,0.8)', marginBottom: '1rem', textTransform: 'uppercase',
          }}>
            Paso 0{index + 1}
          </p>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.02em', whiteSpace: 'pre-line', marginBottom: '1rem',
          }}>
            {step.title}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '400px' }}>
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Ministerios: Full-width cards with hover reveal ─── */
function Ministerios() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ministerios" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 3rem)',
      background: '#09090b',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem',
          }}>
            ( Ministerios )
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            Un espacio para cada<br />
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>etapa de vida</span>
          </h2>
        </motion.div>

        {/* Full-width list items */}
        <div>
          {MINISTERIOS.map((m, i) => (
            <motion.div
              key={m.nombre}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '2rem 0',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background image on hover */}
              <div style={{
                position: 'absolute', inset: 0,
                opacity: hovered === i ? 0.08 : 0,
                transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <img src={m.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.15)',
                    minWidth: '2rem',
                  }}>
                    0{i + 1}
                  </span>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700,
                    transition: 'color 0.3s',
                    color: hovered === i ? '#fff' : 'rgba(255,255,255,0.6)',
                    letterSpacing: '-0.02em',
                  }}>
                    {m.nombre}
                  </h3>
                </div>

                {/* Activities preview on hover */}
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '500px' }}
                >
                  {m.actividades.map(a => (
                    <span key={a} style={{
                      padding: '0.4rem 1rem', fontSize: '0.75rem',
                      background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.15)',
                      borderRadius: '999px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap',
                    }}>
                      {a}
                    </span>
                  ))}
                </motion.div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: hovered === i ? 0 : -10, opacity: hovered === i ? 1 : 0.3 }}
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Donativos: cinematic CTA ─── */
function Donativos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="donativos" ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 4vw, 3rem)',
    }}>
      {/* Parallax BG */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: '-20%', zIndex: 0 }}>
        <img src="/fotos/12.jpg" alt="" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.2) saturate(0.5)',
        }} />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,9,11,0.7)', zIndex: 1 }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
      >
        <p style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '2rem',
        }}>
          ( Donativos )
        </p>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.04em', marginBottom: '2rem',
        }}>
          Gracias por tu<br />generosidad
        </h2>

        <p style={{
          fontSize: '1.15rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.6, marginBottom: '0.5rem',
        }}>
          "Traigan los diezmos al alfolí"
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.15)', marginBottom: '3rem' }}>
          — Malaquías 3:10
        </p>

        <p style={{
          fontSize: '1.05rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7,
          marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem',
        }}>
          Tu donativo permite que nuestra iglesia siga adelante, alcanzando vidas y restaurando familias.
        </p>

        <a href="#" style={{
          display: 'inline-block', padding: '1.1rem 3.5rem',
          background: '#fff', color: '#09090b',
          borderRadius: '999px', fontWeight: 700, fontSize: '0.95rem',
          textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s',
          letterSpacing: '0.02em',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          Dona ahora
        </a>
      </motion.div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      padding: '4rem clamp(1.5rem, 4vw, 3rem) 2rem',
      background: '#09090b', borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem', marginBottom: '4rem',
      }}>
        {/* Brand */}
        <div>
          <img src="/logo1.png" alt="Shalom" style={{ height: '2.5rem', filter: 'invert(1)', marginBottom: '1rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Iglesia Cristiana Shalom<br />Cuernavaca, Morelos
          </p>
        </div>

        {/* Links */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Navegación
          </p>
          {['Inicio', 'Nosotros', 'Soy Nuevo', 'Ministerios', 'Donativos'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} style={{
              display: 'block', color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              fontSize: '0.9rem', padding: '0.3rem 0', transition: 'color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >{l}</a>
          ))}
        </div>

        {/* Horarios */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Servicios
          </p>
          {['Domingos 9:00 AM', 'Domingos 11:00 AM', 'Domingos 1:00 PM'].map(h => (
            <p key={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', padding: '0.3rem 0' }}>{h}</p>
          ))}
        </div>

        {/* Social */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Síguenos
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {SOCIAL.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Iglesia Cristiana Shalom
        </p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          CUERNAVACA, MOR.
        </p>
      </div>
    </footer>
  );
}
