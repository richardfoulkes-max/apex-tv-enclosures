# ATE-75 Outdoor TV Enclosure - Manufacturing Specification v5.3.0
## Integrated Bezel Ventilation Design

**Version:** 5.3.0
**Date:** January 2026
**Status:** CURRENT
**Change from v5.2:** Integrated bezel design (80mm top/bottom), NO deflector, 1120mm height, IP55
**Engineering Review:** VALIDATED - Matches authoritative Design Pack PDF

---

## 1. Design Overview

### 1.1 Key Specifications Summary

| Parameter | Value |
|-----------|-------|
| Model | ATE-75 |
| Compatible TVs | 70-75" (max 1689 × 972 × 80mm) |
| External Dimensions | **1760 × 1120 × 160mm** |
| Weight (empty) | ~38 kg |
| Weight (with 75" TV) | ~68 kg |
| IP Rating | **IP55** (dust protected, water jet resistant) |
| Operating Temp | -10°C to +55°C |
| Materials | 5052-H32 aluminum, 316 stainless hardware |

### 1.2 Design Philosophy

**Integrated Bezel Ventilation Design** - Clean architectural aesthetic with ventilation slots recessed within wide bezels. Eliminates need for external deflectors while maintaining superior thermal performance. Optimized for Gulf region (55°C ambient, high UV, dust/sand).

### 1.3 Key Design Features

- **Wide integrated bezels:** 80mm top/bottom, 40mm sides
- **Recessed ventilation:** Slots hidden within bezel profile
- **No external deflector:** Clean flush appearance
- **IP55 rated:** Enhanced water jet protection
- **3× high-static-pressure fans:** Delta AFB1412HH-A (LOCKED specification)

### 1.4 Recess Cavity Requirements

| Parameter | ATE-75 v5.3.0 | Notes |
|-----------|---------------|-------|
| Cavity Width | 1820 mm | 30mm clearance each side |
| Cavity Height | **1160 mm** | 20mm top + 20mm bottom |
| Cavity Depth | 215 mm | Includes mount clearance |
| Side Gap | 30 mm each | Minimum |
| Bottom Gap | 20 mm | Minimum |
| **Top Gap** | **20 mm** | Minimum (no deflector needed) |

**Also supports:** Wall-mount with minimum 30mm rear clearance

---

## 2. Enclosure Dimensions

### 2.1 External Dimensions

| Dimension | Value | Tolerance |
|-----------|-------|-----------|
| Width | 1760 mm | ±2mm |
| Height | **1120 mm** | ±2mm |
| Depth | 160 mm | ±1mm |
| **Top/Bottom Bezel** | **80 mm** | ±0.5mm |
| **Side Bezel** | **40 mm** | ±0.5mm |
| Corner Radius | 8 mm | ±0.5mm |

### 2.2 Bezel Design (Integrated Ventilation)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Top bezel height | 80 mm | Contains exhaust ventilation slots |
| Bottom bezel height | 80 mm | Contains intake ventilation slots |
| Side bezel width | 40 mm | Structural frame only |
| Ventilation slot style | Recessed louvres | Hidden within bezel depth |
| **External deflector** | **NONE** | Clean flush design |

**Design Intent:** Wide bezels create premium architectural appearance while concealing ventilation within the frame profile. No protruding elements.

```
FRONT VIEW (Integrated Bezel Design):

    ┌─────────────────────────────────────────┐
    │            80mm TOP BEZEL               │  ← Exhaust slots recessed
    │         [═══════════════════]           │
    ├─────────────────────────────────────────┤
    │    │                               │    │
    │40mm│                               │40mm│
    │    │         GLASS AREA            │    │
    │    │        1680 × 960mm           │    │
    │    │                               │    │
    ├─────────────────────────────────────────┤
    │         [═══════════════════]           │  ← Intake slots recessed
    │           80mm BOTTOM BEZEL             │
    └─────────────────────────────────────────┘
         Total: 1760mm × 1120mm × 160mm
```

### 2.3 Internal Dimensions (TV Cavity)

| Dimension | Value | Notes |
|-----------|-------|-------|
| Width | 1690 mm | Fits 75" TV (1689mm) |
| Height | 970 mm | Fits 75" TV (972mm) |
| Depth (front to plenum baffle) | 95 mm | TV + wiring clearance |
| Rear Plenum Depth | 30 mm | Air channel behind TV |

### 2.4 Internal Stack-Up (Cross Section)

```
←───────────────── 160mm ─────────────────→
┌─────┬──────────────────────────────┬────┐
│Glass│         TV Cavity            │Plen│
│ 6mm │           95mm               │30mm│
│     │    ┌────────────────┐        │    │
│     │    │      TV        │        │ ↑  │
│     │    │    (~80mm)     │        │AIR │
│     │    └────────────────┘        │ ↑  │
│     │      + 15mm wiring           │    │
└─────┴──────────────────────────────┴────┘
  15mm          95mm                  30mm + 20mm rear wall
```

---

## 3. Thermal Management System

### 3.1 Airflow Architecture

**Type:** Ducted rear-plenum with high-volume forced exhaust

**Air Path:**
```
Filtered bottom intake (80mm bezel) → Diffuser plate → 30mm rear plenum →
Distributed across TV back panel → 3× 140mm exhaust fans → Top bezel exhaust
```

### 3.2 Plenum Flow Distribution

To prevent dead zones in the 30mm × 1680mm plenum:

| Component | Specification |
|-----------|---------------|
| **Diffuser Plate** | Perforated aluminum at plenum inlet |
| Hole pattern | 8mm holes, 40% open area |
| Purpose | Equalizes pressure across full plenum width |
| Location | Bottom of rear plenum, horizontal |

### 3.3 Fan Specification (LOCKED)

| Parameter | Specification |
|-----------|---------------|
| **Quantity** | **3× (all active)** |
| Size | 140mm × 140mm × 25mm |
| Type | PWM, IP55 rated |
| Voltage | 12V DC |
| Speed Range | 400-1400 RPM |
| Airflow (each) | 55-65 CFM |
| Static Pressure | **4.8 mm H₂O** |
| Noise (max) | <35 dBA per fan |
| **System Total** | **165-195 CFM** |

**LOCKED FAN SPECIFICATION:**
- **Delta AFB1412HH-A** (83 CFM max, 4.8 mm H₂O, IP55)
- **DO NOT SUBSTITUTE** - High static pressure required for 30mm plenum
- Noctua alternatives FAILED thermal validation (insufficient static pressure)

### 3.4 Thermal Performance

| Condition | Heat Load | Required CFM | v5.3.0 Capacity | Margin |
|-----------|-----------|--------------|-----------------|--------|
| Full sun (55°C + 800 W/m²) | 550W | 116 CFM | 165-195 CFM | **+42-68%** |
| Shaded (55°C, pergola) | 350W | 60 CFM | 165-195 CFM | **+175%** |
| Typical summer (45°C) | 400W | 75 CFM | 165-195 CFM | **+120%** |

**Thermal Rise:** <15K above ambient at worst case (55°C + full sun)

### 3.5 Fan Control

| Internal Temp | Fan Speed | Noise Level |
|---------------|-----------|-------------|
| <35°C | Off | Silent |
| 35-45°C | 30% PWM | <25 dBA |
| 45-55°C | 50% PWM | <30 dBA |
| 55-65°C | 75% PWM | <38 dBA |
| >65°C | 100% PWM | <42 dBA |

**Post-Shutdown Condensation Prevention:**
- On TV power-off: Run fans at 10% PWM for 30 minutes
- Purpose: Clears warm humid air before enclosure cools
- Prevents dew point condensation on glass and TV screen

**Fail-safe:** Fans run 100% if temperature sensor fails open

### 3.6 Condensation Management

| Feature | Specification |
|---------|---------------|
| ePTFE breather vent | Gore-Tex or equivalent, rear panel |
| Drain slots | 3× 5mm at bottom of plenum |
| Glass coating | Hydrophilic interior (anti-fog) |
| Post-shutdown fan | 10% PWM × 30 min (see above) |

---

## 4. Construction Details

### 4.1 Frame Material

| Component | Material | Thickness |
|-----------|----------|-----------|
| Main frame | 5052-H32 Aluminum | 3.0 mm |
| Rear panel | 5052-H32 Aluminum | 2.0 mm |
| Plenum baffle | 5052-H32 Aluminum | 1.5 mm |
| Internal brackets | 5052-H32 Aluminum | 2.0 mm |

### 4.2 Glass Specification

| Parameter | Value |
|-----------|-------|
| Type | Laminated safety glass (3mm + 3mm) |
| Total Thickness | **6 mm** |
| Tint | Light grey (50% VLT) |
| UV Rejection | >95% |
| Coating | Anti-reflective exterior, hydrophilic interior |
| Retention | Continuous aluminum channel (not clips) |

### 4.3 Sealing & IP55 Rating

| Component | Seal Type |
|-----------|-----------|
| Glass perimeter | EPDM continuous gasket (Shore A 50-70) |
| Service door | EPDM compression seal |
| Fan mounts | Neoprene vibration gaskets |
| Cable entry | IP68 cable glands (M20) |
| Filter housing | Foam perimeter seal |
| Ventilation slots | Labyrinth baffles with mesh |

**IP55 Requirements:**
- Dust protected (limited ingress, no harmful deposits)
- Water jet protected (6.3mm nozzle, any direction, 12.5 L/min)

### 4.4 Finish

| Surface | Treatment |
|---------|-----------|
| Aluminum exterior | Powder coat RAL 7016 (Anthracite Grey) |
| Aluminum interior | Mill finish or clear anodize |
| Minimum thickness | 80 microns |
| Salt spray rating | 1000 hours (ASTM B117) |

---

## 5. Service Access

### 5.1 Bottom Service Door

| Parameter | Value |
|-----------|-------|
| Location | Bottom bezel, center |
| Size | 1650 × 80 mm |
| Hinge | Piano hinge, 316 stainless |
| **Latches** | **Tool-less quarter-turn (×4)** |
| Latch spacing | ~400mm centers |
| **Compression stops** | **EPDM bumpers, 25-35% compression** |
| Gasket | EPDM continuous, 8 × 5mm |
| Access to | Fans, filter, controller |

**IP55 Seal Requirements:**
- 4 latches (not 2) ensure consistent gasket compression over 1650mm span
- Compression stops prevent over/under-compression
- Target gasket compression: 25-35% for reliable seal without fatigue

### 5.2 Filter System

| Parameter | Value |
|-----------|-------|
| Type | MERV 8 pleated |
| Size | 1600 × 60 × 25 mm |
| Access | Slide-out drawer (tool-less) |
| Replacement | Every 6-12 months |

---

## 6. Mounting System

### 6.1 VESA Mount (Internal)

| Parameter | Value |
|-----------|-------|
| Pattern | 400×400 / 600×400 (universal) |
| Bolt size | M8 × 25mm |
| Reinforcement | 6mm aluminum backing plate |
| Load rating | 75 kg @ 3× safety factor |

### 6.2 Wall Mount (External)

| Parameter | Value |
|-----------|-------|
| Type | Customer-supplied (not included) |
| Recommended | Flat mount or articulating (Vogels TVM 5855) |
| Fasteners | Customer-supplied (wall dependent) |
| Load rating | 80 kg minimum required |

### 6.3 Recess Installation

For flush recess installation:
- Requires articulating mount (Vogels TVM 5855 or equivalent)
- **Cavity: 1820 × 1160 × 215mm minimum**
- Side gaps: 30mm each
- Bottom gap: 20mm
- **Top gap: 20mm** (no deflector needed)
- Flush power outlet behind lower half

**Recess Installation Diagram:**
```
┌─────────────────────────────────┐
│         20mm TOP GAP            │
│  ┌───────────────────────────┐  │
│  │   EXHAUST (in 80mm bezel) │  │
│30│                           │30│
│mm│       ENCLOSURE           │mm│
│  │       1760×1120           │  │
│  │                           │  │
│  │   INTAKE (in 80mm bezel)  │  │
│  └───────────────────────────┘  │
│         20mm BOTTOM GAP         │ ← Cool air intake
└─────────────────────────────────┘
       Depth: 215mm
```

---

## 7. Electrical System

### 7.1 Power

| Parameter | Value |
|-----------|-------|
| Input | 100-240V AC, 50/60Hz |
| Power supply | 12V DC, 60W (internal) |
| TV outlet | 3-pin socket (country-specific) |
| Aux outlet | 1× USB-A (5V/2A) for streaming devices |

### 7.2 Cable Entry

| Parameter | Value |
|-----------|-------|
| Location | Rear panel, lower center |
| Glands | 3× M20 IP68 |
| Pre-wired | Power cord (3m outdoor rated) |

---

## 8. Size Variants

| Model | TV Size | External W×H×D | Recess Cavity (W×H×D) | Fans |
|-------|---------|----------------|----------------------|------|
| ATE-55 | 50-55" | 1320 × 880 × 160mm | 1380 × 920 × 215mm | 2× 140mm |
| ATE-65 | 60-65" | 1540 × 1000 × 160mm | 1600 × 1040 × 215mm | 3× 140mm |
| **ATE-75** | 70-75" | **1760 × 1120 × 160mm** | **1820 × 1160 × 215mm** | **3× 140mm** |
| ATE-85 | 80-86" | 2020 × 1260 × 160mm | 2080 × 1300 × 215mm | 3× 140mm |

**Note:** All variants use 80mm top/bottom bezels, 40mm side bezels

---

## 9. Comparison: v5.2 → v5.3.0

| Parameter | v5.2.1 | v5.3.0 | Change |
|-----------|--------|--------|--------|
| Enclosure height | 1040mm | **1120mm** | +80mm |
| Top/bottom bezel | 35mm | **80mm** | +45mm (integrated ventilation) |
| Side bezel | 35mm | **40mm** | +5mm |
| IP Rating | IP54 | **IP55** | Enhanced water protection |
| Glass thickness | 8mm (4+4) | **6mm (3+3)** | -2mm |
| Exhaust deflector | 50mm @ 45° | **NONE** | Removed (clean design) |
| Recess top gap | 60mm | **20mm** | -40mm (no deflector) |
| Cavity height | 1130mm | **1160mm** | +30mm |
| Weight (empty) | ~32kg | **~38kg** | +6kg |
| Weight (with TV) | ~55kg | **~68kg** | +13kg |
| System CFM | 180-210 | **165-195** | Conservative rating |
| Fan spec | Multiple options | **Delta ONLY** | Locked specification |

### 9.1 Design Evolution Summary

**v5.2.1 (Deflector Design):**
- External 45° deflector for exhaust redirection
- Required 60mm top gap in recess
- Narrow 35mm bezels

**v5.3.0 (Integrated Bezel Design):**
- Wide 80mm bezels with recessed ventilation slots
- Clean flush appearance, no external deflector
- Only 20mm gaps required in recess
- Premium architectural aesthetic

---

## 10. Quality Standards

- IEC 60529 (IP55 verification)
- IEC 62368-1 (electrical safety)
- EN 12150 (safety glass)
- ASTM B117 (salt spray)
- ISO 9001 manufacturing

---

## 11. Deliverables Required from Manufacturer

1. Production CAD files (SolidWorks/STEP/DXF)
2. Detailed assembly drawings
3. BOM with supplier part numbers
4. QC inspection checklist
5. First article inspection report
6. **IP55 test certification**

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 5.0 | Dec 2025 | Apex | Initial ducted rear-plenum |
| 5.1 | Dec 2025 | Apex | Added 3rd fan provision |
| 5.2 | Dec 2025 | Apex | Recess-compatible: 160mm depth, deflector |
| 5.2.1 | Dec 2025 | Apex | AI validation fixes |
| **5.3.0** | **Jan 2026** | **Apex** | **Integrated bezel design: 80mm bezels, NO deflector, 1120mm height, IP55, 6mm glass** |
