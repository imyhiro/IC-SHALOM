import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Ministries from './sections/Ministries';
import Events from './sections/Events';
import Intercession from './sections/Intercession';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { PhotoCanvas } from './components/PhotoCollage';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', transition: 'background 0.3s ease', position: 'relative' }}>
        {/* Fotos que scrollean con la página */}
        <PhotoCanvas />

        <Navbar />
        <main style={{ position: 'relative', zIndex: 5 }}>
          <Hero />
          <About />
          <Ministries />
          <Events />
          <Intercession />
          <Contact />
        </main>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Footer />
        </div>

        {/* ChatBot */}
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
