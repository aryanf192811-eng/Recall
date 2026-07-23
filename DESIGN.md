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
