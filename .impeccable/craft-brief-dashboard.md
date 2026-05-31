# Design Brief: Dashboard Interaction Refinement

## 1. Feature Summary

Refine the CERBERUS dashboard's interaction layer — the moments between baseline monitoring and active threat response. The dashboard currently works but feels static at rest and abrupt under alert. This pass adds micro-motion to make the idle state feel alive, amplifies the threat alert transition into a visceral full-system impact, and introduces an amber "attention" tier for suspicious activity. Production-ready fidelity for a SOC analyst using this as a glanceable incident command center.

## 2. Primary User Action

Glance at the dashboard and instantly know the system state (safe / suspicious / threat) without reading a single label. The interface's ambient behavior at rest and explosive response under attack should communicate state faster than text.

## 3. Design Direction

- **Color strategy:** Committed. Extends the three-state system to four: green (baseline), amber (attention/suspicious), red (threat), white (recovery). Amber lives between green and red for borderline entropy scores (6.5-7.5 bits).
- **Theme scene:** A SOC analyst at 2am in a dim room, dashboard on a 27-inch monitor as their primary attention anchor. The interface must be readable at a glance but not distract during quiet periods. Then, when an alert fires, every pixel must demand attention.
- **Anchor references:** The way Bloomberg Terminal's alert system uses color saturation as a physical event. The idle micro-animations of the Pill (from the movie) — subtle, organic, alive. Terminal-based intrusion detection systems where scrolling status feels like a living process.

## 4. Scope

Production-ready. Single surface refinement (the `/dashboard` page). Interactive with shipped-quality components. Polish until interaction feels intentional.

## 5. Layout Strategy (Interaction Layer)

The existing grid layout (12-col, 6-row) stays. The interaction layer is additive — it enhances existing components without changing their position or structure. The scanner line becomes a more integral ambient element rather than a decorative scan effect.

## 6. Key States

| State | Color | Behavior |
|-------|-------|----------|
| Baseline | Green | BioGrid nodes breathe subtly (opacity pulse). Scanner line sweeps. All panels show green borders. |
| Attention | Amber | BioGrid nodes shift to amber at 50% density. Scanner line slows. A few log lines switch to amber. Seismograph shows amber indicator. |
| Threat | Red | Full red saturation across all components. BioGrid scales down + blurs. Red pulse on logs. Kill Cam activates. Scanner line stops. |
| Recovery | White | 2s white pulse on BioGrid, then returns to green. |

## 7. Interaction Model

- **Idle:** Continuous micro-motion. BioGrid nodes have staggered opacity breathing (1.5s cycle). Scanner line provides vertical motion. ActiveLog auto-scrolls with new entries every 900ms.
- **Attention trigger:** Simulated via a button or when entropy hits 6.5-7.5. Partial amber wash, not full red alarm.
- **Threat trigger:** Full-screen impact. Background tint, component border shifts, pulse animations, audio plays. Lasts 6s then returns to baseline via 2s white recovery.
- **Hover on panels:** Subtle border brightness increase. No scale transforms (avoid layout animation).

## 8. Content Requirements

- Add amber color tokens (#FFAA00 or similar) to the palette for the attention tier.
- BioGrid: add opacity breathing cycle per node, staggered.
- BioGrid amber state: amber dots at 50% density (mix of green and amber nodes).
- ActiveLog: occasional "ANOMALY_DETECTED" entries in amber during attention state.
- Scanner line: add speed variation based on state (fast at baseline, slow during attention, stop during threat).
- Simulation deck: add an "AMBER ALERT" simulation button alongside Train and Attack.

## 9. Recommended References

- [motion-design.md](reference/motion-design.md) for the micro-motion and alert transition timing
- [color-and-contrast.md](reference/color-and-contrast.md) for adding amber to the existing palette
- [spatial-design.md](reference/spatial-design.md) for layout refinement

## 10. Open Questions

- Exact amber hue: should it lean warm (#FFAA00) or greenish-amber (#CCCC00)?
- BioGrid breathing pattern: uniform pulse vs. staggered wave pattern?
