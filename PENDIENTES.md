# PENDIENTES - IC-SHALOM

## Sitio Web Shalom Iglesia Cristiana

---

## Deployment

**El sitio ya está desplegado con Docker + Traefik.**

Para actualizar en producción:
```bash
# En el servidor
cd IC-SHALOM
git pull origin main
docker-compose up -d --build
```

Dominios configurados: `ic-shalom.com`, `ic-shalom.mx`, `ic-shalom.org`

---

### Alta Prioridad

- [ ] **Contenido de Ministerios** - Los 8 ministerios muestran "Próximamente"
  - [ ] Varones
  - [ ] Mujeres
  - [ ] Jóvenes
  - [ ] Teens
  - [ ] Niños
  - [ ] Matrimonios
  - [ ] Recupera
  - [ ] Raíces

- [ ] **Información del Pastor/Líderes** - El chatbot indica "Próximamente"

### Media Prioridad

- [ ] **Sección de Eventos** - La tabla existe en Supabase pero falta integración frontend
  - [ ] Conectar eventos de Supabase al frontend
  - [ ] Crear interfaz de administración de eventos

- [ ] **Sistema de Ofrendas/Donaciones** - Mencionado en chatbot pero no implementado

### Baja Prioridad

- [ ] **Páginas dedicadas por ministerio** - Cada ministerio podría tener su propia página
- [ ] **Panel de administración** - Para gestionar peticiones de oración y eventos
- [ ] **Galería de fotos** - Ampliar el collage actual

### Completado

- [x] Estructura base del sitio
- [x] Sistema de peticiones de oración (Supabase)
- [x] Chatbot con información de la iglesia
- [x] Tema claro/oscuro
- [x] Diseño responsive
- [x] Configuración Docker + Traefik para deployment
- [x] Integración con WhatsApp
- [x] Mapa de ubicación
- [x] Link a transmisión en vivo (YouTube)

---
Última actualización: 2026-03-20
