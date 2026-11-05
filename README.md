# Ocean Portfolio — "The Descent"

A frontend-developer portfolio structured as a dive: the page darkens and
quiets as you scroll, moving through real ocean light zones (Surface →
Twilight → Midnight → Abyss), with a live depth gauge, ambient underwater
sound, 3D scenes, and a projects section that opens a live iframe preview on hover.

## Stack

- **React 19 + Vite** — app shell and dev server
- **three.js / @react-three/fiber / @react-three/drei** — the 3D hero scene
  (drifting plankton, light shafts) and the orbiting skills visualization
- **framer-motion** — scroll-triggered reveals and micro-interactions
- Plain CSS with a token system (`src/styles/tokens.css`) — no framework,
  so the deep-ocean palette and type scale stay fully in your control

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
bundle in `dist/`.

## Project structure

```
src/
  components/
    Layout/      Navbar
    Hero/        Hero section + 3D OceanScene (plankton, light rays)
    About/       "Twilight Zone" intro/bio section
    Skills/      3D SkillOrbit + supporting copy
    Projects/    Grid + ProjectCard (hover → iframe preview)
    Contact/     "Abyss" closing section
    DepthGauge/  The signature scroll-driven depth readout (fixed, right side)
    Audio/       AmbientSound — ambient loop + spoken narration toggle
    Particles/   Bubbles — lightweight CSS bubble field, reused across sections
  data/
    projects.js  Your project entries (title, stack, image, live url)
    skills.js    Your skills + which orbit ring they sit in
  hooks/
    useScrollDepth.js  Converts scroll position into 0–1 progress + meters
  styles/
    tokens.css   Colors, type, spacing, motion — the whole design system
```

## Things to fill in before this is "yours"

1. **Your info**: name, bio, email, social links — currently placeholders
   in `Hero.jsx`, `About.jsx`, `Contact.jsx`, `Navbar.jsx`.
2. **Photo**: add `public/images/portrait.jpg`.
3. **Projects**: edit `src/data/projects.js` — real titles, stacks,
   screenshots (`public/images/projects/*.jpg`), and live URLs.
4. **Audio** (optional): see `public/audio/README.md`. Everything works
   fine with no sound at all if you skip this — the toggle just won't
   produce audio.

## A note on the project-hover iframes

Many real sites send an `X-Frame-Options` or `Content-Security-Policy:
frame-ancestors` header that blocks them from being embedded in an
`<iframe>` on another domain — this is a security setting on *their*
server, not something fixable from this codebase. If a project's live
iframe preview stays blank:

- Check the site's response headers (dev tools → Network tab).
- If it blocks framing, consider hosting a static screenshot/GIF preview
  instead of the live iframe for that specific card, or link out to a
  duplicate "preview" deployment you control without the restrictive header.
- Your own projects (ones you deploy) can simply omit that header.

## Design system quick reference

| Token | Value | Use |
|---|---|---|
| `--z-surface` | `#0F3A52` | Hero background (brightest blue) |
| `--z-twilight` | `#0A2E4D` | About / Skills background |
| `--z-midnight` | `#061B33` | Projects background |
| `--z-abyss` | `#010710` | Contact / darkest point |
| `--bioluminescence` | `#3FE8D3` | Signature glow accent — links, gauge, node glow |
| `--coral` | `#FF6B4A` | Rare warm accent, used sparingly |
| `--font-display` | Fraunces | Headings |
| `--font-body` | Sora | Body copy |
| `--font-mono` | JetBrains Mono | Labels, depth markers, tech tags |

## Next steps (not yet built)

- Loading screen / intro "submerge" transition
- Page-level scroll-snap or scroll-jacking for a more cinematic descent (optional — current build uses natural scroll so it stays accessible)
- Real project screenshots + deployed preview URLs
- Replace the JetBrains-style tech tags with real icons if desired (e.g. simple-icons)
