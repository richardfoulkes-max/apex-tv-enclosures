# Thermal Optimization Research

**Date:** January 2026
**Source:** Discussion with Chris (Dyson) - programme/project manager background
**Status:** FUTURE OPTIMIZATION - revisit if prototype has thermal issues

---

## Key Insight

Chris pointed out that cooling should focus on where the TV gets hottest, not uniform airflow across the entire back panel.

---

## Where Modern 75" TVs Generate Heat

Heat is **not uniform** across the TV back panel. There are distinct thermal zones:

### Primary Heat Sources (Hottest → Cooler)

| Component | Location | Heat Level | Notes |
|-----------|----------|------------|-------|
| **Power Supply Board** | Center or top-center | **CRITICAL** | Generates most concentrated heat. Can reach 70-80°C |
| **LED Backlight Driver** | Behind panel, distributed | HIGH | Drives the LEDs, significant power dissipation |
| **Main Board / Processor** | Lower-center | HIGH | AI processing, smart features |
| **T-Con Board** | Top edge (connects to panel) | MEDIUM | Display timing controller |
| **Class D Audio Amp** | Near speakers | MEDIUM-HIGH | Can overheat significantly |
| **LED Backlight Array** | Entire back surface | DISTRIBUTED | Spread across panel, not concentrated |

### Typical TV Back Layout (75")
```
┌─────────────────────────────────────┐
│  T-Con Board (top edge)             │  ← MEDIUM heat
├─────────────────────────────────────┤
│                                     │
│     LED Backlight (distributed)     │  ← LOW-MEDIUM heat
│                                     │
│    ┌─────────────────────┐          │
│    │   POWER SUPPLY      │          │  ← **HOTTEST ZONE**
│    │   (center area)     │          │
│    └─────────────────────┘          │
│                                     │
│    ┌─────────┐  ┌─────────┐         │
│    │Main PCB │  │ Audio   │         │  ← HIGH heat
│    └─────────┘  └─────────┘         │
│                                     │
│  [HDMI/USB ports - bottom edge]     │
└─────────────────────────────────────┘
```

---

## Current Apex v5.3.0 Design

Uses **uniform airflow** approach:
- 30mm rear plenum with perforated diffuser plate (40% open, uniform)
- Air pulled uniformly across entire TV back
- 3× Delta AFB1412HH-A fans at top exhaust everything equally

**Gap identified:** We're treating all areas the same when the power supply zone needs MORE cooling than the edges.

---

## Optimization Options (If Needed)

### Option A: Zoned Diffuser Plate ⭐ RECOMMENDED
Instead of uniform 40% open area, create zones:
- **Center zone (power supply area):** 60% open area - more airflow
- **Edge zones:** 30% open area - less airflow needed

**Cost:** $0 extra - just different hole pattern in same diffuser plate
**Complexity:** Low - manufacturing change only
**When:** Request variant diffuser from manufacturer for A/B testing

### Option B: Directed Airflow Channels
Add internal baffles/channels that direct more air to center:
```
     ┌─ Fan ─┐  ┌─ Fan ─┐  ┌─ Fan ─┐
     │   ↑   │  │   ↑   │  │   ↑   │
     └───────┘  └───────┘  └───────┘
         ↑          ↑↑↑        ↑      ← More air from center
     ┌───┴──────────┴┴┴────────┴───┐
     │    Channel guides to center  │
     └─────────────────────────────┘
```

**Cost:** +$15-25 for internal baffles
**Complexity:** Medium - new tooling
**When:** Only if Option A insufficient

### Option C: Center Fan Bias (Firmware) ⭐ ZERO COST FIX
Run center fan at higher PWM than edge fans:
- Edge fans: Base PWM
- Center fan: Base PWM + 20%

**Cost:** $0 - firmware change only
**Complexity:** Low - code change
**When:** Can implement any time post-production

See: [PWM Controller Firmware Notes](#pwm-controller-firmware)

---

## PWM Controller Firmware

### Current Design (control-logic.html)
We specify a PWM fan controller with:
- Temperature sensor input (NTC thermistor)
- PWM output to fans (0-100%)
- Thresholds: 30°C start, 45°C mid, 55°C max

### Can Firmware Be Updated?

**It depends on the controller type:**

| Controller Type | Updatable? | Notes |
|-----------------|------------|-------|
| **Microcontroller (Arduino/ESP32)** | ✅ YES | Reflash via USB or OTA. Full flexibility. |
| **Dedicated PWM IC (e.g., EMC2301)** | ⚠️ LIMITED | Some have I2C registers for thresholds, but logic is fixed |
| **Analog circuit (op-amps/comparators)** | ❌ NO | Hardware-defined. Change requires new PCB. |

### Our Specification
We haven't locked in the controller yet. Options:

1. **ESP32-based (RECOMMENDED for flexibility)**
   - ~$3-5 cost
   - WiFi/BLE capability (future: remote monitoring)
   - Fully reprogrammable firmware
   - Can implement per-fan PWM (center bias)
   - OTA updates possible

2. **Dedicated fan controller IC (cheaper but limited)**
   - ~$1-2 cost
   - Fixed logic, limited tuning
   - Cannot do per-fan differentiation

### Recommendation
Specify **ESP32-C3** or similar microcontroller for production:
- Costs only $2-3 more than dedicated IC
- Allows firmware updates without hardware changes
- Can implement Option C (center fan bias) via software
- Future-proofs for smart home integration

---

## Testing Protocol (If Thermal Issues Found)

1. **Baseline:** Run prototype with uniform diffuser, uniform fan speed
2. **Thermal imaging:** Use FLIR camera to map actual hot spots
3. **Compare to theory:** Does power supply area run hottest as expected?
4. **Test Option C first:** Increase center fan PWM +20%, retest
5. **If insufficient:** Request zoned diffuser plate from manufacturer
6. **Last resort:** Add internal baffles (Option B)

---

## Sources

- [Electronics Cooling - Flat TV Monitor](https://www.electronics-cooling.com/2003/05/cooling-of-a-flat-tv-monitor/)
- [NFION - TV Thermal Management Solutions](https://www.nfionthermal.com/Solution/s72.html)
- [Samsung QLED Teardown](https://news.samsung.com/global/video-samsung-qled-tv-teardown-reveals-technology-that-proves-real-value)
- [iFixit - Samsung TV Overheating Powerboard](https://www.ifixit.com/Answers/View/684256/Samsung+60%22+TV+overheating+powerboard)
- [Reshine Display - LCD Heat Generation](https://www.reshine-display.com/how-much-heat-does-an-lcd-screen-generate.html)

---

## Action Items

- [x] Specify ESP32-based controller in next spec revision (allows firmware updates) — **DONE Jan 2026, control-logic.html v2.1**
- [ ] Request thermal imaging of prototype during testing
- [ ] If issues found, try center fan bias first (free fix)
- [ ] If still issues, request zoned diffuser plate variant
