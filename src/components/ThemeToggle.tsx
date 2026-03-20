import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--gold)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Moon style={{ width: '1.25rem', height: '1.25rem' }} />
        ) : (
          <Sun style={{ width: '1.25rem', height: '1.25rem' }} />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
