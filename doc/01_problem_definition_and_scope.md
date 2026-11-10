# 1. Problem Definition and Scope

*Stage: Discover*

## Problem statement

People with diabetes who wear a CGM get frequent alarms that all look and feel alike. Over time they learn to ignore them, may sleep through the ones that matter, and cannot safely read detailed data while exercising. A smartwatch is the most discreet and always-available place to show glucose, but its screen is tiny, and many users are older adults with reduced vision.

**Design question:** how can a smartwatch show glucose trends and urgent warnings clearly, at the right urgency, in daily life, during exercise and during sleep?

Why the problem is real:

- In a survey of 838 adults with type 1 diabetes, heavier alarm burden was linked with ignoring alerts and overcorrecting lows [1].
- Patients can sleep through current alarm systems, and night is when hypoglycemia is most dangerous [4].
- Fear of hypoglycemia is the main barrier to exercise for people with type 1 diabetes [7].
- Sensor readings lag blood glucose during exercise and are less accurate [6][10].

## Stakeholders and target users

| Group | Role | Need |
|---|---|---|
| Primary: adults and older adults with insulin-treated diabetes using CGM | Wear the watch | Know status fast, get the right alert at the right time |
| Primary: active users who exercise | Wear it during workouts | Readable at a glance while moving |
| Secondary: parents, partners, caregivers | Receive escalations | Reliable alerts without constant alarm fatigue [2] |
| Secondary: doctors and diabetes educators | Review patterns | Data that supports advice |

## Goals and success metrics

| Goal | Metric (confirm in testing) |
|---|---|
| Glanceability | Users read glucose and trend in 2 seconds or less from arm's length |
| Right urgency | Users identify the alert level correctly in 4 of 5 trials |
| Task success | 80 percent or more complete the three critical tasks unaided |
| Fewer ignored alerts | Users report lower annoyance than with their current alarms |
| Trust | Users understand data age and signal state |
| Readability | All text 24 px or larger; numbers at 7:1 contrast or better |
| Accessibility | Meets WCAG 2.2 AA in both Day and Night themes [11] |

## Constraints and assumptions

- Small round screen (about 454 x 454 px frame), limited battery, no keyboard.
- Glucose data comes from an existing CGM; the sensor is not part of this project.
- CGM readings lag blood glucose, about 12 minutes on average during prolonged aerobic exercise, and are less accurate in exercise [10].
- Assumption: the user wears a compatible watch with the CGM paired.
- Assumption: thresholds follow consensus values and would be set with a doctor.
- This is a design prototype, not a medical device.

## Scope: what the design will and will not cover

**In scope:** glance screen, trend view, four alert levels, daily/exercise/sleep modes, acknowledge and snooze, caregiver escalation, signal-lost and stale-data states, basic settings, Day and Night themes.

**Out of scope:** sensor hardware, insulin dosing advice, clinical validation, a full phone companion app, long-term reports.
