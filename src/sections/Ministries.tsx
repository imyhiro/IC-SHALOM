import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Heart, Sparkles, Baby, HeartHandshake, RefreshCcw, UserCircle, BookOpen, X, Clock } from 'lucide-react';

const ministries = [
  {
    id: 'varones',
    name: 'Varones',
    description: 'Hombres de fe construyendo hogares sólidos',
    icon: UserCircle,
  },
  {
    id: 'mujeres',
    name: 'Mujeres',
    description: 'Mujeres valientes transformando familias',
    icon: Heart,
  },
  {
    id: 'jovenes',
    name: 'Jóvenes',
    description: 'Una generación con propósito',
    icon: Sparkles,
  },
  {
    id: 'teens',
    name: 'Teens',
    description: 'Adolescentes descubriendo su identidad',
    icon: Users,
  },
  {
    id: 'ninos',
    name: 'Niños',
    description: 'Sembrando en los corazones del mañana',
    icon: Baby,
  },
  {
    id: 'matrimonios',
    name: 'Matrimonios',
    description: 'Fortaleciendo el vínculo más importante',
    icon: HeartHandshake,
  },
  {
    id: 'recupera',
    name: 'Recupera',
    description: 'Sanando heridas, restaurando vidas',
    icon: RefreshCcw,
  },
  {
    id: 'raices',
    name: 'Raíces',
    description: 'Echando raíces profundas en la Palabra de Dios',
    icon: BookOpen,
  },
];

export function Ministries() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedMinistry, setSelectedMinistry] = useState<typeof ministries[0] | null>(null);

  const handleClose = () => setSelectedMinistry(null);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (selectedMinistry) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedMinistry]);

  return (
    <section
      id="ministerios"
      ref={ref}
      className="section-responsive"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-primary) 22%, var(--bg-primary) 100%)', transition: 'background 0.3s ease' }} />

      <div className="container-responsive" style={{ position: 'relative', zIndex: 10 }}>
        {/* Título */}
        <motion.div
          className="title-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Hay un lugar para <span className="text-gradient-gold">ti</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Sin importar tu edad o etapa de vida, tenemos un espacio donde puedes
            crecer, conectar y ser parte de algo más grande.
          </p>
        </motion.div>

        {/* Grid de ministerios */}
        <div className="grid-ministries">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.id}
              className="glass card-responsive"
              onClick={() => setSelectedMinistry(ministry)}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 0 30px rgba(212, 168, 83, 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div
                className="icon-circle"
                style={{
                  margin: '0 auto 1rem',
                  borderRadius: '50%',
                  background: 'rgba(212, 168, 83, 0.1)',
                  border: '2px solid rgba(212, 168, 83, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ministry.icon style={{ width: '50%', height: '50%', color: 'var(--gold)' }} />
              </div>

              {/* Content */}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {ministry.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {ministry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Próximamente */}
      <AnimatePresence>
        {selectedMinistry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
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
              onClick={handleClose}
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

            {/* Card del modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
                padding: '3rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(212, 168, 83, 0.3)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 168, 83, 0.1)',
                maxWidth: '400px',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              {/* Icono del ministerio */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{
                  width: '5rem',
                  height: '5rem',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.2), rgba(234, 113, 36, 0.2))',
                  border: '2px solid rgba(212, 168, 83, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <selectedMinistry.icon style={{ width: '50%', height: '50%', color: '#d4a853' }} />
              </motion.div>

              {/* Nombre del ministerio */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.5rem',
                }}
              >
                {selectedMinistry.name}
              </motion.h3>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.95rem',
                  marginBottom: '2rem',
                }}
              >
                {selectedMinistry.description}
              </motion.p>

              {/* Badge Próximamente */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #EA7124, #d4a853)',
                  borderRadius: '9999px',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                <Clock size={18} />
                Próximamente
              </motion.div>

              {/* Texto adicional */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  marginTop: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.85rem',
                }}
              >
                Estamos preparando algo especial para ti
              </motion.p>
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

export default Ministries;
