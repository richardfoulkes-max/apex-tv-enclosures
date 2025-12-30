# ATE-75 Outdoor TV Enclosure - Manufacturing Specification v5.2
## Recess-Compatible Ducted Rear-Plenum Design

**Version:** 5.2.1
**Date:** December 2025
**Status:** CURRENT
**Change from v5.1:** Reduced depth (180→160mm), 3 active fans, recess-compatible
**Engineering Review:** Conditional Pass - includes mandatory fixes from AI validation

---

## 1. Design Overview

### 1.1 Key Specifications Summary

| Parameter | Value |
|-----------|-------|
| Model | ATE-75 |
| Compatible TVs | 70-75" (max 1689 × 972 × 80mm) |
| External Dimensions | **1760 × 1040 × 160mm** |
| Weight (empty) | ~32 kg |
| Weight (with 75" TV) | ~55 kg |
| IP Rating | IP54 (dust protected, splash resistant) |
| Operating Temp | -10°C to +55°C |
| Materials | 5052-H32 aluminum, 316 stainless hardware |

### 1.2 Design Philosophy

Recess-compatible design achieving same cavity depth as competitors while delivering 2-3× airflow capacity. Optimized for Gulf region (55°C ambient, high UV, dust/sand).

### 1.3 Recess Cavity Requirements

| Parameter | ATE-75 v5.2 | Competitor Reference |
|-----------|-------------|---------------------|
| Cavity Width | 1820 mm | 1816 mm |
| Cavity Height | **1130 mm** | 1099 mm |
| Cavity Depth | **215 mm** | 220 mm |
| Side Gap | 30 mm each | 30 mm each |
| Bottom Gap | 30 mm | 30 mm |
| **Top Gap** | **60 mm** | 30 mm |

**Top gap increased to 60mm** to prevent exhaust recirculation in recess cavity.
Exhaust deflector on enclosure directs hot air forward out of recess.

**Also supports:** Wall-mount with minimum 30mm rear clearance

---

## 2. Enclosure Dimensions

### 2.1 External Dimensions

| Dimension | Value | Tolerance |
|-----------|-------|-----------|
| Width | 1760 mm | ±2mm |
| Height | 1040 mm | ±2mm |
| **Depth** | **160 mm** | ±1mm |
| Bezel Width | 35 mm | ±0.5mm |
| Corner Radius | 8 mm | ±0.5mm |

### 2.1.1 Exhaust Deflector (Top Bezel) - Architectural Shadow Element

| Parameter | Value | Notes |
|-----------|-------|-------|
| Height | 50 mm | Extends above enclosure top |
| Angle | 45° forward | Directs exhaust out of recess cavity |
| Width | Full width (1760 mm) | Integrated into top bezel |
| Material | 5052-H32 Aluminum | Same as frame |
| **Leading edge** | **Chamfered 5mm radius** | Premium finish detail |
| **Setback** | **8mm behind glass plane** | Creates shadow reveal |
| **Finish** | **Continuous with frame** | Same RAL 7016 powder coat |

**Design Intent:** Architectural shadow element that reads as intentional premium detail, not engineering add-on. The chamfered edge and setback create a shadow reveal that integrates with the frame language.

**Function:** Prevents hot exhaust air from recirculating back to intake in recess installations.

```
FRONT VIEW (shadow reveal detail):

    ╭───────────────────────────────────╮  ← 5mm radius chamfer
    │         DEFLECTOR (50mm)          │
    │            setback 8mm            │
────┼───────────────────────────────────┼────  ← Glass plane
    │                                   │
    │           ENCLOSURE               │
    │                                   │
    └───────────────────────────────────┘

SIDE PROFILE:

         ╱  ← 45° angle
        ╱│
       ╱ │ 50mm
      ╱  │
     ╱───┤ ← 8mm setback
    │░░░░│ ← Shadow reveal
    │    │
    │GLASS
```

### 2.2 Internal Dimensions (TV Cavity)

| Dimension | Value | Notes |
|-----------|-------|-------|
| Width | 1690 mm | Fits 75" TV (1689mm) |
| Height | 970 mm | Fits 75" TV (972mm) |
| Depth (front to plenum baffle) | 95 mm | TV + wiring clearance |
| **Rear Plenum Depth** | **30 mm** | Air channel behind TV |

### 2.3 Internal Stack-Up (Cross Section)

```
←───────────────── 160mm ─────────────────→
┌─────┬──────────────────────────────┬────┐
│Glass│         TV Cavity            │Plen│
│ 8mm │           95mm               │30mm│
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
Filtered bottom intake → Diffuser plate → 30mm rear plenum →
Distributed across TV back panel → 3× 140mm exhaust fans (top)
```

### 3.1.1 Plenum Flow Distribution (CRITICAL)

To prevent dead zones in the 30mm × 1680mm plenum:

| Component | Specification |
|-----------|---------------|
| **Diffuser Plate** | Perforated aluminum at plenum inlet |
| Hole pattern | 8mm holes, 40% open area |
| Purpose | Equalizes pressure across full plenum width |
| Location | Bottom of rear plenum, horizontal |

**Alternative: Vertical Baffles**
- 3× vertical dividers creating 4 channels
- Cross-bleeds at 1/3 and 2/3 height
- Forces air to traverse TV hotspot zones (PSU/driver area)

**Engineering Requirement:** One of the above MUST be implemented to ensure uniform airflow distribution and prevent localized overheating.

### 3.2 Fan Specification

| Parameter | Specification |
|-----------|---------------|
| **Quantity** | **3× (all active)** |
| Size | 140mm × 140mm × 25mm |
| Type | PWM, IP55 rated |
| Voltage | 12V DC |
| Speed Range | 400-1400 RPM |
| Airflow (each) | 60-80 CFM |
| Static Pressure | >2.0 mm H₂O |
| Noise (max) | <35 dBA per fan |
| **System Total** | **180-210 CFM** |

**Approved Fan Models (use ONE consistently):**
- **Primary:** Delta AFB1412HH-A (83 CFM, 4.8 mm H₂O, IP55)
- **Alternate:** Noctua NF-A14 iPPC-3000 (82 CFM, 4.2 mm H₂O) with IP55 mod
- **Budget:** Sunon MEC0381V1-000U-A99 (78 CFM, 3.5 mm H₂O)

**Note:** Do not mix fan models. Select one and use consistently across production for predictable system curve.

### 3.3 Thermal Performance

| Condition | Heat Load | Required CFM | v5.2 Capacity | Margin |
|-----------|-----------|--------------|---------------|--------|
| Full sun (55°C + 800 W/m²) | 550W | 116 CFM | 180-210 CFM | **+55-80%** |
| Shaded (55°C, pergola) | 350W | 60 CFM | 180-210 CFM | **+200%** |
| Typical summer (45°C) | 400W | 75 CFM | 180-210 CFM | **+140%** |

### 3.4 Plenum Compensation

The 30mm plenum (reduced from 50mm) is compensated by:
1. **3 fans vs 2:** +50% fan capacity
2. **High-static fans:** >2.0 mm H₂O overcomes restriction
3. **Total system CFM:** 180-210 vs 140-160 in v5.1

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
| Type | Laminated safety glass (4mm + 4mm) |
| Total Thickness | 8 mm |
| Tint | Light grey (50% VLT) |
| UV Rejection | >95% |
| Coating | Anti-reflective exterior, hydrophilic interior |
| Retention | Continuous aluminum channel (not clips) |

### 4.3 Sealing & IP54 Rating

| Component | Seal Type |
|-----------|-----------|
| Glass perimeter | EPDM continuous gasket |
| Service door | EPDM compression seal |
| Fan mounts | Neoprene vibration gaskets |
| Cable entry | IP68 cable glands (M20) |
| Filter housing | Foam perimeter seal |

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

**IP54 Seal Requirements:**
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
| Type | Flat mount (supplied) or articulating (optional) |
| Wall plate | 400 × 200 × 4mm steel |
| Fasteners | Customer-supplied (wall dependent) |
| Load rating | 80 kg |

### 6.3 Recess Installation

For flush recess installation:
- Requires articulating mount (Vogels TVM 5855 or equivalent)
- **Cavity: 1820 × 1130 × 215mm minimum**
- Side gaps: 30mm each
- Bottom gap: 30mm
- **Top gap: 60mm** (increased for exhaust clearance)
- Flush power outlet behind lower half
- Exhaust deflector directs hot air forward out of cavity

**Recess Installation Diagram:**
```
┌─────────────────────────────────┐
│         60mm TOP GAP           │ ← Hot air exits forward
│    ↖ ↖ ↖ ↖ ↖ ↖ ↖ ↖            │
│  ┌─////DEFLECTOR////─────────┐  │
│  │      3× FANS (exhaust)    │  │
│30│                           │30│
│mm│       ENCLOSURE           │mm│
│  │       1760×1040           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│         30mm BOTTOM GAP        │ ← Cool air intake
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
| ATE-55 | 50-55" | 1320 × 800 × 160mm | 1380 × 890 × 215mm | 2× 140mm |
| ATE-65 | 60-65" | 1540 × 920 × 160mm | 1600 × 1010 × 215mm | 3× 140mm |
| **ATE-75** | 70-75" | **1760 × 1040 × 160mm** | **1820 × 1130 × 215mm** | **3× 140mm** |
| ATE-85 | 80-86" | 2020 × 1180 × 160mm | 2080 × 1270 × 215mm | 3× 140mm |

**Note:** Recess cavity height = enclosure height + 30mm bottom + 60mm top

---

## 9. Comparison: v5.1 → v5.2

| Parameter | v5.1 | v5.2 | Change |
|-----------|------|------|--------|
| Enclosure depth | 180mm | **160mm** | -20mm |
| Rear plenum | 50mm | **30mm** | -20mm |
| Active fans | 2 (+1 blank) | **3 active** | +1 fan |
| System CFM | 140-160 | **180-210** | +40-50 CFM |
| Recess depth | ~255mm | **~215mm** | -40mm |
| Recess top gap | N/A | **60mm** | New |
| Exhaust deflector | None | **50mm @ 45°** | New |
| Plenum diffuser | None | **Perforated plate** | New |
| Service door latches | 2 | **4** | +2 |
| Recess support | Not recommended | **Fully supported** | New capability |
| Thermal margin (worst-case) | 13% | **55-80%** | Significant increase |

### 9.1 Engineering Fixes (from AI Validation)

| Issue Identified | Fix Implemented |
|------------------|-----------------|
| Plenum dead zones | Perforated diffuser plate at inlet |
| Recess exhaust recirculation | 45° deflector + 60mm top gap |
| Service door IP54 over span | 4 latches + compression stops |
| Fan model variance | Locked to Delta AFB1412HH-A |
| Condensation risk | Post-shutdown fan + ePTFE vent |

---

## 10. Quality Standards

- IEC 60529 (IP54 verification)
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
6. IP54 test certification

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 5.0 | Dec 2025 | Apex | Initial ducted rear-plenum |
| 5.1 | Dec 2025 | Apex | Added 3rd fan provision |
| 5.2 | Dec 2025 | Apex | Recess-compatible: 160mm depth, 3 active fans |
| **5.2.1** | Dec 2025 | Apex | **AI validation fixes: deflector, diffuser, 4 latches, 60mm top gap** |
