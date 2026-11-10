# 9. Usability Testing and Iteration

*Stage: Test. At least five users on defined tasks, then improve. Include a WCAG 2.2 AA review.*

*Everything marked [FILL] must come from your real test sessions. Do not enter invented results.*

## Test plan: tasks, participants and success criteria

| Task | Success criterion |
|---|---|
| T1. Read the glucose value and say whether it is rising or falling | Correct within 2 seconds, from arm's length |
| T2. Respond to an urgent-low alert | Acknowledges within 10 seconds without help |
| T3. Switch to Exercise mode and read the screen while walking | Correct reading, no errors |
| T4. Respond to a night alert (dim room, half-asleep) | Acknowledges using only the big button |
| T5. Interpret a signal-lost screen | Chooses to confirm with a fingerstick |

**Participants:** [FILL: n, at least 5; include some older adults if possible; describe age range and whether they have diabetes or use a CGM].

**Method:** moderated test on the Figma prototype in Present mode, think-aloud, Day and Night themes, then a 1 to 5 satisfaction rating. Get consent and say clearly that this is a design prototype, not medical advice.

## Results: task success, time on task, errors and satisfaction

| User | Task | Success (Y/N) | Time | Issues observed |
|---|---|---|---|---|
| U1 | [FILL] | [FILL] | [FILL] | [FILL] |
| U2 | [FILL] | [FILL] | [FILL] | [FILL] |
| U3 | [FILL] | [FILL] | [FILL] | [FILL] |
| U4 | [FILL] | [FILL] | [FILL] | [FILL] |
| U5 | [FILL] | [FILL] | [FILL] | [FILL] |

Summary: task success [FILL: percent]; average time [FILL]; errors [FILL]; satisfaction [FILL: mean of 5].

## Accessibility check and issues fixed

Review against WCAG 2.2 AA [11], in both Day and Night themes.

| Check | Requirement | Result |
|---|---|---|
| Text contrast | At least 4.5:1 | Pass by calculation (Section 7) |
| Number contrast | Design target 7:1 | Pass: 13.08:1 Day, 16.32:1 Night |
| Non-text contrast | At least 3:1 for icons and status | [FILL: confirm in frames] |
| Use of colour | Not the only signal | Icon shape, word and haptic label added |
| Target size | At least 24 x 24 px; design uses 48+ | [FILL: confirm in frames] |
| Text size | Nothing below 24 px | [FILL: confirm] |
| Motion | No flashing | [FILL: confirm] |
| Non-touch alternative | Hardware-button path | [FILL: confirm] |

Issues fixed: [FILL].

## Problems found, ranked by severity

| Rank | Problem | Severity (critical, major, minor) |
|---|---|---|
| 1 | [FILL] | [FILL] |
| 2 | [FILL] | [FILL] |
| 3 | [FILL] | [FILL] |

## Design changes made and evidence of improvement

[FILL: for each problem, state the change and how a re-test showed improvement (for example task time or success rate before and after).]
