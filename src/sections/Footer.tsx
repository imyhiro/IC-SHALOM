import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ICShalomOficial/',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/icshalom/',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@icshalom6683',
    icon: Youtube,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer style={{ position: 'relative', padding: '3rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0%, transparent 18%, var(--bg-secondary) 22%, var(--bg-secondary) 100%)', transition: 'background 0.3s ease' }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          {/* Logo y slogan */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Shalom Iglesia Cristiana"
              style={{
                height: '8rem',
                width: 'auto',
                marginBottom: '-2.5rem',
                filter: theme === 'dark' ? 'invert(1) brightness(1.2)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', textAlign: 'center' }}>Una casa para todos</p>
          </div>

          {/* Redes sociales */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <social.icon style={{ width: '1.25rem', height: '1.25rem' }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Línea divisoria */}
        <div style={{ height: '1px', background: 'var(--border-color)', margin: '2rem 0' }} />

        {/* Copyright y links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            © {currentYear} Shalom Iglesia Cristiana. Hecho con{' '}
            <Heart style={{ width: '1rem', height: '1rem', color: 'var(--gold)' }} /> en Cuernavaca.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#inicio" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}>
              Inicio
            </a>
            <a href="#nosotros" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}>
              Nosotros
            </a>
            <a href="#contacto" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}>
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
