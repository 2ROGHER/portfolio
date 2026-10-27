# Investigación técnica: Landing Page / Portfolio personal de Roger

> **Fecha:** 26 de octubre de 2026
> **Estado:** Borrador para revisión y visto bueno
> **Alcance:** stack tecnológico, analítica de tráfico y arquitectura de carpetas, con referencias.

---

## 0. Cómo leer este documento

- Cada recomendación indica **qué fuente la respalda** (números entre corchetes, ver sección 9).
- Marqué la calidad de cada fuente: **[Oficial]** (documentación del proyecto/organización) o **[Comunidad]** (blogs, repos de ejemplo, comparativas). Las de comunidad sirven como evidencia de práctica real, pero pesan menos que las oficiales.
- Lo que es **opinión mía** (criterio profesional sin una fuente directa) está marcado como **[Criterio propio]**.
- Al final hay una sección de **decisiones pendientes** que necesito que apruebes.

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

### 2.2 Lo que recomiendo añadir

| Área | Tecnología | Por qué | Fuente |
|---|---|---|---|
| Lenguaje | **TypeScript (strict)** | Los starters de producción revisados lo asumen en todas partes. | [9][10] |
| Build | **Vite** | La documentación de React lo lista como herramienta de build para apps sin framework. | [5] [Oficial] |
| 3D | **@react-three/fiber v9 + @react-three/drei** | R3F v9 es la línea compatible con React 19; v8 es para React 18. No mezclar líneas. | [6] [Comunidad] |
| Estado 3D | **zustand** (solo si hace falta) | Es el compañero habitual de R3F; evita re-renders por estado de React. | [6] |
| Animación UI | **Motion** | Declarativo, ideal para entradas/salidas, layout y gestos. | [7] |
| Animación scroll | **GSAP + ScrollTrigger** (solo si lo necesitas) | Mejor para timelines con "scrub" y piezas de scroll complejas. Regla práctica: empezar con Motion y añadir GSAP cuando aparezca esa necesidad. | [7] |
| Scroll suave | **Lenis** | Patrón común en portfolios creativos; se integra con GSAP. | [11] |
| Calidad de código | **typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y, Prettier** | Es la combinación que usan los starters revisados. | [9][10] |
| Git hooks | **Husky + lint-staged + commitlint** | Bloquea código con errores antes del commit y fuerza commits convencionales. | [9] |
| Tests unitarios | **Vitest + Testing Library** | Estándar actual del ecosistema Vite. | [9][10] |
| Tests E2E / a11y | **Playwright** (+ axe) | Humo + accesibilidad. Un portfolio con animaciones debe probarse en navegador real. | [9][10][12] |
| CI/CD | **GitHub Actions** | Lint, tipos, tests, build y auditoría en cada PR. | [9][12] |
| Rendimiento en CI | **Lighthouse CI con presupuesto de rendimiento** | Una regresión de rendimiento sin chequeo en CI es "solo una sugerencia". | [13][14] |
| Hosting | **Vercel, Cloudflare Pages o Netlify** | Los tres admiten despliegues de preview sobre los que se puede correr Lighthouse. | [14] |
| Errores en producción | **Sentry** (opcional) | Aparece en starters de producción. | [10] |
| Documentación de decisiones | **ADRs** (`docs/adr/`) | Un portfolio de ejemplo bien armado documenta sus decisiones (motion, hosting). | [12] |

### 2.3 Una advertencia importante sobre React sin framework

La documentación oficial de React indica que la mayoría de las apps se benefician de un framework, y que empezar "desde cero" con Vite equivale a construir tu propio framework: tendrás que resolver tú routing, carga de datos, code-splitting y otras capacidades [5] **[Oficial]**.

Para una landing de **una sola página**, eso es manejable y Vite es una elección legítima. Pero la decisión de **cómo se renderiza** (SPA, prerender/SSG o framework) afecta SEO y previews al compartir. Ver P1.

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

## 4. Arquitectura de carpetas

### 4.1 Opciones evaluadas

| Opción | Qué es | Cuándo encaja |
|---|---|---|
| **Por tipo de archivo** (`components/`, `hooks/`, `utils/`) | Todo agrupado por rol técnico | Prototipos muy pequeños; escala mal. Es el patrón que los cursos describen como fuente de problemas al crecer [22]. |
| **Feature-based (estilo Bulletproof React)** | Código agrupado por funcionalidad, con flujo de dependencias en una sola dirección | Proyectos pequeños a medianos. Es la elección más citada para SPAs con Vite. |
| **Feature-Sliced Design (FSD)** | Metodología estricta con capas (`app`, `pages`, `widgets`, `features`, `entities`, `shared`), slices y segments | Proyectos grandes con varios equipos. |

### 4.2 Qué dicen las fuentes sobre FSD

- La documentación oficial de FSD define capas, slices y segmentos, y una regla de importación: un módulo solo puede importar de capas **estrictamente inferiores** [23][24] **[Oficial]**. También dice que **no es obligatorio usar todas las capas** [25].
- Experiencias de comunidad advierten que FSD **introduce boilerplate** y recomiendan usarlo solo si el proyecto va a crecer mucho (una guía cita 20+ features); para proyectos menores prefieren una estructura modular simple [26] **[Comunidad]**.
- Un autor que usa FSD en SaaS y dashboards aclara que para proyectos pequeños aplica algo más simple como Bulletproof React [27] **[Comunidad]**.
- Un equipo que evaluó ambos **descartó FSD** por curva de aprendizaje y sobre-ingeniería para equipos pequeños, y **adoptó Bulletproof React** por su teoría simple y estructura intuitiva [28] **[Comunidad]**.

### 4.3 Qué dice Bulletproof React

Nota de transparencia: no pude abrir el repositorio directamente; me apoyé en fuentes secundarias que lo describen [29][30][31].

Principios que coinciden entre ellas:

1. **Organización por funcionalidad** (`features/`), con lo específico de cada feature dentro de ella.
2. **Código compartido** en carpetas genéricas (`components/`, `hooks/`, `lib/`, `config/`, `assets/`, `types/`).
3. **Flujo unidireccional:** lo compartido lo usa cualquiera; las features solo importan de lo compartido; la capa `app` puede importar features y compartido. **Las features no se importan entre sí.**
4. Se **fuerza con ESLint** (`import/no-restricted-paths`) para que no dependa de la disciplina.
5. Está pensado para Vite + React + TypeScript [29].

### 4.4 Veredicto

> **Recomiendo una estructura feature-based inspirada en Bulletproof React, con flujo unidireccional forzado por ESLint. No recomiendo FSD completo para este proyecto.**

Razones:

1. **Tamaño:** una página con 5–6 secciones y pocas "entidades". FSD aporta valor cuando hay muchas features, equipos y reglas de negocio; aquí sería boilerplate [26][27][28].
2. **Mapeo natural:** cada sección del diseño (Hero, About, Projects, Background, Contact) es una **feature**. Sin esfuerzo, la estructura "grita" lo que hace la app.
3. **Escalable si crece:** si mañana añades blog, casos de estudio o CMS, se agregan features nuevas sin reescribir. Y si algún día migraras a FSD, los slices ya están separados. **[Criterio propio]**
4. **El 3D es una feature aislada,** cargable de forma perezosa. Esto protege el rendimiento.

### 4.5 Estructura propuesta

```
portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # lint + typecheck + test + build
│       └── lighthouse.yml         # auditoría + presupuesto de rendimiento
├── docs/
│   └── adr/                       # decisiones de arquitectura (0001-...)
├── public/
│   ├── models/                    # .glb comprimidos
│   ├── fonts/                     # fuentes self-hosted (woff2)
│   └── og/                        # imagen Open Graph
├── tests/
│   └── e2e/                       # Playwright (smoke + a11y)
├── src/
│   ├── app/
│   │   ├── App.tsx                # composición de secciones
│   │   ├── providers.tsx          # Lenis, tema, analítica
│   │   └── main.tsx
│   ├── features/
│   │   ├── hero/
│   │   │   ├── components/
│   │   │   ├── hero.module.scss
│   │   │   └── index.ts           # API pública de la feature
│   │   ├── about/
│   │   ├── projects/
│   │   │   ├── components/        # ProjectCard, ProjectList
│   │   │   ├── data/projects.ts   # datos tipados
│   │   │   └── index.ts
│   │   ├── background/            # experiencia + Core focus + Beyond the code
│   │   │   └── data/
│   │   ├── contact/
│   │   └── scene-3d/              # todo Three.js/R3F aislado
│   │       ├── components/        # Canvas, escenas, modelos
│   │       ├── shaders/
│   │       ├── hooks/
│   │       └── index.ts           # exporta un componente lazy
│   ├── components/                # compartidos y genéricos
│   │   ├── layout/                # Header, Footer, Section
│   │   └── ui/                    # Button, Badge, SectionTitle
│   ├── hooks/                     # useReducedMotion, useMediaQuery
│   ├── lib/                       # analytics.ts, motion presets, lenis
│   ├── config/                    # site.ts (nombre, enlaces), env.ts
│   ├── styles/
│   │   ├── abstracts/_index.scss  # @forward de tokens, mixins, funciones
│   │   ├── base/                  # reset, tipografía, utilidades
│   │   └── main.scss
│   ├── assets/
│   ├── types/
│   └── test/                      # setup de Vitest
├── eslint.config.js
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### 4.6 Reglas de la arquitectura

1. **Dirección de dependencias:** `components/hooks/lib/config/styles` → `features/*` → `app`. Nunca al revés.
2. **Una feature no importa otra feature.** Si dos necesitan lo mismo, se promueve a `components/`, `hooks/` o `lib/`.
3. **Cada feature expone solo lo necesario** desde su `index.ts`.
4. **Alias de ruta** (`@/`) para no recorrer árboles de carpetas.
5. **Contenido como datos** (`data/*.ts`) tipado con TypeScript: facilita cambiar textos o agregar i18n.
6. **`scene-3d` se carga con `React.lazy`** y tiene fallback estático.
7. **ESLint hace cumplir las reglas 1–2** con `import/no-restricted-paths`.

---

## 5. Pipeline de calidad (resumen)

```
commit  →  Husky: lint-staged (eslint + prettier) + commitlint
push/PR →  GitHub Actions: typecheck → eslint → vitest → build
        →  Playwright: smoke + accesibilidad
        →  Lighthouse CI sobre el build/preview: falla si supera el presupuesto
deploy  →  Preview por PR  →  Producción en main
producción → Analítica (tráfico + eventos) + web-vitals + (opcional) Sentry
```

Los repos de ejemplo revisados incluyen exactamente estas piezas [9][10][12]; Lighthouse CI puede servir el `dist` estático sin desplegar [13] y correr contra previews de Vercel/Netlify/Cloudflare Pages [14].

---

## 6. Plan por fases

| Fase | Entregable |
|---|---|
| **0. Fundaciones** | Repo, Vite + React 19 + TS, ESLint flat, Prettier, Husky, estructura de carpetas, tokens Sass |
| **1. Sistema de diseño** | Tipografía display, colores, Button/Badge/SectionTitle, layout |
| **2. Secciones estáticas** | Hero, About, Projects, Background, Contact, Footer con datos tipados |
| **3. Movimiento** | Motion (entradas, hover), Lenis, `prefers-reduced-motion` |
| **4. 3D** | `scene-3d` aislada, lazy, con fallback |
| **5. Calidad** | Vitest, Playwright, CI, Lighthouse CI con presupuesto |
| **6. SEO y analítica** | Metadatos, Open Graph, sitemap, herramienta de analítica + eventos, Search Console |
| **7. Lanzamiento** | Dominio, hosting, monitoreo, primera lectura de métricas |

---

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| 3D degrada LCP/INP en móviles | Lazy-load, fallback, límite de `dpr`, medir con `r3f-perf` y Lighthouse CI |
| SPA pura = peor SEO y previews al compartir | Decidir P1: prerender/SSG o framework |
| Animaciones inaccesibles | Respetar `prefers-reduced-motion`; probar con Playwright + axe |
| Sobre-ingeniería (FSD, demasiadas librerías) | Estructura feature-based simple; añadir GSAP/zustand solo si hacen falta [7] |
| Analítica subestimada por bloqueadores | Proxy en dominio propio; leer como tendencia [1] |
| Dependencias que se desactualizan | Dependabot semanal [9] |

---

## 8. Decisiones pendientes (necesito tu visto bueno)

- **P1. Renderizado:** ¿**Vite SPA** (más simple) o **con prerender/SSG** (mejor SEO y previews)? Mi inclinación: prerender, porque es marca personal. Otra vía es un meta-framework (React Router en modo framework, Next.js) o Astro con islas de React; el repo de ejemplo [12] usa Astro para un portfolio estático.
- **P2. TypeScript:** ¿confirmas **TypeScript strict**? Lo recomiendo fuertemente.
- **P3. 3D:** ¿Dónde va Three.js? (fondo del hero, objeto decorativo, hover en proyectos). El Figma no lo muestra.
- **P4. Insignia "20 Oct.":** ¿qué representa y es dinámica?
- **P5. Analítica:** ¿Umami (gratis, control total) o Plausible (cero mantenimiento, ~US$9/mes)?
- **P6. Hosting:** ¿Vercel, Cloudflare Pages o Netlify? ¿Dominio propio?
- **P7. Idiomas:** ¿solo inglés (como el Figma) o también español?
- **P8. Resumen (*Read resume*):** ¿PDF alojado en el sitio?
- **P9. Contacto:** ¿formulario con backend, `mailto:` o enlace a LinkedIn?
- **P10. Librería de animación de scroll:** ¿empezamos solo con Motion y añadimos GSAP si hace falta?

---

## 9. Referencias

**Oficiales**

- [5] React — *Build a React app from Scratch*: https://react.dev/learn/build-a-react-app-from-scratch  y *Building a React Framework*: https://react.dev/learn/building-a-react-framework
- [8] Sass — *`@import` is Deprecated*: https://sass-lang.com/blog/import-is-deprecated/
- [21] web.dev — *How the Core Web Vitals metrics thresholds were defined*: https://web.dev/articles/defining-core-web-vitals-thresholds
- [23] Feature-Sliced Design — Overview: https://feature-sliced.github.io/documentation/docs/get-started/overview
- [24] Feature-Sliced Design — Layers: https://feature-sliced.design/docs/reference/layers
- [25] Documentación FSD (repositorio): https://docsearch.algolia.com/mcp/docs/repo/feature-sliced/documentation

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
- [29] Bulletproof React (repositorio; vía fuentes secundarias): https://github.com/alan2207/bulletproof-react
- [30] DEV (meijin) — *bulletproof-react is a hidden treasure*: https://dev.to/meijin/bulletproof-react-is-a-hidden-treasure-of-react-best-practices-3m19
- [31] GitCode — guía de arquitectura bulletproof-react (flujo unidireccional y ESLint): https://blog.gitcode.com/429200f73ceb1c6ce9f57c8135ae3dd9.html

---

## 10. Limitaciones de esta investigación

- No pude abrir directamente el repo de Bulletproof React ni la documentación completa de FSD; usé resúmenes y fuentes secundarias para ambos.
- Varias comparativas de analítica son de terceros con posibles intereses comerciales; los precios cambian y deben **verificarse antes de contratar**.
- Los números de versiones (React, Vite, ESLint, R3F) deben confirmarse al inicializar el proyecto.
- El análisis del Figma se basa en una imagen reducida.
