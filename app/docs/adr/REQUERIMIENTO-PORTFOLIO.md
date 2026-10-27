# Detalle del requerimiento: Landing Page / Portfolio personal

> **Solicitante:** Roger
> **Fecha:** 26 de octubre de 2026
> **Documento relacionado:** `INVESTIGACION-PORTFOLIO.md`

---

## 1. Contexto

Roger está desarrollando su **página de marca personal (landing page / portfolio)**. Ya tiene el diseño en Figma y definió una base tecnológica. Pide una investigación previa, con fuentes reales, antes de decidir stack, analítica y estructura del proyecto.

## 2. Stack definido por el solicitante

| Tecnología | Uso previsto |
|---|---|
| React 19+ | Interfaz |
| Three.js | Elementos 3D |
| Motion | Animaciones |
| ESLint | Calidad de código |
| Sass | Estilos |
| "Y más tecnologías modernas relacionadas" | Por definir en la investigación |

## 3. Requerimientos solicitados

| # | Requerimiento | Estado | Dónde se responde |
|---|---|---|---|
| R1 | **Investigar en internet primero**, antes de cualquier otra cosa | ✅ Hecho (búsquedas sobre analítica, stack, R3F, Motion/GSAP, Sass, CI, arquitectura) | Investigación, sec. 9 |
| R2 | Poder **medir el tráfico** de la landing tras el desarrollo y evaluar la analítica | ✅ Propuesto | Investigación, sec. 3 |
| R3 | Investigar **tecnologías adicionales y modernas** que integraría una empresa de desarrollo web profesional y de alto nivel | ✅ Propuesto | Investigación, sec. 2 y 5 |
| R4 | Investigar la **mejor arquitectura de carpetas / de software** para el proyecto | ✅ Propuesto | Investigación, sec. 4 |
| R5 | **Fundamentar con referencias claras y reales** que respalden esa arquitectura | ✅ Hecho, con transparencia sobre la calidad de cada fuente | Investigación, sec. 4.2–4.4 y 9 |
| R6 | Plasmar la investigación en un **archivo .md** para que Roger la analice y dé su **visto bueno** | ✅ Hecho | `INVESTIGACION-PORTFOLIO.md` |
| R7 | Detallar **todo lo solicitado** de forma básica y profesional en un .md, al final | ✅ Este documento | `REQUERIMIENTO-PORTFOLIO.md` |
| R8 | **Analizar las imágenes del diseño de Figma** para dar mejor ayuda | ✅ Hecho (lectura aproximada por tamaño de imagen) | Investigación, sec. 1 |

## 4. Resumen de resultados

1. **Arquitectura recomendada:** estructura **feature-based inspirada en Bulletproof React**, con flujo de dependencias unidireccional forzado por ESLint. **FSD completo no se recomienda** por ser excesivo para una landing de una página.
2. **Analítica recomendada:** **Umami** o **Plausible** (sin cookies) para tráfico y conversiones, `web-vitals` para rendimiento real y Google Search Console para SEO. Los bloqueadores de rastreo harán que las cifras subestimen el tráfico real.
3. **Stack adicional recomendado:** TypeScript strict, Vite, React Three Fiber v9 + Drei, Lenis, Vitest + Testing Library, Playwright, Husky + lint-staged + commitlint, GitHub Actions, Lighthouse CI y ADRs.
4. **Metas de rendimiento:** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (percentil 75).

## 5. Criterios de aceptación de esta etapa

- [ ] Roger revisa `INVESTIGACION-PORTFOLIO.md`.
- [ ] Roger responde las decisiones pendientes (P1–P10).
- [ ] Roger da el **visto bueno** a la arquitectura de carpetas.
- [ ] Solo después se inicia el desarrollo (Fase 0 del plan).

## 6. Fuera de alcance por ahora

- Escribir código del proyecto.
- Contratar herramientas de analítica o hosting.
- Producir contenido (textos finales, imágenes de proyectos, modelos 3D).

## 7. Supuestos

- El diseño de Figma es la referencia visual vigente.
- La página es de **una sola página**, con las secciones: Hero, About, Selected Projects, Backgrounds & Focus, Contact y Footer.
- Los datos personales (proyectos, experiencia, enlaces) los proporciona Roger.

## 8. Próximo paso

Esperar el visto bueno de Roger y sus respuestas a las decisiones pendientes para iniciar la **Fase 0: fundaciones** (repositorio, Vite + React 19 + TypeScript, ESLint, estructura de carpetas y tokens Sass).
