import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Target, Flame, X } from 'lucide-react';

const values = [
  {
    id: 'acogida',
    icon: Heart,
    title: 'Acogida',
    description: 'Un lugar donde perteneces, sin importar tu historia.',
    extendedDescription: 'Creemos que cada persona merece ser recibida con amor y aceptación. No importa de dónde vengas ni lo que hayas vivido, aquí encontrarás brazos abiertos y un hogar espiritual donde serás valorado tal como eres.',
  },
  {
    id: 'sanacion',
    icon: Flame,
    title: 'Sanación',
    description: 'Restauración para tu vida y tu familia.',
    extendedDescription: 'Dios quiere sanar las heridas de tu corazón. A través de Su Palabra, la oración y el acompañamiento de nuestra comunidad, creemos en la restauración integral: emocional, espiritual y relacional.',
  },
  {
    id: 'comunidad',
    icon: Users,
    title: 'Comunidad',
    description: 'Nadie camina solo. Somos familia.',
    extendedDescription: 'Fuimos creados para vivir en relación. En Shalom encontrarás una familia que te acompaña en los buenos y malos momentos. Juntos crecemos, nos apoyamos y celebramos la vida.',
  },
  {
    id: 'proposito',
    icon: Target,
    title: 'Propósito',
    description: 'Descubre para qué estás aquí.',
    extendedDescription: 'Cada persona tiene un llamado único. Te ayudamos a descubrir los dones que Dios puso en ti y a desarrollar tu potencial para impactar tu familia, tu trabajo y tu ciudad.',
  },
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedValue, setSelectedValue] = useState<typeof values[0] | null>(null);

  const handleClose = () => setSelectedValue(null);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (selectedValue) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedValue]);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="section-responsive"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background - transparente en el borde izquierdo para ver las fotos */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-secondary) 22%, var(--bg-tertiary) 50%, var(--bg-secondary) 100%)',
        transition: 'background 0.3s ease'
      }} />

      <div className="container-responsive" style={{ position: 'relative', zIndex: 10 }}>
        {/* Título */}
        <motion.div
          className="title-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            ¿Quiénes <span className="text-gradient-gold">somos</span>?
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Somos una iglesia relacional y generacional, comprometida con el bienestar
            de las familias y la transformación de nuestra ciudad.
          </p>
        </motion.div>

        {/* Misión y Visión */}
        <div className="grid-two-cols" style={{ marginBottom: '3rem' }}>
          <motion.div
            className="glass card-responsive"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem' }}>Misión</h3>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Acoger, sanar y transformar vidas en familia.
            </p>
          </motion.div>

          <motion.div
            className="glass card-responsive"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem' }}>Visión</h3>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Familias restauradas transformando su ciudad.
            </p>
          </motion.div>
        </div>

        {/* Valores/Pilares */}
        <div className="grid-cards">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className="glass card-responsive"
              onClick={() => setSelectedValue(value)}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 0 30px rgba(212, 168, 83, 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
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
                <value.icon style={{ width: '50%', height: '50%', color: 'var(--gold)' }} />
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {value.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Valor */}
      <AnimatePresence>
        {selectedValue && (
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
                maxWidth: '450px',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              {/* Icono del valor */}
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
                <selectedValue.icon style={{ width: '50%', height: '50%', color: '#d4a853' }} />
              </motion.div>

              {/* Nombre del valor */}
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
                {selectedValue.title}
              </motion.h3>

              {/* Descripción corta */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  color: 'var(--gold)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {selectedValue.description}
              </motion.p>

              {/* Descripción extendida */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  textAlign: 'left',
                }}
              >
                {selectedValue.extendedDescription}
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

export default About;
