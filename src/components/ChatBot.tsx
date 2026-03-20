import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minus } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Base de conocimiento del bot
const botResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ['hola', 'hey', 'buenos', 'buenas', 'saludos', 'hi'],
    response: '¡Hola! Bienvenido a Shalom Iglesia Cristiana. Soy el asistente virtual. ¿En qué puedo ayudarte? Puedes preguntarme sobre horarios, ubicación, ministerios y más.',
  },
  {
    keywords: ['horario', 'hora', 'cuando', 'servicio', 'culto', 'misa', 'domingo'],
    response: 'Nuestros servicios dominicales son a las 9:00, 11:00 y 13:00 hrs. ¡Te esperamos con los brazos abiertos!',
  },
  {
    keywords: ['direccion', 'ubicacion', 'donde', 'llegar', 'mapa', 'lugar', 'dirección', 'ubicación', 'dónde'],
    response: 'Estamos ubicados en Calz. de Los Reyes 55, Real Tetela, 62130 Cuernavaca, Morelos. Puedes ver el mapa en la sección de Contacto.',
  },
  {
    keywords: ['telefono', 'llamar', 'contacto', 'numero', 'teléfono', 'número', 'whatsapp', 'cel'],
    response: 'Puedes contactarnos al teléfono 777 313 9261. ¡Con gusto te atendemos!',
  },
  {
    keywords: ['ministerio', 'grupo', 'servir', 'participar', 'unir', 'unirse'],
    response: 'Tenemos ministerios para todos: Varones, Mujeres, Jóvenes, Teens, Niños, Matrimonios, Recupera y Raíces. Cada uno es un espacio para crecer y conectar. ¿Te interesa alguno en particular?',
  },
  {
    keywords: ['varones', 'hombres', 'hombre'],
    response: 'El ministerio de Varones es para hombres de fe construyendo hogares sólidos. ¡Próximamente más información!',
  },
  {
    keywords: ['mujeres', 'mujer', 'damas'],
    response: 'El ministerio de Mujeres es para mujeres valientes transformando familias. ¡Próximamente más información!',
  },
  {
    keywords: ['jovenes', 'joven', 'juventud', 'jóvenes'],
    response: 'El ministerio de Jóvenes es para una generación con propósito. ¡Próximamente más información!',
  },
  {
    keywords: ['teens', 'adolescentes', 'adolescente'],
    response: 'El ministerio de Teens es para adolescentes descubriendo su identidad en Cristo. ¡Próximamente más información!',
  },
  {
    keywords: ['niños', 'niño', 'ninos', 'nino', 'hijos', 'infantil'],
    response: 'El ministerio de Niños siembra en los corazones del mañana. Tenemos clases especiales durante los servicios. ¡Próximamente más información!',
  },
  {
    keywords: ['matrimonio', 'casados', 'pareja', 'esposos'],
    response: 'El ministerio de Matrimonios fortalece el vínculo más importante. ¡Próximamente más información!',
  },
  {
    keywords: ['recupera', 'adiccion', 'ayuda', 'sanidad', 'adicción'],
    response: 'El ministerio Recupera sana heridas y restaura vidas. Es un espacio seguro para encontrar libertad. ¡Próximamente más información!',
  },
  {
    keywords: ['raices', 'raíces', 'discipulado', 'biblia', 'estudio'],
    response: 'El ministerio Raíces te ayuda a echar raíces profundas en la Palabra de Dios. ¡Próximamente más información!',
  },
  {
    keywords: ['oracion', 'orar', 'peticion', 'oración', 'petición', 'intercesion', 'intercesión'],
    response: 'Puedes dejarnos tu petición de oración en la sección "Deja tu petición" de nuestra página. Nuestro equipo de intercesión orará por ti.',
  },
  {
    keywords: ['pastor', 'pastores', 'lider', 'líder', 'liderazgo'],
    response: '¡Próximamente tendremos información sobre nuestro equipo pastoral en la página!',
  },
  {
    keywords: ['dar', 'ofrenda', 'diezmo', 'donar', 'donacion', 'donación', 'ofrendar'],
    response: '¡Gracias por tu corazón generoso! Próximamente tendremos información sobre cómo ofrendar.',
  },
  {
    keywords: ['evento', 'actividad', 'proximo', 'próximo', 'eventos'],
    response: 'Mantente atento a nuestras redes sociales para enterarte de todos nuestros eventos. ¡Síguenos en Facebook, Instagram y YouTube!',
  },
  {
    keywords: ['redes', 'facebook', 'instagram', 'youtube', 'social'],
    response: 'Encuéntranos en redes sociales:\n• Facebook: ICShalomOficial\n• Instagram: @icshalom\n• YouTube: IC Shalom',
  },
  {
    keywords: ['gracias', 'adios', 'bye', 'adiós', 'hasta luego', 'bendiciones'],
    response: '¡Dios te bendiga! Si tienes más preguntas, aquí estaré. ¡Te esperamos este domingo!',
  },
  {
    keywords: ['vivo', 'transmision', 'transmisión', 'online', 'linea', 'línea', 'streaming'],
    response: 'Puedes ver nuestras transmisiones en vivo a través de YouTube. Haz clic en el botón "En Vivo" cuando estemos transmitiendo.',
  },
];

const defaultResponse = 'No estoy seguro de entender tu pregunta. Puedes preguntarme sobre:\n• Horarios de servicio\n• Ubicación\n• Ministerios\n• Contacto\n• Eventos\n• Redes sociales';

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const item of botResponses) {
    for (const keyword of item.keywords) {
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (message.includes(normalizedKeyword)) {
        return item.response;
      }
    }
  }

  return defaultResponse;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy el asistente de Shalom Iglesia Cristiana. ¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simular delay de respuesta del bot
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9990,
      }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              bottom: '5rem',
              right: 0,
              width: '350px',
              maxWidth: 'calc(100vw - 2rem)',
              height: '500px',
              maxHeight: 'calc(100vh - 10rem)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(234, 113, 36, 0.85), rgba(212, 168, 83, 0.85))',
                backdropFilter: 'blur(10px)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Flamita */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 23C7.58 23 4 19.42 4 15C4 12.17 5.22 9.56 7.38 7.72L8.5 6.78L9.16 8.12C9.64 9.09 10.34 9.93 11.22 10.57L11.5 10.78V10.5C11.5 9.27 11.83 8.06 12.45 7L13.93 4.39L14.67 6.63C15.31 8.54 16.5 10.22 18.08 11.45L18.5 11.78C19.45 12.91 20 14.4 20 15.97C20 19.41 16.42 23 12 23Z" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Asistente Shalom</p>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>En línea</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setIsMinimized(true)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                >
                  <Minus size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '0.75rem 1rem',
                      borderRadius: message.isBot
                        ? '1rem 1rem 1rem 0.25rem'
                        : '1rem 1rem 0.25rem 1rem',
                      background: message.isBot
                        ? 'rgba(128, 128, 128, 0.1)'
                        : 'linear-gradient(135deg, rgba(234, 113, 36, 0.8), rgba(212, 168, 83, 0.8))',
                      color: message.isBot ? 'var(--text-primary)' : 'white',
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: inputValue.trim()
                    ? 'linear-gradient(135deg, rgba(234, 113, 36, 0.85), rgba(212, 168, 83, 0.85))'
                    : 'rgba(128, 128, 128, 0.15)',
                  border: 'none',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: inputValue.trim() ? 'white' : 'var(--text-muted)',
                }}
                whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal con flamita */}
      <motion.button
        onClick={() => {
          if (isMinimized) {
            setIsMinimized(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
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
      >
        {/* Efecto de pulso */}
        {!isOpen && (
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
        )}

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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M12 23C7.58 23 4 19.42 4 15C4 12.17 5.22 9.56 7.38 7.72L8.5 6.78L9.16 8.12C9.64 9.09 10.34 9.93 11.22 10.57L11.5 10.78V10.5C11.5 9.27 11.83 8.06 12.45 7L13.93 4.39L14.67 6.63C15.31 8.54 16.5 10.22 18.08 11.45L18.5 11.78C19.45 12.91 20 14.4 20 15.97C20 19.41 16.42 23 12 23Z" />
                <path d="M12 21C10.07 21 8.5 19.43 8.5 17.5C8.5 16.13 9.23 14.89 10.37 14.24L11 13.86V14.5C11 15.05 11.18 15.58 11.5 16C11.82 15.58 12 15.05 12 14.5V13.86L12.63 14.24C13.77 14.89 14.5 16.13 14.5 17.5C14.5 19.43 12.93 21 12 21Z" fill="rgba(255,255,255,0.6)" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default ChatBot;
