# HERE•NOW Films — Website

Production-ready multi-page website for **HereNow Films Pvt Ltd** — a Gujarat-based film school, production house, advertising studio, and event management company co-founded by actor **Mayur Soneji** and **Mitali Mayur Soneji**.

**Live URL:** https://sauranova.github.io/herenowfilms/

---

## Pages

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Homepage — hero, films carousel, about teaser, news, quote |
| `films.html` | `/films.html` | Portfolio — filterable film grid + upcoming projects |
| `mayur.html` | `/mayur.html` | Mayur Soneji — actor profile, filmography, bio |
| `about.html` | `/about.html` | Company story, process timeline, team values |
| `news.html` | `/news.html` | News, releases, campaigns, newsletter signup |
| `contact.html` | `/contact.html` | Contact form, inquiry types, social links |

---

## File Structure

```
herenowfilms/
├── index.html        # Homepage
├── films.html        # Films portfolio
├── mayur.html        # Mayur Soneji profile page
├── about.html        # About the company
├── news.html         # News & updates
├── contact.html      # Contact page
├── style.css         # Shared design system (all pages)
├── main.js           # Shared JavaScript (nav, animations, cursor)
└── README.md
```

---

## Design System

### Colors
All colors are CSS custom properties defined in `:root` in `style.css`.

| Variable | Value | Use |
|----------|-------|-----|
| `--gold` | `#D71471` | Primary accent (magenta — matches Instagram logo) |
| `--gold-light` | `#F060A8` | Lighter accent, nav brand text |
| `--gold-bright` | `#FF1A80` | Brightest accent, hover glows |
| `--gold-dim` | `#8B0E50` | Dimmed accent, subtle highlights |
| `--crimson` | `#1A0D30` | Deep indigo background accent |
| `--crimson-bright` | `#2E1A50` | Lighter indigo |
| `--amber` | `#8B0E50` | Mid-tone dark magenta |
| `--amber-bright` | `#C01060` | Mid-tone bright magenta |
| `--bg-primary` | `#07070C` | Main background (near-black) |
| `--bg-secondary` | `#0D0C14` | Slightly lighter background |
| `--bg-card` | `#11101A` | Card backgrounds |
| `--text-primary` | `#F5EEF8` | Main body text |
| `--text-secondary` | `#9A8CA0` | Secondary/muted text |

To change the brand color: update `--gold` and the matching `rgba(215, 20, 113, ...)` values in `style.css`.

### Typography

| Font | Weight | Use |
|------|--------|-----|
| Cinzel Decorative | 400, 700, 900 | Logo/brand mark, display headings |
| Cinzel | 400–900 | Section labels, eyebrows, stats |
| Cormorant Garamond | 300–600 (+ italic) | Body text, quotes, descriptions |
| Special Elite | 400 | Accent text, film titles |

All fonts loaded from Google Fonts. No local font files needed.

### Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `max-width: 1024px` | Tablets — 2-col footer, single-col about |
| `max-width: 768px` | Mobile — hamburger nav, single-col grids |
| `max-width: 480px` | Small phones — tighter padding, smaller type |

`mayur.html` has additional breakpoints at `900px` and `600px` in its page-specific `<style>` block.

---

## JavaScript (`main.js`)

| Feature | How it works |
|---------|-------------|
| Custom cursor | `.cursor` (dot) + `.cursor-ring` (circle) track mouse via `mousemove` |
| Hamburger nav | Toggles `.open` on `.nav-links` and `.active` on `.hamburger` |
| Scroll reveal | IntersectionObserver adds `.revealed` to `.reveal` elements as they enter viewport |
| Awards ticker | Duplicates content to create seamless infinite scroll loop |
| Hero parallax | Subtle `translateY` on scroll for depth |
| Film filter | `data-genre` attributes + click handlers on `.filter-btn` (films.html) |

---

## Updating Content

### Adding a new film (films.html)
Find the `<div class="films-grid">` section and copy an existing `.film-card` block. Update:
- `data-genre` attribute for filter (e.g. `feature`, `brand`, `tv`)
- Film title, year, genre label, description
- The inline `background` gradient in `.film-poster-art` for a unique poster color

### Updating news articles (news.html)
Find the `<div class="news-grid">` section and copy a `.news-card` block. Fill in title, date, category, excerpt, and link.

### Updating the hero tagline (index.html)
Edit the `<h1 class="hero-title">` text. The `<em>` tag applies the italic Cormorant Garamond style.

### Updating contact details
Edit `contact.html` — the company Instagram handles and Gujarat address in the footer and contact section.

---

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch.

**Repository:** https://github.com/sauranova/herenowfilms

### To update the live site
```bash
cd /Users/saura/Projects/\$/claude-code/herenowfilms
git add -A
git commit -m "your change description"
git push
```
GitHub Pages automatically rebuilds within ~1 minute of each push.

### To run locally
No build step needed — open any `.html` file directly in a browser, or use a local server:
```bash
npx serve /Users/saura/Projects/\$/claude-code/herenowfilms
# then open http://localhost:3000
```

---

## Company Info

| Field | Value |
|-------|-------|
| Company | HereNow Films Pvt Ltd |
| Founded | 2018 |
| Location | Gujarat, India |
| Founders | Mayur Soneji (actor) & Mitali Mayur Soneji |
| Services | Film School · Production House · Advertising · Events |
| Instagram | [@hereandnowfilmschool](https://www.instagram.com/hereandnowfilmschool/) |
| Actor Instagram | [@actormayursoneji](https://www.instagram.com/actormayursoneji/) |

### Key Films / Projects
| Title | Year | Notes |
|-------|------|-------|
| Victor 303 | 2025 | Gujarati action drama — 8.4 IMDb · Mayur as Bhaga Bapu |
| Kasoombo | — | Gujarati feature film |
| Samandar | 2024 | Gujarati drama |
| Saiyar Mori Re | — | Gujarati feature |
| Vasundhara Brand Film | — | Campaign for Earthing & Lightning Arrester brand |
| The Māḷu Show | 2026 | TV debut, premieres 11 Jan 2026 |
