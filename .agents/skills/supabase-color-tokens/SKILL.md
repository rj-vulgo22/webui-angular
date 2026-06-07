---
name: supabase-color-tokens
description: "Use when working with Supabase color tokens, CSS variables, theming (light/dark), or choosing which color variable to use for a UI component. Triggers: color tokens, theme variables, --background, --foreground, --muted, --border, --primary, bg-surface, bg-canvas, bg-studio, bg-alternative, chart colors, sidebar colors, HSL variables, --bg-*, color system, theme system, design tokens."
metadata:
  author: webui-angular
  version: "1.0.0"
---

# Supabase Color Tokens

## Overview

Este projeto usa o sistema de cores oficial do Supabase, extraído de `packages/ui/build/css/themes/dark.css`, `packages/ui/build/css/themes/light.css`, e `packages/ui/build/css/source/global.css` do repositório `supabase/supabase`.

O sistema segue uma hierarquia semântica de superfícies, textos, bordas e cores de marca.

## Arquivo de definição

Todas as variáveis estão em `src/styles.css` nas regras `:root` (light) e `.dark` (dark).

## Mapeamento Shadcn → Supabase

### Superfícies (profundidade / elevation)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Fundo da página** (body) | `--background` | `0 0% 98.8%` | `0 0% 7.1%` | `--background-default` |
| **Canvas do dashboard** | `--bg-canvas` | `0 0% 97.3%` | `0 0% 7.1%` | `--background-dash-canvas` |
| **Sidebar do studio** | `--bg-studio` | `0 0% 98.8%` | `0 0% 9%` | `--background-dash-sidebar` |
| **Superfície elevada** (card, popover, dropdown) | `--card` / `--popover` | `0 0% 100%` (light) | `0 0% 14.1%` | `--background-dialog-default` / `--background-overlay-default` |
| **Painel de conteúdo** (mais claro) | `--bg-surface-75` | `0 0% 100%` | `0 0% 9%` | `--background-surface-75` |
| **Painel de conteúdo** | `--bg-surface-100` | `0 0% 98.8%` | `0 0% 12.2%` | `--background-surface-100` |
| **Painel aninhado** | `--bg-surface-200` | `0 0% 95.3%` | `0 0% 12.9%` | `--background-surface-200` |
| **Painel aninhado profundo** | `--bg-surface-300` | `0 0% 92.9%` | `0 0% 16.1%` | `--background-surface-300` |
| **Fundo alternativo** (espaço vazio, data grid) | `--bg-alternative` | `0 0% 99.2%` | `0 0% 5.9%` | `--background-alternative-default` |
| **Fundo de linha** (data grid rows, zebra) | `--bg-200` | `0 0% 97.3%` | `0 0% 9%` | `--background-200` |
| **Fundo sutil** (muted, secondary) | `--secondary` / `--muted` | `0 0% 97.3%` (sec) / `0 0% 96.9%` (muted) | `0 0% 14.1%` | `--background-200` / `--background-muted` |
| **Hover em overlay** (accent) | `--accent` | `0 0% 95.3%` | `0 0% 18%` | `--background-overlay-hover` / `--colors-gray-light-300` |

### Textos (ênfase)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Texto principal** (títulos, body) | `--foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |
| **Texto secundário** (labels, descrições) | `--muted-foreground` | `0 0% 69.8%` | `0 0% 30.2%` | `--foreground-muted` |
| **Texto de card/popover** | `--card-foreground` / `--popover-foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |
| **Texto de secondary/accent** | `--secondary-foreground` / `--accent-foreground` | `0 0% 9%` | `0 0% 98%` | `--foreground-default` |

### Bordas (força)

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Borda padrão** (containers, cards) | `--border` | `0 0% 87.5%` | `0 0% 18%` | `--border-default` |
| **Borda de input** (formulários) | `--input` | `0 0% 78%` | `0 0% 22.4%` | `--border-control` |

### Cores de marca

| Uso | CSS Variable | Light | Dark | Supabase Source |
|---|---|---|---|---|
| **Cor primária / marca** (botões, links, highlights) | `--primary` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` | `--brand-default` (verde Supabase) |
| **Texto em primary** | `--primary-foreground` | `0 0% 100%` | `0 0% 100%` | white |
| **Foco / anel de foco** | `--ring` | `152.9 60% 52.9%` | `153.1 60.2% 52.7%` | `--brand-default` |
| **Destrutivo** (erro, delete) | `--destructive` | `10.2 77.9% 53.9%` | `10.2 77.9% 53.9%` | `--destructive-default` (vermelho) |
| **Texto destrutivo** | `--destructive-foreground` | `0 0% 100%` | `0 0% 100%` | white |

### Cores de gráfico (chart)

| Uso | CSS Variable | Light | Dark |
|---|---|---|---|
| Chart 1 | `--chart-1` | `152.9 60% 52.9%` (green) | `153.1 60.2% 52.7%` (green) |
| Chart 2 | `--chart-2` | `247.8 100% 70%` (purple) | `247.8 100% 70%` (purple) |
| Chart 3 | `--chart-3` | `83.8 61.6% 48%` (green) | `83.8 61.7% 63.1%` (green) |
| Chart 4 | `--chart-4` | `33.1 80% 52.9%` (yellow) | `33.2 90.3% 75.7%` (yellow) |
| Chart 5 | `--chart-5` | `10.2 77.9% 53.9%` (red) | `10.2 77.9% 53.9%` (red) |

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
| **Input / formulário** | `border-input` |
| **Container** | `border` |
| **Foco em input** | `ring-ring` |
| **Painel de conteúdo no dashboard** | `bg-surface-100` |
| **Painel aninhado** | `bg-surface-200` |
| **Painel profundo** | `bg-surface-300` |
| **Sidebar** | `bg-sidebar` `text-sidebar-foreground` `border-sidebar-border` |
| **Link ativo na sidebar** | `bg-sidebar-accent` `text-sidebar-accent-foreground` |

### Hierarquia de superfícies (light → dark)

```
Mais claro (light)                  Mais escuro (dark)
┌────────────────────┐          ┌────────────────────┐
│ surface-75 (100%)  │          │ alternative (5.9%) │
│ surface-100 (98.8%)│          │ default (7.1%)     │
│ default (98.8%)    │          │ surface-75 (9%)    │
│ alternative (99.2%)│          │ bg-200 (9%)        │
│ bg-200 (97.3%)     │          │ surface-100 (12.2%)│
│ muted (96.9%)      │          │ surface-200 (12.9%)│
│ surface-200 (95.3%)│          │ muted (14.1%)      │
│ surface-300 (92.9%)│          │ surface-300 (16.1%)│
└────────────────────┘          └────────────────────┘
```

### Hierarquia de bordas (light)

```
--input (78%) → forte
--border (87.5%) → padrão
```

### Hierarquia de bordas (dark)

```
--border (18%) → padrão
--input (22.4%) → forte
```

## Como usar no Tailwind

```tsx
// Backgrounds
<div className="bg-background">fundo da página</div>
<div className="bg-card">card</div>
<div className="bg-muted">elemento muted</div>
<div className="bg-primary">botão primário</div>
<div className="bg-destructive">botão deletar</div>

// Superfícies custom
<div className="bg-surface-100">painel</div>
<div className="bg-surface-200">painel aninhado</div>
<div className="bg-surface-300">painel profundo</div>
<div className="bg-canvas">dashboard canvas</div>
<div className="bg-studio">sidebar studio</div>
<div className="bg-alternative">espaço vazio grid</div>

// Textos
<p className="text-foreground">texto principal</p>
<p className="text-muted-foreground">texto secundário</p>
<p className="text-primary">link/highlight</p>

// Bordas
<div className="border">borda padrão</div>
<input className="border-input" /> // borda de input

// Foco
<input className="focus:ring-ring" />

// Charts - usar nas cores do recharts / chart.js
hsl(var(--chart-1)) // verde
hsl(var(--chart-2)) // roxo
hsl(var(--chart-3)) // verde 2
hsl(var(--chart-4)) // amarelo
hsl(var(--chart-5)) // vermelho
```

## HSL → CSS

As variáveis seguem o formato `hue saturation% lightness%` (sem `deg`). Use `hsl(var(--variable))` para aplicar:

```css
background-color: hsl(var(--background));
color: hsl(var(--foreground));
border-color: hsl(var(--border));
```

## Verificação

Para verificar se as cores estão corretas, compare com os arquivos oficiais:

- `packages/ui/build/css/themes/dark.css`
- `packages/ui/build/css/themes/light.css`
- `packages/ui/build/css/source/global.css`

Do repositório `supabase/supabase` branch `master`.
