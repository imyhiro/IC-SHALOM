import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AnimatedLogo({ className = '', size = 'lg' }: AnimatedLogoProps) {
  const sizes = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
    xl: 'h-48',
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginLeft: '-1rem',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Logo con efecto de glow dorado */}
      <motion.div
        style={{
          position: 'relative',
          marginTop: '0',
        }}
      >
        {/* Fade dorado detrás del logo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.3) 0%, rgba(234, 113, 36, 0.15) 30%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
        <motion.img
          src="/logo.png"
          alt="Shalom Iglesia Cristiana"
          style={{
            height: size === 'xl' ? '32rem' : size === 'lg' ? '14rem' : size === 'md' ? '8rem' : '5rem',
            width: 'auto',
            maxWidth: '90vw',
            position: 'relative',
            zIndex: 10,
            filter: 'var(--logo-filter) drop-shadow(0 0 40px rgba(212, 168, 83, 0.5))',
            transition: 'filter 0.3s ease',
          }}
        />
      </motion.div>

      {/* Partículas de fuego */}
      <FireParticles />
    </motion.div>
  );
}

function FireParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => {
    const random = Math.random();
    // Colores de fuego realistas: amarillo centro, naranja medio, rojo exterior
    const colors = [
      '#fff7ed', // blanco cálido (centro más caliente)
      '#fef3c7', // amarillo claro
      '#fcd34d', // amarillo
      '#f59e0b', // naranja amarillo
      '#ea580c', // naranja
      '#dc2626', // rojo
    ];
    const color = colors[Math.floor(random * colors.length)];
    const size = 2 + Math.random() * 4; // tamaño variable

    return { id: i, color, size, random };
  });

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {particles.map(({ id, color, size, random }) => (
        <motion.div
          key={id}
          className="absolute rounded-full"
          style={{
            left: `${43 + random * 10}%`,
            bottom: '40%',
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}, ${color}88, transparent)`,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${size * 2}px ${color}`,
          }}
          animate={{
            y: [-5, -120 - random * 60],
            x: [0, (random - 0.5) * 30, (random - 0.5) * 20],
            opacity: [0, 0.9, 0.7, 0],
            scale: [0.3, 1.2, 0.8, 0],
          }}
          transition={{
            duration: 3 + random * 4,
            repeat: Infinity,
            delay: random * 2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Partículas pequeñas de chispas */}
      {Array.from({ length: 25 }, (_, i) => {
        const random = Math.random();
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${44 + random * 8}%`,
              bottom: '42%',
              width: '2px',
              height: '2px',
              background: '#fef3c7',
              boxShadow: '0 0 4px #fcd34d',
            }}
            animate={{
              y: [-5, -180 - random * 40],
              x: [0, (random - 0.5) * 50],
              opacity: [0, 1, 0],
              scale: [1, 0.5, 0],
            }}
            transition={{
              duration: 2 + random * 2,
              repeat: Infinity,
              delay: random * 2.5,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}

export default AnimatedLogo;
