import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── Data ─── */
const FOTOS_CAROUSEL = [
  { src: '/fotos/6.jpg', alt: 'Adoración' },
  { src: '/fotos/3.jpg', alt: 'Worship' },
  { src: '/fotos/7.jpg', alt: 'Comunidad' },
  { src: '/fotos/11.jpg', alt: 'Predicación' },
  { src: '/fotos/8.jpg', alt: 'Jóvenes' },
];

const MINISTERIOS = [
  {
    nombre: 'Hombres',
    desc: 'Recupera: L/Mi/V 7PM · Oración: Sáb 8AM',
    foto: '/fotos/9.jpg',
    color: '#2d2d2d',
  },
  {
    nombre: 'Mujeres',
    desc: 'Recupera: Mi 5PM · Oración: Sáb 9AM',
    foto: '/fotos/7.jpg',
    color: '#8b6f47',
  },
  {
    nombre: 'Jóvenes',
    desc: 'Teens · Young · Unis · Pros · Life',
    foto: '/fotos/8.jpg',
    color: '#4a6741',
  },
  {
    nombre: 'Florece',
    desc: 'Mujeres 25-39 años · Sáb 10:30AM',
    foto: '/fotos/4.jpg',
    color: '#6b4f7a',
  },
  {
    nombre: 'Raíces',
    desc: 'Discipulado integral para crecer en fe',
    foto: '/fotos/5.jpg',
    color: '#3d5a6e',
  },
];

const JOVENES_DETALLE = [
  { nombre: 'Teens', edad: '12-15 años', horario: 'Viernes 7:00 PM' },
  { nombre: 'Young', edad: '15-18 años', horario: 'Viernes 7:00 PM' },
  { nombre: 'Unis', edad: '18-22 años', horario: 'Jueves 7:30 PM' },
  { nombre: 'Pros', edad: '23-31 años', horario: 'Jueves 7:30 PM' },
  { nombre: 'Life', edad: '32-39 años', horario: 'Jueves 7:30 PM' },
];

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Nuevo', href: '#nuevo' },
  { label: 'Ministerios', href: '#ministerios' },
  { label: 'Dar', href: '#donativos' },
];

const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/ICShalomOficial/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'Instagram', url: 'https://www.instagram.com/icshalom/', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 10a2 2 0 110-4 2 2 0 010 4zm4.5-6a.5.5 0 110-1 .5.5 0 010 1z' },
  { name: 'YouTube', url: 'https://www.youtube.com/@icshalom6683', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88.46-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88-.46 8.6-.42a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
];

/* ─── Main ─── */
export default function LandingV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#FAF7F2', color: '#2d2d2d' }}>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <a href="#inicio" style={{ textDecoration: 'none' }}>
          <img
            src="/logo1.png" alt="Shalom"
            style={{
              height: '2.75rem', width: 'auto',
              filter: scrolled ? 'none' : 'invert(1)',
              transition: 'filter 0.3s',
            }}
          />
        </a>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="v2-nav-desktop">
          {NAV_LINKS.map(l => (
            <a
              key={l.label} href={l.href}
              style={{
                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                color: scrolled ? '#666' : 'rgba(255,255,255,0.8)', transition: 'color 0.3s',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@icshalom6683/live"
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem',
              fontWeight: 600, textDecoration: 'none',
              background: '#C8956C', color: '#fff', transition: 'all 0.3s',
            }}
          >
            En Vivo
          </a>
        </div>

        {/* Mobile */}
        <button
          className="v2-nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
            color: scrolled ? '#2d2d2d' : '#fff',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '4rem', left: '1rem', right: '1rem', zIndex: 99,
              background: '#FAF7F2', borderRadius: '1rem', padding: '1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            }}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '0.75rem 0', textDecoration: 'none',
                  color: '#2d2d2d', fontSize: '1rem', fontWeight: 500,
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero with Carousel ── */}
      <HeroV2 />

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Nosotros ── */}
      <NosotrosV2 />

      {/* ── Primera vez ── */}
      <NuevoV2 />

      {/* ── Ministerios ── */}
      <MinisteriosV2 />

      {/* ── Donativos ── */}
      <DonativosV2 />

      {/* ── Footer ── */}
      <FooterV2 />

      <style>{`
        .v2-nav-mobile { display: none; }
        @media (max-width: 768px) {
          .v2-nav-desktop { display: none !important; }
          .v2-nav-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Hero Carousel ─── */
function HeroV2() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % FOTOS_CAROUSEL.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={FOTOS_CAROUSEL[current].src}
          alt={FOTOS_CAROUSEL[current].alt}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'brightness(0.35)',
          }}
        />
      </AnimatePresence>

      {/* Warm overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(139,111,71,0.15), rgba(0,0,0,0.4))',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 2rem', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p style={{
            fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#C8956C', marginBottom: '1.5rem',
          }}>
            Iglesia Cristiana Shalom · Cuernavaca
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700,
            lineHeight: 1.1, color: '#fff', margin: '0 0 1.5rem',
          }}>
            Hay un lugar para ti
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.7)',
            maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.6,
          }}>
            En Shalom, todos son bienvenidos. 30 años restaurando familias en Cuernavaca.
          </p>

          {/* Horarios */}
          <div style={{
            display: 'inline-flex', gap: '0.25rem', background: 'rgba(255,255,255,0.1)',
            borderRadius: '999px', padding: '0.25rem', marginBottom: '2rem', flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {['DOM 9AM', 'DOM 11AM', 'DOM 1PM'].map(h => (
              <span
                key={h}
                style={{
                  padding: '0.6rem 1.25rem', borderRadius: '999px', fontSize: '0.8rem',
                  fontWeight: 600, color: '#fff', letterSpacing: '0.05em',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#nuevo"
              style={{
                padding: '1rem 2.5rem', background: '#C8956C', color: '#fff',
                borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', transition: 'all 0.3s',
              }}
            >
              Soy nuevo
            </a>
            <a
              href="#donativos"
              style={{
                padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', background: 'transparent',
              }}
            >
              Dar
            </a>
          </div>
        </motion.div>

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          display: 'flex', gap: '0.5rem',
        }}>
          {FOTOS_CAROUSEL.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '2rem' : '0.5rem', height: '0.5rem',
                borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: i === current ? '#C8956C' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const text = 'EN LA TIERRA COMO EN EL CIELO · UNA CASA PARA TODOS · RESTAURANDO FAMILIAS · ';
  return (
    <div style={{
      overflow: 'hidden', background: '#C8956C', padding: '0.75rem 0',
      whiteSpace: 'nowrap',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'inline-block' }}
      >
        {[0, 1, 2, 3].map(i => (
          <span
            key={i}
            style={{
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
              color: '#fff', textTransform: 'uppercase',
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Nosotros ─── */
function NosotrosV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section id="nosotros" ref={ref} style={{ padding: '6rem 2rem', background: '#FAF7F2' }}>
      <motion.div style={{ opacity, y, maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'center',
        }}>
          {/* Image */}
          <div style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/5' }}>
            <img
              src="/fotos/11.jpg" alt="Pastor"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Text */}
          <div>
            <p style={{
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
            }}>
              Quiénes somos
            </p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
              color: '#2d2d2d', marginBottom: '1.5rem',
            }}>
              30 años siendo un refugio de fe en Cuernavaca
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#666', marginBottom: '2rem' }}>
              Creemos en la restauración del corazón de cada persona y de las familias, ya que
              sabemos que la familia es la base de la sociedad. Nuestra enseñanza se basa en la
              Biblia, la palabra de Dios, y vivimos nuestra fe como una comunidad con influencia
              e impacto en la sociedad, que ama a todos.
            </p>

            {/* Mission / Vision cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                padding: '1.25rem 1.5rem', background: '#fff', borderRadius: '1rem',
                borderLeft: '3px solid #C8956C',
              }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '0.4rem' }}>Misión</p>
                <p style={{ fontWeight: 600, color: '#2d2d2d' }}>Acoger, sanar y transformar vidas en familia.</p>
              </div>
              <div style={{
                padding: '1.25rem 1.5rem', background: '#fff', borderRadius: '1rem',
                borderLeft: '3px solid #C8956C',
              }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '0.4rem' }}>Visión</p>
                <p style={{ fontWeight: 600, color: '#2d2d2d' }}>Familias restauradas transformando su ciudad.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Primera vez ─── */
function NuevoV2() {
  return (
    <section id="nuevo" style={{ padding: '6rem 2rem', background: '#fff' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
          }}>
            Primera vez
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
            color: '#2d2d2d', marginBottom: '1rem',
          }}>
            Bienvenido a casa
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Creemos en un plan que Dios tiene para ti y en un propósito para tu vida. Queremos
            acompañarte en tu primera visita.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem', marginBottom: '3rem',
        }}>
          {[
            { step: '01', title: 'Ven el domingo', desc: '9:00 AM, 11:00 AM o 1:00 PM' },
            { step: '02', title: 'Te recibimos', desc: 'Un equipo te dará la bienvenida' },
            { step: '03', title: 'Encuentra tu lugar', desc: 'Hay espacio para toda la familia' },
          ].map(s => (
            <div key={s.step} style={{
              padding: '2rem', background: '#FAF7F2', borderRadius: '1rem', textAlign: 'center',
            }}>
              <span style={{
                display: 'inline-block', fontSize: '2rem', fontWeight: 800, color: '#C8956C',
                marginBottom: '0.75rem', opacity: 0.5,
              }}>
                {s.step}
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2d2d2d', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Live badge */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://www.youtube.com/@icshalom6683/live"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1.5rem', background: '#FAF7F2', borderRadius: '999px',
              textDecoration: 'none', color: '#666', fontSize: '0.9rem', fontWeight: 500,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <span style={{
              position: 'relative', display: 'flex', width: '10px', height: '10px',
            }}>
              <span style={{
                position: 'absolute', inset: '-2px', borderRadius: '50%',
                background: '#ef4444', opacity: 0.4,
                animation: 'v2pulse 1.5s infinite',
              }} />
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444',
                position: 'relative',
              }} />
            </span>
            Domingos 1:00 PM en línea
          </a>
        </div>
      </div>

      <style>{`
        @keyframes v2pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ─── Ministerios ─── */
function MinisteriosV2() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="ministerios" style={{ padding: '6rem 2rem', background: '#FAF7F2' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
          }}>
            Ministerios
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
            color: '#2d2d2d',
          }}>
            Hay un espacio para ti
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {MINISTERIOS.map(m => (
            <motion.div
              key={m.nombre}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(selected === m.nombre ? null : m.nombre)}
              style={{
                position: 'relative', borderRadius: '1rem', overflow: 'hidden',
                aspectRatio: '3/4', cursor: 'pointer',
              }}
            >
              <img
                src={m.foto} alt={m.nombre}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '1.5rem',
              }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                  {m.nombre}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Jóvenes detail */}
        <AnimatePresence>
          {selected === 'Jóvenes' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', marginTop: '1.5rem' }}
            >
              <div style={{
                background: '#fff', borderRadius: '1rem', padding: '2rem',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem',
              }}>
                {JOVENES_DETALLE.map(j => (
                  <div key={j.nombre} style={{
                    padding: '1.25rem', background: '#FAF7F2', borderRadius: '0.75rem', textAlign: 'center',
                  }}>
                    <p style={{ fontWeight: 700, color: '#2d2d2d', marginBottom: '0.25rem' }}>{j.nombre}</p>
                    <p style={{ fontSize: '0.8rem', color: '#C8956C', marginBottom: '0.25rem' }}>{j.edad}</p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>{j.horario}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Donativos ─── */
function DonativosV2() {
  return (
    <section id="donativos" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
      color: '#fff',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
        }}>
          Donativos
        </p>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}>
          Gracias por tu generosidad
        </h2>

        {/* Quote */}
        <div style={{
          padding: '1.5rem 2rem', background: 'rgba(200,149,108,0.1)',
          borderRadius: '1rem', border: '1px solid rgba(200,149,108,0.2)',
          marginBottom: '2rem',
        }}>
          <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            "Traigan los diezmos al alfolí"
          </p>
          <p style={{ color: '#C8956C', fontSize: '0.85rem', marginTop: '0.5rem' }}>Malaquías 3:10</p>
        </div>

        <p style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem',
        }}>
          Tu donativo permite que nuestra iglesia siga adelante, alcanzando vidas y restaurando familias.
        </p>

        <a
          href="#"
          style={{
            display: 'inline-block', padding: '1rem 3rem',
            background: '#C8956C', color: '#fff',
            borderRadius: '999px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
          }}
        >
          Dona ahora
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FooterV2() {
  return (
    <footer style={{ padding: '3rem 2rem 1.5rem', background: '#FAF7F2', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
      }}>
        <img src="/logo-white.png" alt="Shalom Iglesia Cristiana" style={{ height: '5rem', width: 'auto' }} />

        <p style={{ color: '#999', fontSize: '0.85rem' }}>Cuernavaca, Morelos · Domingos 9, 11 y 1 PM</p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {SOCIAL.map(s => (
            <a
              key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#999', textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.06)' }} />
        <p style={{ color: '#ccc', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Iglesia Cristiana Shalom
        </p>
      </div>
    </footer>
  );
}
