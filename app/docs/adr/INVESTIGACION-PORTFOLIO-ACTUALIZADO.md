# Investigación técnica: Landing Page / Portfolio personal de Roger

> **Fecha:** 26 de octubre de 2026
> **Estado:** Revisión técnica actualizada; arquitectura con React Router y setup inicial definidos
> **Alcance:** stack tecnológico, analítica de tráfico, arquitectura feature-based con navegación por rutas y setup reproducible, con referencias.
> **Última revisión técnica:** 26 de octubre de 2026.

---

## 0. Cómo leer este documento

- Cada recomendación indica **qué fuente la respalda** (números entre corchetes, ver sección 9).
- Marqué la calidad de cada fuente: **[Oficial]** (documentación del proyecto/organización) o **[Comunidad]** (blogs, repos de ejemplo, comparativas). Las de comunidad sirven como evidencia de práctica real, pero pesan menos que las oficiales.
- Lo que es **opinión mía** (criterio profesional sin una fuente directa) está marcado como **[Criterio propio]**.
- La sección 8 resume las **decisiones funcionales pendientes**; la sección 11 contiene el setup reproducible para comenzar.

---

## 1. Análisis del diseño de Figma

La imagen es pequeña, así que algunos textos son lectura aproximada. Corrígeme lo que no coincida.

### 1.1 Estructura de la página (una sola página, scroll vertical)

| # | Sección | Contenido observado |
|---|---------|---------------------|
| 1 | **Header** | Marca/nombre a la izquierda; navegación a la derecha (Home, About, Projects, Backgrounds, Contact). |
| 2 | **Hero** | Titular gigante en mayúsculas condensadas: *FULL-STACK SOFTWARE ENGINEER*. Insignia azul con fecha ("20 Oct."), texto corto de presentación, indicador "Scroll down". |
| 3 | **About** | "HELLO I'M ROGER" + párrafo (ingeniero de software en Perú, sistemas a medida, soluciones escalables y mantenibles, intereses personales) + botón **Contact me**. |
| 4 | **Selected Projects** | 5 proyectos en layout escalonado (izquierda/derecha alternado): Wirana AI, Wirana Page, Notes App, Colors Picker, Ecommerce API. Cada uno con imagen (hoy placeholders grises), año y etiquetas. |
| 5 | **Backgrounds & Focus** | Lista numerada 01–07 de experiencia/tutorías (UTP, Aluba Latam, Fenny, WTPE, OneWord Camp) y dos columnas laterales: *Core Focus* y *Beyond the Code*. |
| 6 | **Contact** | Titular gigante *LET'S CONNECT*, texto invitando a escribir, botones **Contact me** y **Read resume**. |
| 7 | **Footer** | Ubicación (Lima, Perú, -05:00), enlaces a GitHub, GitLab y LinkedIn, copyright. |

### 1.2 Lenguaje visual

- Tema **oscuro** con texto blanco y un único acento azul (la insignia de fecha).
- Tipografía display **ultra condensada, bold, en mayúsculas** para titulares; texto secundario pequeño y espaciado.
- Mucho espacio negativo, composición editorial/escalonada.

### 1.3 Implicaciones técnicas

1. **El Hero es texto, no imagen.** El elemento más grande al cargar (LCP) será el titular. Eso es bueno: la métrica de carga depende de la fuente web, no de un modelo 3D. La fuente debe precargarse y usar `font-display` adecuado. **[Criterio propio]**
2. **Three.js no aparece en el diseño.** Hay que decidir dónde vive el 3D (fondo del hero, hover de proyectos, elemento decorativo). Ver pregunta P3 en la sección 8.
3. **Hay contenido repetitivo y estructurado** (proyectos, experiencia, enlaces). Conviene guardarlo como **datos tipados** y no escrito directamente en el JSX.
4. **Contenido real para SEO/compartir:** es una página de marca personal. Al compartir el enlace (LinkedIn, WhatsApp) se necesitan metadatos Open Graph y HTML legible sin depender de JS. Ver sección 3.3.
5. **La "fecha" del hero** parece un dato dinámico (¿última actualización? ¿disponibilidad?). Pregunta P4.

---

## 2. Stack propuesto

### 2.1 Lo que ya definiste

| Tecnología | Veredicto | Notas |
|---|---|---|
| React 19+ | ✅ | Compatible con el stack 3D (ver R3F v9). |
| Three.js | ✅ | Usarlo vía React Three Fiber (R3F). |
| Motion | ✅ | El paquete se llama `motion` y se importa desde `motion/react` [7]. |
| ESLint | ✅ | Usar **flat config** (ESLint 9+) [9][10]. |
| Sass | ✅ | Usar `@use`/`@forward`; `@import` está **deprecado** [8]. |

### 2.2 Stack recomendado y decisiones de integración

| Área | Tecnología / decisión | Por qué | Fuente |
|---|---|---|---|
| Lenguaje | **TypeScript con `strict: true`** | Reduce errores de tipos y obliga a hacer explícitos los casos inciertos. | [10] [Oficial] |
| Routing + renderizado | **React Router Framework Mode** | Define rutas y layouts de forma explícita, genera módulos de ruta tipados, aplica división de código por ruta y permite SSR o prerender estático. | [32][33][34][35] [Oficial] |
| Build | **Vite mediante el plugin oficial de React Router** | React Router Framework Mode se integra con Vite; no es necesario montar un segundo router ni configurar Vite desde cero. | [32][33] [Oficial] |
| 3D | **Three.js + `@react-three/fiber` + `@react-three/drei`** | R3F permite describir la escena 3D con componentes React. Mantener la escena aislada y comprobar siempre la compatibilidad de versiones peer. | [6] [Comunidad] |
| Animación UI | **Motion** (`motion/react`) | Para transiciones, entradas, gestos y animaciones de layout. | [7] [Comunidad] |
| Animación de scroll | **GSAP + ScrollTrigger, solo si hace falta** | Añadirlo si el diseño necesita timelines sincronizadas con el scroll que Motion no resuelve bien. | [7] [Comunidad] |
| Scroll suave | **Lenis, opcional** | Se añade después de estabilizar el scroll nativo, la accesibilidad y los enlaces de ancla. | [11] [Comunidad] |
| Estado compartido 3D | **Zustand, solo si aparece estado global real** | No instalarlo preventivamente: props, estado local y context pueden ser suficientes. | [6] [Criterio propio] |
| Estilos | **Dart Sass + Sass Modules por componente** | Mantiene estilos locales y un sistema central de tokens, mixins y funciones. Usar `@use` / `@forward`, no `@import`. | [8][32] [Oficial] |
| Calidad de código | **ESLint flat config + typescript-eslint + React Hooks + jsx-a11y + Prettier** | Unifica reglas, accesibilidad estática y formato. | [9][10][37] [Oficial/Comunidad] |
| Tests unitarios y de componentes | **Vitest + Testing Library + jsdom** | Encaja con Vite y permite probar el comportamiento observable de componentes. | [9][10][38] [Oficial/Comunidad] |
| Tests E2E / accesibilidad | **Playwright + axe** | Comprueba navegación real, rutas, interacciones y accesibilidad en navegador. | [9][10] [Comunidad] |
| Git hooks | **Husky + lint-staged + commitlint** | Ejecuta validaciones rápidas antes de los commits y mantiene un formato consistente de mensajes. | [9][10] [Comunidad] |
| CI/CD | **GitHub Actions** | Ejecuta typegen/typecheck, lint, tests y build en cada PR. | [9][10][12] |
| Rendimiento | **Lighthouse CI** | Convierte las metas de rendimiento y accesibilidad en validaciones automatizadas. | [13][14] |
| Hosting | **Hosting estático compatible con el build prerenderizado** | Para el portfolio se prefiere CDN/hosting estático. La configuración final depende de Vercel, Cloudflare Pages o Netlify. | [35][39] [Oficial] |
| Errores en producción | **Sentry, opcional** | Incorporarlo cuando exista una necesidad de observabilidad que lo justifique. | [10] |
| Decisiones técnicas | **ADRs en `docs/adr/`** | Deja registradas las razones de decisiones no obvias y facilita cambios futuros. | [12] |

> **Versión verificada:** al consultar la documentación oficial el 26/10/2026, React Router mostraba la línea 8.x como la versión actual. Usa el generador oficial y conserva las versiones compatibles que resuelva; no copies versiones antiguas de tutoriales. [32][33]

### 2.3 Decisión de renderizado: React Router Framework Mode + prerender estático

La documentación de React recomienda considerar un framework porque una SPA montada desde cero obliga al equipo a resolver por su cuenta routing, carga de datos, división de código y estrategia de renderizado. React Router ofrece tres modos: Declarative, Data y Framework. Para este caso no basta con añadir `BrowserRouter` a la estructura anterior: la mejor base es **Framework Mode**, con módulos de ruta, layouts, carga de código por ruta y soporte oficial de prerenderizado. [5][32][33][34]

**Decisión para este portfolio:** mantener React y Vite, usando el plugin de React Router Framework Mode, y desplegar como sitio estático prerenderizado (`ssr: false` + `prerender`) mientras el contenido siga siendo principalmente estático. En el build se debe generar HTML para cada URL pública conocida. Esto mejora el HTML inicial para SEO y enlaces compartidos, sin mantener un servidor de aplicación en producción. React Router documenta esta estrategia y permite prerenderizar rutas dinámicas si se enumeran las URLs concretas. [35]

Si en el futuro el sitio requiere contenido personalizado por usuario, sesiones, formularios que mutan datos en servidor o contenido que cambia por petición, se puede reconsiderar SSR o un backend. Esa evolución debe ser una ADR, no una razón para construir desde ahora una infraestructura innecesaria.

**Rutas iniciales propuestas:**

| URL | Responsabilidad |
|---|---|
| `/` | Landing principal con Hero, About, Projects destacados, Background, Contact y Footer. |
| `/projects` | Catálogo completo de proyectos, con filtros si en el futuro resultan necesarios. |
| `/projects/:slug` | Caso de estudio individual; una ruta reutilizable para cada proyecto. |
| `/resume` | Página o descarga del CV. |
| `*` | Página 404. |

Las opciones Home, About, Backgrounds y Contact del diseño pueden seguir llevando a anclas en la home (`/#about`, `/#background`, `/#contact`); Projects puede llevar a `/projects`. Si alguien visita esas anclas desde otra ruta, el enlace debe volver primero a `/` y conservar el fragmento. Para navegación interna se utilizarán `Link` / `NavLink` de React Router; para destinos externos, enlaces HTML normales.

**Importante:** React Router no crea por sí solo el contenido Open Graph ni garantiza el SEO. Cada route module debe definir título y descripción, la imagen de compartir debe existir en una URL pública estable y las rutas relevantes deben estar incluidas en el prerender y sitemap. [35][36]

### 2.4 Sobre Sass

Dart Sass anunció `@import` como **deprecado desde la versión 1.80.0**, y pide migrar al sistema de módulos (`@use` / `@forward`) [8] **[Oficial]**. Para un proyecto nuevo:

```scss
// styles/abstracts/_index.scss
@forward 'variables';
@forward 'mixins';

// en cualquier módulo
@use 'styles/abstracts' as abs;
.title { color: abs.$color-text; }
```

Recomendación: **SCSS Modules** por componente + una capa global mínima (reset, tokens, tipografía). **[Criterio propio]**

### 2.5 Buenas prácticas de R3F a tener en cuenta

Resumen de una guía comunitaria con más de 70 reglas [6]:

- **No llamar `setState` dentro de `useFrame`**: provoca 60 re-renders por segundo. Mutar refs directamente.
- Usar `useGLTF` con el modelo **precargado**; comprimir modelos (la guía cita reducciones de 70–90% con Draco + texturas redimensionadas + WebP).
- Alternar `visible` en lugar de desmontar/montar objetos.
- Liberar geometrías y materiales creados dinámicamente (`dispose()`).
- Medir con `r3f-perf`.

Y por mi parte **[Criterio propio]**:

- Cargar el `<Canvas>` con `React.lazy` + `Suspense` para que no bloquee el LCP del titular.
- Detectar `prefers-reduced-motion` y dispositivos de baja potencia, mostrando un fallback estático.
- Limitar el `dpr` en móviles.

---

## 3. Analítica de tráfico

### 3.1 Qué quieres medir

Visitas, páginas vistas, origen del tráfico, países, dispositivos y **conversiones** (clics en *Contact me*, *Read resume*, GitHub/LinkedIn, proyectos). Además, rendimiento real (Core Web Vitals) de visitantes reales.

### 3.2 Comparativa de opciones

| Herramienta | Tipo | Costo | Puntos fuertes | Limitaciones | Fuente |
|---|---|---|---|---|---|
| **Plausible** | SaaS o autoalojado, sin cookies | Desde ~US$9/mes (cloud) | Script de menos de 1 KB, panel simple, alojado en la UE | De pago en la nube; menos detalle que otras | [15][16][17] |
| **Umami** | Open source (MIT), autoalojado o cloud | Gratis autoalojado (solo pagas hosting) | Tracking por script simple, buena para múltiples sitios | Requiere Postgres si lo autoaloja; menos pulido que Plausible | [3][17][18] |
| **Vercel Analytics** | Integrado en Vercel | Según plan | Instalación inmediata; incluye Web Vitals por ruta | Atado a la plataforma Vercel | [2][19] |
| **PostHog** | Producto completo, open source | Plan gratuito | Reemplaza analítica web + replay + feature flags | Más pesado de lo que una landing necesita. La comparación citada es de la propia PostHog (fuente con interés) | [4] |
| **Google Analytics 4** | Gratuito | Gratis | Muy completo | La comparativa citada advierte de las prácticas de datos de Google y de banners de cookies | [3] |
| **Microsoft Clarity / Hotjar** | Mapas de calor y session replay | Varía | Ver cómo interactúan con el diseño | Complemento, no reemplazo | [20] |

### 3.3 Recomendación

1. **Tráfico y conversiones:** **Umami** (si quieres coste cero y control de datos) **o Plausible** (si prefieres no mantener infraestructura). Ambas son sin cookies, lo que evita banner de consentimiento en la mayoría de casos [3]. *Mi sugerencia para empezar: Umami Cloud o Plausible, y migrar a autoalojado solo si lo necesitas.* **[Criterio propio]**
2. **Rendimiento real:** librería `web-vitals` enviando métricas a la herramienta elegida (o Vercel Speed Insights si hospedas en Vercel [19]).
3. **SEO:** **Google Search Console** (gratuito) para ver búsquedas e indexación. **[Criterio propio]**
4. **Eventos a registrar (plan de medición):**

| Evento | Dónde |
|---|---|
| `cta_contact_click` | Botón Contact me (About y Contact) |
| `cta_resume_click` | Botón Read resume |
| `project_click` (con nombre) | Cada tarjeta de proyecto |
| `social_click` (GitHub / GitLab / LinkedIn) | Footer |
| `section_view` | Visibilidad de cada sección (IntersectionObserver) |
| Core Web Vitals | Automático |

5. **Limitación honesta:** entre **25% y 45%** de los usuarios bloquean rastreadores, y hasta los scripts "privacy-first" alojados en dominios conocidos se bloquean a nivel DNS [1]. Tus cifras **subestimarán** el tráfico real. Mitigación: servir el script desde tu propio dominio (proxy), y tomar los números como tendencia, no como conteo exacto.

### 3.4 Umbrales de rendimiento para evaluar

Core Web Vitals, medidos en el **percentil 75** de las visitas [21] **[Oficial]**:

| Métrica | Bueno | Deficiente |
|---|---|---|
| LCP (carga) | ≤ 2.5 s | > 4 s |
| INP (respuesta) | ≤ 200 ms | > 500 ms |
| CLS (estabilidad visual) | ≤ 0.1 | > 0.25 |

Para un portfolio con 3D y animaciones, **INP y LCP son los riesgos reales**. Estos umbrales deben convertirse en el presupuesto de Lighthouse CI.

---

## 4. Arquitectura de carpetas y navegación

### 4.1 El criterio arquitectónico

La arquitectura se mantiene **feature-based**, inspirada en Bulletproof React, pero corrige una omisión importante de la versión anterior: organizar por features no resuelve por sí solo el routing, las páginas, los layouts, los límites entre módulos ni el renderizado de URLs directas.

La propuesta separa responsabilidades de cuatro tipos:

1. **`routes/`**: módulos de React Router que representan URLs/páginas. Reciben la navegación, componen funciones visuales y definen metadatos o manejo de errores por ruta.
2. **`layouts/`**: estructura compartida entre rutas, por ejemplo el header, el footer y el contenedor principal.
3. **`features/`**: módulos de negocio/UI propios de cada área visual, con sus componentes, datos, tipos, hooks y estilos cuando correspondan.
4. **`shared/`**: componentes genéricos y utilidades reutilizables que no conocen las features ni las rutas.

La documentación oficial de React Router Framework Mode establece `app/routes.ts` como el mapa de URL a route modules y cada módulo puede aportar UI, datos, metadatos y un `ErrorBoundary`. También ofrece división de código por ruta y renderizado prerenderizado. [33][34][36]

### 4.2 Por qué no usar solo carpetas por tipo ni adoptar FSD completo

| Opción | Evaluación para este proyecto |
|---|---|
| Por tipo (`components/`, `hooks/`, `utils/`) | Es simple al inicio, pero dispersa el código de una misma feature y dificulta conocer su alcance. No será la estructura principal. |
| Feature-based con límites claros | **Elegida.** Cada área de negocio/experiencia mantiene junto su código específico; las rutas orquestan las features. |
| Feature-Sliced Design (FSD) completo | Es una opción válida para dominios/equipos más grandes, pero sus capas y reglas adicionales no son necesarias desde el día uno para este portfolio. Se adoptarán límites explícitos sin aplicar toda la metodología. |

Bulletproof React describe una estructura con `app`, `features`, `components`, `hooks`, `lib`, `config`, `testing` y `types`, y enfatiza la cohesión, la separación y la escalabilidad. Se usa como **referencia de principios**, no como plantilla que deba copiarse sin criterio. [29][30][31][37]

### 4.3 Estructura propuesta

El generador oficial de React Router crea la infraestructura base (entre ella `root.tsx`, `routes.ts` y la configuración de Vite). Se conserva esa infraestructura y se organiza el código de producto debajo de `app/`, el directorio de aplicación que espera el framework.

```text
portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # typegen/typecheck, lint, tests y build
│       └── lighthouse.yml            # auditoría de rendimiento en build/preview
├── docs/
│   └── adr/                          # decisiones arquitectónicas numeradas
├── public/
│   ├── fonts/                        # fuentes woff2 autohospedadas
│   ├── models/                       # modelos .glb optimizados
│   ├── images/                       # imágenes estáticas públicas
│   ├── og/                           # imágenes Open Graph
│   ├── resume/                       # CV público si se decide alojarlo aquí
│   └── robots.txt
├── tests/
│   └── e2e/                          # Playwright: navegación, smoke, accesibilidad
├── app/
│   ├── root.tsx                      # documento raíz generado por React Router
│   ├── routes.ts                     # mapa explícito de URL → route module
│   ├── routes/                       # páginas/módulos de ruta
│   │   ├── home.tsx                  # compone las secciones de la landing
│   │   ├── projects.tsx              # listado de proyectos
│   │   ├── project-detail.tsx        # /projects/:slug
│   │   ├── resume.tsx                # CV o descarga
│   │   └── not-found.tsx             # 404
│   ├── layouts/
│   │   └── site-layout.tsx           # Header + Outlet + Footer
│   ├── features/
│   │   ├── hero/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── hero.module.scss
│   │   │   └── index.ts              # API pública de la feature
│   │   ├── about/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   └── index.ts
│   │   ├── projects/
│   │   │   ├── components/           # ProjectCard, ProjectGrid, etc.
│   │   │   ├── data/projects.ts      # datos tipados con slug estable
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── background/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   └── index.ts
│   │   ├── contact/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   └── scene-3d/
│   │       ├── components/            # Canvas, escena y modelos
│   │       ├── hooks/
│   │       ├── shaders/
│   │       └── index.ts              # API pública, importada de forma lazy
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/                   # Button, Badge, SectionTitle, etc.
│   │   │   └── layout/               # SiteHeader, SiteFooter, Section
│   │   ├── hooks/                    # hooks realmente transversales
│   │   ├── lib/                      # analytics, helpers Motion/Lenis
│   │   ├── config/                   # site.ts, environment/configuración pública
│   │   ├── styles/
│   │   │   ├── abstracts/            # tokens, funciones, mixins y _index.scss
│   │   │   ├── base/                 # reset, tipografía y estilos globales
│   │   │   └── main.scss
│   │   ├── types/                    # tipos compartidos de verdad
│   │   ├── utils/                    # funciones puras compartidas
│   │   └── assets/                   # assets importados y procesados por Vite
│   └── test/
│       └── setup.ts                  # setup de Testing Library/Vitest
├── .env.example
├── .gitignore
├── eslint.config.js
├── lighthouserc.json
├── playwright.config.ts
├── react-router.config.ts            # SSR/prerender
├── tsconfig.json
├── vite.config.ts                    # plugin React Router; Sass lo procesa Vite
├── vitest.config.ts
├── package.json
└── pnpm-lock.yaml
```

**Regla de organización:** la carpeta `features/` concentra el código específico de la experiencia; no se crean carpetas vacías por anticipado. Si una feature es pequeña, puede comenzar con `components/`, su SCSS y `index.ts`; se añaden `data/`, `hooks/`, `types/` o `utils/` cuando existe código real que ubicar.

### 4.4 Mapa explícito de rutas

`app/routes.ts` debe ser la fuente de verdad para las URLs. Con la sintaxis de configuración de React Router Framework Mode, una base razonable es:

```tsx
import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/site-layout.tsx", [
    index("./routes/home.tsx"),
    route("projects", "./routes/projects.tsx"),
    route("projects/:slug", "./routes/project-detail.tsx"),
    route("resume", "./routes/resume.tsx"),
    route("*", "./routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
```

- `index(...)` define `/`.
- `route("projects", ...)` define `/projects`.
- `route("projects/:slug", ...)` define una página reutilizable para cada caso de estudio.
- `layout(...)` permite compartir el shell visual sin convertirlo en una página acoplada a una feature.
- `route("*", ...)` representa el fallback 404.

**No añadir `<BrowserRouter>` ni otro `RouterProvider` a `root.tsx` en Framework Mode.** El plugin oficial genera e integra el routing. Se deben mantener los archivos de entrada y el `root.tsx` que genere el starter y modificarlos de forma incremental. [33][34]

### 4.5 Prerenderizado para SEO y enlaces compartidos

Como el contenido público es conocido en build time, `react-router.config.ts` debe indicar `ssr: false` y enumerar las rutas que se generan como HTML. Los proyectos dinámicos también necesitan enumerarse como rutas concretas (`/projects/wirana-ai`, etc.); React Router no puede inferir todos los valores posibles de `:slug` de forma automática. [35]

El contenido de `features/projects/data/projects.ts` debe ser datos planos, tipados y con `slug` estable. La configuración de prerender puede importar ese catálogo y construir `...projects.map(project => "/projects/" + project.slug)`, evitando mantener dos listas distintas. El ejemplo exacto de configuración aparece en la sección **11. Setup**.

La implementación debe verificar que cada URL prerenderizada sirva HTML correcto al abrirse directamente, no solo al navegar desde `/`. Para rutas no prerenderizadas se debe configurar en el hosting el fallback SPA adecuado. La estrategia del host se documentará en una ADR.

### 4.6 Reglas de dependencias, modularidad y naming

1. **Dirección de imports permitida:** `routes/layouts → features/shared`; `features → shared` y a sus propios módulos internos; `shared → solo shared/terceros`. `shared` nunca importa `features`, `routes` ni `layouts`.
2. **Las features no se importan entre sí.** Si una pieza se comparte realmente, promoverla a `shared`; la composición entre varias features pertenece a un route module (por ejemplo `home.tsx`).
3. **API pública por feature:** las rutas importan desde `features/<nombre>/index.ts`, no desde rutas internas profundas. Los archivos internos de la misma feature sí pueden importarse entre sí.
4. **Una ruta se encarga de orquestar, no de absorber todo el código.** Las páginas tienen composición y responsabilidades de URL/metadatos; las secciones visuales y sus datos viven en features.
5. **TypeScript `strict`:** datos de proyectos, enlaces, experiencia y contenido estructurado tipados; evitar `any` salvo justificación explícita.
6. **Alias:** conservar el alias `~/` que ofrece normalmente el template de React Router. No mezclar `@/` y `~/`.
7. **Estilos:** SCSS Module (`*.module.scss`) para componentes/features, `main.scss` solo para tokens, reset, tipografía y estilos globales. Sass moderno con `@use` / `@forward`. [8]
8. **3D aislado:** importar la escena mediante `React.lazy` + `Suspense` o equivalente para que no retrase el contenido textual inicial. Ofrecer fallback sin 3D para `prefers-reduced-motion`, dispositivos de baja potencia o errores de carga.
9. **Pruebas cerca del código:** test unitarios/componentes junto al módulo o en `app/test`; E2E en `tests/e2e`.
10. **Control de límites:** documentar las reglas anteriores y hacerlas cumplir con ESLint/dependency checks una vez que se configuren los patrones reales de la estructura. No añadir una regla de rutas que prohíba imports internos válidos de la misma feature.

### 4.7 Por qué esta propuesta es escalable, mantenible y flexible

- **Escalable:** añadir una página consiste en una nueva route module y un registro en `routes.ts`; añadir una capacidad de producto consiste en ampliar o crear una feature.
- **Mantenible:** cada feature concentra sus datos, UI, tipos y estilos; las rutas no se convierten en componentes gigantes.
- **Flexible:** se puede reutilizar una feature en Home y Projects, cambiar el contenido a futuro o incorporar una fuente de datos sin reestructurar todo el proyecto.
- **Navegable y enlazable:** los paths tienen identidad real; se admiten enlaces directos, historial, 404 y metadatos por página.
- **Rendimiento controlado:** React Router separa el código por rutas y la escena 3D se aísla adicionalmente. Se mide el resultado en lugar de asumir que las librerías mejoran el rendimiento por sí mismas. [35][36]

## 5. Pipeline de calidad

```text
commit    → Husky + lint-staged: ESLint + Prettier sobre archivos modificados
          → commitlint: mensaje convencional
push/PR   → GitHub Actions: instalar con pnpm-lock.yaml
          → react-router typegen + TypeScript strict
          → ESLint + Vitest
          → Playwright: smoke, navegación directa y accesibilidad
          → build React Router + comprobación de prerender
          → Lighthouse CI sobre las páginas generadas/preview
merge     → deploy de preview aprobado → producción desde main
producción→ analítica de tráfico/eventos + Core Web Vitals + Sentry opcional
```

El paso de tipos debe ejecutar la generación de tipos de React Router antes de `tsc`; el build debe fallar si una ruta, un slug o el prerenderizado está roto. Los checks no deben ser una lista decorativa: la política de merge de `main` debe exigir CI verde. El deploy estático requiere publicar el directorio de salida de cliente generado por React Router y configurar los rewrites de acuerdo con las rutas prerenderizadas. [9][12][13][14][35]

## 6. Plan por fases

| Fase | Entregable |
|---|---|
| **0. Fundaciones** | Node LTS + pnpm, React Router Framework Mode, React + TypeScript strict, Sass, alias, arquitectura, rutas base y scripts de calidad. |
| **1. Sistema de diseño** | Tokens Sass, tipografía display, paleta, reset, Button/Badge/SectionTitle, header, footer y layout responsive. |
| **2. Rutas y contenido estático** | Home con Hero/About/Projects destacados/Background/Contact, listado `/projects`, detalle `/projects/:slug`, CV y 404; datos tipados. |
| **3. SEO y prerender** | Metadatos por route module, Open Graph, sitemap, robots.txt y prerender de las URLs reales del sitio. |
| **4. Movimiento** | Motion para entradas/hover, scroll nativo primero, Lenis solo si aporta, `prefers-reduced-motion` y navegación por anclas accesible. |
| **5. 3D** | `scene-3d` aislada, lazy-loaded, fallback estático, assets optimizados y pruebas en móvil. |
| **6. Calidad y CI** | Vitest, Testing Library, Playwright + axe, ESLint, Prettier, Husky, commitlint, GitHub Actions y Lighthouse CI. |
| **7. Analítica y lanzamiento** | Umami o Plausible, eventos, Search Console, hosting estático, dominio, monitoreo y revisión de métricas. |

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Arquitectura feature-based sin límites claros | Documentar importaciones permitidas y aplicar checks automáticos; no permitir imports cruzados entre features. |
| SPA o rutas sin HTML inicial rastreable | React Router Framework Mode con prerender de rutas públicas; verificar HTML servido por URL directa y metadatos. |
| Una URL profunda devuelve 404 en producción | Incluir slugs conocidos en prerender y configurar fallback/rewrite del hosting para las demás URLs válidas. |
| El template inicial trae Tailwind y el proyecto requiere Sass propio | Retirar la integración Tailwind del starter y usar Sass Modules; no mezclar dos sistemas de estilos por defecto. |
| 3D degrada LCP/INP en móviles | Lazy-load, fallback, límite de `dpr`, modelos comprimidos y medición con R3F Perf/Lighthouse CI. |
| Animaciones inaccesibles | Respetar `prefers-reduced-motion`; comprobar foco, teclado y Playwright + axe. |
| Sobreingeniería (FSD completo, Zustand, GSAP, Lenis desde el día uno) | Empezar con lo esencial; incorporar dependencias opcionales solo cuando haya un requisito observable. |
| Analítica subestima tráfico por bloqueadores | Interpretar cifras como tendencia y documentar límites de medición. |
| Toolchain incompatible o demasiado antigua | Node LTS compatible, lockfile comprometido al repositorio, `pnpm install --frozen-lockfile` en CI y revisión de peer dependencies de R3F. |

## 8. Decisiones y asuntos pendientes

### Decisiones resueltas en esta revisión

- **Routing:** React Router Framework Mode con mapa explícito de rutas en `app/routes.ts` y route modules separados de las features.
- **Renderizado inicial:** prerender estático para las rutas públicas conocidas (`ssr: false` + `prerender`), apropiado para un portfolio principalmente estático. Se reconsiderará SSR si aparecen requisitos reales de servidor.
- **TypeScript:** `strict: true`.
- **Estilos:** Sass Modules por componente/feature y una capa global mínima; no adoptar Tailwind como sistema principal.
- **Arquitectura:** feature-based con límites unidireccionales, sin imponer FSD completo.
- **3D:** aislado en `features/scene-3d`, lazy y con fallback; no debe bloquear el Hero.

### Decisiones funcionales todavía pendientes

- **P1. Integración 3D:** ¿fondo del Hero, objeto decorativo o interacción en proyectos? El Figma no lo muestra; no implementarlo hasta decidir una función visual concreta.
- **P2. Insignia de fecha del Hero:** ¿representa la última actualización, disponibilidad u otro dato? ¿Es dinámica?
- **P3. Analítica:** ¿Umami (cloud o autoalojado) o Plausible?
- **P4. Hosting:** ¿Vercel, Cloudflare Pages o Netlify? Debe soportar correctamente HTML prerenderizado y fallback de rutas.
- **P5. Idiomas:** ¿solo inglés (como el Figma) o inglés y español?
- **P6. CV:** ¿PDF público alojado en `public/resume/` o una página HTML más una descarga?
- **P7. Contacto:** ¿`mailto:`, enlace a LinkedIn o formulario con backend/servicio externo?
- **P8. Motion/GSAP/Lenis:** empezar con Motion y scroll nativo; añadir GSAP o Lenis solo cuando el diseño lo pida.

## 9. Referencias

**Oficiales**

- [5] React — *Build a React app from Scratch*: https://react.dev/learn/build-a-react-app-from-scratch  y *Building a React Framework*: https://react.dev/learn/building-a-react-framework
- [8] Sass — *`@import` is Deprecated*: https://sass-lang.com/blog/import-is-deprecated/
- [21] web.dev — *How the Core Web Vitals metrics thresholds were defined*: https://web.dev/articles/defining-core-web-vitals-thresholds
- [23] Feature-Sliced Design — Overview: https://feature-sliced.github.io/documentation/docs/get-started/overview
- [24] Feature-Sliced Design — Layers: https://feature-sliced.design/docs/reference/layers
- [25] Documentación FSD (repositorio): https://docsearch.algolia.com/mcp/docs/repo/feature-sliced/documentation

**Documentación oficial añadida en esta revisión**

- [32] React Router — Picking a Mode (modos Declarative, Data y Framework): https://reactrouter.com/start/modes
- [33] React Router — Framework Installation: https://reactrouter.com/start/framework/installation
- [34] React Router — Routing / Route Configuration: https://reactrouter.com/start/framework/routing y https://reactrouter.com/api/framework-conventions/routes.ts
- [35] React Router — Rendering Strategies / Pre-Rendering: https://reactrouter.com/start/framework/rendering y https://reactrouter.com/how-to/pre-rendering
- [36] React Router — Route Module (loader, ErrorBoundary, metadata y módulos de ruta): https://reactrouter.com/start/framework/route-module
- [37] Bulletproof React — Project Structure (referencia primaria de organización feature-based): https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
- [38] Vitest — Getting Started: https://vitest.dev/guide/
- [39] React Router — Deploying: https://reactrouter.com/start/framework/deploying
- [40] Node.js — Releases / LTS: https://nodejs.org/en/about/previous-releases/
- [41] pnpm — Installation: https://pnpm.io/installation/
- [42] React Three Fiber — Installation / versiones compatibles con React: https://r3f.docs.pmnd.rs/getting-started/installation
- [43] Motion for React — instalación e importación `motion/react`: https://motion.dev/docs/react-installation
- [44] actions/checkout — versiones/releases: https://github.com/actions/checkout/releases
- [45] actions/setup-node — releases y caché para package managers: https://github.com/actions/setup-node/releases
- [46] pnpm/action-setup — versión compatible con pnpm 12: https://github.com/pnpm/action-setup/releases

**Comunidad / comparativas / repos de ejemplo**

- [1] Nuxt Scripts — *Privacy-First Analytics Compared*: https://scripts.nuxt.com/learn/privacy-first-analytics-compared
- [2] PkgPulse — *Vercel Analytics vs Plausible vs Umami 2026*: https://www.pkgpulse.com/guides/vercel-analytics-vs-plausible-vs-umami-privacy-first-2026
- [3] AgentDeals — *Analytics Free Tier Comparison 2026*: https://agentdeals.dev/analytics-free-tier-comparison-2026
- [4] PostHog — *Best Plausible alternatives* (fuente con interés comercial): https://posthog.com/blog/best-plausible-alternatives
- [6] R3F best practices / versiones: https://www.skills.sh/emalorenzo/three-agent-skills/r3f-best-practices y https://llmbase.ai/skills/b-open-io/threejs-r3f/
- [7] OpenReplay — *Motion vs GSAP*: https://blog.openreplay.com/motion-vs-gsap/ ; Aceternity — *Motion vs GSAP for React*: https://ui.aceternity.com/blog/motion-vs-gsap-for-react
- [9] casaislabs — *React CI/CD (Vite + TS + Vitest + Playwright + Husky)*: https://github.com/casaislabs/React-CI-CD
- [10] pldkhoi — *react-ecc-starter*: https://github.com/pldkhoi/react-ecc-starter
- [11] Ejemplo de portfolio con Lenis + GSAP + Framer Motion: https://github.com/sluhtie/portfolio
- [12] farulivan — *Norven* (portfolio estático con ADRs, Lighthouse y CI): https://github.com/farulivan/norven
- [13] Lighthouse CI Action: https://www.github.com/marketplace/actions/lighthouse-ci-action?version=v2
- [14] DEV — *Lighthouse CI en GitHub Actions*: https://dev.to/sohanaakbar7/stop-guessing-about-performance-testing-frontend-performance-in-ci-with-lighthouse-ci-1f8m
- [15] Temperstack — Plausible vs PostHog: https://www.temperstack.com/versus/plausible-vs-posthog/
- [16] Gautam Khorana — Plausible vs Vercel Analytics: https://gautamkhorana.com/analytics/compare/plausible-vs-vercel-analytics/
- [17] Gautam Khorana — Plausible vs Umami: https://gautamkhorana.com/analytics/compare/plausible-vs-umami/
- [18] Builder.io — Umami / Plausible: https://best-of-web.builder.io/library/umami-software/umami
- [19] Swetrix — Vercel Web Analytics vs Umami: https://swetrix.com/comparison/vercel-web-analytics/vs-umami
- [20] PkgPulse — guías de analítica (Clarity/Hotjar/FullStory): https://www.pkgpulse.com/guides/tag/analytics
- [22] Educative — *Feature-Based Folder Structures*: https://www.educative.io/courses/learn-react/feature-based-folder-structures
- [26] Skillshub — nextjs-architecture (advertencia sobre boilerplate de FSD): https://openskillindex.com/skills/comeonoliver-skillshub-nextjs-architecture
- [27] DEV — *Mastering Feature-Sliced Design*: https://dev.to/arjunsanthosh/mastering-feature-sliced-design-lessons-from-real-projects-2ida
- [28] Zenn (Lancers) — comparación FSD vs Bulletproof React: https://zenn.dev/lancers/articles/a216e81bce1ccf
- [29] Bulletproof React (repositorio oficial): https://github.com/alan2207/bulletproof-react
- [30] DEV (meijin) — *bulletproof-react is a hidden treasure*: https://dev.to/meijin/bulletproof-react-is-a-hidden-treasure-of-react-best-practices-3m19
- [31] GitCode — guía de arquitectura bulletproof-react (flujo unidireccional y ESLint): https://blog.gitcode.com/429200f73ceb1c6ce9f57c8135ae3dd9.html

---

## 10. Limitaciones de esta investigación

- Se ha consultado el repositorio oficial de Bulletproof React en esta revisión; sigue siendo una guía de criterios y no una norma universal que haya que copiar literalmente.
- Varias comparativas de analítica son de terceros con posibles intereses comerciales; precios y planes cambian y deben **verificarse antes de contratar**.
- Las versiones publicadas evolucionan. El generador oficial y las peer dependencies resueltas por pnpm prevalecen sobre versiones copiadas de esta documentación; antes de integrar R3F hay que comprobar su compatibilidad con React.
- El análisis del Figma se basa en una imagen reducida.

---

## 11. Setup: instalación y configuración del stack

Esta sección instala el stack acordado y deja el proyecto listo para empezar a implementar. Los comandos se ejecutan desde PowerShell o la terminal integrada de VS Code en Windows 11; los equivalentes funcionan también en macOS/Linux. Se usa **pnpm** como gestor único de paquetes.

### 11.1 Prerrequisitos

1. Instala **Node.js 24 LTS** desde https://nodejs.org/. React Router Framework Mode actual requiere una versión moderna de Node (la documentación de la línea actual indica Node 22.22+); Node 24 es LTS en la fecha de esta investigación. [40]
2. Instala Git y VS Code si todavía no están instalados.
3. Instala pnpm y verifica las herramientas:

```powershell
npm install --global pnpm
node --version
pnpm --version
git --version
```

La versión de Node tiene que cumplir el mínimo de React Router y las dependencias de build/test. Registra la versión concreta de pnpm en el campo `packageManager` de `package.json` y guarda `pnpm-lock.yaml` en Git para conseguir instalaciones reproducibles. La instalación oficial de pnpm documenta requisitos y métodos para Windows. [41]

### 11.2 Crear la aplicación React Router

```powershell
pnpm create react-router@latest portfolio
cd portfolio
pnpm install
pnpm dev
```

Abre `http://localhost:5173` y confirma que el starter carga antes de cambiar archivos. El generador oficial crea React Router Framework Mode, TypeScript y la configuración de Vite. [33]

**Importante sobre el template:** el template oficial por defecto puede incluir Tailwind CSS. Como este proyecto definió Sass como sistema de estilos, elimina la integración de Tailwind después del scaffold:

```powershell
pnpm remove tailwindcss @tailwindcss/vite
```

Después elimina el import/plugin de Tailwind en `vite.config.ts`, quita `@import "tailwindcss"` de la hoja CSS inicial y borra archivos de configuración exclusivos de Tailwind si el starter los generó. No borres ni recrees la integración `reactRouter()` de Vite, los archivos de entrada, `root.tsx` o la generación de tipos del starter. El `vite.config.ts` debe conservar el plugin de React Router y la resolución del alias; tras eliminar Tailwind debe tener una forma equivalente a esta:

```ts
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: { tsconfigPaths: true },
});
```

Sustituye la hoja global inicial por `app/shared/styles/main.scss` e impórtala desde `root.tsx` (por ejemplo, `import "~/shared/styles/main.scss";`).

### 11.3 Instalar las dependencias elegidas

Dependencias de runtime:

```powershell
pnpm add sass motion three @react-three/fiber@^9 @react-three/drei
pnpm add -D @types/three
```

- `sass`: compilador Dart Sass integrado con Vite.
- `motion`: importar desde `motion/react`, como indica la guía oficial. [43]
- `three`, `@react-three/fiber` y `@react-three/drei`: stack 3D. Se fija la línea R3F v9 para React 19; verificar peer dependencies si cambia la versión de React. La guía oficial indica que R3F v8 corresponde a React 18 y v9 a React 19; v10 aparece como alpha en la documentación consultada. [42]
- `lenis`: opcional; solo instálalo con `pnpm add lenis` si se confirma que el diseño lo necesita. Para el primer paso, mantener scroll nativo reduce dependencias.

Dependencias de calidad, testing y automatización:

```powershell
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import globals prettier eslint-config-prettier husky lint-staged @commitlint/cli @commitlint/config-conventional vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright @lhci/cli
```

El starter puede traer algunas dependencias o configuración de ESLint; antes de agregar duplicados, revisa `package.json`. Conserva la configuración funcional existente e incorpora las reglas necesarias. Instala el navegador de Playwright:

```powershell
pnpm exec playwright install
```

**No instalar inicialmente:** Zustand y GSAP son opcionales. Añadirlos solo si una escena necesita estado global compartido o si la animación requiere timelines complejos controlados por scroll.

### 11.4 Configurar las rutas

Reemplaza el contenido de `app/routes.ts` por el mapa de rutas descrito en la sección 4.4. Crea los archivos siguientes, aunque inicialmente puedan renderizar contenido mínimo:

```text
app/routes/home.tsx
app/routes/projects.tsx
app/routes/project-detail.tsx
app/routes/resume.tsx
app/routes/not-found.tsx
app/layouts/site-layout.tsx
```

La responsabilidad de `site-layout.tsx` es compartir `SiteHeader`, el `<Outlet />` y `SiteFooter`. La responsabilidad de `home.tsx` es componer las features de la landing; `projects.tsx` muestra el catálogo y `project-detail.tsx` resuelve el `slug`. No añadas `<BrowserRouter>`: Framework Mode ya provee el router. Usa los `Link` / `NavLink` importados desde `react-router` y define `ErrorBoundary` en root/rutas cuando corresponda. [34][36]

El `tsconfig.json` generado suele configurar el alias `~/` para el directorio `app`. Consérvalo y úsalo de forma consistente. No agregues un segundo alias hasta tener una necesidad real. Mantén `strict: true`; comprueba el archivo generado y no reemplaces otras opciones de React Router a ciegas:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Este fragmento muestra la opción que debe estar activa, no el archivo completo: el `tsconfig.json` del starter contiene otras propiedades necesarias. La opción `strict` activa el conjunto de comprobaciones estrictas de TypeScript. [10]

### 11.5 Configurar el prerender estático

Como el sitio será estático en la primera versión, crea o actualiza `react-router.config.ts` con `ssr: false` y un listado explícito de páginas que el build debe renderizar. El siguiente ejemplo asume que `projects` exporta un array de objetos con `slug` estable desde `app/features/projects/data/projects.ts`:

```ts
import type { Config } from "@react-router/dev/config";
import { projects } from "./app/features/projects/data/projects";

export default {
  ssr: false,
  async prerender() {
    return [
      "/",
      "/projects",
      "/resume",
      ...projects.map((project) => `/projects/${project.slug}`),
    ];
  },
} satisfies Config;
```

Si aún no existe el catálogo de proyectos, empieza con `prerender: ["/", "/projects", "/resume"]` y añade los casos de estudio cuando sus slugs estén definidos. Cada URL adicional con parámetro dinámico debe figurar como path concreto. [35]

En hosting estático, publica el directorio de salida cliente producido por el build de React Router (habitualmente `build/client`). Configura el rewrite/fallback que recomiende el proveedor para URLs que no estén prerenderizadas. Verifica que `/`, `/projects`, cada `/projects/<slug>` y `/resume` carguen al pegarlas directamente en una pestaña nueva, no solo tras navegar desde Home. [39]

### 11.6 Configurar Sass y el sistema de estilos

Estructura inicial:

```text
app/shared/styles/
├── abstracts/
│   ├── _tokens.scss
│   ├── _mixins.scss
│   ├── _functions.scss
│   └── _index.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _global.scss
└── main.scss
```

`_index.scss` actúa como punto público de Sass:

```scss
@forward "tokens";
@forward "mixins";
@forward "functions";
```

En `main.scss`, carga los estilos base con `@use`:

```scss
@use "base/reset";
@use "base/typography";
@use "base/global";
```

Cada componente importa sus tokens/mixins mediante `@use` y mantiene estilos locales en `component.module.scss`. No usar `@import`, deprecado en Dart Sass. [8]

Desde `app/root.tsx`, importa `~/shared/styles/main.scss` siguiendo el patrón de imports que ya trae el starter. No hace falta instalar un loader Sass adicional: Vite integra Sass al detectar `.scss` una vez instalado `sass`. [32]

### 11.7 Añadir scripts de desarrollo y calidad

Añade los scripts siguientes a `package.json` sin borrar los scripts que el generador utiliza para Framework Mode. Adapta únicamente rutas o comandos que difieran en la versión de template generada:

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "typecheck": "react-router typegen && tsc",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "prepare": "husky"
  }
}
```

Si el template incluye `start` para servir el bundle SSR, no lo uses para producción estática después de configurar `ssr: false`; el hosting debe servir el build cliente. Mantén el script original solo si la aplicación conserva SSR y despliegue con servidor. El comando de typecheck genera tipos de React Router antes de pasar TypeScript. [34][36]

**Vitest:** una forma de mantener separadas las configuraciones es crear `vitest.config.ts` y mezclarla con la config de Vite del starter. Así se conserva el plugin React Router y la resolución de alias que ya genera la plantilla:

```ts
// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./app/test/setup.ts"],
      include: ["app/**/*.{test,spec}.{ts,tsx}"],
      css: true,
    },
  }),
);
```

Crea el setup:

```ts
// app/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

Para E2E, crea `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

Añade tests que visiten rutas directamente, verifiquen navegación con teclado y ejecuten axe en las páginas principales. Instala `@axe-core/playwright` como arriba; no consideres que pasar axe sustituye una revisión manual de accesibilidad. [38]

### 11.8 ESLint, Prettier y límites de arquitectura

Usa el formato **flat config** en `eslint.config.js`; una base orientativa con versiones actuales de los plugins es:

```js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["build/**", ".react-router/**", "coverage/**", "playwright-report/**", "test-results/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "import/no-duplicates": "error",
    },
  },
]);
```

Este es un punto de partida, no reemplaza la revisión de reglas por el equipo: valida que los objetos `flat` existan en las versiones instaladas y añade excepciones limitadas cuando el código lo requiera. Prettier formatea; ESLint analiza. Evita que ambos intenten gestionar las mismas reglas de estilo. [9][10]

Puedes comenzar con un `.prettierrc.json` explícito:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100
}
```

Para proteger las fronteras, configura y prueba una regla de importación o dependency-check contra la estructura real. La política que debe cumplirse es:

- `app/routes` y `app/layouts` pueden importar la API pública de `app/features` y `app/shared`.
- cada feature puede importar sus módulos internos y `app/shared`.
- ninguna feature puede importar directamente otra feature.
- `app/shared` no puede importar código de `app/features`, `app/routes` ni `app/layouts`.

No copies un patrón genérico de `import/no-restricted-paths` sin probarlo: una regla demasiado amplia puede bloquear imports internos de la misma feature o los imports permitidos que necesita una página. Añade un pequeño test/manual de lint con un ejemplo permitido y otro prohibido y verifica ambos.

Para Husky, inicializa los hooks:

```powershell
pnpm exec husky init
```

Añade esta configuración a `package.json` (sin reemplazar el resto de scripts/configuración):

```json
{
  "lint-staged": {
    "*.{js,mjs,cjs,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{scss,css,md,json,yml,yaml}": ["prettier --write"]
  }
}
```

El archivo `.husky/pre-commit` debe ejecutar `pnpm exec lint-staged`. Añade `.husky/commit-msg` con `pnpm exec commitlint --edit "$1"` si se va a aplicar Conventional Commits. Mantén estas validaciones rápidas; typecheck, suites amplias, Playwright y Lighthouse corresponden principalmente a CI.

### 11.9 Variables de entorno y seguridad

Crea `.env.example` y documenta solo nombres de variables. No guardes secretos reales en Git. En Vite, cualquier variable con prefijo `VITE_` queda expuesta al código cliente; no colocar tokens privados, secretos de analytics ni credenciales de servicio en ellas.

Ejemplo inicial, únicamente para un valor público:

```dotenv
VITE_SITE_URL=https://example.com
```

Actualiza `.gitignore` para que los archivos de entorno reales no se versionen; por ejemplo:

```gitignore
.env
.env.*
!.env.example
```

Asegúrate de mantener la excepción de `.env.example`. Si la analítica elegida requiere una clave pública, documenta cuál es pública y cuál pertenece exclusivamente a servidor antes de añadirla.

### 11.10 Lighthouse CI y GitHub Actions

Crea `lighthouserc.json` con `collect.staticDistDir` apuntando al directorio prerenderizado real (normalmente `build/client`):

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./build/client",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

Los valores son umbrales iniciales, no una promesa de puntuación. Los umbrales de INP se comprueban con datos de usuario real cuando exista suficiente tráfico; una ejecución Lighthouse local no equivale a una medición de INP de campo. Ajusta los números con resultados reales, no debilitando las pruebas para esconder regresiones. [13][21]

El siguiente workflow es un punto de partida real para `.github/workflows/ci.yml`; las versiones de las actions deben revisarse antes de crear el repositorio porque estas acciones también evolucionan:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main, dev]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Set up pnpm
        uses: pnpm/action-setup@v6.1.0
        with:
          version: 12

      - name: Set up Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
          cache-dependency-path: pnpm-lock.yaml

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm run typecheck

      - name: Lint
        run: pnpm run lint

      - name: Unit tests
        run: pnpm run test:run

      - name: Build and prerender
        run: pnpm run build

      - name: Install Playwright browser
        run: pnpm exec playwright install --with-deps chromium

      - name: E2E tests
        run: pnpm run test:e2e
```

El workflow debe instalar la versión compatible de Node LTS y pnpm fijadas por el proyecto, correr `pnpm install --frozen-lockfile`, y bloquear el merge a `main` si falla cualquier validación obligatoria. Añade Lighthouse CI en otro job o workflow después de comprobar que el build estático se puede servir correctamente en CI. Para la primera iteración es mejor tener un flujo de calidad fiable que dos workflows que dependan de un preview todavía inexistente.

### 11.11 Comprobación final antes de desarrollar

Ejecuta la secuencia desde la raíz del repositorio:

```powershell
pnpm install
pnpm run typecheck
pnpm run lint
pnpm run test:run
pnpm run build
pnpm run test:e2e
```

La base está preparada cuando se cumplen estas condiciones:

- el router resuelve `/`, `/projects`, `/projects/<slug>`, `/resume` y el 404;
- cada ruta puede abrirse directamente y ofrece sus metadatos;
- los casos de estudio están incluidos en la lista de prerender;
- Sass compila y no depende de Tailwind;
- TypeScript strict, ESLint, unit tests, E2E y build pasan en local y CI;
- la escena 3D no bloquea el Hero y existe un fallback sin 3D;
- el `pnpm-lock.yaml` está versionado.

A partir de aquí, seguir el plan por fases de la sección 6: empezar por tokens Sass y componentes de diseño, luego las rutas y el contenido real, y dejar animación/3D después de medir la base sin esos costes.


## 12. Conclusiones

## 13. Arquitectura (7-1) - Sass Enterprise
La arquitectura consta de 7 carpetas modulares, con 4 de ellas dedicadas a la arquitectura de componentes y 1 dedicada a re-exportar los estilos base, comunmente llamada `main.scss` o `root.scss`.

Esta es la estructura que propongo para tu landing page profesional. Está pensada para un proyecto con varias secciones, componentes visuales personalizados, diseño responsive, animaciones y una posible evolución hacia una librería propia de estilos Sass.


```bash

src/
└── styles/
    ├── abstracts/
    │   ├── _index.scss
    │   ├── _tokens.scss
    │   ├── _functions.scss
    │   ├── _mixins.scss
    │   └── _placeholders.scss
    │
    ├── base/
    │   ├── _index.scss
    │   ├── _reset.scss
    │   ├── _document.scss
    │   ├── _typography.scss
    │   └── _animations.scss
    │
    ├── components/
    │   ├── _index.scss
    │   ├── _button.scss
    │   ├── _section-heading.scss
    │   ├── _hero.scss
    │   ├── _project-card.scss
    │   ├── _technology-tag.scss
    │   ├── _timeline-item.scss
    │   ├── _social-links.scss
    │   └── _contact-form.scss
    │
    ├── layout/
    │   ├── _index.scss
    │   ├── _container.scss
    │   ├── _section.scss
    │   ├── _site-header.scss
    │   ├── _navigation.scss
    │   ├── _site-footer.scss
    │   └── _grid.scss
    │
    ├── pages/
    │   ├── _index.scss
    │   └── _home.scss
    │
    ├── themes/                 # Opcional
    │   ├── _index.scss
    │   └── _dark.scss
    │
    ├── vendors/                # Opcional
    │   └── _index.scss
    │
    └── main.scss

```