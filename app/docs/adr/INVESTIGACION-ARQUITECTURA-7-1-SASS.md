# Investigación: arquitectura 7-1 para Sass

> **Proyecto:** Portfolio personal de Roger  
> **Fecha:** 27 de octubre de 2026  
> **Estado:** Material de referencia para revisar y aplicar gradualmente  
> **Alcance:** organización de hojas Sass, responsabilidades de las carpetas, ejemplo de implementación y adaptación al proyecto React/Vite.

## Resumen ejecutivo

La arquitectura **7-1** es una convención de organización para proyectos Sass: agrupa los estilos en siete directorios temáticos y los reúne desde una hoja de entrada, normalmente `main.scss`. No es una especificación oficial de Sass ni una regla obligatoria. Es una guía comunitaria popularizada por **Kitty Giraudel** en Sass Guidelines; la propia guía aclara que sus recomendaciones son opinadas y que deben adaptarse al proyecto [1].

Su principal beneficio es hacer predecible dónde buscar y dónde agregar cada tipo de estilo. Funciona bien cuando hay suficientes estilos globales, componentes y páginas como para que un único archivo o una colección desordenada de hojas parciales sea difícil de mantener. No se puede afirmar, basándose en las fuentes consultadas, que sea estadísticamente “la más usada” o universalmente preferida: no se encontró una medición representativa de uso entre proyectos. Es más preciso describirla como **un patrón conocido y ampliamente difundido en guías de Sass**, no como un estándar ni como la única arquitectura correcta.

Para este portfolio conviene usarla como **organización de los estilos globales y compartidos**, junto con Sass Modules para los estilos propios de cada componente React. El patrón de carpetas no reemplaza el sistema de módulos de Sass: se recomienda usar `@use` y `@forward`, no el antiguo `@import`, que Dart Sass deprecó en la versión 1.80.0 [2][3][4].

## 1. ¿Qué significa “7-1”?

- **7**: siete carpetas que separan categorías de estilos.
- **1**: una hoja de entrada, habitualmente `main.scss`, que reúne las hojas que deben formar parte del CSS global.

Las siete categorías habituales son:

1. `abstracts`
2. `vendors`
3. `base`
4. `layout`
5. `components`
6. `pages`
7. `themes`

La estructura no es rígida. `vendors` y `themes`, por ejemplo, pueden omitirse si el proyecto no los necesita. Los nombres exactos y la granularidad también se adaptan. Lo importante es que cada archivo tenga una responsabilidad reconocible y que el punto de entrada mantenga un orden de compilación explícito.

### 1.1 Origen y nivel de autoridad

Sass Guidelines presenta el patrón como una propuesta de organización dentro de una guía de estilo comunitaria. Su autora, **Kitty Giraudel**, explica que la guía es personal y opinada, y que puede adaptarse; por eso el patrón no debe interpretarse como una recomendación oficial del equipo de Sass [1].

La documentación oficial de Sass sí respalda las herramientas modernas que se usan para implementarlo: `@use` carga módulos con un espacio de nombres, y `@forward` permite ofrecer un punto público que reexporta miembros de otros archivos [2][3]. Esto respalda el mecanismo de módulos, no convierte la estructura 7-1 en un estándar oficial.

## 2. ¿Por qué se recomienda y qué beneficios aporta?

### 2.1 Beneficios prácticos

- **Encontrar estilos con menos fricción:** una regla global de tipografía va a `base`; el contenedor general, a `layout`; un ajuste exclusivo de una página, a `pages`. Sass Guidelines defiende separar el código en carpetas significativas para que sea más fácil volver a encontrarlo [1].
- **Separar responsabilidades:** los tokens no se mezclan con reglas de botones; las anulaciones de librerías no se confunden con los estilos de la aplicación.
- **Hacer más legible la composición:** `main.scss` deja visible qué capas globales se cargan y en qué orden.
- **Facilitar el crecimiento del equipo:** una convención compartida reduce decisiones repetidas sobre dónde crear cada archivo. El beneficio depende de que el equipo respete la convención.
- **Reutilizar fundamentos visuales:** colores, escalas, funciones y mixins pueden mantenerse en un lugar común. La guía también recomienda tratar la interfaz como componentes que hagan una sola función, se reutilicen y sean independientes [1].
- **Reducir errores de alcance en Sass moderno:** `@use` da a cada hoja un espacio de nombres explícito; Sass evalúa un módulo una sola vez por compilación. Esto mejora la trazabilidad frente al antiguo ámbito global de `@import` [2][4].

### 2.2 Lo que no resuelve automáticamente

La arquitectura no hace que CSS sea automáticamente reutilizable, consistente, rápido ni accesible. Tampoco impide selectores demasiado específicos, dependencias circulares o duplicación. Esos resultados dependen del contenido de los archivos, las convenciones del equipo y las pruebas visuales.

El patrón puede convertirse en sobrearquitectura si crea muchas carpetas y archivos vacíos para una página pequeña. Una carpeta opcional debe añadirse cuando haya contenido real que organizar, no solo para completar el “7”.

### 2.3 ¿Es la arquitectura “más usada”?

Las fuentes consultadas no aportan estadísticas representativas que permitan comparar cuántos repositorios usan 7-1 frente a otras estructuras. Que aparezca en guías, artículos y proyectos de Sass demuestra que es conocida y útil como referencia; no demuestra que sea la estructura predominante en la industria. Tampoco hay una estructura única prescrita por Sass.

Por tanto, la decisión para este portfolio se basa en **ajuste y claridad**, no en una afirmación de popularidad universal: la estructura ya fue propuesta para sus estilos y ofrece una clasificación sencilla para las capas globales. Se combinará con estilos locales de componentes para evitar convertir `components/` en un archivo global enorme.

## 3. Responsabilidad de cada carpeta

| Carpeta       | Pregunta que responde                                       | Contenido apropiado                                                           | Evitar                                                                                   |
| ------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `abstracts/`  | ¿Qué herramientas y valores reutilizables necesita Sass?    | Variables, mapas, funciones, mixins y placeholders.                           | Selectores que generen CSS, estilos de páginas o componentes concretos.                  |
| `vendors/`    | ¿Qué estilos de terceros necesitamos integrar o ajustar?    | Importaciones y overrides pequeños de librerías externas.                     | Reglas de la aplicación o copias completas de dependencias.                              |
| `base/`       | ¿Cuáles son las reglas globales elementales?                | Reset, estilos del documento, tipografía global y preferencias de movimiento. | Layouts específicos o estilos detallados de una tarjeta.                                 |
| `layout/`     | ¿Cómo se organizan las regiones comunes de la interfaz?     | Contenedor, rejilla, navegación, header y footer compartidos.                 | Apariencia completa de una página o reglas de cada proyecto.                             |
| `components/` | ¿Qué estilos globales pertenecen a piezas UI reutilizables? | Primitivas compartidas como botones, etiquetas y encabezados.                 | Todas las clases de cada componente React, si pueden permanecer locales en Sass Modules. |
| `pages/`      | ¿Qué ajustes solo tienen sentido en una página o ruta?      | Composición o excepciones de la página Home.                                  | Reglas genéricas que pertenecen a `base`, `layout` o `components`.                       |
| `themes/`     | ¿Qué valores visuales cambian entre temas?                  | Tokens de color/tema expuestos mediante clases o atributos.                   | Duplicar todo el CSS de la aplicación por cada tema.                                     |
| `main.scss`   | ¿Qué hojas globales se cargan y en qué orden?               | Composición de las capas Sass con `@use`.                                     | Declarar todos los estilos de la aplicación en un solo archivo.                          |

### 3.1 `abstracts/`: herramientas sin CSS emitido

Esta capa es infraestructura de Sass. Los archivos suelen definir valores o herramientas que otras hojas consumen; por sí mismos no deberían generar selectores CSS.

- `_tokens.scss`: valores de diseño de compilación (por ejemplo, escalas, breakpoints o mapas).
- `_functions.scss`: cálculos reutilizables cuando hacen el código más claro.
- `_mixins.scss`: grupos de declaraciones que se incluyen en reglas consumidoras.
- `_placeholders.scss`: selectores `%` reutilizables con `@extend`; son opcionales y deben usarse con moderación.
- `_index.scss`: superficie pública que reexporta los módulos de abstracts.

```scss
// abstracts/_tokens.scss
$space-unit: 0.5rem;
$content-max-width: 72rem;
```

```scss
// abstracts/_mixins.scss
@mixin focus-ring {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

```scss
// abstracts/_index.scss
@forward "tokens";
@forward "functions";
@forward "mixins";
@forward "placeholders";
```

Las hojas consumidoras cargan las herramientas de forma explícita, por ejemplo `@use "../abstracts" as a;`, y utilizan miembros como `a.$content-max-width` o `@include a.focus-ring`. El espacio de nombres deja claro de dónde procede cada miembro [2][3].

### 3.2 `vendors/`: límites para dependencias externas

Solo se necesita si se incorporan hojas CSS/Sass de terceros o hacen falta ajustes externos que no se pueden resolver con la API de la dependencia. Es preferible configurar una librería con sus opciones o variables públicas antes de sobrescribir selectores internos.

- `_index.scss`: reexporta/compone los archivos de vendors requeridos.
- `_library-name.scss`: importa o adapta una librería específica, si hace falta.

Si no hay CSS de terceros que integrar, no hace falta crear esta carpeta. No se debe añadir una dependencia únicamente para que la carpeta tenga contenido.

### 3.3 `base/`: cimientos globales

- `_reset.scss`: normalización mínima y deliberada de estilos de navegador.
- `_document.scss`: `html`, `body`, selección de color de fondo, comportamiento global de foco/scroll y estilos base del documento.
- `_typography.scss`: fuentes, escala tipográfica y valores predeterminados para elementos HTML.
- `_animations.scss`: keyframes o utilidades globales de movimiento; respetar `prefers-reduced-motion`.
- `_index.scss`: emite las hojas base en orden.

La base debe ser pequeña. Por ejemplo, usar estilos de `body` y de encabezados HTML es global; el tamaño particular del título del Hero pertenece a la sección/componente que lo contiene.

### 3.4 `layout/`: estructura compartida

- `_container.scss`: ancho máximo y márgenes horizontales comunes.
- `_section.scss`: espaciado vertical y estructura básica de secciones.
- `_grid.scss`: patrones de rejilla reutilizados en más de un lugar.
- `_site-header.scss`, `_navigation.scss`, `_site-footer.scss`: estructura visual del marco general del sitio.
- `_index.scss`: incluye las hojas de layout necesarias.

Un estilo deja de pertenecer aquí si solo sirve a una sección concreta del Home; en ese caso se queda cerca de esa sección.

### 3.5 `components/`: piezas visuales reutilizables

La propuesta original incluye archivos como `_button.scss`, `_section-heading.scss`, `_hero.scss`, `_project-card.scss`, `_technology-tag.scss`, `_timeline-item.scss`, `_social-links.scss` y `_contact-form.scss`.

El criterio para decidir si entran en esta carpeta global es la **reutilización y el alcance**:

- Un botón compartido entre varias secciones puede tener estilos de sistema en `components/`.
- Si `ProjectCard` es un componente React con estilos propios, `ProjectCard.module.scss` junto al componente suele mantener mejor la relación entre markup y estilos.
- El Hero de una única landing es una sección de página, no necesariamente un componente global. Puede quedarse como `Hero.module.scss`; se promueve a componente global solo si hay una necesidad real de compartir ese estilo.

Así se conserva la clasificación 7-1 sin forzar CSS local de React dentro de una hoja global.

### 3.6 `pages/`: composición y excepciones de una ruta

- `_home.scss`: ajustes de composición que correspondan a la página principal en su conjunto.
- `_index.scss`: carga los archivos de páginas que realmente tengan estilos globales.

Esta carpeta no es obligatoria para una sola página. Si cada ruta/componente usa Sass Modules, los estilos pueden permanecer dentro de su módulo local y `pages/` puede no generar CSS global.

### 3.7 `themes/`: valores que cambian según el tema

- `_dark.scss`, `_light.scss`: valores de propiedades personalizadas CSS por tema.
- `_index.scss`: carga los temas disponibles.

Los temas deben redefinir tokens semánticos, no duplicar todas las reglas de componentes. Las custom properties permiten que el navegador aplique los valores según el atributo o clase del tema.

```scss
// themes/_dark.scss
[data-theme="dark"] {
  color-scheme: dark;
  --color-surface: #111;
  --color-text: #f5f5f5;
  --color-focus: #79a9ff;
}
```

```scss
// themes/_light.scss
[data-theme="light"] {
  color-scheme: light;
  --color-surface: #fff;
  --color-text: #171717;
  --color-focus: #174ea6;
}
```

### 3.8 `main.scss`: punto único de entrada

`main.scss` debe mostrar de forma concisa qué capas globales componen el CSS y el orden deseado. Las herramientas (`abstracts`) se definen antes de sus consumidores conceptualmente, aunque las hojas que las consumen deben importar sus módulos directamente: `@use` es local a cada módulo y no crea variables globales compartidas [2].

```scss
// styles/main.scss
@use "vendors";
@use "base";
@use "layout";
@use "components";
@use "pages";
@use "themes";
```

No es necesario cargar `abstracts` aquí solo para “hacer disponibles” sus variables. Cada stylesheet consumidor debe usar `@use "abstracts" as a;` (ajustando la ruta relativa o el load path). Las reglas `@use`/`@forward` deben ir antes de reglas de estilo en cada archivo [2].

## 4. Estructura sugerida para este portfolio

La propuesta de la sección 13 de [INVESTIGACION-PORTFOLIO-ACTUALIZADO.md](./INVESTIGACION-PORTFOLIO-ACTUALIZADO.md) puede concretarse así:

```text
src/
└── styles/
    ├── abstracts/
    │   ├── _index.scss
    │   ├── _tokens.scss
    │   ├── _functions.scss
    │   ├── _mixins.scss
    │   └── _placeholders.scss
    ├── vendors/
    │   └── _index.scss
    ├── base/
    │   ├── _index.scss
    │   ├── _reset.scss
    │   ├── _document.scss
    │   ├── _typography.scss
    │   └── _animations.scss
    ├── layout/
    │   ├── _index.scss
    │   ├── _container.scss
    │   ├── _section.scss
    │   ├── _grid.scss
    │   ├── _site-header.scss
    │   ├── _navigation.scss
    │   └── _site-footer.scss
    ├── components/
    │   ├── _index.scss
    │   ├── _button.scss
    │   ├── _section-heading.scss
    │   ├── _technology-tag.scss
    │   └── _social-links.scss
    ├── pages/
    │   ├── _index.scss
    │   └── _home.scss
    ├── themes/
    │   ├── _index.scss
    │   ├── _dark.scss
    │   └── _light.scss
    └── main.scss
```

Los componentes/sections que no sean estilos globales compartidos pueden estar junto a su componente React:

```text
src/
└── features/
    ├── hero/
    │   ├── hero.tsx
    │   └── hero.module.scss
    └── projects/
        ├── project-card.tsx
        └── project-card.module.scss
```

Esta combinación respeta dos objetivos diferentes: 7-1 organiza las **capas de estilos globales**, mientras Sass Modules reduce el alcance accidental de las clases de componentes. En el repositorio ya existe `src/styles/themes/`; debe aprovecharse antes de crear duplicados, y la estructura restante se puede añadir a medida que aparezcan estilos reales.

### 4.1 Índices Sass con `@forward`

Un `_index.scss` permite que una carpeta exponga una API pública y/o agrupe hojas que generan CSS. Por ejemplo:

```scss
// base/_index.scss
@forward "reset";
@forward "document";
@forward "typography";
@forward "animations";
```

```scss
// components/_index.scss
@forward "button";
@forward "section-heading";
@forward "technology-tag";
@forward "social-links";
```

Las carpetas `layout`, `pages` y `themes` pueden componer sus parciales de la misma manera:

```scss
// layout/_index.scss
@forward "container";
@forward "section";
@forward "grid";
@forward "site-header";
@forward "navigation";
@forward "site-footer";
```

```scss
// pages/_index.scss
@forward "home";
```

```scss
// themes/_index.scss
@forward "dark";
@forward "light";
```

`@forward` también carga el CSS de los módulos reenviados. Debe usarse de manera intencional: si las hojas de `components/` son CSS Modules locales, no deben agregarse a este índice global [3].

Cada `@forward` presupone que existe el archivo parcial correspondiente. Si una pieza aún no se usa, es mejor no crear su archivo ni agregar una referencia vacía al índice.

## 5. Integración en React y Vite

1. Sass ya está en las dependencias de desarrollo de este proyecto. En otro proyecto, instalarlo con `npm install -D sass` (o el gestor de paquetes adoptado por ese repositorio).
2. Crear `src/styles/main.scss` y añadir las hojas globales que existan.
3. Importar el entrypoint **una sola vez** desde el punto de entrada de la aplicación (en esta app, `src/main.tsx`):

   ```tsx
   import "./styles/main.scss";
   ```

4. Retirar o migrar reglas duplicadas del CSS anterior solo después de comprobar que se conservan reset, tipografía y estilos de la interfaz.
5. Mantener estilos particulares en `*.module.scss` e importar sus variables/mixins con `@use`, usando una ruta relativa válida.
6. No mezclar `@import` de Sass con `@use`/`@forward` en código nuevo. `@import` fue deprecado en Dart Sass 1.80.0; la documentación indica que genera problemas de ámbito global y puede duplicar CSS. Sass proporciona un migrador para proyectos existentes [4].

No hace falta implementar las ocho piezas de una vez. Una adopción incremental razonable es: `abstracts` con tokens reales, `base` para estilos globales existentes, `layout` cuando aparezca el layout compartido y después `components`, `pages` o `themes` según necesidad.

## 6. Reglas de dependencia para mantenerla simple

- `abstracts` puede ser usado por cualquier capa, pero no depende de ellas.
- `base` establece defaults del documento; no depende de selectores de páginas.
- `layout` define estructura compartida y puede usar tokens/mixins.
- `components` consume layout/fundamentos, pero no debería controlar una página entera.
- `pages` puede componer o ajustar capas inferiores; las capas inferiores no deben depender de una página concreta.
- `themes` cambia valores semánticos y no necesita duplicar selectores completos.
- `vendors` se limita a integración externa y overrides justificados.
- Evitar ciclos de `@use` y el uso de `@extend` entre capas distantes; preferir mixins pequeños o clases explícitas cuando hagan más comprensible el CSS.
- Mantener pocas reglas globales y evitar crear parciales sin contenido o sin una responsabilidad estable.

Estas reglas son criterios de diseño para este repositorio, no restricciones impuestas por el compilador Sass.

## 7. Señales de que la arquitectura está funcionando

- Una persona puede ubicar rápidamente un estilo por su responsabilidad.
- Los tokens y mixins no emiten selectores CSS innecesarios.
- `main.scss` hace evidente la composición global, sin concentrar reglas de toda la aplicación.
- Los estilos locales de componentes no se filtran a otros componentes.
- Añadir un tema requiere cambiar tokens semánticos, no copiar todas las hojas.
- La compilación de Vite sigue funcionando y no aparecen warnings de `@import`.
- El árbol de carpetas representa contenido real; las carpetas opcionales vacías no se mantienen por obligación.

## 8. Conclusión para el portfolio

La arquitectura 7-1 es una buena **convención inicial** para ordenar las hojas globales de este proyecto, pero no una norma oficial ni una solución superior en todos los contextos. La razón para adoptarla es la correspondencia fácil entre responsabilidad y ubicación, no una supuesta prueba de que sea “la más usada”.

La decisión recomendada es mantener el esquema propuesto, modernizar su composición con `@use`/`@forward` y aplicar una frontera explícita: estilos globales y tokens en `src/styles/`; estilos específicos de features/componentes en sus `*.module.scss`. Añadir solo las carpetas que tengan un uso real.

## Referencias

1. **Kitty Giraudel**, Sass Guidelines — _Architecture_ y _The 7-1 pattern_. Guía comunitaria/opinada que propone el patrón y explica que puede adaptarse; no es una especificación oficial de Sass. https://sass-guidelin.es/#the-7-1-pattern (versión en español: https://sass-guidelin.es/es/#el-patron-7-1). Fuente del contenido de arquitectura: https://github.com/KittyGiraudel/sass-guidelines/blob/main/pages/en/_architecture.md
2. **Sass (documentación oficial)** — _@use_. Módulos Sass, espacios de nombres, carga única y orden de las reglas. https://sass-lang.com/documentation/at-rules/use/
3. **Sass (documentación oficial)** — _@forward_. Reexportación de miembros y composición de una API pública para una librería/hoja. https://sass-lang.com/documentation/at-rules/forward/
4. **Jennifer Thakar / Sass** — _`@import` is Deprecated_, 17 de octubre de 2024. Deprecación desde Dart Sass 1.80.0, problemas de `@import` y migrador al sistema de módulos. https://sass-lang.com/blog/import-is-deprecated/
5. **Sass team** — _The Module System Is Launched_. Anuncio del sistema de módulos Sass y de `@use`/`@forward`. https://sass-lang.com/blog/the-module-system-is-launched/
6. **Jonathan Snook**, SMACSS — _Categorizing CSS Rules_. Marco de referencia relacionado que agrupa reglas CSS en categorías; la relación con 7-1 la señala Sass Guidelines, no es una equivalencia entre ambos sistemas. https://smacss.com/book/categorizing/
