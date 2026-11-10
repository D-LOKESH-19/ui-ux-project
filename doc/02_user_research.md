# 2. User Research

*Stage: Discover*

## Research method and questions asked

This project uses **secondary research**: a review of published studies on alarm burden, nocturnal hypoglycemia and exercise (cited [1] to [10]), plus a review of an existing product (Dexcom G7 and its watch support, [12] to [14]). **No user interviews were conducted**, so the findings come from published evidence rather than our own participants. This is listed as a limitation in Section 10.

Research questions guiding the review:

1. What problems do people have with CGM alarms?
2. What goes wrong with alerts at night?
3. What goes wrong with glucose monitoring during exercise?
4. What do current products offer on a wrist, and where do users complain?

## Participant details

No participants were recruited. The evidence comes from published studies, for example a survey of 838 adults with type 1 diabetes [1], a survey of parents and caregivers [2], and an overnight study of 30 people with type 1 diabetes [5].

## Key findings and direct observations

**Alarm fatigue**
- People on automated insulin delivery reported the most frequent alarms and more disruption and annoyance [1].
- Heavier alarm burden was linked with ignoring alerts and overcorrecting lows [1].
- About a third of caregivers changed alarm settings to reduce alarms at some times [2].
- DIY-CGM users reported alarm fatigue, signal loss in vigorous exercise and short battery life [3].

**Sleep**
- Patients can sleep through current alarms [4]. Earlier work cited there found only 1 of 16 people with type 1 diabetes woke to induced nocturnal hypoglycemia, versus 10 of 16 controls [4].
- Waking to an alarm clock raised glucose by about 18 mg/dl through a stress response [5].
- Wearable sleep data is linked to nocturnal hypoglycemia, so sleep state is a usable context signal [9].

**Exercise**
- Lows are common during and after exercise [7].
- CGM lags blood glucose during aerobic exercise and is less accurate [6][10].
- A predictive low alert reduced time in hypoglycemia during and after exercise compared with a simple threshold alert [7].
- Real-time alarms outperformed scan-only checking during exercise [8].

**Trust**
- Mismatches with fingerstick readings and alarm fatigue were major limitations of CGM use [3][10].

| No. | Source | Method | Key observation |
|---|---|---|---|
| S1 | Alarm burden survey [1] | Survey, 838 adults | Alarm burden linked to ignoring alerts |
| S2 | Carers study [2] | Carer survey | Sleep loss; alarms changed to cut noise |
| S3 | DIY-CGM study [3] | Qualitative | Alarm fatigue, signal loss in exercise |
| S4 | Night hypoglycemia [4] | Clinical | Patients sleep through alarms |
| S5 | Alarm clock study [5] | CGM study, 30 patients | Alarm waking raises glucose |
| S6 | PACE trial [7] | RCT | Predictive alert reduced time in hypoglycemia |
| S7 | CORRIDA trial [8] | RCT | Real-time alarms better than scan-only |

## Competitor or existing solution analysis

| Product | Observed (sources) | Gap |
|---|---|---|
| Dexcom G7 alerts | Urgent Low Soon warns when glucose is expected to reach 55 mg/dL within 20 minutes; the Urgent Low alert at 55 cannot be turned off; Quiet Mode vibrates only for up to 6 hours, but urgent alerts escalate to sound if not acknowledged; a second alert schedule can be set [12][13] | Good tiers exist, but little use of context (exercise, sleep) |
| Dexcom G7 on Apple Watch | Two complications on select watch faces; connects through the phone, or directly with the Direct to Watch feature [12] | Limited watch-face support |
| Dexcom G7 app reviews | App Store reviewers complain about being unable to dismiss alerts from the watch (the alert repeats), limited watch-face support, and no dark mode [14] | Alert handling on the wrist; night visibility |
| FreeStyle Libre apps, other watch apps | [FILL: optional; not reviewed in this report] | |

## Insights that will drive the design

1. Fewer, smarter alerts. An ignored alert is a failed alert [1].
2. Urgency must be felt, not only seen, because sleep and exercise defeat the screen [4][7].
3. The trend and prediction matter more than the number alone [7][13].
4. Users must see data freshness and signal state to trust the watch [3][10].
5. Gentle escalation beats a sudden loud alarm at night [5].
6. Acknowledging an alert on the watch must actually clear it [14].
7. Older users need very large, plain text and soft, non-glaring screens (design assumption; confirm with a source or user testing).
