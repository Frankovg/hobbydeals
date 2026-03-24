# Paneles de usuario

HobbyDeals tiene dos paneles protegidos: uno para administradores/moderadores
y otro para usuarios autenticados.

---

## Panel de administración

**Ruta**: `/admin`
**Acceso**: `role: admin | moderator`

### Dashboard

- Chollos publicados por día (gráfico 30 días)
- Usuarios activos y nuevos registros
- Temperatura media de los chollos activos
- Reportes pendientes de revisión

### Cola de moderación

- Lista de chollos en estado `pending` ordenados por fecha
- Aprobar → cambia status a `active`
- Rechazar → requiere motivo, notifica al autor, cambia a `rejected`
- Vista previa del chollo antes de moderar

### Gestión de destacados

- Marcar/desmarcar un chollo como `featured`
- Marcar como `sponsored` (siempre etiquetado visiblemente en el feed)
- Los patrocinados no afectan la temperatura ni el ranking orgánico

### Gestión de usuarios

- Tabla de usuarios con búsqueda por username o email
- Ver perfil completo, historial de chollos y reputación
- Cambiar rol: `user` → `moderator` → `admin`
- Banear con motivo (el usuario ve el motivo al intentar iniciar sesión)
- Ajuste manual de reputación en casos excepcionales

### Tiendas verificadas

- Verificar un merchant: activa el badge de tienda verificada
- Gestionar URL de plantilla de afiliación por tienda
- Ver chollos publicados asociados a cada tienda

### Revisión de reportes

- Lista de reportes pendientes con contenido reportado inline
- Resolver: marcar como revisado y tomar acción (eliminar, avisar, ignorar)
- Desestimar: el contenido permanece, el reporte se cierra

### Gestión de categorías

- Editar nombre, icono (emoji), color y descripción de cada categoría
- Activar/desactivar categorías sin eliminar los chollos existentes
- Reordenar categorías (sort_order)

### Notificaciones push

- Enviar mensaje a todos los usuarios
- Segmentar por categorías seguidas

---

## Panel de usuario

**Ruta**: `/perfil`
**Acceso**: usuario autenticado

### Overview

- Reputación actual y posición relativa
- Chollos publicados (activos, pendientes, expirados)
- Últimos comentarios recibidos
- Actividad reciente (votos emitidos, comentarios)

### Mis chollos

- Lista con estado visual: activo / pendiente / expirado / rechazado
- Editar un chollo activo (título, descripción, precio, URL)
- Ver motivo de rechazo si aplica
- Eliminar un chollo propio

### Guardados

- Chollos marcados como favoritos
- Ordenar por fecha guardada o temperatura actual
- Acceso rápido al detalle

### Mis alertas

- Lista de alertas activas con keyword, categoría y precio máximo
- Crear nueva alerta desde el panel o desde el feed
- Activar/desactivar sin eliminar
- Historial de última coincidencia

### Hobbies favoritos

- Selección de categorías para personalizar el feed principal
- Mismo selector que el onboarding, editable en cualquier momento

### Editar perfil

- Username (único en la plataforma)
- Display name y bio
- Avatar: subir imagen (Supabase Storage) o usar iniciales generadas
- URL de perfil público: `/u/[username]`

### Notificaciones

- Activar/desactivar por tipo:
  - Alertas de precio (cuando coincide una alerta)
  - Respuestas a comentarios propios
  - Votos en chollos publicados
  - Anuncios del sistema
- Canal: in-app / email / push (cuando esté disponible)

### Seguridad

- Cambiar email (requiere confirmación)
- Cambiar contraseña
- Sesiones activas: ver dispositivos conectados
- Cerrar sesión en todos los dispositivos
- Eliminar cuenta (soft delete con periodo de gracia de 30 días)
