# NEXUS 2026 - Landing Page

Landing page para la conferencia de tecnología NEXUS 2026. Proyecto de portfolio creado con Astro + Vanilla JavaScript.

## 🚀 Demo

[Ver demo](https://nexus-2026.vercel.app)

## 🛠️ Tech Stack

- **Astro** - Static site generator
- **Vanilla JavaScript** - Sin librerías pesadas
- **CSS Moderno** - Variables, Grid, Flexbox
- **Web Animations API** - Animaciones fluidas

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   └── Navigation.astro    # Navegación + Mobile Menu
│   ├── layouts/
│   │   └── Layout.astro        # Template base
│   ├── pages/
│   │   └── index.astro         # Landing page principal
│   ├── scripts/
│   │   ├── animations.js       # Scroll reveal animations
│   │   ├── hero-animations.js  # Hero entrance animations
│   │   ├── index.js             # Entry point
│   │   └── mobile-menu.js       # Mobile menu toggle
│   ├── styles/
│   │   └── global.css          # CSS variables + global styles
│   └── data/
│       ├── speakers.json       # Datos de speakers
│       └── schedule.json        # Agenda del evento
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── README.md
```

## 🎨 Features

- ✅ Diseño responsive (Mobile First)
- ✅ Dark mode con acentos en morado/verde
- ✅ Animaciones suaves en hero
- ✅ Mobile menu con slide-in
- ✅ Schedule con tabs (día 1 / día 2)
- ✅ Pricing cards con highlight
- ✅ Preferencias de movimiento reducidas (`prefers-reduced-motion`)
- ✅ SEO básico (meta tags, Open Graph)
- ✅ Bundle size < 10KB JS

## 📱 Responsive Breakpoints

| Breakpoint | Ancho | Descripción |
|------------|-------|-------------|
| Mobile | < 768px | Hamburger menu, 1 columna |
| Tablet | 768px - 1023px | 2 columnas |
| Desktop | ≥ 1024px | Navegación completa |

## 🏃‍♂️ Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 🔧 Configuración

### Variables CSS (src/styles/global.css)

```css
:root {
  /* Colores */
  --color-primary: #6366f1;
  --color-secondary: #10b981;
  --color-bg-primary: #0f0f23;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-4: 1rem;
  
  /* Breakpoints */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

## 🎬 Animaciones

### Hero Entrance
- Badge: fade + translateY
- Title lines: staggered reveal
- Subtitle: fade in
- CTAs: fade in con stagger
- Stats: fade in

### Scroll Reveal
- Intersection Observer para detección
- Clases: `.reveal`, `.reveal-up`, `.reveal-down`
- Solo usa transform y opacity (GPU)

## ♿ Accesibilidad

- `prefers-reduced-motion` soportado
- `aria-expanded` para mobile menu
- Semantic HTML (nav, main, section, footer)
- Focus states visibles
- Labels en botones

## 📦 Build

- **JS**: ~5.4KB (gzipped)
- **CSS**: ~20KB
- **HTML**: Optimizado por Astro

## 👤 Autor

Proyecto de portfolio - Microweb Developer

## 📝 Licencia

MIT
