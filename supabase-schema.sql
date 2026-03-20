-- ============================================
-- IC-SHALOM Database Schema for Supabase
-- ============================================

-- Tabla: Peticiones de Oración
CREATE TABLE prayer_petitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  petition TEXT NOT NULL,
  anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'prayed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_prayer_petitions_status ON prayer_petitions(status);
CREATE INDEX idx_prayer_petitions_created_at ON prayer_petitions(created_at DESC);

-- RLS (Row Level Security) - Habilitar
ALTER TABLE prayer_petitions ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede insertar peticiones (público)
CREATE POLICY "Anyone can insert petitions" ON prayer_petitions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden ver peticiones
CREATE POLICY "Authenticated users can view petitions" ON prayer_petitions
  FOR SELECT TO authenticated
  USING (true);

-- Política: Solo usuarios autenticados pueden actualizar peticiones
CREATE POLICY "Authenticated users can update petitions" ON prayer_petitions
  FOR UPDATE TO authenticated
  USING (true);

-- ============================================
-- Tabla: Eventos (para futuro)
-- ============================================

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  recurring BOOLEAN DEFAULT false,
  coming_soon BOOLEAN DEFAULT false,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS para eventos
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede ver eventos activos
CREATE POLICY "Anyone can view active events" ON events
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Política: Solo autenticados pueden administrar eventos
CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL TO authenticated
  USING (true);

-- ============================================
-- Función para actualizar updated_at automáticamente
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_prayer_petitions_updated_at
  BEFORE UPDATE ON prayer_petitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
