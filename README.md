# portfolio
Portfolio Web

### Dependencies

#### Production dependencies
| Package | Responsabilidad |
|----------|--------|
| `Motion` | Animaciones de elementos HTML, SVG y valores de JavaScript, incluidos objetos de Three.js |
| `Three.js` | Motor gráfico 3D basado en WebGL |

`Motion y Three.js` tienen funciones diferentes: Motion controla las transiciones y animaciones; Three.js construye y renderiza la escena tridimensional. Incluso puedes utilizar Motion para animar la rotación de un objeto de Three.js.

Instalacion:
```bash
pnpm add motion three
```

#### Development dependencies
Instalacion:
```bash
pnpm add -D sass @types/three eslint @eslint/js globals typescript-eslint prettier stylelint stylelint-config-standard-scss vitest
```
Estas dependencias cubren Sass, tipado de Three.js, linting, formato de código, calidad de SCSS y pruebas unitarias. Stylelint recomienda su configuración stylelint-config-standard-scss cuando se trabaja con archivos SCSS.

#### Architecture
```bash

personal-portfolio/
│
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── models/
│   │   └── textures/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── main.ts
│   │
│   ├── app/
│   │   ├── bootstrap.ts
│   │   └── config/
│   │       └── site.config.ts
│   │
│   ├── content/
│   │   ├── projects.data.ts
│   │   ├── experience.data.ts
│   │   ├── skills.data.ts
│   │   └── social-links.data.ts
│   │
│   ├── features/
│   │   ├── navigation/
│   │   │   └── navigation.ts
│   │   ├── animations/
│   │   │   ├── reveal-on-scroll.ts
│   │   │   └── motion-preferences.ts
│   │   ├── hero-3d/
│   │   │   ├── hero-scene.ts
│   │   │   └── hero-scene.types.ts
│   │   └── contact/
│   │       └── contact-form.ts
│   │
│   ├── shared/
│   │   ├── dom/
│   │   ├── utils/
│   │   └── types/
│   │
│   └── styles/
│       ├── abstracts/
│       │   ├── _index.scss
│       │   ├── _variables.scss
│       │   ├── _functions.scss
│       │   ├── _mixins.scss
│       │   └── _placeholders.scss
│       │
│       ├── base/
│       │   ├── _index.scss
│       │   ├── _reset.scss
│       │   ├── _custom-properties.scss
│       │   ├── _fonts.scss
│       │   ├── _typography.scss
│       │   ├── _global.scss
│       │   └── _accessibility.scss
│       │
│       ├── vendors/
│       │   └── _index.scss
│       │
│       ├── layout/
│       │   ├── _index.scss
│       │   ├── _container.scss
│       │   ├── _header.scss
│       │   ├── _footer.scss
│       │   └── _section.scss
│       │
│       ├── components/
│       │   ├── _index.scss
│       │   ├── _button.scss
│       │   ├── _project-card.scss
│       │   ├── _social-link.scss
│       │   └── _tag.scss
│       │
│       ├── pages/
│       │   ├── _index.scss
│       │   └── home/
│       │       ├── _index.scss
│       │       ├── _hero.scss
│       │       ├── _about.scss
│       │       ├── _projects.scss
│       │       └── _contact.scss
│       │
│       ├── themes/
│       │   ├── _index.scss
│       │   ├── _light.scss
│       │   └── _dark.scss
│       │
│       └── main.scss
│
├── tests/
│   ├── unit/
│   │   ├── shared/
│   │   └── features/
│   └── e2e/
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.mjs
├── stylelint.config.mjs
├── .prettierrc.json
├── .prettierignore
├── .editorconfig
├── .gitignore
└── README.md

```