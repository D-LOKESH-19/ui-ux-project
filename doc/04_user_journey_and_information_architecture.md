# 4. User Journey and Information Architecture

*Stage: Define*

## End-to-end user journey with emotional highs and lows

| Stage | What happens | Emotion |
|---|---|---|
| Morning | Raises wrist, sees number in range | Calm (high) |
| Pre-exercise | Checks trend and prediction | Slightly anxious |
| During exercise | Reads the giant number; trend falls; predictive alert | Worried, then relieved after acting |
| After exercise | Watches for a delayed low [7] | Cautious |
| Evening | Night theme, few alerts | Relaxed |
| Night | Gentle alert, taps big button, caregiver not needed | Anxious (low), then reassured (high) |
| Signal lost or stale | Sees a clear warning, confirms with fingerstick | Frustrated (low), then in control |

[FILL: draw this as a journey graph in Figma and add the image here]

## Task flows for the three most critical tasks

1. **Check status:** raise wrist, see number, arrow and word. Swipe for the 3-hour graph.
2. **Respond to an urgent low:** strong haptic, full-screen card ("LOW SOON", number, arrow), tap the big "Got it" button, "Recheck in 15 min". If not acknowledged, escalate to the critical level.
3. **Handle a night alert:** gentle haptic that grows, dim screen with one huge acknowledge button, user confirms. If there is no response, haptics strengthen, then the caregiver is notified.

## Sitemap or navigation structure

- **Glance screen** (home)
  - Trend graph (swipe up)
  - Alert history (swipe up again)
  - Settings
    - Mode: Day, Exercise, Sleep
    - Quiet hours
    - Caregiver
- **Alert cards** (take over the screen when triggered)
- **State screens:** signal lost, loading, warming up, error, low battery, permission denied

## Content and feature prioritisation

| Priority | Items |
|---|---|
| Must have | Current glucose, unit, trend arrow and word, tiered alerts, acknowledge, signal state, three modes, Day and Night themes |
| Should have | Predictive alert, smart snooze, caregiver escalation, 3-hour graph |
| Could have | Treatment log, watch-face complication, voice acknowledge |
| Won't have now | Dosing advice, long reports, social features |
