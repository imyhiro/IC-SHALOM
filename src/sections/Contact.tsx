import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    </section>
  );
}

export default Contact;
