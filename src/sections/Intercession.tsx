import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Check, Heart } from 'lucide-react';
import { submitPrayerPetition } from '../lib/supabase';

export function Intercession() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    petition: '',
    anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitPrayerPetition({
        name: formData.name,
        petition: formData.petition,
        anonymous: formData.anonymous,
      });

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', petition: '', anonymous: false });
        }, 5000);
      } else {
        console.error('Error al enviar petición');
        alert('Hubo un error al enviar tu petición. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar tu petición. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '0.75rem',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <section
      id="intercesion"
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-primary) 22%, var(--bg-primary) 100%)', transition: 'background 0.3s ease' }} />

      <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Título */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            ¿Necesitas <span className="text-gradient-gold">oración</span>?
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Déjanos tu petición. Nuestro equipo de intercesión estará orando por ti.
          </p>
        </motion.div>

        {/* Formulario */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass"
              style={{ borderRadius: '1.5rem', padding: '2rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Nombre */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="name"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                >
                  Tu nombre {formData.anonymous && '(opcional)'}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={formData.anonymous}
                  style={{ ...inputStyle, opacity: formData.anonymous ? 0.5 : 1 }}
                  placeholder="¿Cómo te llamas?"
                />
              </div>

              {/* Checkbox anónimo */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <div
                    onClick={() => setFormData({ ...formData, anonymous: !formData.anonymous, name: !formData.anonymous ? '' : formData.name })}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '0.25rem',
                      border: `2px solid ${formData.anonymous ? '#b8912e' : '#9ca3af'}`,
                      background: formData.anonymous ? '#b8912e' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {formData.anonymous && <Check style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />}
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Prefiero mantener mi petición anónima
                  </span>
                </label>
              </div>

              {/* Petición */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  htmlFor="petition"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}
                >
                  Tu petición de oración
                </label>
                <textarea
                  id="petition"
                  value={formData.petition}
                  onChange={(e) => setFormData({ ...formData, petition: e.target.value })}
                  rows={5}
                  required
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Comparte lo que hay en tu corazón..."
                />
              </div>

              {/* Botón de envío */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.petition}
                className="btn-primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  opacity: isSubmitting || !formData.petition ? 0.5 : 1,
                  cursor: isSubmitting || !formData.petition ? 'not-allowed' : 'pointer',
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        border: '2px solid rgba(26,26,26,0.3)',
                        borderTopColor: '#1a1a1a',
                        borderRadius: '50%',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Enviando tu petición...</span>
                  </>
                ) : (
                  <>
                    <Send style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>Enviar petición</span>
                  </>
                )}
              </motion.button>

              {/* Nota */}
              <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.75rem', marginTop: '1.5rem' }}>
                Tu petición es completamente confidencial y solo será vista por nuestro equipo de intercesión.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass"
              style={{ borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <SuccessAnimation />

              <motion.h3
                style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Tu petición ha sido elevada
              </motion.h3>

              <motion.p
                style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Nuestro equipo de intercesión estará orando por ti.
                <br />
                Confía en que Dios escucha cada oración.
              </motion.p>

              <motion.div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gold)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Shalom, paz sea contigo</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SuccessAnimation() {
  return (
    <div style={{ position: 'relative', width: '8rem', height: '8rem', margin: '0 auto 2rem' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #b8912e, #d4a853)',
          boxShadow: '0 0 60px rgba(184, 145, 46, 0.4)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.div
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <Check style={{ width: '4rem', height: '4rem', color: '#ffffff', strokeWidth: 3 }} />
      </motion.div>
    </div>
  );
}

export default Intercession;
