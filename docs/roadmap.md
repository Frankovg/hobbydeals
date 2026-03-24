# Roadmap MVP

El MVP se desarrolla en 12 semanas divididas en 6 fases. Cada fase produce
funcionalidad entregable e integrable, no trabajo aislado.

---

## Fase 1 — Fundación del monorepo `sem 1–2`

Objetivo: entorno de desarrollo 100% funcional para todos los miembros del
equipo con un solo comando.

- Inicializar Turborepo + pnpm workspaces con los 4 packages
- Setup Supabase local con `supabase start` (Docker)
- Aplicar schema SQL + seed: admin + 5 usuarios + 30 chollos de prueba
- Configurar NativeWind v4 como puente de estilos web/mobile
- Setup CI: GitHub Actions con lint + type-check + build en cada PR
- Generar tipos TypeScript desde Supabase local

**Entregable**: `pnpm dev` arranca web en :3000, Metro en :8081 y Supabase Studio
en :54323 con datos de prueba listos.

---

## Fase 2 — Sistema de diseño y autenticación `sem 3–4`

Objetivo: tokens visuales definidos y flujo de auth completo en web y mobile.

- Diseñar tokens de temperatura: frío → azul (`#378ADD`), caliente → rojo (`#D85A30`)
- Construir `DealCard`, `CategoryBadge` y `VoteButton` en `@hobbydeals/ui`
- Auth web: login/registro con magic link y OAuth Google
- Auth mobile: equivalente en Expo con deep links y `AsyncStorage`
- Middleware de protección de rutas en Next.js
- Pantalla de onboarding: selección de hobbies favoritos

**Entregable**: usuario puede registrarse, iniciar sesión y seleccionar sus
hobbies en web y mobile.

---

## Fase 3 — Feed principal y publicación `sem 5–7`

Objetivo: funcionalidad nuclear de la plataforma operativa.

- Feed con infinite scroll y filtros por categoría, temperatura y precio
- Detalle de chollo con temperatura en tiempo real (Supabase Realtime)
- Sistema de votos hot/cold con optimistic updates y rollback
- Formulario de publicación con validación Zod + cola de moderación
- Comentarios con respuestas anidadas (1 nivel)
- Búsqueda full-text con `pg_trgm` y ranking por temperatura
- Páginas de categoría con header visual diferenciado por hobby

**Entregable**: usuario puede navegar el feed, votar, comentar, buscar y
publicar un chollo que queda en cola de moderación.

---

## Fase 4 — Panel de usuario y alertas `sem 8–9`

Objetivo: experiencia personalizada y retención de usuarios.

- Dashboard: chollos publicados, guardados y actividad reciente
- Alertas por keyword + categoría + precio máximo
- Notificaciones in-app vía Supabase Realtime
- Configuración de perfil: avatar (Supabase Storage), bio, username
- Ajustes de privacidad y preferencias de notificación
- Historial de votos y sistema de reputación visible en perfil

**Entregable**: usuario recibe notificación cuando aparece un chollo que
coincide con su alerta.

---

## Fase 5 — Panel de administración `sem 10–11`

Objetivo: herramientas para gestionar la comunidad y la calidad del contenido.

- Dashboard admin: métricas diarias, reportes pendientes, temperatura media
- Cola de moderación: aprobar o rechazar chollos con motivo de rechazo
- Gestión de usuarios: cambiar rol, banear con motivo, ajustar reputación
- Tiendas verificadas: verificar merchants y gestionar URLs de afiliación
- Revisión de reportes de contenido: resolver o desestimar
- Destacados y patrocinados: siempre etiquetados visiblemente

**Entregable**: moderador puede gestionar toda la cola de contenido pendiente
sin acceso directo a la base de datos.

---

## Fase 6 — Pulido y lanzamiento `sem 12`

Objetivo: producción lista, medible y mantenible.

- SEO: metadatos dinámicos, OG images generadas, `sitemap.xml`
- Performance: Core Web Vitals verdes, lazy loading, optimización de imágenes
- Tests de integración: votar, publicar, buscar, alertas
- Deploy web en Vercel + Supabase Cloud (migrar desde local)
- Build app con Expo EAS + submit a App Store y Google Play
- Sentry para error tracking + analytics básico de uso

**Entregable**: aplicación en producción con monitorización activa.

---

## Post-MVP (backlog)

Funcionalidades identificadas pero fuera del MVP inicial:

- Historial de precios con scraper + gráfico de evolución
- Sección de segunda mano entre usuarios (C2C)
- Notificaciones push (Expo Notifications + web push)
- Verificación de precios con IA (detectar si el "chollo" es real)
- Programa de afiliación propio para tiendas especializadas
- App de escritorio/extensión de navegador para publicar chollos desde cualquier tienda
