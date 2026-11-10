# 8. High-Fidelity Interactive Prototype

*Stage: Prototype 3. A clickable prototype a user can complete tasks in without help.*

## Final screens for all critical flows

[FILL: insert exported Figma frames. Each screen exists in Day and Night.]

Screens: Glance; Trend graph; History; Settings; Watch (level 1); Urgent low (level 2); Critical (level 3); Acknowledged; Exercise mode; Sleep mode; Signal lost; Loading; Sensor warming up; Error; Low battery; Permission denied.

## Interactions, transitions and micro-interactions

| Interaction | Behaviour |
|---|---|
| Raise wrist | Glance screen wakes with number, unit, arrow and word |
| Swipe up | Moves between glance, graph and history |
| Level 2 alert | Firm haptic pattern, card slides in from the bottom |
| Acknowledge | Short haptic tick, card closes, "Recheck in 15 min" appears; the alert is cleared on the watch, so it does not repeat |
| Level 3 or no response | Haptic strength grows in steps, then the caregiver is notified with a clear on-screen note |
| Sleep alert | Haptic ramps up gradually rather than starting at full strength [5] |
| Mode switch | Soft 250 ms fade, mode icon shown briefly |

Haptic patterns (a prototype cannot play them, so they are labelled on the frames): level 1 one soft pulse; level 2 three firm pulses; level 3 repeating pulses that grow stronger.

## Edge states: empty, loading, error, offline and permission denied

| State | Design response |
|---|---|
| Empty | "Sensor warming up" with a progress bar |
| Loading | Skeleton number and a small spinner |
| Error | "Sensor error. Check with fingerstick" |
| Offline or signal lost | Last value dimmed with its age, e.g. "12 min ago" |
| Permission denied | Plain explanation and one button to fix it |
| Low battery | Warning and a battery-saver mode that keeps alerts on |

## Prototype link and access instructions

Prototype link: [FILL: Figma view-only link].

Access: open the link, press Present, choose a watch frame, and set sharing to "anyone with the link can view". Task cards for testers are in the Appendix.

## Tools and resources used

Figma (design and prototype), an AI design agent for building frames from written prompts (prompts in `prompts/`), the WCAG contrast formula, and published research [1] to [14].
