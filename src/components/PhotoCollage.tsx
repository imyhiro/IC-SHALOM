import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  rotation: number;
  x: number; // % from left
  y: number; // px from top
  size: number; // vw (viewport width)
}

// Versículos para cada foto (interpretación del contenido)
const photoVerses: Record<string, { verse: string; reference: string }> = {
  '/fotos/1.jpg': {
    verse: 'Traed todos los diezmos al alfolí y haya alimento en mi casa, y satisfará tu alma en las sequías.',
    reference: 'Malaquías 3:10',
  },
  '/fotos/2.jpg': {
    verse: 'Donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.',
    reference: 'Mateo 18:20',
  },
  '/fotos/3.jpg': {
    verse: 'Alzad vuestras manos al santuario, y bendecid a Jehová.',
    reference: 'Salmos 134:2',
  },
  '/fotos/4.jpg': {
    verse: 'Cantad alegres a Dios, habitantes de toda la tierra. Servid a Jehová con alegría.',
    reference: 'Salmos 100:1-2',
  },
  '/fotos/5.jpg': {
    verse: 'Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.',
    reference: 'Colosenses 3:23',
  },
  '/fotos/6.jpg': {
    verse: 'Porque yo satisfaré al alma cansada, y satisfaré a toda alma entristecida.',
    reference: 'Jeremías 31:25',
  },
  '/fotos/7.jpg': {
    verse: 'Alabadle con arpa y salterio; alabadle con instrumentos de cuerda.',
    reference: 'Salmos 150:3-4',
  },
  '/fotos/8.jpg': {
    verse: 'Dejad a los niños venir a mí, porque de los tales es el reino de los cielos.',
    reference: 'Mateo 19:14',
  },
  '/fotos/9.jpg': {
    verse: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da.',
    reference: 'Juan 14:27',
  },
  '/fotos/10.jpg': {
    verse: 'El gozo de Jehová es vuestra fuerza.',
    reference: 'Nehemías 8:10',
  },
  '/fotos/11.jpg': {
    verse: 'He aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.',
    reference: 'Mateo 28:20',
  },
  '/fotos/12.jpg': {
    verse: 'Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía.',
    reference: 'Salmos 133:1',
  },
};

// Fotos distribuidas en el lado izquierdo a lo largo de toda la página
const canvasPhotos: Photo[] = [
  { id: '1', url: '/fotos/1.jpg', rotation: -8, x: 2, y: 50, size: 13 },
  { id: '2', url: '/fotos/2.jpg', rotation: 12, x: 3, y: 300, size: 12 },
  { id: '3', url: '/fotos/3.jpg', rotation: -10, x: 2, y: 560, size: 13.5 },
  { id: '4', url: '/fotos/4.jpg', rotation: 8, x: 4, y: 820, size: 11.5 },
  { id: '5', url: '/fotos/5.jpg', rotation: -6, x: 2, y: 1090, size: 13 },
  { id: '6', url: '/fotos/6.jpg', rotation: 14, x: 3, y: 1360, size: 12.5 },
  { id: '7', url: '/fotos/7.jpg', rotation: -12, x: 2, y: 1640, size: 12 },
  { id: '8', url: '/fotos/8.jpg', rotation: 10, x: 4, y: 1920, size: 13.5 },
  { id: '9', url: '/fotos/9.jpg', rotation: -8, x: 2, y: 2200, size: 12.5 },
  { id: '10', url: '/fotos/10.jpg', rotation: 15, x: 3, y: 2490, size: 11.5 },
  { id: '11', url: '/fotos/11.jpg', rotation: -14, x: 2, y: 2780, size: 13 },
  { id: '12', url: '/fotos/12.jpg', rotation: 10, x: 3, y: 3070, size: 12 },
  // Repetición para cubrir hasta el footer
  { id: '13', url: '/fotos/1.jpg', rotation: -10, x: 3, y: 3360, size: 12.5 },
  { id: '14', url: '/fotos/3.jpg', rotation: 14, x: 2, y: 3650, size: 13 },
  { id: '15', url: '/fotos/5.jpg', rotation: -8, x: 4, y: 3940, size: 12 },
  { id: '16', url: '/fotos/7.jpg', rotation: 12, x: 2, y: 4230, size: 12.5 },
];

export function PhotoCanvas() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handlePhotoClick = (url: string) => {
    setSelectedPhoto(url);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  return (
    <>
      {/* Contenedor de fotos */}
      <div
        className="hide-mobile"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {canvasPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => handlePhotoClick(photo.url)}
          />
        ))}
      </div>

      {/* Lightbox/Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
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

            {/* Foto en marco polaroid con versículo */}
            <motion.div
              initial={{ scale: 0.3, rotate: -15, opacity: 0, y: 100 }}
              animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
              exit={{ scale: 0.3, rotate: 15, opacity: 0, y: -100 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                padding: '16px 16px 24px 16px',
                borderRadius: '4px',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                maxWidth: 'min(600px, 85vw)',
                cursor: 'default',
              }}
            >
              <img
                src={selectedPhoto}
                alt=""
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                  borderRadius: '2px',
                  display: 'block',
                }}
              />

              {/* Versículo con fuente elegante */}
              {photoVerses[selectedPhoto] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    marginTop: '24px',
                    textAlign: 'center',
                    padding: '0 20px',
                  }}
                >
                  <p style={{
                    color: '#2a2a2a',
                    fontSize: '1.4rem',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    marginBottom: '12px',
                  }}>
                    "{photoVerses[selectedPhoto].verse}"
                  </p>
                  <p style={{
                    color: '#b8912e',
                    fontSize: '1.1rem',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}>
                    — {photoVerses[selectedPhoto].reference}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Indicador de tecla ESC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.5)',
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
    </>
  );
}

function PhotoCard({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${photo.x}%`,
        top: photo.y,
        width: `${photo.size}vw`,
        minWidth: '140px',
        maxWidth: '240px',
        padding: '6px 6px 24px 6px',
        background: 'var(--photo-bg, #ffffff)',
        borderRadius: '4px',
        boxShadow: 'var(--photo-shadow, 0 4px 16px rgba(0, 0, 0, 0.08))',
        border: '1px solid var(--photo-border, rgba(0, 0, 0, 0.06))',
        transform: `rotate(${photo.rotation}deg)`,
        opacity: 0.85,
        cursor: 'pointer',
        pointerEvents: 'auto',
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: photo.rotation - 10 }}
      whileInView={{ opacity: 0.85, scale: 1, rotate: photo.rotation }}
      whileHover={{
        scale: 1.05,
        opacity: 1,
        boxShadow: '0 8px 40px rgba(212, 168, 83, 0.4), 0 0 60px rgba(212, 168, 83, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        type: 'spring',
        stiffness: 120,
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
        <img
          src={photo.url}
          alt=""
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Efecto de fade/desvanecido en el lado derecho */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '40%',
            background: 'linear-gradient(to right, transparent, var(--photo-bg, #ffffff))',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}

export default PhotoCanvas;
