import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Radio, Users } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';
import { getVisitorCount } from '../lib/supabase';

export function Hero() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Only increment once per session
    const sessionKey = 'visitor_counted';
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    if (!alreadyCounted && !hasIncremented) {
      getVisitorCount().then((count) => {
        setVisitorCount(count);
        sessionStorage.setItem(sessionKey, 'true');
        setHasIncremented(true);
      });
    } else {
      // Just get cached count
      const cached = localStorage.getItem('visitor_count');
      setVisitorCount(cached ? parseInt(cached) : 1247);
    }
  }, [hasIncremented]);

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background con gradiente - transparente en el borde izquierdo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-secondary) 22%, var(--bg-primary) 50%, var(--bg-tertiary) 100%)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Efecto de luz radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(212, 168, 83, 0.1), transparent 70%)',
          opacity: 0.8,
        }}
      />

      {/* Partículas de fondo */}
      <BackgroundParticles />

      {/* Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
          marginTop: '-6rem',
        }}
      >
        {/* Logo animado */}
        <div style={{ marginBottom: '-12rem' }}>
          <AnimatedLogo size="xl" className="mx-auto" />
        </div>

        {/* Slogan */}
        <motion.h1
          style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span style={{ color: 'var(--text-primary)' }}>Una casa para </span>
          <span className="text-gradient-gold">todos</span>
        </motion.h1>

        {/* Horarios */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            color: 'var(--text-muted)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold)' }} />
            <span>Domingos 9:00 | 11:00 | 13:00 hrs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold)' }} />
            <span>Cuernavaca, Morelos</span>
          </div>
        </motion.div>

        {/* Botones */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a
              href="#contacto"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visítanos
            </motion.a>
            <motion.a
              href="#intercesion"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Deja tu petición
            </motion.a>
          </div>

          {/* Botón En Vivo */}
          <motion.a
            href="https://www.youtube.com/@icshalom6683/live"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              padding: '0.6rem 1.25rem',
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              borderRadius: '9999px',
              color: '#ef4444',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              scale: 1.05,
              background: 'rgba(220, 38, 38, 0.25)',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Indicador pulsante */}
            <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.span
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  opacity: 0.5,
                }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </span>
            <Radio style={{ width: '1rem', height: '1rem' }} />
            <span>En Vivo</span>
          </motion.a>

          {/* Contador de visitas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(212, 168, 83, 0.08)',
              border: '1px solid rgba(212, 168, 83, 0.2)',
              borderRadius: '9999px',
            }}
          >
            <Users style={{ width: '1rem', height: '1rem', color: 'var(--gold)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <motion.span
                key={visitorCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontWeight: 600,
                  color: 'var(--gold)',
                  marginRight: '0.25rem',
                }}
              >
                {visitorCount.toLocaleString()}
              </motion.span>
              visitas
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown style={{ width: '2rem', height: '2rem', color: 'rgba(184, 145, 46, 0.6)' }} />
      </motion.div>
    </section>
  );
}

function BackgroundParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(184, 145, 46, 0.25)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export default Hero;
