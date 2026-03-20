import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Target, Flame } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Acogida',
    description: 'Un lugar donde perteneces, sin importar tu historia.',
  },
  {
    icon: Flame,
    title: 'Sanación',
    description: 'Restauración para tu vida y tu familia.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Nadie camina solo. Somos familia.',
  },
  {
    icon: Target,
    title: 'Propósito',
    description: 'Descubre para qué estás aquí.',
  },
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
              key={value.title}
              className="glass card-responsive"
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 0 30px rgba(212, 168, 83, 0.2)' }}
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
    </section>
  );
}

export default About;
