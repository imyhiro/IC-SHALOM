import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Clock, MessageCircle, Navigation, X } from 'lucide-react';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showImageModal, setShowImageModal] = useState(false);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowImageModal(false);
    };
    if (showImageModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showImageModal]);

  const whatsappNumber = '527773139261';
  const whatsappMessage = encodeURIComponent(
    '¡Hola! Me gustaría obtener más información sobre Shalom Iglesia Cristiana.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const address = 'Calz. de Los Reyes 55, Real Tetela, 62130 Cuernavaca, Mor.';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section
      id="contacto"
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-tertiary) 22%, var(--bg-tertiary) 100%)', transition: 'background 0.3s ease' }} />

      {/* Foto decorativa lado izquierdo - altura completa (oculta en móvil) */}
      <motion.div
        className="hide-mobile"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        onClick={() => setShowImageModal(true)}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '22%',
          zIndex: 5,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          src="/casa.png"
          alt="Iglesia Shalom"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.3s ease',
          }}
        />
        {/* Fade hacia la derecha */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '40%',
          background: 'linear-gradient(to right, transparent, var(--bg-tertiary))',
          pointerEvents: 'none',
        }} />
      </motion.div>

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Título */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Encuéntra<span className="text-gradient-gold">nos</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Te esperamos con los brazos abiertos. ¡Ven a visitarnos!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Información de contacto */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Dirección */}
            <div className="glass" style={{ borderRadius: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #d4a853, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MapPin style={{ width: '1.5rem', height: '1.5rem', color: '#0a0a0a' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Dirección
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{address}</p>
                  <motion.a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--gold)',
                      marginTop: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <Navigation style={{ width: '1rem', height: '1rem' }} />
                    Cómo llegar
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="glass" style={{ borderRadius: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #d4a853, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Clock style={{ width: '1.5rem', height: '1.5rem', color: '#0a0a0a' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Horarios de Culto
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Domingos</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {['9:00', '11:00', '13:00'].map((time) => (
                      <span
                        key={time}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(212, 168, 83, 0.1)',
                          color: '#d4a853',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        {time} hrs
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="glass" style={{ borderRadius: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MessageCircle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    WhatsApp
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>+52 777 313 9261</p>
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#22c55e',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      marginTop: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone style={{ width: '1rem', height: '1rem' }} />
                    Enviar mensaje
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            className="glass"
            style={{ borderRadius: '1.5rem', overflow: 'hidden', minHeight: '400px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.5!2d-99.24!3d18.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU1JzQ4LjAiTiA5OcKwMTQnMjQuMCJX!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Shalom Iglesia Cristiana"
            />
          </motion.div>
        </div>
      </div>

      {/* Modal de imagen maximizada */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowImageModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '2rem',
            }}
          >
            {/* Botón cerrar */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowImageModal(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={24} />
            </motion.button>

            {/* Card con marco grande */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
                padding: '1rem',
                borderRadius: '1.5rem',
                border: '2px solid rgba(212, 168, 83, 0.4)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 168, 83, 0.15)',
                width: '900px',
                maxWidth: '95vw',
                maxHeight: '90vh',
                cursor: 'default',
                overflowY: 'auto',
              }}
            >
              {/* Marco dorado interior */}
              <div className="modal-content-responsive" style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.25), rgba(234, 113, 36, 0.15))',
                borderRadius: '1rem',
                border: '3px solid rgba(212, 168, 83, 0.5)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
              }}>
                {/* Lado izquierdo - Imagen */}
                <div className="modal-image-container" style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <img
                    src="/casa.png"
                    alt="Iglesia Shalom"
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '40vh',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Lado derecho - Mensaje de bienvenida */}
                <motion.div
                  className="modal-text-container"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '0.25rem',
                    lineHeight: 1.2,
                  }}>
                    Bienvenido a <span style={{ color: '#d4a853' }}>Shalom</span>
                  </h3>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                  }}>
                    Tu casa de paz
                  </p>

                  <div style={{
                    width: '50px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #d4a853, #ea7124)',
                    borderRadius: '2px',
                    marginBottom: '1rem',
                  }} />

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                  }}>
                    No importa lo que estés atravesando hoy, hay esperanza.
                    Dios tiene un plan de bien para tu vida, y este es el lugar
                    donde puedes encontrar descanso para tu alma.
                  </p>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>
                    Aquí no hay juicio, solo amor. Aquí no hay extraños,
                    solo familia que aún no conocías. Ven tal como eres,
                    y descubre la paz que solo Dios puede dar.
                  </p>

                  {/* Versículo destacado */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderLeft: '3px solid #d4a853',
                    padding: '0.75rem 1rem',
                    borderRadius: '0 0.5rem 0.5rem 0',
                  }}>
                    <p style={{
                      color: 'white',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      marginBottom: '0.25rem',
                    }}>
                      "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado."
                    </p>
                    <p style={{
                      color: '#d4a853',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      — Isaías 26:3
                    </p>
                  </div>

                  <p style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.8rem',
                    marginTop: '0.75rem',
                    textAlign: 'center',
                  }}>
                    שָׁלוֹם — Shalom: Paz completa
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Indicador ESC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.8rem',
              }}
            >
              <span style={{
                padding: '4px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'monospace',
              }}>
                ESC
              </span>
              <span>o click para cerrar</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
