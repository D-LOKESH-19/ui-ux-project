---
name: Serene Metric
colors:
  surface: '#f7f9ff'
  surface-dim: '#d1dbe8'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e4effd'
  surface-container-high: '#dfe9f7'
  surface-container-highest: '#d9e3f1'
  on-surface: '#121d26'
  on-surface-variant: '#3f4941'
  inverse-surface: '#27313c'
  inverse-on-surface: '#e8f2ff'
  outline: '#6f7a71'
  outline-variant: '#bec9bf'
  surface-tint: '#066c41'
  primary: '#006038'
  on-primary: '#ffffff'
  primary-container: '#1f7a4d'
  on-primary-container: '#aeffca'
  inverse-primary: '#82d8a3'
  secondary: '#52606d'
  on-secondary: '#ffffff'
  secondary-container: '#d5e4f4'
  on-secondary-container: '#586673'
  tertiary: '#8a3942'
  on-tertiary: '#ffffff'
  tertiary-container: '#a85059'
  on-tertiary-container: '#ffe8e8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9ef5be'
  primary-fixed-dim: '#82d8a3'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#00522f'
  secondary-fixed: '#d5e4f4'
  secondary-fixed-dim: '#bac8d7'
  on-secondary-fixed: '#0f1d28'
  on-secondary-fixed-variant: '#3a4855'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40010e'
  on-tertiary-fixed-variant: '#7a2c36'
  background: '#f7f9ff'
  on-background: '#121d26'
  surface-variant: '#d9e3f1'
typography:
  glucose-display:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
  caption:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1.5rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers medical-grade certainty wrapped in calm, dignified domesticity. Designed explicitly for older adults monitoring blood glucose on wearable hardware, the visual language rejects both clinical alarms and tech-centric neon gimmicks. It embraces tactile functionalism: physical-world legibility, zero glare, soothing organic depth, and immediate cognitive resolution.

### Emotional Response & Personality
- **Reassurance over Alarm:** Glucose variations should inform, not panic. The UI uses grounded earth-mineral tones rather than saturated emergency primaries.
- **Physical Dignity:** Interfaces feel like fine ceramic instruments, paper linen, or matte mechanical indicators rather than cold glass slabs.
- **Cognitive Effortlessness:** Older eyes suffering from reduced contrast sensitivity, presbyopia, or cataract scattering can parse state and trajectory within 300 milliseconds.

### Design Movement: Tactile Functionalism
A fusion of high-legibility institutional design, physical instrumentation, and gentle domestic minimalism. Surfaces rely on soft micro-bevels, deep warm parchment grounds, and high-relief ink contrasts. Visual hierarchy is flat, broad, and unhurried.

## Colors

The palette establishes dual operational states calibrated for age-related ocular changes. Pure `#000000` black and pure `#FFFFFF` white are strictly banned to prevent halos, photophobia, and ocular fatigue.

### Contrast & Ergonomics
- Every foreground-to-background pairing strictly satisfies WCAG AAA (≥ 7:1 for normal elements, minimum 4.5:1 on auxiliary details).
- **Day Mode (Linen & Ink):** Uses `#F4F1EA` (warm linen parchment) to eliminate harsh screen back-reflection, matched with `#1F2933` (deep slate charcoal) for crisp ink-like rendering.
- **Night Mode (Midnight Ink):** Uses `#0B0F14` (deep charcoal navy) instead of pitch black to avoid intense pinhole light bleed, paired with muted pastels (`#7FD1A8`, `#F2C078`, `#FF8A80`) that protect dark-adapted eyesight.

### Semantic State System
- **In-Range:** Calm Pine Green (`#1F7A4D` Day / `#7FD1A8` Night). Denotes security and stability.
- **High:** Warm Amber Ochre (`#9A5B00` Day / `#F2C078` Night). Indicates elevation without inducing panic.
- **Low:** Deep Terracotta Red (`#B3261E` Day / `#FF8A80` Night). Communicates clear, prioritized attention.
- **Critical Urgency:** Solid Brick Fill (`#9F1D1D` Day / `#8E2B2B` Night) with crisp off-white typography for immediate rapid triage.

## Typography

Typography relies entirely on **Atkinson Hyperlegible Next**, designed explicitly to differentiate ambiguous letterforms (such as 'I', 'l', '1', and '0' vs 'O') for individuals with low vision.

### Rules of Legibility
- **Strict Hard Floor:** No text element anywhere in the user interface may render smaller than `20px`. Sub-20px typography is fundamentally invalid.
- **Tabular Figures:** All numeric readouts, timestamps, and metrics enforce monospaced numeric glyphs (`font-variant-numeric: tabular-nums`) to prevent optical jitter during dynamic updates.
- **Line Budget:** Interfaces enforce a strict budget of maximum two lines of prose per screen. If a concept cannot be explained in two lines, the workflow must be split into sequential cards.

### Voice & Copywriting Tone
The voice is human, plainspoken, and direct. Jargon, abbreviations, and clinical codes are replaced with calm actionable guidance:
- Instead of "Hyperglycemia detected (195 mg/dL, +2.1 delta)": Use **"High"** with **"Going up"**.
- Instead of "Administer 15g fast-acting carbohydrates": Use **"Eat sugar now"**.
- Instead of "Sensor reading artifact / re-calibrate": Use **"Check fingerstick"**.
- Instead of "Euglycemic state maintained": Use **"Good"**.

## Layout & Spacing

Layout geometry is tailored to a circular display measuring **454x454 pixels**.

### Circular Boundary Rules
- **Physical Canvas:** 454px diameter circle.
- **Safe Circular Margin:** 24px inward perimeter boundary across all arcs, leaving an active touch and optical core of **406px**.
- **No Edge Clipping:** Interactive elements, directional chevrons, and text bounds must never cross into the 24px perimeter buffer.
- **Single Focal Target:** Each screen accommodates exactly one primary action. Subordinate options are relegated to vertical dial scrolls or consecutive screens.

### Spatial Rhythms
- Vertical rhythm follows an 8px baseline grid with standard element gaps defined by `space-sm` (12px) and `space-md` (16px).
- Vertical stack distribution:
  - Top slot (y: 28px to 76px): Auxiliary context or trend icon.
  - Core slot (y: 90px to 280px): Primary glucose number and qualitative status pill.
  - Bottom slot (y: 300px to 410px): Primary actionable physical target (64px minimum button).

## Elevation & Depth

To avoid glare and disorientation for older eyes, elevation avoids dramatic blurry drop shadows and reflective specular highlights. Instead, elevation uses **tactile planar layering** and **low-contrast structural framing**.

### Elevation Tiers
- **Tier 0 (Base Canvas):** Flat day linen (`#F4F1EA`) or night navy (`#0B0F14`).
- **Tier 1 (Surface Cards & Pill Plates):** Soft matte cards (`#FFFFFF` day / `#1A222B` night) with a 1.5px solid boundary stroke tinted with 12% text-primary. This establishes definitive edges without visual clutter.
- **Tier 2 (Interactive Controls & Buttons):** Elevated using an inward 2px matte highlight along the top perimeter and a subtle 2px downward containment shadow (`rgba(0, 0, 0, 0.08)` in day mode, `rgba(0, 0, 0, 0.40)` in night mode), providing the visual affordance of an ergonomic physical push-pad.
- **Critical Overlay Tier:** Solid flat saturation covering the inner 406px circular zone, commanding immediate non-reflective focus.

## Shapes

The interface embraces organic, non-threatening contours that follow the natural curvature of the circular bezel.

### Geometry Specifications
- **Base Radii:** Standard interactive containers utilize `24px` corner radii (`rounded-xl` equivalent), establishing harmony with the circular outer bezel.
- **Pills & Badges:** Trend badges, state chips, and physical action buttons use fully continuous capsule curvature (stadium pill shape) to prevent sharp optical points that distract older eyes.
- **Iconography Shapes:** Icons must use thick 3.5px minimum line weights with rounded stroke ends (`stroke-linecap: round`, `stroke-linejoin: round`) to prevent stroke degradation at lower visual fidelities.

## Components

### Buttons (Primary Touch Action)
- **Dimensions:** Strict **64px** minimum height; spans 100% of the active safe width (up to 340px across the lower arc).
- **Typography:** `body-lg` (24px, weight 600).
- **Tactile Treatment:** Solid high-contrast fill with curved pill geometry. In Day Mode, filled with `#1F2933` with `#F4F1EA` text. In Night Mode, filled with `#E8EDF2` with `#0B0F14` text.
- **Touch State:** On press, scale contracts by 4% accompanied by a sharp 40ms confirmation haptic.

### Multi-Modal Status Badges (Never Color Alone)
Every metabolic alert combines four distinct sensory and visual vectors:
1. **Color:** Semantic state background or border.
2. **Geometric Icon Glyph:** 
   - Good / In-Range: Solid Circle (`●`).
   - High: Equilateral Triangle pointing upward (`▲`).
   - Low: Equilateral Triangle pointing downward (`▼`).
   - Urgent Action: Octagonal Shield (`🛑`).
3. **Conversational Text:** Accompanying plain text caption (e.g., "Good", "Low", "Going down").
4. **Haptic Pattern:** 
   - High: Two soft rhythmic pulses.
   - Low: Three sharp mechanical taps.
   - Critical: Continuous gentle buzz until dismissed via the 64px action button.

### Metric Readout Block
- **Display Number:** `72px` Atkinson Hyperlegible Next Bold with tabular spacing.
- **Trend Indicator:** Sits directly adjacent to the number, sized at 44x44px with a directional arrow tilted at 0°, 45°, or 90°.
- **Unit Token ("mg/dL"):** Styled strictly at `20px` medium, locked directly beneath the number to prevent layout shifts.

### Information Cards
- **Geometry:** 24px border radius, matte fill (`#FFFFFF` day / `#1A222B` night).
- **Padding:** 16px internal padding (`space-md`).
- **Capacity:** Restricted to one title line (32px semibold) and one body message (24px medium).

### Lists & Vertical Dial Carousels
- Items snap to center on rotation.
- Inactive items fade to 40% opacity and scale down to 90% size, focusing attention entirely on the active middle cell.
- Item height minimum: 72px per row to accommodate tremor-prone motor control.