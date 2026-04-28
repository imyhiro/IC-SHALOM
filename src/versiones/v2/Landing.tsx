import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';

/* ─── CMS Context ─── */
interface CMSData {
  carousel: { src: string; alt: string }[];
  anuncios: string[];
  contenido: Record<string, string>;
  loaded: boolean;
}

const CMSContext = createContext<{ data: CMSData; update: (key: string, value: string) => void }>({
  data: { carousel: [], anuncios: [], contenido: {}, loaded: false },
  update: () => {},
});

const useCMS = () => useContext(CMSContext).data;

/* ─── Theme ─── */
const LIGHT = {
  bg: '#FAF7F2',
  bgAlt: '#fff',
  card: '#fff',
  cardAlt: '#FAF7F2',
  text: '#2d2d2d',
  textSecondary: '#666',
  textMuted: '#888',
  navBg: 'rgba(250,247,242,0.95)',
  navText: '#666',
  border: 'rgba(0,0,0,0.06)',
  socialBg: 'rgba(0,0,0,0.04)',
  socialColor: '#999',
  footerBg: '#FAF7F2',
  footerText: '#999',
  footerCopy: '#ccc',
  mobileBg: '#FAF7F2',
  mobileShadow: '0 20px 60px rgba(0,0,0,0.1)',
  logoFilter: 'invert(1)',
};

const DARK = {
  bg: '#1a1a1a',
  bgAlt: '#141414',
  card: '#242424',
  cardAlt: '#1e1e1e',
  text: '#f0f0f0',
  textSecondary: '#aaa',
  textMuted: '#777',
  navBg: 'rgba(20,20,20,0.95)',
  navText: 'rgba(255,255,255,0.7)',
  border: 'rgba(255,255,255,0.08)',
  socialBg: 'rgba(255,255,255,0.06)',
  socialColor: '#777',
  footerBg: '#0d0d0d',
  footerText: '#777',
  footerCopy: '#555',
  mobileBg: '#1e1e1e',
  mobileShadow: '0 20px 60px rgba(0,0,0,0.4)',
  logoFilter: 'none',
};

type Theme = typeof LIGHT;

/* ─── Fallback Data ─── */
const FOTOS_CAROUSEL_DEFAULT = [
  { src: '/fotos/6.jpg', alt: 'Adoración' },
  { src: '/fotos/3.jpg', alt: 'Worship' },
  { src: '/fotos/7.jpg', alt: 'Comunidad' },
  { src: '/fotos/11.jpg', alt: 'Predicación' },
  { src: '/fotos/8.jpg', alt: 'Jóvenes' },
];

const ANUNCIOS_DEFAULT = ['EN LA TIERRA COMO EN EL CIELO', 'UNA CASA PARA TODOS', 'RESTAURANDO FAMILIAS'];

const MINISTERIOS = [
  { nombre: 'Hombres', desc: 'Recupera: L/Mi/V 7PM · Oración: Sáb 8AM', foto: '/fotos/9.jpg' },
  { nombre: 'Mujeres', desc: 'Recupera: Mi 5PM · Oración: Sáb 9AM', foto: '/fotos/7.jpg' },
  { nombre: 'Jóvenes', desc: 'Teens · Young · Unis · Pros · Life', foto: '/fotos/8.jpg' },
  { nombre: 'Florece', desc: 'Mujeres 25-39 años · Sáb 10:30AM', foto: '/fotos/4.jpg' },
  { nombre: 'Raíces', desc: 'Discipulado integral para crecer en fe', foto: '/fotos/5.jpg' },
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
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [showLiveInfo, setShowLiveInfo] = useState(false);
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    const close = () => setShowLiveInfo(false);
    if (showLiveInfo) {
      setTimeout(() => document.addEventListener('click', close), 0);
      return () => document.removeEventListener('click', close);
    }
  }, [showLiveInfo]);

  const [cms, setCms] = useState<CMSData>({
    carousel: FOTOS_CAROUSEL_DEFAULT,
    anuncios: ANUNCIOS_DEFAULT,
    contenido: {},
    loaded: false,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setCms(prev => ({ ...prev, loaded: true }));
      return;
    }
    Promise.all([
      supabase.from('carousel_images').select('src, alt').eq('activo', true).order('orden'),
      supabase.from('anuncios').select('texto').eq('activo', true).order('id'),
      supabase.from('contenido').select('clave, valor'),
    ]).then(([c, a, co]) => {
      const contenidoMap: Record<string, string> = {};
      co.data?.forEach((x: { clave: string; valor: string }) => { contenidoMap[x.clave] = x.valor; });
      setCms({
        carousel: c.data?.length ? c.data : FOTOS_CAROUSEL_DEFAULT,
        anuncios: a.data?.length ? a.data.map((x: { texto: string }) => x.texto) : ANUNCIOS_DEFAULT,
        contenido: contenidoMap,
        loaded: true,
      });
    });
  }, []);

  return (
    <CMSContext.Provider value={{ data: cms, update: (key, val) => setCms(prev => ({ ...prev, contenido: { ...prev.contenido, [key]: val } })) }}>
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: t.bg, color: t.text, transition: 'background 0.3s, color 0.3s' }}>
        {/* ── Navbar ── */}
        <nav
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
            background: scrolled ? t.navBg : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
            transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <a href="#inicio" style={{ textDecoration: 'none' }}>
            <img
              src="/logo-white-t.png" alt="Shalom"
              style={{
                height: '6rem', width: 'auto',
                filter: scrolled ? t.logoFilter : 'brightness(2)',
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
                  color: scrolled ? t.navText : 'rgba(255,255,255,0.8)', transition: 'color 0.3s',
                }}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              style={{
                background: 'none', border: `1px solid ${scrolled ? t.border : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '50%', width: '2rem', height: '2rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: scrolled ? t.navText : 'rgba(255,255,255,0.8)',
                transition: 'all 0.3s',
              }}
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  document.getElementById('ultima-predica')?.scrollIntoView({ behavior: 'smooth' });
                  setShowLiveInfo(true);
                }}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem',
                  fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: '#C8956C', color: '#fff', transition: 'all 0.3s',
                }}
              >
                En Vivo
              </button>
              {showLiveInfo && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, width: '280px',
                  background: t.card, borderRadius: '1rem', padding: '1.25rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: `1px solid ${t.border}`,
                  zIndex: 200,
                }}>
                  <p style={{ fontWeight: 700, color: t.text, fontSize: '0.95rem', marginBottom: '0.75rem' }}>Transmisión en vivo</p>
                  <p style={{ color: t.textSecondary, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    Todos los <strong style={{ color: '#C8956C' }}>domingos a la 1:00 PM</strong> (hora México) el video aparece automáticamente en la página principal.
                  </p>
                  <a
                    href="https://www.youtube.com/@icshalom6683/live"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-block', padding: '0.5rem 1rem', background: '#ef4444',
                      color: '#fff', borderRadius: '999px', fontSize: '0.8rem',
                      fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    Ir a YouTube
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="v2-nav-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setDark(!dark)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: scrolled ? t.text : '#fff' }}
            >
              {dark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: scrolled ? t.text : '#fff' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <path d="M18 6L6 18M6 6l12 12" />
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed', top: '4rem', left: '1rem', right: '1rem', zIndex: 99,
                background: t.mobileBg, borderRadius: '1rem', padding: '1.5rem',
                boxShadow: t.mobileShadow, border: `1px solid ${t.border}`,
              }}
            >
              {NAV_LINKS.map(l => (
                <a
                  key={l.label} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block', padding: '0.75rem 0', textDecoration: 'none',
                    color: t.text, fontSize: '1rem', fontWeight: 500,
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Hero />
        <Nosotros theme={t} />
        <Nuevo theme={t} />
        <MinisteriosSection theme={t} />
        <Donativos />
        <Footer theme={t} />

        <style>{`
          .v2-nav-mobile { display: none !important; }
          @media (max-width: 768px) {
            .v2-nav-desktop { display: none !important; }
            .v2-nav-mobile { display: flex !important; }
          }
        `}</style>
      </div>
    </CMSContext.Provider>
  );
}

/* ─── Live check: RSS (gratis) + videos API (1 unidad por llamada) ─── */
const YT_API_KEY = 'AIzaSyAd6Q6DricJ7hcUca2i3-a530g5Y59z1P8';
const YT_CHANNEL_ID = 'UCHhNYVMIF5ix4CmRNa1YmMQ';
// Override temporal: usa window.__LIVE_VIDEO_ID del index.html, o null para detección automática.
const FORCE_LIVE_VIDEO_ID: string | null = (window as any).__LIVE_VIDEO_ID || null;

function useIsLive() {
  const [isLive, setIsLive] = useState(!!FORCE_LIVE_VIDEO_ID);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(FORCE_LIVE_VIDEO_ID);

  useEffect(() => {
    if (FORCE_LIVE_VIDEO_ID) {
      if (supabase) {
        supabase.from('contenido').update({ valor: FORCE_LIVE_VIDEO_ID }).eq('clave', 'youtube_video_id');
      }
      return;
    }

    // Detección de live solo domingos 12:30-15:30
    const check = async () => {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
      const day = now.getDay();
      const totalMin = now.getHours() * 60 + now.getMinutes();
      if (day !== 0 || totalMin < 750 || totalMin > 930) {
        setIsLive(false);
        return;
      }

      try {
        let res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YT_CHANNEL_ID}&eventType=live&type=video&key=${YT_API_KEY}`
        );
        let data = await res.json();

        if (!data.items?.length) {
          res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YT_CHANNEL_ID}&eventType=upcoming&type=video&key=${YT_API_KEY}`
          );
          data = await res.json();
        }

        if (data.items?.length > 0) {
          const videoId = data.items[0].id.videoId;
          setIsLive(true);
          setLiveVideoId(videoId);
          if (supabase && videoId) {
            supabase.from('contenido').update({ valor: videoId }).eq('clave', 'youtube_video_id');
          }
        } else {
          setIsLive(false);
        }
      } catch {
        setIsLive(false);
      }
    };

    check();
    const timer = setInterval(check, 600000);
    return () => clearInterval(timer);
  }, []);

  console.log('[LIVE DEBUG] isLive=' + isLive + ' videoId=' + liveVideoId);
  return { isLive, liveVideoId };
}

/* ─── Hero Carousel ─── */
function Hero() {
  const cms = useCMS();
  const images = cms.carousel;
  const [current, setCurrent] = useState(0);
  const { isLive, liveVideoId } = useIsLive();

  useEffect(() => {
    if (!images.length || isLive) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length, isLive]);

  const c = cms.contenido;
  const titulo = c.hero_titulo || 'Hay un lugar para ti';
  const subtitulo = c.hero_subtitulo || 'En Shalom, todos son bienvenidos. 30 años restaurando familias en Cuernavaca.';
  const horarios = c.horarios ? c.horarios.split(',') : ['DOM 9AM', 'DOM 11AM', 'DOM 1PM'];

  if (!images.length && !isLive) return null;

  return (
    <section id="inicio" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Live stream or carousel */}
      {isLive ? (
        <iframe
          src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
          title="En Vivo - IC Shalom"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            border: 'none', zIndex: 0,
          }}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
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
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: isLive
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)'
          : 'linear-gradient(to bottom, rgba(139,111,71,0.15), rgba(0,0,0,0.4))',
        zIndex: 1, pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: isLive ? 'flex-start' : 'center',
        padding: isLive ? '6rem 2rem 0' : '0 2rem', textAlign: 'center',
        pointerEvents: isLive ? 'none' : 'auto',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {isLive && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(239,68,68,0.9)', padding: '0.4rem 1rem',
              borderRadius: '999px', marginBottom: '1rem',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#fff', animation: 'v2pulse 1.5s infinite',
              }} />
              <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                EN VIVO
              </span>
            </div>
          )}

          <p style={{
            fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#C8956C', marginBottom: '1.5rem',
          }}>
            Iglesia Cristiana Shalom · Cuernavaca
          </p>

          {!isLive && (
            <>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700,
                lineHeight: 1.1, color: '#fff', margin: '0 0 1.5rem',
              }}>
                {titulo}
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.7)',
                maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.6,
              }}>
                {subtitulo}
              </p>

              <div style={{
                display: 'inline-flex', gap: '0.25rem', background: 'rgba(255,255,255,0.1)',
                borderRadius: '999px', padding: '0.25rem', marginBottom: '2rem', flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {horarios.map(h => (
                  <span key={h} style={{
                    padding: '0.6rem 1.25rem', borderRadius: '999px', fontSize: '0.8rem',
                    fontWeight: 600, color: '#fff', letterSpacing: '0.05em',
                  }}>
                    {h.trim()}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#nuevo" style={{
                  padding: '1rem 2.5rem', background: '#C8956C', color: '#fff',
                  borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}>Soy nuevo</a>
                <a href="#donativos" style={{
                  padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', borderRadius: '999px', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', background: 'transparent',
                }}>Dar</a>
              </div>
            </>
          )}
        </motion.div>

        {!isLive && (
          <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', gap: '0.5rem' }}>
            {images.map((_, i) => (
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
        )}
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
function MarqueeBanner() {
  const cms = useCMS();
  const text = cms.anuncios.join(' · ') + ' · ';

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
          <span key={i} style={{
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
            color: '#fff', textTransform: 'uppercase',
          }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Nosotros ─── */
function Nosotros({ theme: t }: { theme: Theme }) {
  const cms = useCMS();
  const c = cms.contenido;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section id="nosotros" ref={ref} style={{ background: t.bg, scrollMarginTop: '7rem', transition: 'background 0.3s' }}>
      <MarqueeBanner />
      <div style={{ padding: '6rem 2rem' }}>
        <motion.div style={{ opacity, y, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem', alignItems: 'center',
          }}>
            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/fotos/11.jpg" alt="Pastor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div>
              <p style={{
                fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
              }}>Quiénes somos</p>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2,
                color: t.text, marginBottom: '1.5rem', transition: 'color 0.3s',
              }}>
                {c.nosotros_titulo || '30 años siendo un refugio de fe en Cuernavaca'}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: t.textSecondary, marginBottom: '2rem', transition: 'color 0.3s' }}>
                {c.nosotros_texto || 'Creemos en la restauración del corazón de cada persona y de las familias, ya que sabemos que la familia es la base de la sociedad. Nuestra enseñanza se basa en la Biblia, la palabra de Dios, y vivimos nuestra fe como una comunidad con influencia e impacto en la sociedad, que ama a todos.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.25rem 1.5rem', background: t.card, borderRadius: '1rem', borderLeft: '3px solid #C8956C', transition: 'background 0.3s' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '0.4rem' }}>Misión</p>
                  <p style={{ fontWeight: 600, color: t.text, transition: 'color 0.3s' }}>{c.mision || 'Acoger, sanar y transformar vidas en familia.'}</p>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', background: t.card, borderRadius: '1rem', borderLeft: '3px solid #C8956C', transition: 'background 0.3s' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '0.4rem' }}>Visión</p>
                  <p style={{ fontWeight: 600, color: t.text, transition: 'color 0.3s' }}>{c.vision || 'Familias restauradas transformando su ciudad.'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Primera vez ─── */
function Nuevo({ theme: t }: { theme: Theme }) {
  const [liveInfoOpen, setLiveInfoOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const close = () => setLiveInfoOpen(false);
    if (liveInfoOpen) {
      setTimeout(() => document.addEventListener('click', close), 0);
      return () => document.removeEventListener('click', close);
    }
  }, [liveInfoOpen]);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', como_se_entero: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError('Nombre y teléfono son obligatorios');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setSending(true);
    if (supabase) {
      const { error: err } = await supabase.from('personas_nuevas').insert([{
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        email: form.email.trim() || null,
        como_se_entero: form.como_se_entero || null,
      }]);
      if (err) {
        setError('Error al enviar, intenta de nuevo');
        setTimeout(() => setError(''), 3000);
        setSending(false);
        return;
      }
    }
    setSending(false);
    setSent(true);
    setForm({ nombre: '', telefono: '', email: '', como_se_entero: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', background: t.cardAlt,
    border: `1px solid ${t.border}`, borderRadius: '0.75rem',
    color: t.text, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
    transition: 'all 0.3s',
  };

  return (
    <section id="nuevo" style={{ padding: '6rem 2rem', background: t.bgAlt, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem' }}>Primera vez</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2, color: t.text, marginBottom: '1rem', transition: 'color 0.3s' }}>Bienvenido a casa</h2>
          <p style={{ fontSize: '1.05rem', color: t.textSecondary, lineHeight: 1.7, maxWidth: '600px', margin: '0 auto', transition: 'color 0.3s' }}>
            Creemos en un plan que Dios tiene para ti y en un propósito para tu vida. Queremos acompañarte en tu primera visita.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { step: '01', title: 'Ven el domingo', desc: '9:00 AM, 11:00 AM o 1:00 PM' },
            { step: '02', title: 'Te recibimos', desc: 'Un equipo te dará la bienvenida' },
            { step: '03', title: 'Encuentra tu lugar', desc: 'Hay espacio para toda la familia' },
          ].map(s => (
            <div key={s.step} style={{
              padding: '2rem', background: t.cardAlt, borderRadius: '1rem', textAlign: 'center',
              border: `1px solid ${t.border}`, transition: 'all 0.3s',
            }}>
              <span style={{ display: 'inline-block', fontSize: '2rem', fontWeight: 800, color: '#C8956C', marginBottom: '0.75rem', opacity: 0.5 }}>{s.step}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: t.text, marginBottom: '0.5rem', transition: 'color 0.3s' }}>{s.title}</h3>
              <p style={{ color: t.textMuted, fontSize: '0.9rem', transition: 'color 0.3s' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Formulario personas nuevas */}
        <div style={{ maxWidth: '500px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <button
            onClick={() => setFormOpen(!formOpen)}
            style={{
              padding: '0.85rem 2.5rem', background: '#C8956C', color: '#fff',
              border: 'none', borderRadius: '999px', fontSize: '1rem',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s',
              display: formOpen ? 'none' : 'inline-block',
            }}
          >
            Regístrate
          </button>

          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  background: t.card, borderRadius: '1.25rem',
                  padding: '2.5rem', border: `1px solid ${t.border}`, transition: 'background 0.3s, border 0.3s',
                }}>
                  {sent ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#22c55e' }}>&#10003;</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: t.text, marginBottom: '0.5rem' }}>Registro enviado</h3>
                      <p style={{ color: t.textSecondary, fontSize: '0.95rem' }}>Te esperamos este domingo. Bienvenido a casa.</p>
                      <button
                        onClick={() => { setSent(false); setFormOpen(false); }}
                        style={{
                          marginTop: '1.5rem', padding: '0.6rem 1.5rem', background: 'none',
                          border: `1px solid ${t.border}`, borderRadius: '999px', color: t.textSecondary,
                          fontSize: '0.85rem', cursor: 'pointer',
                        }}
                      >
                        Cerrar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: t.text, flex: 1, textAlign: 'center' }}>
                          Regístrate
                        </h3>
                        <button
                          onClick={() => setFormOpen(false)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: t.textMuted, fontSize: '1.25rem', padding: '0.25rem',
                          }}
                        >
                          &times;
                        </button>
                      </div>
                      <p style={{ color: t.textMuted, fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                        Déjanos tus datos y te recibiremos con los brazos abiertos
                      </p>

                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                          placeholder="Nombre *"
                          value={form.nombre}
                          onChange={e => setForm({ ...form, nombre: e.target.value })}
                          style={inputStyle}
                        />
                        <input
                          placeholder="Teléfono *"
                          type="tel"
                          value={form.telefono}
                          onChange={e => setForm({ ...form, telefono: e.target.value })}
                          style={inputStyle}
                        />
                        <input
                          placeholder="Email (opcional)"
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          style={inputStyle}
                        />
                        <select
                          value={form.como_se_entero}
                          onChange={e => setForm({ ...form, como_se_entero: e.target.value })}
                          style={{ ...inputStyle, appearance: 'none', color: form.como_se_entero ? t.text : t.textMuted }}
                        >
                          <option value="">¿Cómo te enteraste? (opcional)</option>
                          <option value="redes_sociales">Redes sociales</option>
                          <option value="invitacion">Me invitaron</option>
                          <option value="paso_por_aqui">Pasé por aquí</option>
                          <option value="busqueda">Búsqueda en internet</option>
                          <option value="otro">Otro</option>
                        </select>

                        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{error}</p>}

                        <button
                          type="submit"
                          disabled={sending}
                          style={{
                            padding: '0.85rem', background: '#C8956C', color: '#fff',
                            border: 'none', borderRadius: '999px', fontSize: '1rem',
                            fontWeight: 600, cursor: sending ? 'wait' : 'pointer',
                            opacity: sending ? 0.7 : 1, transition: 'all 0.3s',
                          }}
                        >
                          {sending ? 'Enviando...' : 'Enviar'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ textAlign: 'center', position: 'relative', display: 'inline-block', width: '100%' }}>
          <button
            onClick={() => setLiveInfoOpen(!liveInfoOpen)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1.5rem', background: t.cardAlt, borderRadius: '999px',
              color: t.textSecondary, fontSize: '0.9rem', fontWeight: 500,
              border: `1px solid ${t.border}`, transition: 'all 0.3s', cursor: 'pointer',
            }}
          >
            <span style={{ position: 'relative', display: 'flex', width: '10px', height: '10px' }}>
              <span style={{ position: 'absolute', inset: '-2px', borderRadius: '50%', background: '#ef4444', opacity: 0.4, animation: 'v2pulse 1.5s infinite' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', position: 'relative' }} />
            </span>
            Domingos 1:00 PM en línea
          </button>

          <AnimatePresence>
            {liveInfoOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden', marginTop: '1rem' }}
              >
                <div style={{
                  background: t.card, borderRadius: '1rem', padding: '1.5rem',
                  border: `1px solid ${t.border}`, textAlign: 'left',
                  maxWidth: '400px', margin: '0 auto',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <p style={{ fontWeight: 700, color: t.text, fontSize: '1rem' }}>Transmisión en vivo</p>
                    <button onClick={() => setLiveInfoOpen(false)} style={{ background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', fontSize: '1.25rem' }}>&times;</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: t.textSecondary, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <p><strong style={{ color: '#C8956C' }}>Horario:</strong> Domingos 1:00 PM (hora México)</p>
                    <p><strong style={{ color: '#C8956C' }}>Plataforma:</strong> YouTube</p>
                    <p><strong style={{ color: '#C8956C' }}>En la página:</strong> El video aparece automáticamente en la sección principal 10 minutos antes de iniciar.</p>
                    <p><strong style={{ color: '#C8956C' }}>Después del servicio:</strong> La predicación queda disponible en el footer como "Última predicación".</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
function MinisteriosSection({ theme: t }: { theme: Theme }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="ministerios" style={{ padding: '6rem 2rem', background: t.bg, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem' }}>Ministerios</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2, color: t.text, transition: 'color 0.3s' }}>Hay un espacio para ti</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {MINISTERIOS.map(m => (
            <motion.div
              key={m.nombre} whileHover={{ y: -4 }}
              onClick={() => setSelected(selected === m.nombre ? null : m.nombre)}
              style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer' }}
            >
              <img src={m.foto} alt={m.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem',
              }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.25rem' }}>{m.nombre}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.4 }}>{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected === 'Jóvenes' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', marginTop: '1.5rem' }}
            >
              <div style={{
                background: t.card, borderRadius: '1rem', padding: '2rem',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem',
                transition: 'background 0.3s',
              }}>
                {JOVENES_DETALLE.map(j => (
                  <div key={j.nombre} style={{
                    padding: '1.25rem', background: t.cardAlt, borderRadius: '0.75rem', textAlign: 'center',
                    border: `1px solid ${t.border}`, transition: 'all 0.3s',
                  }}>
                    <p style={{ fontWeight: 700, color: t.text, marginBottom: '0.25rem', transition: 'color 0.3s' }}>{j.nombre}</p>
                    <p style={{ fontSize: '0.8rem', color: '#C8956C', marginBottom: '0.25rem' }}>{j.edad}</p>
                    <p style={{ fontSize: '0.8rem', color: t.textMuted, transition: 'color 0.3s' }}>{j.horario}</p>
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
function Donativos() {
  return (
    <section id="donativos" style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)', color: '#fff' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem' }}>Donativos</p>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem' }}>Gracias por tu generosidad</h2>

        <div style={{ padding: '1.5rem 2rem', background: 'rgba(200,149,108,0.1)', borderRadius: '1rem', border: '1px solid rgba(200,149,108,0.2)', marginBottom: '2rem' }}>
          <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.6 }}>"Traigan los diezmos al alfolí"</p>
          <p style={{ color: '#C8956C', fontSize: '0.85rem', marginTop: '0.5rem' }}>Malaquías 3:10</p>
        </div>

        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Tu donativo permite que nuestra iglesia siga adelante, alcanzando vidas y restaurando familias.
        </p>

        <a href="#" style={{
          display: 'inline-block', padding: '1rem 3rem', background: '#C8956C', color: '#fff',
          borderRadius: '999px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
        }}>Dona ahora</a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer({ theme: t }: { theme: Theme }) {
  const cms = useCMS();
  const fallbackVideoId = cms.contenido.youtube_video_id;
  const [videoId, setVideoId] = useState<string | null>(null);

  // Al montar, obtener último video vía RSS (gratis, sin cuota)
  useEffect(() => {
    (async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`);
        const xml = await res.text();
        const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        if (match?.[1]) {
          setVideoId(match[1]);
          if (supabase) {
            supabase.from('contenido').update({ valor: match[1] }).eq('clave', 'youtube_video_id');
          }
        }
      } catch { /* silenciar */ }
    })();
  }, []);

  const displayVideoId = videoId || fallbackVideoId;

  return (
    <footer style={{ padding: '3rem 2rem 1.5rem', background: t.footerBg, borderTop: `1px solid ${t.border}`, transition: 'all 0.3s' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

        {/* Última predicación */}
        {displayVideoId && (
          <div id="ultima-predica" style={{ width: '100%', maxWidth: '500px', textAlign: 'center', scrollMarginTop: '7rem' }}>
            <p style={{
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#C8956C', marginBottom: '1rem',
            }}>
              Última predicación
            </p>
            <div style={{
              position: 'relative', paddingBottom: '56.25%', borderRadius: '1rem',
              overflow: 'hidden', background: '#000',
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${displayVideoId}`}
                title="Última predicación"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', border: 'none',
                }}
              />
            </div>
          </div>
        )}

        <img src="/logo-white-t.png" alt="Shalom Iglesia Cristiana" style={{ height: '8rem', width: 'auto', filter: t.logoFilter, transition: 'filter 0.3s' }} />
        <p style={{ color: t.footerText, fontSize: '0.85rem', transition: 'color 0.3s' }}>Cuernavaca, Morelos · Domingos 9, 11 y 1 PM</p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {SOCIAL.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              width: '2.25rem', height: '2.25rem', borderRadius: '50%',
              background: t.socialBg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: t.socialColor, textDecoration: 'none', transition: 'all 0.3s',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: '1px', background: t.border, transition: 'background 0.3s' }} />
        <p style={{ color: t.footerCopy, fontSize: '0.75rem', transition: 'color 0.3s' }}>
          © {new Date().getFullYear()} Iglesia Cristiana Shalom
        </p>
      </div>
    </footer>
  );
}
