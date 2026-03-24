# Paquetes compartidos

Todos los paquetes viven en `packages/` y son consumidos por `apps/web` y
`apps/mobile`. Ningún paquete importa desde `apps/`.

---

## `@hobbydeals/ui`

Librería de componentes multiplataforma. Usa `className` de Tailwind/NativeWind,
lo que permite que el mismo componente funcione en Next.js y React Native sin
wrappers ni estilos duplicados.

### Componentes

| Componente             | Descripción                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `DealCard`             | Tarjeta de chollo con temperatura visual, precio, descuento y votos |
| `CategoryBadge`        | Badge con icono y color por hobby                                   |
| `VoteButton`           | Botón hot/cold con animación y estado optimista                     |
| `TemperatureIndicator` | Escala visual de calor del chollo (frío → caliente)                 |
| `PriceDisplay`         | Precio actual + precio original tachado + % descuento               |
| `UserAvatar`           | Avatar con imagen o fallback de iniciales                           |
| `SearchBar`            | Barra de búsqueda adaptada a web y mobile                           |
| `EmptyState`           | Estado vacío ilustrado con mensaje y acción opcional                |
| `Toast` / `Alert`      | Notificaciones temporales y mensajes de error                       |

### Tema (`src/theme/`)

Define los tokens del sistema de diseño: colores de temperatura (frío → azul,
caliente → rojo), paleta por categoría, tipografía y espaciado. Exporta el
preset de Tailwind que extiende `@hobbydeals/config/tailwind/preset.js`.

---

## `@hobbydeals/core`

Lógica de negocio compartida entre web y mobile: hooks de datos, utilidades,
tipos TypeScript y schemas de validación.

### Hooks (`src/hooks/`)

| Hook                | Descripción                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `useDeals(filters)` | Feed paginado con infinite scroll y filtros por categoría, temperatura y precio |
| `useDeal(id)`       | Detalle de un chollo con suscripción Realtime para temperatura en vivo          |
| `useVote()`         | Votar hot/cold con optimistic update y rollback en error                        |
| `useAuth()`         | Sesión activa, perfil completo y helpers de rol                                 |
| `useAlerts()`       | CRUD de alertas por keyword, categoría y precio máximo                          |

### Utilidades (`src/utils/`)

| Función                         | Descripción                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| `formatPrice(amount, currency)` | Formatea precios con i18n (locale ES por defecto)                        |
| `getTemperatureLabel(n)`        | Devuelve etiqueta según temperatura: frío / tibio / caliente / en llamas |
| `timeAgo(date)`                 | Fecha relativa en español: "hace 3 horas", "ayer"...                     |

### Validaciones (`src/validations/`)

Schemas Zod definidos una vez y usados en ambas apps:

- `dealSchema` — publicar o editar un chollo
- `registerSchema` — registro de usuario
- `alertSchema` — crear o modificar una alerta
- `profileSchema` — editar perfil

### Tipos (`src/types/`)

Tipos TypeScript globales del dominio: `Deal`, `Profile`, `Category`, `Vote`,
`Alert`, `Comment`, `Notification`. Se complementan con los tipos generados
automáticamente en `@hobbydeals/supabase`.

### API (`src/api/`)

Queries Supabase tipadas y reutilizables, sin lógica de UI. Cada función recibe
el cliente de Supabase como parámetro para ser compatible con SSR (server client)
y client-side (browser client).

---

## `@hobbydeals/config`

Configuraciones de toolchain compartidas. Ninguna app o paquete define sus
propias reglas de ESLint, TypeScript o Tailwind desde cero — siempre extienden
desde aquí.

### ESLint (`eslint/`)

| Config                       | Extiende                                  |
| ---------------------------- | ----------------------------------------- |
| `eslint-config-base`         | Reglas comunes a todo el monorepo         |
| `eslint-config-next`         | Base + reglas específicas de Next.js      |
| `eslint-config-react-native` | Base + reglas específicas de React Native |

### TypeScript (`typescript/`)

| Config              | Descripción                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `base.json`         | TypeScript estricto (`strict: true`, `noUncheckedIndexedAccess`) |
| `next.json`         | Extiende base con paths y plugins de Next.js                     |
| `react-native.json` | Extiende base con tipos de React Native y Expo                   |

### Tailwind (`tailwind/`)

| Archivo         | Descripción                                                   |
| --------------- | ------------------------------------------------------------- |
| `preset.js`     | Tokens de color, tipografía y espaciado del sistema de diseño |
| `nativewind.js` | Preset para mobile, compatible con NativeWind v4              |

---

## `@hobbydeals/supabase`

Factoría de clientes Supabase y tipos generados. Centraliza la configuración de
conexión para que cada app use el cliente correcto según el contexto.

### Clientes (`src/client.ts`)

| Función                 | Uso                                          |
| ----------------------- | -------------------------------------------- |
| `createBrowserClient()` | Next.js client components (`"use client"`)   |
| `createServerClient()`  | React Server Components y API routes         |
| `createMobileClient()`  | React Native con `AsyncStorage` como storage |

### Tipos (`src/types.ts`)

Generados automáticamente con:

```bash
supabase gen types typescript --local > packages/supabase/src/types.ts
```

Exporta `Database`, `Tables<T>` y `Enums<T>` para acceso tipado a toda la base
de datos. Regenerar tras cada migración.
