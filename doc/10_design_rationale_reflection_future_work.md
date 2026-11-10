# 10. Design Rationale, Reflection and Future Work

*Stage: Reflect*

## Major design decisions and trade-offs

- **Four alert levels instead of one alarm.** More to learn, but it directly attacks alarm fatigue [1]. Existing products already use tiers such as Urgent Low Soon [12], which supports the idea.
- **Predictive alerts.** They warn early and reduced time in hypoglycemia in a trial [7], but predictions can be wrong and cause false alerts. The design shows data age and a quick fingerstick check [10].
- **Gradual haptic ramp at night.** It avoids a stress response from a harsh wake [5], but may be slower to wake a deep sleeper, so it escalates to a caregiver [4].
- **Very large, minimal exercise screen.** Easy to read, but little information; the graph is hidden while exercising.
- **Soft Day and Night themes instead of pure black and white.** Gentler on older eyes and at night, at the cost of slightly lower contrast than the maximum (still AA and above).
- **Acknowledge clears the alert on the watch.** A common complaint is alerts that return after being dismissed on the watch [14].
- **Hardware-button acknowledgement.** Works with sweat or gloves, but depends on watch hardware that varies by brand.

## Limitations of the final design

- Not clinically validated, and no user interviews were conducted, so personas and insights come from published research. Thresholds and escalation timing also need expert review.
- Haptic patterns cannot be fully tested in a clickable prototype.
- Context detection (exercise, sleep) is assumed to be available from watch sensors and may be imperfect.
- Tested with [FILL: n] people, so results are indicative only.

## What failed or was redone, and what was learned

[FILL: write about real events only, for example a layout dropped after feedback, or a test finding that changed the design. This section is marked on honesty.]

## Ethical considerations

- **Safety:** a missed alert and a false alert both carry risk. The design must never claim to replace a medical device or a doctor.
- **Privacy:** glucose data is sensitive health data. Caregiver sharing needs explicit consent and must be switchable off.
- **Equity:** do not rely on colour or sound alone; support colour-blind, hard-of-hearing and low-vision users, and older adults.
- **Research ethics:** informed consent and anonymised notes for anyone who tests the prototype.

## Future improvements

1. Interview and test with real users, including older adults and caregivers.
2. Personalised alert timing from each user's own history.
3. Better context detection using heart rate and sleep stage [9].
4. Clinical review, and testing with children and older adults.
5. Voice acknowledgement and audio-free modes.
6. Companion phone app and care-team reports.
