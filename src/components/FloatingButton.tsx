import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Phone } from 'lucide-react';

export function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9990,
      }}
    >
      {/* Tooltip / Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              bottom: '5rem',
              right: 0,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '1rem',
              padding: '1.5rem',
              minWidth: '260px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p style={{
              color: 'var(--text-primary)',
              fontWeight: 700,
              marginBottom: '1rem',
              fontSize: '1.1rem',
            }}>
              ¡Bienvenido a Shalom!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Clock size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Horarios</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Domingos 9:00, 11:00 y 13:00 hrs</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Dirección</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Calz. de Los Reyes 55, Real Tetela, Cuernavaca</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Teléfono</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>777 313 9261</p>
                </div>
              </div>
            </div>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              marginTop: '1rem',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              ¡Te esperamos con los brazos abiertos!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal con flamita */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #EA7124, #d4a853)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(234, 113, 36, 0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 6px 30px rgba(234, 113, 36, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        {/* Efecto de pulso */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="flame"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Flamita SVG */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 23C7.58 23 4 19.42 4 15C4 12.17 5.22 9.56 7.38 7.72L8.5 6.78L9.16 8.12C9.64 9.09 10.34 9.93 11.22 10.57L11.5 10.78V10.5C11.5 9.27 11.83 8.06 12.45 7L13.93 4.39L14.67 6.63C15.31 8.54 16.5 10.22 18.08 11.45L18.5 11.78C19.45 12.91 20 14.4 20 15.97C20 19.41 16.42 23 12 23Z"/>
                <path d="M12 21C10.07 21 8.5 19.43 8.5 17.5C8.5 16.13 9.23 14.89 10.37 14.24L11 13.86V14.5C11 15.05 11.18 15.58 11.5 16C11.82 15.58 12 15.05 12 14.5V13.86L12.63 14.24C13.77 14.89 14.5 16.13 14.5 17.5C14.5 19.43 12.93 21 12 21Z" fill="rgba(255,255,255,0.6)"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default FloatingButton;
