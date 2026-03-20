import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Culto Dominical',
    description: 'Únete a nosotros cada domingo para adorar juntos.',
    date: 'Todos los domingos',
    time: '9:00, 11:00 y 13:00 hrs',
    location: 'Templo principal',
    recurring: true,
  },
  {
    id: 2,
    title: 'Próximo Evento',
    description: 'Mantente atento a nuestras redes sociales para más información.',
    date: 'Por anunciar',
    time: 'Por confirmar',
    location: 'Shalom Iglesia Cristiana',
    recurring: false,
    comingSoon: true,
  },
];

export function Events() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="eventos"
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
            Próximos <span className="text-gradient-gold">Eventos</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            No te pierdas ninguna oportunidad de crecer y conectar con nosotros.
          </p>
        </motion.div>

        {/* Lista de eventos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="glass"
              style={{ borderRadius: '1.5rem', padding: '2rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {event.recurring && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: 'rgba(212, 168, 83, 0.2)',
                      color: '#d4a853',
                      borderRadius: '9999px',
                    }}>
                      Recurrente
                    </span>
                  )}
                  {event.comingSoon && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#a855f7',
                      borderRadius: '9999px',
                    }}>
                      Próximamente
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {event.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{event.description}</p>

                {/* Info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar style={{ width: '1rem', height: '1rem', color: 'var(--gold)' }} />
                    <span>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock style={{ width: '1rem', height: '1rem', color: 'var(--gold)' }} />
                    <span>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin style={{ width: '1rem', height: '1rem', color: 'var(--gold)' }} />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Button */}
                {!event.comingSoon && (
                  <div style={{ marginTop: '1rem' }}>
                    <motion.button
                      className="btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Quiero asistir</span>
                      <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA para redes */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Síguenos en redes para enterarte de todos nuestros eventos
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.facebook.com/ICShalomOficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/icshalom/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@icshalom6683"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Events;
