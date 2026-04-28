import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  orden: number;
  activo: boolean;
}

interface Anuncio {
  id: number;
  texto: string;
  activo: boolean;
}

interface Contenido {
  id: number;
  clave: string;
  valor: string;
  descripcion: string;
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'carousel' | 'anuncios' | 'contenido' | 'youtube' | 'registros'>('carousel');
  const [carousel, setCarousel] = useState<CarouselImage[]>([]);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [contenido, setContenido] = useState<Contenido[]>([]);
  const [registros, setRegistros] = useState<{ id: number; nombre: string; telefono: string; email: string | null; como_se_entero: string | null; created_at: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('contenido').select('valor').eq('clave', 'admin_password').single()
      .then(({ data }) => { if (data) setAdminPass(data.valor); });
  }, []);

  const login = () => {
    if (password === adminPass) {
      setAuthed(true);
      loadAll();
    } else {
      setMsg('Contraseña incorrecta');
      setTimeout(() => setMsg(''), 2000);
    }
  };

  const loadAll = async () => {
    if (!supabase) return;
    const [c, a, co, r] = await Promise.all([
      supabase.from('carousel_images').select('*').order('orden'),
      supabase.from('anuncios').select('*').order('id'),
      supabase.from('contenido').select('*').order('id'),
      supabase.from('personas_nuevas').select('*').order('created_at', { ascending: false }),
    ]);
    if (c.data) setCarousel(c.data);
    if (a.data) setAnuncios(a.data);
    if (co.data) setContenido(co.data.filter((x: Contenido) => x.clave !== 'admin_password'));
    if (r.data) setRegistros(r.data);
  };

  const showMsg = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 2000);
  };

  // ── Upload image to Supabase Storage ──
  const uploadImage = async (file: File, itemId: number) => {
    if (!supabase) return null;
    setUploading(itemId);

    const ext = file.name.split('.').pop();
    const fileName = `carousel_${itemId}_${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('fotos')
      .upload(fileName, file, { upsert: true });

    setUploading(null);

    if (error) {
      showMsg('Error al subir imagen');
      return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/fotos/${fileName}`;
    return url;
  };

  const handleFileSelect = async (file: File, itemId: number, idx: number) => {
    const url = await uploadImage(file, itemId);
    if (url) {
      const updated = [...carousel];
      updated[idx] = { ...updated[idx], src: url };
      setCarousel(updated);
      // Auto-save
      if (supabase) {
        await supabase.from('carousel_images').update({ src: url }).eq('id', itemId);
        showMsg('Imagen subida y guardada');
      }
    }
  };

  // ── Carousel ──
  const saveCarouselItem = async (item: CarouselImage) => {
    if (!supabase) return;
    setSaving(true);
    await supabase.from('carousel_images').update({ src: item.src, alt: item.alt, orden: item.orden, activo: item.activo }).eq('id', item.id);
    setSaving(false);
    showMsg('Guardado');
  };

  const addCarouselItem = async () => {
    if (!supabase) return;
    const orden = carousel.length + 1;
    const { data } = await supabase.from('carousel_images').insert({ src: '', alt: 'Nueva imagen', orden, activo: true }).select().single();
    if (data) setCarousel([...carousel, data]);
    showMsg('Imagen agregada — sube una foto');
  };

  const deleteCarouselItem = async (id: number) => {
    if (!supabase) return;
    await supabase.from('carousel_images').delete().eq('id', id);
    setCarousel(carousel.filter(c => c.id !== id));
    showMsg('Imagen eliminada');
  };

  // ── Anuncios ──
  const saveAnuncio = async (item: Anuncio) => {
    if (!supabase) return;
    setSaving(true);
    await supabase.from('anuncios').update({ texto: item.texto, activo: item.activo }).eq('id', item.id);
    setSaving(false);
    showMsg('Guardado');
  };

  const addAnuncio = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('anuncios').insert({ texto: 'Nuevo anuncio', activo: true }).select().single();
    if (data) setAnuncios([...anuncios, data]);
    showMsg('Anuncio agregado');
  };

  const deleteAnuncio = async (id: number) => {
    if (!supabase) return;
    await supabase.from('anuncios').delete().eq('id', id);
    setAnuncios(anuncios.filter(a => a.id !== id));
    showMsg('Anuncio eliminado');
  };

  // ── Contenido ──
  const saveContenido = async (item: Contenido) => {
    if (!supabase) return;
    setSaving(true);
    await supabase.from('contenido').update({ valor: item.valor }).eq('id', item.id);
    setSaving(false);
    showMsg('Guardado');
  };

  // ── Login Screen ──
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#141414', fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <div style={{
          background: '#1e1e1e', borderRadius: '1rem', padding: '2.5rem',
          width: '100%', maxWidth: '380px', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Admin Panel</h1>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '2rem' }}>Iglesia Cristiana Shalom</p>

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '0.75rem 1rem', background: '#242424',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem',
              color: '#fff', fontSize: '1rem', marginBottom: '1rem', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={login}
            style={{
              width: '100%', padding: '0.75rem', background: '#C8956C', color: '#fff',
              border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>
          {msg && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{msg}</p>}
        </div>
      </div>
    );
  }

  // ── Admin Dashboard ──
  return (
    <div style={{
      minHeight: '100vh', background: '#141414', color: '#f0f0f0',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 2rem', background: '#1a1a1a',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Admin Shalom</h1>
          {msg && (
            <span style={{
              background: '#22c55e20', color: '#22c55e', padding: '0.25rem 0.75rem',
              borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
            }}>{msg}</span>
          )}
          {saving && (
            <span style={{ color: '#C8956C', fontSize: '0.8rem' }}>Guardando...</span>
          )}
        </div>
        <a href="/" style={{ color: '#777', textDecoration: 'none', fontSize: '0.85rem' }}>Ver sitio</a>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 2rem',
      }}>
        {(['carousel', 'anuncios', 'youtube', 'contenido', 'registros'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '1rem 1.5rem', background: 'none', border: 'none',
              color: tab === t ? '#C8956C' : '#777', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', borderBottom: tab === t ? '2px solid #C8956C' : '2px solid transparent',
            }}
          >
            {t === 'carousel' ? 'Carousel' : t === 'anuncios' ? 'Anuncios' : t === 'youtube' ? 'YouTube' : t === 'contenido' ? 'Textos' : `Registros (${registros.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: '900px' }}>

        {/* ── Carousel Tab ── */}
        {tab === 'carousel' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Imágenes del Carousel</h2>
              <button onClick={addCarouselItem} style={btnStyle}>+ Agregar imagen</button>
            </div>

            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '80px 1fr 80px 70px auto',
              gap: '0.75rem', padding: '0.5rem 1.25rem', alignItems: 'center',
              fontSize: '0.7rem', fontWeight: 600, color: '#C8956C',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <span>Imagen</span>
              <span>Descripción</span>
              <span>Orden</span>
              <span>Activo</span>
              <span>Acciones</span>
            </div>

            {/* Rows */}
            {carousel.map((item, idx) => (
              <CarouselRow
                key={item.id}
                item={item}
                uploading={uploading === item.id}
                onFileSelect={(file) => handleFileSelect(file, item.id, idx)}
                onChange={(updated) => {
                  const arr = [...carousel];
                  arr[idx] = updated;
                  setCarousel(arr);
                }}
                onSave={() => saveCarouselItem(carousel[idx])}
                onDelete={() => deleteCarouselItem(item.id)}
              />
            ))}
          </div>
        )}

        {/* ── Anuncios Tab ── */}
        {tab === 'anuncios' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Banner / Anuncios</h2>
                <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '0.25rem' }}>Textos que aparecen en el banner animado entre Inicio y Nosotros</p>
              </div>
              <button onClick={addAnuncio} style={btnStyle}>+ Agregar anuncio</button>
            </div>
            {anuncios.map((item, idx) => (
              <div key={item.id} style={cardStyle}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <input
                      value={item.texto}
                      onChange={e => {
                        const updated = [...anuncios];
                        updated[idx] = { ...item, texto: e.target.value };
                        setAnuncios(updated);
                      }}
                      style={inputStyle}
                      placeholder="Texto del anuncio"
                    />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={item.activo}
                      onChange={e => {
                        const updated = [...anuncios];
                        updated[idx] = { ...item, activo: e.target.checked };
                        setAnuncios(updated);
                      }}
                    />
                    Activo
                  </label>
                  <button onClick={() => saveAnuncio(item)} style={saveBtnStyle}>Guardar</button>
                  <button onClick={() => deleteAnuncio(item.id)} style={deleteBtnStyle}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── YouTube Tab ── */}
        {tab === 'youtube' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Última predicación</h2>
            <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Pega el ID del video de YouTube. Es la parte después de <code style={{ color: '#C8956C' }}>v=</code> en la URL.<br />
              Ej: youtube.com/watch?v=<strong style={{ color: '#f0f0f0' }}>D-UZS9wcbbs</strong>
            </p>
            {contenido.filter(c => c.clave === 'youtube_video_id').map((item) => {
              const realIdx = contenido.findIndex(c => c.clave === 'youtube_video_id');
              return (
                <div key={item.id} style={cardStyle}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <label style={labelStyle}>ID del video</label>
                      <input
                        value={item.valor}
                        onChange={e => {
                          const updated = [...contenido];
                          updated[realIdx] = { ...item, valor: e.target.value };
                          setContenido(updated);
                        }}
                        style={inputStyle}
                        placeholder="Ej: D-UZS9wcbbs"
                      />
                    </div>
                    <button onClick={() => saveContenido(item)} style={{ ...saveBtnStyle, marginTop: '1rem' }}>Guardar</button>
                  </div>

                  {/* Preview */}
                  {item.valor && (
                    <div style={{ marginTop: '1rem', maxWidth: '400px' }}>
                      <div style={{
                        position: 'relative', paddingBottom: '56.25%', borderRadius: '0.75rem',
                        overflow: 'hidden', background: '#000',
                      }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${item.valor}`}
                          title="Preview"
                          allowFullScreen
                          style={{
                            position: 'absolute', top: 0, left: 0,
                            width: '100%', height: '100%', border: 'none',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Registros Tab ── */}
        {tab === 'registros' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Personas nuevas registradas
            </h2>
            {registros.length === 0 ? (
              <p style={{ color: '#777' }}>No hay registros aún.</p>
            ) : (
              <>
                {/* Header */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                  gap: '0.75rem', padding: '0.5rem 1.25rem', alignItems: 'center',
                  fontSize: '0.7rem', fontWeight: 600, color: '#C8956C',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  <span>Nombre</span>
                  <span>Teléfono</span>
                  <span>Email</span>
                  <span>Cómo se enteró</span>
                  <span>Fecha</span>
                </div>
                {registros.map(r => (
                  <div key={r.id} style={{
                    ...cardStyle,
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                    gap: '0.75rem', alignItems: 'center', padding: '1rem 1.25rem',
                  }}>
                    <span style={{ fontWeight: 600, color: '#f0f0f0' }}>{r.nombre}</span>
                    <span style={{ color: '#aaa' }}>{r.telefono}</span>
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{r.email || '—'}</span>
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{r.como_se_entero || '—'}</span>
                    <span style={{ color: '#777', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {new Date(r.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── Contenido Tab ── */}
        {tab === 'contenido' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Textos editables</h2>
            {contenido.map((item, idx) => (
              <div key={item.id} style={cardStyle}>
                <label style={{ ...labelStyle, marginBottom: '0.5rem', display: 'block' }}>
                  {item.descripcion || item.clave}
                </label>
                {item.valor.length > 100 ? (
                  <textarea
                    value={item.valor}
                    onChange={e => {
                      const updated = [...contenido];
                      updated[idx] = { ...item, valor: e.target.value };
                      setContenido(updated);
                    }}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                ) : (
                  <input
                    value={item.valor}
                    onChange={e => {
                      const updated = [...contenido];
                      updated[idx] = { ...item, valor: e.target.value };
                      setContenido(updated);
                    }}
                    style={inputStyle}
                  />
                )}
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => saveContenido(item)} style={saveBtnStyle}>Guardar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Carousel Row ─── */
function CarouselRow({ item, uploading, onFileSelect, onChange, onSave, onDelete }: {
  item: CarouselImage;
  uploading: boolean;
  onFileSelect: (file: File) => void;
  onChange: (item: CarouselImage) => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{
      ...cardStyle,
      display: 'grid', gridTemplateColumns: '80px 1fr 80px 70px auto',
      gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1.25rem',
    }}>
      {/* Thumbnail + upload */}
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
        {item.src ? (
          <img
            src={item.src} alt={item.alt}
            style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.1)' }}
            onError={(e) => { (e.target as HTMLImageElement).src = ''; }}
          />
        ) : (
          <div style={{
            width: '64px', height: '48px', borderRadius: '0.375rem',
            border: '2px dashed rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </div>
        )}
        {uploading && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
            borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#C8956C', fontSize: '0.6rem', fontWeight: 600 }}>...</span>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
            e.target.value = '';
          }}
        />
      </div>

      {/* Descripción */}
      <input
        value={item.alt}
        onChange={e => onChange({ ...item, alt: e.target.value })}
        style={{ ...inputStyle, fontSize: '0.85rem' }}
        placeholder="Descripción"
      />

      {/* Orden */}
      <input
        type="number"
        value={item.orden}
        onChange={e => onChange({ ...item, orden: parseInt(e.target.value) || 0 })}
        style={{ ...inputStyle, width: '60px', fontSize: '0.85rem', textAlign: 'center' }}
      />

      {/* Activo */}
      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={item.activo}
          onChange={e => onChange({ ...item, activo: e.target.checked })}
        />
      </label>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <button onClick={onSave} style={{ ...saveBtnStyle, padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>Guardar</button>
        <button onClick={onDelete} style={{ ...deleteBtnStyle, padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>Eliminar</button>
      </div>
    </div>
  );
}

// ── Styles ──
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.75rem', background: '#242424',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem',
  color: '#f0f0f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem', fontWeight: 600, color: '#C8956C',
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const cardStyle: React.CSSProperties = {
  background: '#1e1e1e', borderRadius: '0.75rem', padding: '1.25rem',
  marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.06)',
};

const btnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', background: '#C8956C', color: '#fff',
  border: 'none', borderRadius: '0.5rem', fontSize: '0.85rem',
  fontWeight: 600, cursor: 'pointer',
};

const saveBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', background: '#22c55e20', color: '#22c55e',
  border: '1px solid #22c55e40', borderRadius: '0.5rem', fontSize: '0.8rem',
  fontWeight: 600, cursor: 'pointer',
};

const deleteBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', background: '#ef444420', color: '#ef4444',
  border: '1px solid #ef444440', borderRadius: '0.5rem', fontSize: '0.8rem',
  fontWeight: 600, cursor: 'pointer',
};
