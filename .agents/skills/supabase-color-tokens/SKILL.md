---
name: supabase-color-tokens
description: "Use when working with Supabase color tokens, CSS variables, theming (light/dark), or choosing which color variable to use for a UI component. Triggers: color tokens, theme variables, --background, --foreground, --muted, --border, --primary, bg-surface, bg-canvas, bg-studio, bg-alternative, chart colors, sidebar colors, HSL variables, --bg-*, color system, theme system, design tokens."
metadata:
  author: webui-angular
  version: "2.0.0"
---

# Supabase Color Tokens

## Overview

Este projeto usa o sistema de cores oficial do Supabase, extraído de `packages/ui/build/css/themes/dark.css`, `packages/ui/build/css/themes/light.css`, e `packages/ui/build/css/source/global.css` do repositório `supabase/supabase`.

O sistema segue uma hierarquia semântica de superfícies, textos, bordas e cores de marca. Todas as variáveis estão em `src/styles.css` nas regras `:root` (light) e `.dark` (dark).

---

## Mapeamento completo de variáveis

### Superfícies (profundidade / elevation)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Fundo da página** (body) | `--background` | `0 0% 98.8%` | `0 0% 7.1%` | `--background-default` |
| **Canvas do dashboard** | `--bg-canvas` | `0 0% 97.3%` | `0 0% 7.1%` | `--background-dash-canvas` |
| **Sidebar do studio** | `--bg-studio` | `0 0% 98.8%` | `0 0% 9%` | `--background-dash-sidebar` |
| **Superfície elevada** (card, popover, dropdown) | `--card` / `--popover` | `0 0% 100%` | `0 0% 14.1%` | `--background-dialog-default` / `--background-overlay-default` |
| **Painel de conteúdo** (mais claro) | `--bg-surface-75` | `0 0% 100%` | `0 0% 9%` | `--background-surface-75` |
| **Painel de conteúdo** | `--bg-surface-100` | `0 0% 98.8%` | `0 0% 12.2%` | `--background-surface-100` |
| **Painel aninhado** | `--bg-surface-200` | `0 0% 95.3%` | `0 0% 12.9%` | `--background-surface-200` |
| **Painel aninhado profundo** | `--bg-surface-300` | `0 0% 92.9%` | `0 0% 16.1%` | `--background-surface-300` |
| **Painel profundo extra** | `--bg-surface-400` | `0 0% 89.8%` | `0 0% 16.1%` | `--background-surface-400` |
| **Fundo alternativo** (espaço vazio, data grid) | `--bg-alternative` | `0 0% 99.2%` | `0 0% 5.9%` | `--background-alternative-default` |
| **Fundo alternativo 2** | `--bg-alternative-200` | `0 0% 100%` | `0 0% 11%` | `--background-alternative-200` |
| **Fundo de linha** (data grid rows, zebra) | `--bg-200` | `0 0% 97.3%` | `0 0% 9%` | `--background-200` |
| **Seleção** | `--bg-selection` | `0 0% 92.9%` | `0 0% 19.2%` | `--background-selection` |
| **Controle** (input bg) | `--bg-control` | `0 0% 95.3%` | `0 0% 14.1%` | `--background-control` |
| **Overlay** (dropdown, popover bg) | `--bg-overlay` | `0 0% 98.8%` | `0 0% 14.1%` | `--background-overlay-default` |
| **Overlay hover** | `--bg-overlay-hover` | `0 0% 95.3%` | `0 0% 18%` | `--background-overlay-hover` |
| **Muted** | `--bg-muted` | `0 0% 96.9%` | `0 0% 14.1%` | `--background-muted` |
| **Botão** | `--bg-button` | `0 0% 98.8%` | `0 0% 18%` | `--background-button-default` |
| **Diálogo** | `--bg-dialog` | `0 0% 100%` | `0 0% 7.1%` | `--background-dialog-default` |
| **Fundo sutil** (secondary) | `--secondary` | `0 0% 97.3%` | `0 0% 14.1%` | `--background-200` / `--background-muted` |
| **Fundo sutil** (muted) | `--muted` | `0 0% 96.9%` | `0 0% 14.1%` | `--background-muted` |
| **Hover em overlay** (accent) | `--accent` | `0 0% 95.3%` | `0 0% 18%` | `--background-overlay-hover` |

### Textos (ênfase)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Texto principal** (títulos, body) | `--foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |
| **Texto light** | `--foreground-light` | `0 0% 32.2%` | `0 0% 70.6%` | `--foreground-light` |
| **Texto lighter** | `--foreground-lighter` | `0 0% 43.9%` | `0 0% 53.7%` | `--foreground-lighter` |
| **Texto muted** | `--foreground-muted` / `--muted-foreground` | `0 0% 69.8%` | `0 0% 30.2%` | `--foreground-muted` |
| **Texto contraste** | `--foreground-contrast` | `0 0% 98.4%` | `0 0% 8.6%` | `--foreground-contrast` |
| **Texto de card/popover** | `--card-foreground` / `--popover-foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |
| **Texto de secondary/accent** | `--secondary-foreground` / `--accent-foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |

### Bordas (força)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Borda padrão** (containers, cards) | `--border` | `0 0% 87.5%` | `0 0% 18%` | `--border-default` |
| **Borda muted** | `--border-muted` | `0 0% 92.9%` | `0 0% 14.1%` | `--border-muted` |
| **Borda secondary** | `--border-secondary` | `0 0% 92.9%` | `0 0% 14.1%` | `--border-secondary` |
| **Borda overlay** | `--border-overlay` | `0 0% 91%` | `0 0% 20%` | `--border-overlay` |
| **Borda controle** (formulários) | `--border-control` / `--input` | `0 0% 78%` | `0 0% 22.4%` | `--border-control` |
| **Borda alternativa** | `--border-alternative` | `0 0% 91%` | `0 0% 26.7%` | `--border-alternative` |
| **Borda forte** | `--border-strong` | `0 0% 83.1%` | `0 0% 21.2%` | `--border-strong` |
| **Borda mais forte** | `--border-stronger` | `0 0% 56.1%` | `0 0% 27.1%` | `--border-stronger` |
| **Borda botão** | `--border-button` | `0 0% 88.6%` | `0 0% 24.3%` | `--border-button-default` |
| **Borda botão hover** | `--border-button-hover` | `0 0% 85.9%` | `0 0% 31.4%` | `--border-button-hover` |

### Cores de marca (brand)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Cor primária / marca** (botões, links, highlights) | `--primary` / `--brand-default` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` | `--brand-default` (verde Supabase) |
| **Texto em primary** | `--primary-foreground` | `0 0% 100%` | `0 0% 100%` | white |
| **Link da marca** | `--brand-link` | `153.4 100% 36.7%` | `155 100% 38.6%` | `--brand-link` |
| **Brand 200** | `--brand-200` | `147.6 72.5% 90%` | `162 100% 2%` | `--brand-200` |
| **Brand 300** | `--brand-300` | `147.5 72% 80.4%` | `155.1 100% 8%` | `--brand-300` |
| **Brand 400** | `--brand-400` | `151.3 66.9% 66.9%` | `155.5 100% 9.6%` | `--brand-400` |
| **Brand 500** | `--brand-500` | `155.3 78.4% 40%` | `154.9 100% 19.2%` | `--brand-500` |
| **Brand 600** | `--brand-600` | `156.5 86.5% 26.1%` | `154.9 59.5% 70%` | `--brand-600` |
| **Foco / anel de foco** | `--ring` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` | `--brand-default` |

### Cores secundárias

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Secondary default** (roxo) | `--secondary-default` | `247.8 100% 70%` | `247.8 100% 70%` | `--secondary-default` |
| **Secondary 200** | `--secondary-200` | `248 53.6% 11%` | `248 53.6% 11%` | `--secondary-200` |
| **Secondary 400** | `--secondary-400` | `248.3 54.5% 25.9%` | `248.3 54.5% 25.9%` | `--secondary-400` |

### Cores destrutivas

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Destrutivo** (erro, delete) | `--destructive` | `10.2 77.9% 53.9%` | `10.2 77.9% 53.9%` | `--destructive-default` |
| **Texto destrutivo** | `--destructive-foreground` | `0 0% 100%` | `0 0% 100%` | white |
| **Destructive 200** | `--destructive-200` | `0 100% 99.4%` | `10.9 23.4% 9.2%` | `--destructive-200` |
| **Destructive 300** | `--destructive-300` | `7.1 100% 96.7%` | `7.5 51.3% 15.3%` | `--destructive-300` |
| **Destructive 400** | `--destructive-400` | `7.1 91.3% 91%` | `6.7 60% 20.6%` | `--destructive-400` |
| **Destructive 500** | `--destructive-500` | `10.4 77.1% 79.4%` | `7.9 71.6% 29%` | `--destructive-500` |
| **Destructive 600** | `--destructive-600` | `9.9 82% 43.5%` | `9.7 85.2% 62.9%` | `--destructive-600` |

### Cores de aviso (warning)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Warning** | `--warning` | `30.3 80.3% 47.8%` | `38.9 100% 42.9%` | `--warning-default` |
| **Warning 200** | `--warning-200` | `40 81.8% 97.8%` | `36.6 100% 8%` | `--warning-200` |
| **Warning 300** | `--warning-300` | `44.3 100% 91.8%` | `32.3 100% 10.2%` | `--warning-300` |
| **Warning 400** | `--warning-400` | `41.9 100% 81.8%` | `33.2 100% 14.5%` | `--warning-400` |
| **Warning 500** | `--warning-500` | `36.3 85.7% 67.1%` | `34.8 90.9% 21.6%` | `--warning-500` |
| **Warning 600** | `--warning-600` | `30.3 80.3% 47.8%` | `38.9 100% 42.9%` | `--warning-600` |

### Code block (syntax highlighting)

| Uso | CSS Variable | Light | Dark |
|---|---|---|---|
| **Code block 1** (teal) | `--code-block-1` | `170.6 43.2% 51%` | `170.8 43.1% 61.4%` |
| **Code block 2** (yellow) | `--code-block-2` | `33.1 80% 52.9%` | `33.2 90.3% 75.7%` |
| **Code block 3** (green) | `--code-block-3` | `83.8 61.6% 48%` | `83.8 61.7% 63.1%` |
| **Code block 4** (purple) | `--code-block-4` | `276.3 60% 52.9%` | `276.1 67.7% 74.5%` |
| **Code block 5** (red) | `--code-block-5` | `14 80.4% 58%` | `13.8 89.7% 69.6%` |

### Cores de gráfico (chart)

| Uso | CSS Variable | Light | Dark |
|---|---|---|---|
| Chart 1 (green) | `--chart-1` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` |
| Chart 2 (purple) | `--chart-2` | `247.8 100% 70%` | `247.8 100% 70%` |
| Chart 3 (green) | `--chart-3` | `83.8 61.6% 48%` | `83.8 61.7% 63.1%` |
| Chart 4 (yellow) | `--chart-4` | `33.1 80% 52.9%` | `33.2 90.3% 75.7%` |
| Chart 5 (red) | `--chart-5` | `10.2 77.9% 53.9%` | `10.2 77.9% 53.9%` |

### Sidebar

| Uso | CSS Variable | Light | Dark |
|---|---|---|---|
| Sidebar background | `--sidebar` | `0 0% 98.8%` | `0 0% 9%` |
| Sidebar foreground | `--sidebar-foreground` | `0 0% 9%` | `0 0% 98%` |
| Sidebar primary | `--sidebar-primary` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` |
| Sidebar primary-foreground | `--sidebar-primary-foreground` | `0 0% 100%` | `0 0% 100%` |
| Sidebar accent | `--sidebar-accent` | `0 0% 95.3%` | `0 0% 14.1%` |
| Sidebar accent-foreground | `--sidebar-accent-foreground` | `0 0% 9%` | `0 0% 98%` |
| Sidebar border | `--sidebar-border` | `0 0% 87.5%` | `0 0% 18%` |
| Sidebar ring | `--sidebar-ring` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` |

---

## Regras de uso

### Qual cor usar em cada contexto

| Contexto | Classe/Variável |
|---|---|
| **Body / página** | `bg-background` / `text-foreground` |
| **Card** | `bg-card` `text-card-foreground` `border` |
| **Popover / Dropdown** | `bg-popover` `text-popover-foreground` |
| **Botão primário** | `bg-primary` `text-primary-foreground` |
| **Botão secundário** | `bg-secondary` `text-secondary-foreground` |
| **Elemento muted** (subtle) | `bg-muted` `text-muted-foreground` |
| **Elemento accent** (hover, highlight) | `bg-accent` `text-accent-foreground` |
| **Botão destrutivo** | `bg-destructive` `text-destructive-foreground` |
| **Input / formulário** | `border-input` `bg-control` |
| **Container** | `border` |
| **Foco em input** | `ring-ring` |
| **Painel de conteúdo no dashboard** | `bg-surface-100` |
| **Painel aninhado** | `bg-surface-200` |
| **Painel profundo** | `bg-surface-300` |
| **Overlay (dropdown)** | `bg-overlay` `border-overlay` |
| **Sidebar** | `bg-sidebar` `text-sidebar-foreground` `border-sidebar-border` |
| **Link ativo na sidebar** | `bg-sidebar-accent` `text-sidebar-accent-foreground` |
| **Texto de baixa ênfase** | `text-foreground-light` / `text-foreground-lighter` |
| **Texto muted** | `text-muted-foreground` |
| **Warning** (alerta) | `text-warning` `bg-warning` |
| **Brand highlight** | `text-primary` `bg-brand` |
| **Link** | `text-brand-link` |

### Hierarquia de superfícies (light)

```
100%     → surface-75, bg-dialog
99.2%   → bg-alternative
98.8%   → default, surface-100, bg-overlay, bg-button, bg-dash-sidebar
97.3%   → bg-200, bg-dash-canvas
96.9%   → bg-muted
95.3%   → surface-200, bg-control, bg-overlay-hover
92.9%   → surface-300, bg-selection
89.8%   → surface-400
```

### Hierarquia de superfícies (dark)

```
5.9%    → bg-alternative
7.1%    → default, bg-dash-canvas, bg-dialog
9%      → surface-75, bg-dash-sidebar, bg-200
11%     → bg-alternative-200
12.2%   → surface-100
12.9%   → surface-200
14.1%   → bg-muted, bg-overlay, bg-control, muted
16.1%   → surface-300, surface-400
18%     → bg-overlay-hover, bg-button, accent
19.2%   → bg-selection
```

### Hierarquia de bordas

**Light:**
```
78%     → border-control / input (mais forte)
83.1%   → border-strong
85.9%   → border-button-hover
87.5%   → border-default (padrão)
88.6%   → border-button
91%     → border-overlay, border-alternative
92.9%   → border-muted, border-secondary (mais fraco)
```

**Dark:**
```
14.1%   → border-muted, border-secondary (mais fraco)
18%     → border-default (padrão)
20%     → border-overlay
21.2%   → border-strong
22.4%   → border-control / input
24.3%   → border-button
26.7%   → border-alternative
27.1%   → border-stronger
31.4%   → border-button-hover (mais forte)
```

---

## Como usar no Tailwind

```tsx
// Backgrounds
<div className="bg-background">fundo da página</div>
<div className="bg-card">card</div>
<div className="bg-muted">elemento muted</div>
<div className="bg-primary">botão primário</div>
<div className="bg-destructive">botão deletar</div>
<div className="bg-warning">alerta</div>

// Superfícies custom
<div className="bg-surface-100">painel</div>
<div className="bg-surface-200">painel aninhado</div>
<div className="bg-surface-300">painel profundo</div>
<div className="bg-canvas">dashboard canvas</div>
<div className="bg-studio">sidebar studio</div>
<div className="bg-alternative">espaço vazio grid</div>
<div className="bg-overlay">dropdown/popover</div>
<div className="bg-control">input background</div>
<div className="bg-selection">seleção</div>

// Textos
<p className="text-foreground">texto principal</p>
<p className="text-foreground-light">texto secundário</p>
<p className="text-foreground-lighter">texto terciário</p>
<p className="text-muted-foreground">texto muted</p>
<p className="text-primary">link/highlight</p>
<p className="text-warning">texto de aviso</p>
<p className="text-destructive">texto de erro</p>

// Bordas
<div className="border">borda padrão</div>
<div className="border-border-strong">borda forte</div>
<div className="border-border-muted">borda sutil</div>
<input className="border-input" /> // borda de input

// Foco
<input className="focus:ring-ring" />

// Charts - usar nas cores do recharts / chart.js
hsl(var(--chart-1)) // verde
hsl(var(--chart-2)) // roxo
hsl(var(--chart-3)) // verde 2
hsl(var(--chart-4)) // amarelo
hsl(var(--chart-5)) // vermelho

// Demais cores
hsl(var(--brand-200)) // brand leve
hsl(var(--secondary-default)) // roxo
hsl(var(--code-block-1)) // teal
```

---

## Como usar nos swatches (para páginas de documentação)

As páginas de documentação de cores usam `hsl(var(--...))` nos swatches para mostrar as cores reais do tema:

```tsx
// Exemplo do color-usage-doc-page.tsx
<TextSwatches groups={{
  colors: [
    { name: 'text', text: 'hsl(var(--foreground))', label: 'Postgres' },
    { name: 'text-brand', text: 'hsl(var(--primary))', label: 'Postgres' },
    { name: 'text-warning', text: 'hsl(var(--warning))', label: 'Postgres' },
  ]
}} />

<BgSwatches groups={{
  colors: [
    { name: 'bg-surface-100', bg: 'hsl(var(--bg-surface-100))' },
    { name: 'bg-overlay', bg: 'hsl(var(--bg-overlay))' },
  ]
}} />

<BorderSwatches groups={{
  colors: [
    { name: 'border', border: 'hsl(var(--border))' },
    { name: 'border-strong', border: 'hsl(var(--border-strong))' },
  ]
}} />
```

---

## HSL → CSS

As variáveis seguem o formato `hue saturation% lightness%` (sem `deg`). Use `hsl(var(--variable))` para aplicar:

```css
background-color: hsl(var(--background));
color: hsl(var(--foreground));
border-color: hsl(var(--border));
```

---

## Regras importantes

1. **NUNCA usar hex fixo** nos componentes. Sempre usar `hsl(var(--...))` ou classes Tailwind do tema.
2. **Hex fixo só é aceitável** em: syntax highlighting (VS Code colors), dados de documentação que mostram a paleta raw (color palette swatches), e console.log do browser.
3. **Light/dark automático**: todas as variáveis mudam automaticamente entre temas, os componentes devem reagir sem condicionais `if dark`.
4. **Prefira classes Tailwind** (`bg-muted`, `text-foreground`) em vez de inline styles com `hsl(var(--...))` quando possível.

---

## Verificação

Para verificar se as cores estão corretas, compare com os arquivos oficiais do Supabase:

- `packages/ui/build/css/themes/dark.css`
- `packages/ui/build/css/themes/light.css`
- `packages/ui/build/css/source/global.css`

Do repositório `supabase/supabase` branch `master`.
