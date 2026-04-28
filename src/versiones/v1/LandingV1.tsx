import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── Data ─── */
const HORARIOS_DOMINGO = ['9:00 AM', '11:00 AM', '1:00 PM'];

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
  { label: 'Nuevo', href: '#nuevo' },
  { label: 'Ministerios', href: '#ministerios' },
  { label: 'Donativos', href: '#donativos' },
];

const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/ICShalomOficial/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name: 'Instagram', url: 'https://www.instagram.com/icshalom/', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 10a2 2 0 110-4 2 2 0 010 4zm4.5-6a.5.5 0 110-1 .5.5 0 010 1z' },
  { name: 'YouTube', url: 'https://www.youtube.com/@icshalom6683', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88.46-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88-.46 8.6-.42a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
];

/* ─── Main Component ─── */
export default function LandingV1() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: '#111' }}>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #eee' : 'none',
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <a href="#inicio" style={{ textDecoration: 'none' }}>
          <img
            src="/logo1.png" alt="Shalom"
            style={{
              height: '3rem', width: 'auto',
              filter: scrolled ? 'none' : 'invert(1)',
              transition: 'filter 0.3s',
            }}
          />
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="v1-nav-desktop">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                color: scrolled ? '#555' : 'rgba(255,255,255,0.85)',
                transition: 'color 0.3s',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@icshalom6683/live"
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.8rem',
              fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em',
              background: scrolled ? '#111' : '#fff', color: scrolled ? '#fff' : '#111',
              transition: 'all 0.3s',
            }}
          >
            EN VIVO
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="v1-nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
            color: scrolled ? '#111' : '#fff',
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
              background: '#fff', borderRadius: '1rem', padding: '1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '0.75rem 0', textDecoration: 'none',
                  color: '#111', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <HeroV1 />

      {/* ── Nosotros ── */}
      <SectionNosotros />

      {/* ── Primera Vez ── */}
      <SectionNuevo />

      {/* ── Ministerios ── */}
      <SectionMinisterios />

      {/* ── Donativos ── */}
      <SectionDonativos />

      {/* ── Footer ── */}
      <FooterV1 />

      {/* ── Styles ── */}
      <style>{`
        .v1-nav-mobile { display: none; }
        @media (max-width: 768px) {
          .v1-nav-desktop { display: none !important; }
          .v1-nav-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Hero: foto full screen + tipografía gigante ─── */
function HeroV1() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio" ref={ref}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}
    >
      {/* Background image with parallax */}
      <motion.div style={{ y, position: 'absolute', inset: '-10% 0', zIndex: 1 }}>
        <img
          src="/fotos/6.jpg" alt="Worship"
          style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(0.4)' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          opacity,
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 2rem', textAlign: 'center',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
            marginBottom: '1.5rem',
          }}
        >
          Iglesia Cristiana Shalom
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 800,
            lineHeight: 1, color: '#fff', margin: '0 0 1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Hay un lugar<br />para ti
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.7)',
            maxWidth: '500px', lineHeight: 1.6, marginBottom: '2.5rem',
          }}
        >
          En Shalom, todos son bienvenidos.
        </motion.p>

        {/* Horarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}
        >
          {HORARIOS_DOMINGO.map(h => (
            <span
              key={h}
              style={{
                padding: '0.5rem 1.25rem', border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '999px', color: '#fff', fontSize: '0.9rem', fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="#nuevo"
            style={{
              padding: '1rem 2.5rem', background: '#fff', color: '#111',
              borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'transform 0.3s',
            }}
          >
            Soy nuevo
          </a>
          <a
            href="#donativos"
            style={{
              padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', background: 'transparent', transition: 'all 0.3s',
            }}
          >
            Donar
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: '2rem' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Nosotros ─── */
function SectionNosotros() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <section id="nosotros" ref={ref} style={{ padding: '8rem 2rem', background: '#fff' }}>
      <motion.div
        style={{ opacity, y, maxWidth: '900px', margin: '0 auto' }}
      >
        <p style={{
          fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem',
        }}>
          Quiénes somos
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1,
          color: '#111', marginBottom: '2rem', letterSpacing: '-0.02em',
        }}>
          30 años siendo un<br />refugio de fe
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.8, color: '#555',
          maxWidth: '700px',
        }}>
          Nuestra iglesia, Iglesia Cristiana Shalom, tiene 30 años siendo un refugio de fe en
          Cuernavaca. Creemos en la restauración del corazón de cada persona y de las familias,
          ya que sabemos que la familia es la base de la sociedad. Nuestra enseñanza se basa en
          la Biblia, la palabra de Dios, y vivimos nuestra fe como una comunidad con influencia
          e impacto en la sociedad, que ama a todos.
        </p>

        {/* Photo strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
          marginTop: '4rem', borderRadius: '1rem', overflow: 'hidden',
        }}>
          {[7, 9, 5].map(n => (
            <div key={n} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={`/fotos/${n}.jpg`} alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>

        {/* Misión / Visión */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem', marginTop: '4rem',
        }}>
          <div style={{ padding: '2rem', background: '#fafafa', borderRadius: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>Misión</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>
              Acoger, sanar y transformar vidas en familia.
            </p>
          </div>
          <div style={{ padding: '2rem', background: '#fafafa', borderRadius: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>Visión</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111', lineHeight: 1.4 }}>
              Familias restauradas transformando su ciudad.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Primera Vez ─── */
function SectionNuevo() {
  return (
    <section id="nuevo" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Full-width image */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px' }}>
        <img
          src="/fotos/3.jpg" alt="Servicio"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
        />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem',
          }}>
            Primera vez
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '600px',
          }}>
            Estamos contentos de que llegues
          </h2>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '5rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.8, color: '#555', marginBottom: '3rem',
          }}>
            Creemos en un plan que Dios tiene para ti y en un propósito para tu vida. Queremos
            acompañarte en tu primera visita. Nos reunimos los domingos en tres horarios: 9:00,
            11:00 y 1:00 PM. La reunión de la 1:00 se transmite en línea. Además, tenemos
            espacios para cada miembro de la familia.
          </p>

          {/* Horarios pills */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem',
          }}>
            {HORARIOS_DOMINGO.map(h => (
              <div
                key={h}
                style={{
                  padding: '1rem 2rem', background: '#111', color: '#fff',
                  borderRadius: '999px', fontWeight: 600, fontSize: '1rem',
                }}
              >
                Domingos {h}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="https://www.youtube.com/@icshalom6683/live"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', border: '1px solid #ddd', borderRadius: '999px',
                color: '#555', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              Ver en línea (Domingos 1:00 PM)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Ministerios ─── */
function SectionMinisterios() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="ministerios" style={{ padding: '8rem 2rem', background: '#fff' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem',
        }}>
          Ministerios
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1,
          color: '#111', marginBottom: '1.5rem', letterSpacing: '-0.02em',
        }}>
          Hay un espacio para<br />cada etapa de vida
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
          Sin importar tu edad o momento, tenemos un lugar donde puedes crecer, conectar y ser parte de algo más grande.
        </p>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {MINISTERIOS.map((m) => (
            <div key={m.nombre} style={{ borderBottom: '1px solid #eee' }}>
              <button
                onClick={() => setExpanded(expanded === m.nombre ? null : m.nombre)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111' }}>{m.nombre}</span>
                <motion.span
                  animate={{ rotate: expanded === m.nombre ? 45 : 0 }}
                  style={{ fontSize: '1.5rem', color: '#999', lineHeight: 1 }}
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
                    <div style={{ paddingBottom: '1.5rem' }}>
                      {m.actividades.map(a => (
                        <div
                          key={a.nombre}
                          style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '0.75rem 1rem', background: '#fafafa', borderRadius: '0.5rem',
                            marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem',
                          }}
                        >
                          <span style={{ fontWeight: 500, color: '#333', fontSize: '0.95rem' }}>{a.nombre}</span>
                          <span style={{ color: '#888', fontSize: '0.85rem' }}>{a.horario}</span>
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
function SectionDonativos() {
  return (
    <section id="donativos" style={{ padding: '8rem 2rem', background: '#111', color: '#fff' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem',
        }}>
          Donativos
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1,
          marginBottom: '1.5rem', letterSpacing: '-0.02em',
        }}>
          Gracias por tu generosidad
        </h2>
        <p style={{
          fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1rem',
        }}>
          "Traigan los diezmos al alfolí"
        </p>
        <p style={{
          fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginBottom: '3rem', fontStyle: 'italic',
        }}>
          — Malaquías 3:10
        </p>
        <p style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '3rem',
        }}>
          Tu donativo permite que nuestra iglesia siga adelante, alcanzando vidas y restaurando familias.
        </p>
        <a
          href="#"
          style={{
            display: 'inline-block', padding: '1rem 3rem', background: '#fff', color: '#111',
            borderRadius: '999px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
            transition: 'transform 0.3s',
          }}
        >
          Dona ahora
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FooterV1() {
  return (
    <footer style={{ padding: '4rem 2rem 2rem', background: '#fafafa', borderTop: '1px solid #eee' }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem',
      }}>
        <img src="/logo-white.png" alt="Shalom Iglesia Cristiana" style={{ height: '5rem', width: 'auto' }} />
        <p style={{ color: '#999', fontSize: '0.9rem' }}>Cuernavaca, Morelos</p>

        {/* Social */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {SOCIAL.map(s => (
            <a
              key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid #ddd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#999', textDecoration: 'none', transition: 'all 0.3s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: '1px', background: '#eee' }} />
        <p style={{ color: '#bbb', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Iglesia Cristiana Shalom. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
