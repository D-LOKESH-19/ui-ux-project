# 7. Visual Design and Design System

*Stage: Prototype 2*

The design uses a **soft Day theme** (warm off-white) and a **soft Night theme** (deep blue-grey). There is no pure black or pure white and no neon, to avoid glare and eye strain, especially for older users. Contrast ratios were calculated with the WCAG formula.

## Colour palette with contrast ratios

### Day theme

| Role | Colour | On | Contrast |
|---|---|---|---|
| Background | #F4F1EA | n/a | n/a |
| Card | #FFFFFF | n/a | n/a |
| Text and numbers | #1F2933 | #F4F1EA | 13.08:1 |
| Secondary text | #52606D | #F4F1EA | 5.72:1 |
| In range | #1F7A4D | #F4F1EA | 4.71:1 |
| High | #9A5B00 | #F4F1EA | 4.81:1 |
| Low | #B3261E | #F4F1EA | 5.79:1 |
| Critical card (white text) | #FFFFFF | #9F1D1D | 7.87:1 |

### Night theme

| Role | Colour | On | Contrast |
|---|---|---|---|
| Background | #0B0F14 | n/a | n/a |
| Card | #1A222B | n/a | n/a |
| Text and numbers | #E8EDF2 | #0B0F14 | 16.32:1 |
| Secondary text | #9AA5B1 | #0B0F14 | 7.68:1 |
| In range | #7FD1A8 | #0B0F14 | 10.61:1 |
| High | #F2C078 | #0B0F14 | 11.52:1 |
| Low | #FF8A80 | #0B0F14 | 8.42:1 |
| Text on card | #E8EDF2 | #1A222B | 13.63:1 |
| Critical card (white text) | #FFFFFF | #8E2B2B | 8.3:1 |

All text pairs meet WCAG 2.2 AA (4.5:1 or more) [11], and numbers exceed 7:1. Colour is never the only signal: each alert level also has an icon shape, a word and a haptic pattern, which helps colour-blind users.

| Level | Icon shape | Word | Haptic |
|---|---|---|---|
| 0 Normal | Circle | "In range" | None |
| 1 Watch | Triangle | "Rising" or "Going down" | One soft pulse |
| 2 Urgent | Filled triangle | "LOW SOON" | Three firm pulses |
| 3 Critical | Exclamation | "TREAT NOW" | Repeating, growing pulses |

## Typography and type scale

Font: Atkinson Hyperlegible or Roboto, bold or medium weights, tabular numerals. No thin or light fonts.

| Style | Size | Weight | Use |
|---|---|---|---|
| Number (Glance) | 96 px | Bold | Glucose value |
| Number (Exercise) | 120 px | Bold | Glucose value in exercise mode |
| Number (Alert) | 80 px | Bold | Value on alert cards |
| Unit | 24 px | Medium | "mg/dL" under the number |
| Trend arrow | 56 px | n/a | Thick arrow with a word under it |
| Title | 36 px | Bold | "LOW", "TREAT NOW" |
| Body | 24 px | Medium | Short instructions |
| Caption | 24 px | Regular | "5 min ago" |

Plain words only, no abbreviations except mg/dL. Maximum three words per line and two lines per screen.

## Spacing, grid and layout rules

- 8 px spacing unit; 28 px safe margin from the round edge; 24 px rounded corners.
- Buttons are full width and 64 to 72 px tall; every touch target is at least 48 x 48 px (WCAG 2.2 requires at least 24 x 24 CSS px [11]).
- Centre alignment on the round screen; numbers sit on solid backgrounds, never on a graph or image.
- Line height 1.2; letter spacing +2 percent on titles.

## Reusable components and their states

| Component | States |
|---|---|
| Glucose readout | normal, stale, signal lost, loading |
| Trend arrow | rising fast, rising, steady, falling, falling fast |
| Status ring | level 0, 1, 2, 3 |
| Big button | default, pressed, disabled, focused |
| Alert card | urgent, critical, acknowledged, snoozed |
| Mode chip | day, exercise, sleep |

## Iconography and imagery choices

Thick-stroke icons with a text label beside them: droplet, arrows, warning triangle, bell, moon (sleep), runner (exercise), signal-lost. No photos or decoration, because they add noise on a tiny screen.

## Rationale linking visual choices to user needs

| Choice | User need | Evidence |
|---|---|---|
| Very large number, unit and word | Glance during exercise; older eyes | [7] and design assumption |
| Soft Night theme and dim sleep screen | No glare, no harsh waking | [5] |
| Shape plus word plus haptic | Alerts noticed when not looking | [4] |
| Stale and signal-lost states | Trust in the data | [3][10] |
| Few, distinct alert levels | Less alarm fatigue | [1] |
