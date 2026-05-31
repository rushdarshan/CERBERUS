---
name: CERBERUS
description: Real-time ransomware detection dashboard with biohazard console aesthetic
colors:
  void: "#050505"
  vitality: "#00FF41"
  infection: "#FF003C"
  shockwave: "#FFFFFF"
  vitality-dim: "rgba(0,255,65,0.05)"
  vitality-faded: "rgba(0,255,65,0.2)"
  vitality-border: "rgba(0,255,65,0.3)"
typography:
  body:
    fontFamily: "'Courier New', 'Courier', monospace"
    fontWeight: 400
  label:
    fontFamily: "'Courier New', 'Courier', monospace"
    fontWeight: 700
    letterSpacing: "0.1em"
  display:
    fontFamily: "'Courier New', 'Courier', monospace"
    fontWeight: 900
    letterSpacing: "0.05em"
rounded:
  default: "0px"
spacing:
  panel-padding: "24px"
  grid-gap: "24px"
  element-gap: "16px"
  tight: "12px"
---

# Design System: CERBERUS

## 1. Overview

**Creative North Star: "The Biohazard Console"**

A living command terminal that treats network security as a biological immune system. Every interface element is a sensor node in a larger organism alert, threat, response, recovery. The system is flat black by default, inert and patient, then erupts into saturated alert red when a pathogen is detected and pulses back through white during the cure cycle.

This is not a corporate SOC dashboard. It is a rogue operator's bio-monitor. The interface rejects generic admin panels, Bootstrap layouts, enterprise navy-blue security tools, and glassmorphism. Every pixel earns its place through function.

**Key Characteristics:**
- Flat black canvas with neon green borders as the structural language
- Red saturation floods the interface during active threats
- White brief pulse during recovery (the "shockwave" moment)
- Monospace-only typography for terminal authenticity
- Animated scanner line as persistent ambient motion
- Subtle grid background (30px cells) as spatial reference
- Glow effects replace shadows as the depth language

## 2. Colors

The palette is a three-state system: baseline, threat, recovery. Every color change signals a system state transition.

### Primary
- **Vitality** (#00FF41): The core brand neon. Used for borders, baseline text, idle indicators, and all structural lines. At rest the interface breathes green.

### Secondary
- **Infection** (#FF003C): Alert state. Floods the interface during active threats. Used for threat text, pulsing grid dots, seismograph spikes, kill cam overlays, and border shifts. Never used at baseline.

### Tertiary
- **Shockwave** (#FFFFFF): Recovery pulse. Appears briefly during the cure transition (bio-grid curing state, ~2s duration). Rare and purposeful.

### Neutral
- **Void** (#050505): The canvas. All backgrounds default here. Near-black (not pure #000) with a faint organic tint.
- **Vitality Dim** (rgba(0,255,65,0.05)): Grid pattern overlay, imperceptible unless looked for.
- **Vitality Faded** (rgba(0,255,65,0.2)): Subdued borders, inactive elements.
- **Vitality Border** (rgba(0,255,65,0.3)): Standard panel borders.

### Named Rules
**The Three-State Rule.** The interface has exactly three chromatic states: green (baseline), red (threat), white (recovery). Every color decision maps to one of these three. No ambient blues, no decorative purples, no gradient transitions between them.

## 3. Typography

**Display/Mono Font:** Courier New, Courier, monospace (system monospace stack)

**Character:** Terminal authenticity. Monospace is not a fallback here it is the identity. Every glyph fixed-width, every character deliberate. No serif, no sans-serif alternatives. The interface reads like a system console, not a web app.

### Hierarchy
- **Display** (900 weight, text sizes up to 6xl, 0.05em tracking): The CERBERUS wordmark on the landing page only.
- **Label** (700 weight, 10-12px, 0.1em tracking, uppercase): Panel titles, section headers, status indicators.
- **Body** (400 weight, 10-14px, normal tracking): All operational text, log entries, data values.
- **Status** (900 weight, 28-36px, uppercase, 0.1em+ tracking): The large "DETECTED: 7.992 BITS" and "BASELINE: 3.500 BITS" readouts. Maximum weight for glanceable urgency.

Line length is unconstrained (terminal windows scroll horizontally). Panels cap at their container width.

### Named Rules
**The Mono-Only Rule.** No proportional fonts, ever. Not for headings, not for hero text, not for labels. The terminal is monospace or it is broken.

## 4. Elevation

Flat by default. Depth is conveyed through glow, not shadow. The system exists on a single two-dimensional plane (the void canvas). State changes emit light: red glow during threats, white glow during recovery, green glow for active elements on hover.

### Glow Vocabulary
- **Threat Pulse** (`box-shadow: 0 0 12px #FF003C`): Applied to bio-grid nodes during attack state.
- **Recovery Flash** (`box-shadow: 0 0 20px white`): Brief curing glow on bio-grid nodes.
- **Kill Cam Corona** (`box-shadow: 0 0 30px #FF003C`): The THREAT PURGED overlay stamp.
- **Scanner Glow** (`box-shadow: 0 0 10px var(--neon-green)`): The scanner line's leading edge.

### Named Rules
**The Glow-Not-Shadow Rule.** Shadows create the illusion of objects floating above a surface. This system has no objects it has signals. Glow is emission, not elevation. Never use a diffuse shadow where a glow belongs.

## 5. Components

### Buttons
- **Shape:** Rectangular, zero border-radius. Sharp corners reinforce the terminal identity.
- **Primary (Train Normal):** 1px solid vitality border (#00FF41) on void background. On hover, background fills vitality, text inverts to void. Transition: all 0.15s ease.
- **Danger (Inject Pathogen):** 1px solid infection border (#FF003C) on void background. Text infection. On hover, background fills infection, text inverts to white. Transition: all 0.15s ease.
- **Padding:** 8px 16px (compact) or 16px 40px (landing CTA). The landing CTA uses thicker padding (10px 40px) with wider tracking (0.1em).

### Panels / Containers
- **Corner Style:** Zero radius (rectangular).
- **Background:** Void (#050505) at varying opacities (95%, 80%, 60%).
- **Border:** 1px solid vitality-border (rgba(0,255,65,0.3)). During threat alerts, some panels shift to infection borders (rgba(255,0,60,0.5)) with infection-tinted backgrounds.
- **Shadow Strategy:** None. See Elevation section.
- **Internal Padding:** 24px (full panels), 16px (compact panels), 12px (tight panels like the log).

### Bio-Grid (Signature Component)
- **Structure:** 20-column CSS grid, 400 nodes (20x20).
- **Gap:** 12px between nodes.
- **Node:** 4px circle, rounded-full.
- **States:** Dim vitality at rest (rgba(0,255,65,0.2)). Infection red with 150% scale and 12px red glow during threat. White with 150% scale and 20px white glow during recovery.
- **Transitions:** All states transition over 500ms. The entire grid scales to 95% and blurs 1px during threat to create a "system impact" effect.

### Kill Cam (Signature Component)
- **Composition:** Forensic memory dump display. Shows hex dump string in infection red (10px, 60% opacity) with a full-center "THREAT PURGED" stamp.
- **THREAT PURGED Stamp:** 36px font-black text, infection red, rotated -12deg, with 4px infection border, void background at 20% opacity, and 30px red glow corona.
- **Idle state:** Spinning border-circle animation (12px, vitality, border-t-transparent) with "Scanning_VMem" label.

### Seismograph
- **Graph Area:** SVG polyline, 100x100 viewBox, preserveAspectRatio="none". Infection red stroke (2px) during alert, vitality stroke (1px) at baseline.
- **Transition:** 300ms color transition on the container.
- **Baseline Marker:** 1px dashed white line at 55% height.

### Active Log
- **Log Line:** 10px monospace. Baseline logs at vitality 60% opacity. Critical logs at infection red, bold, with pulse animation.
- **Scrolling:** Auto-scrolls to bottom on new entry. Caps at 12 visible entries.

### Scanner Line
- **Behavior:** Fixed-position 2px horizontal line, full viewport width, vitality green with 10px green glow. Animates top-to-bottom over 3s with a fade-in/fade-out envelope.

### Primary CTA (Landing)
- **Style:** 1px vitality border, void background. On hover, fills vitality, text inverts to void.
- **Size:** 40px horizontal padding, 16px vertical. 20px font-size, widest tracking (0.05em).
- **Text:** "INITIALIZE LINK" in vitality green.

## 6. Do's and Don'ts

### Do:
- **Do** use the three-state system (green / red / white) exclusively for all color decisions.
- **Do** use glow for emphasis and state changes.
- **Do** keep the void canvas at #050505, never pure black.
- **Do** use monospace across every text element without exception.
- **Do** make threat states saturate the entire viewport (border shifts, background tints, pulse animations).
- **Do** let panels breathe with 24px padding; crowding breaks the terminal feel.

### Don't:
- **Don't** use proportional or sans-serif fonts anywhere.
- **Don't** add shadows to any element; use glow instead.
- **Don't** use side-stripe borders (border-left/border-right >1px) for decoration.
- **Don't** use gradient text or background-clip text effects.
- **Don't** use glassmorphism, frosted glass, or backdrop blur as decoration.
- **Don't** implement modal dialogs as a first resort; prefer inline or progressive disclosure.
- **Don't** use blue, purple, gold, or any color outside the Vitality / Infection / Shockwave triad.
- **Don't** build identical card grids with icon + heading + text patterns.
- **Don't** animate CSS layout properties (width, height, top, left, padding, margin).
- **Don't** use bounce or elastic easing curves; prefer ease-out exponential curves.
