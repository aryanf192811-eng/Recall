---
name: RECALL
colors:
  surface: '#fef9f1'
  surface-dim: '#ded9d2'
  surface-bright: '#fef9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3eb'
  surface-container: '#f2ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e7e2da'
  on-surface: '#1d1c17'
  on-surface-variant: '#444748'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e8'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#b71032'
  on-secondary: '#ffffff'
  secondary-container: '#da3148'
  on-secondary-container: '#fffbff'
  tertiary: '#725c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba724'
  on-tertiary-container: '#4d3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#ffb3b4'
  on-secondary-fixed: '#40000a'
  on-secondary-fixed-variant: '#920023'
  tertiary-fixed: '#ffe082'
  tertiary-fixed-dim: '#e9c340'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#564500'
  background: '#fef9f1'
  on-background: '#1d1c17'
  surface-variant: '#e7e2da'
  paper-base: '#F5F0E8'
  surface-white: '#FDFCF9'
  ink-black: '#1A1A1A'
  press-red: '#C41E3A'
  archive-gold: '#B8960C'
  border-tan: '#DDD8CE'
  secondary-grey: '#6B6B6B'
  cat-legal: '#B45309'
  cat-shutdown: '#1D4ED8'
  cat-statement: '#6D28D9'
  cat-loss: '#7F1D1D'
  cat-ground: '#065F46'
  status-verified: '#15803D'
typography:
  masthead-logo:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  subheadline:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.5'
  body-text:
    fontFamily: Merriweather
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.8'
  pull-quote:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.4'
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.08em
  label-tag:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
  edition-number:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.2em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  section-gap: 4rem
---

# RECALL Design System

## Project Identity
**Name:** RECALL
**Tagline:** "The record that cannot be erased."
**Mission:** Document India's protest narrative with the permanence of an archive and the power of cinematic journalism.

## Color Palette

### Base Colors
- **Paper:** `#F5F0E8` (warm newsprint base, used everywhere, especially for app background)
- **Ink:** `#1A1A1A` (near-black, primary text)
- **Press Red:** `#C41E3A` (urgent, breaking, violence category)
- **Archive Gold:** `#B8960C` (accent, pull quotes, highlights)
- **Grey:** `#6B6B6B` (secondary text, captions)
- **White:** `#FDFCF9` (card surfaces)
- **Border:** `#DDD8CE` (all dividers and card borders)

### Category Colors
- **Violence/Force:** `#C41E3A`
- **Legal/Arrest:** `#B45309`
- **Shutdown:** `#1D4ED8`
- **Statement:** `#6D28D9`
- **Loss/Casualty:** `#7F1D1D`
- **Ground Report:** `#065F46`

### Verification Colors
- **Verified:** `#15803D`
- **Reported:** `#B45309`
- **Disputed:** `#C41E3A`
- **Pending:** `#6B7280`

## Typography

### Families
- **Headings (Masthead, Titles, Quotes):** Playfair Display
- **Body & Subtitles:** Lora
- **UI Elements (Labels, Dates, Captions):** Inter
- **Data (IDs, Codes):** JetBrains Mono

### Rules
- **Masthead/Logo:** Playfair Display 900
- **Edition Number:** Inter 500 uppercase tracking-widest
- **Headlines:** Playfair Display 700
- **Subheadlines:** Lora 600
- **Body text:** Lora 400, line-height 1.8
- **Captions:** Inter 500, 11px, uppercase, tracking 0.08em
- **Pull quotes:** Playfair Display Italic 700, 48px, color #B8960C
- **Data/IDs/Codes:** JetBrains Mono 400
- **Labels/Tags:** Inter 600, 11px, uppercase

## Layout & Components
- **Backgrounds:** Use `#FDFCF9` or `#F5F0E8`. Do not use pure white.
- **Borders:** All cards, sections, and dividers should have a 1px solid `#DDD8CE` border.
- **Shadows:** No card shadows without borders.
- **Buttons:** Square or slightly rounded, stark, editorial style.
- **Nav:** No bottom navigation or floating action buttons.

## Components 
- **Masthead:** Full-width. Border-bottom 1px solid #DDD8CE. Background: #F5F0E8. Top bar has edition date and RECALL logo centered. Below is a section bar with horizontal scrollable list of section labels.
- **Breaking News Ticker:** Background #C41E3A, text #FDFCF9, scrolling marquee left.
- **Incident Card:** Shows title, date, location, verification badge. Border 1px solid #DDD8CE, Background #FDFCF9.
- **Entity Card:** Shows name in Playfair Display 700, designation, action taken.
- **Pull Quote Block:** Left border 4px solid #B8960C.