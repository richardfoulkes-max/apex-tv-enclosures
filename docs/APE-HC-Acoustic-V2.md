# APE-HC Acoustic Enclosure V2 — Engineering Brief

**Version:** 2.0
**Date:** 2026-01-08
**Status:** Design Specification

---

## 1. Overview

The APE-HC Acoustic V2 is a noise-reduction enclosure for residential pool heat pumps and chillers (12–35 kW) operating in UAE ambient conditions up to 50°C.

**Design Philosophy:**
- Priority: **Noise reduction** through acoustic baffling, absorption, mass loading, and vibration isolation
- Constraint: **Zero meaningful airflow restriction** — the enclosure must NOT cause overheating or fan backpressure
- Approach: Open-frame top with removable acoustic discharge hood + baffled intake modules

**This is NOT a sealed enclosure.** We achieve noise reduction through:
1. Eliminating direct line-of-sight sound paths (baffling)
2. Absorbing sound energy (mineral wool lining)
3. Adding mass to panels (constrained-layer damping)
4. Isolating structure-borne vibration (anti-vibration mounts)

---

## 2. Design Rationale

### 2.1 Why Open-Frame Top + Acoustic Hood?

Heat pump fans discharge vertically. A solid roof would:
- Block airflow → overheating
- Create backpressure → reduced efficiency, increased fan noise
- Trap heat → component damage

**Solution:** Open aluminum frame (structural only) with a removable acoustic discharge hood that:
- Redirects exhaust air sideways through large-area acoustic outlets
- Blocks direct line-of-sight from fan to exterior
- Maintains low pressure drop (≤25 Pa target)

### 2.2 Why Baffled Intake Modules?

Simple weather louvers allow direct sound transmission. Baffled intake modules:
- Force air through a 90° turn minimum
- Line the air path with acoustic absorption
- Maintain large cross-sectional area to minimize velocity

### 2.3 Why Constrained-Layer Damping?

Large aluminum panels (2–3mm) act as drumheads, resonating at equipment frequencies. Constrained-layer damping (CLD) with butyl mat:
- Converts vibration to heat
- Reduces panel resonance by 10–15 dB
- Adds mass without bulk

---

## 3. Enclosure Dimensions

### 3.1 Base Enclosure (Internal Dimensions)

| Model | Width (mm) | Depth (mm) | Height (mm) | Equipment Capacity |
|-------|------------|------------|-------------|-------------------|
| APE-HC-S | 900 | 550 | 1000 | Up to 12 kW |
| APE-HC-M | 1100 | 650 | 1000 | Up to 20 kW |
| APE-HC-L | 1400 | 750 | 1100 | Up to 35 kW |

### 3.2 External Dimensions (Including Acoustic Components)

| Model | Ext. Width | Ext. Depth | Ext. Height | Hood Height |
|-------|------------|------------|-------------|-------------|
| APE-HC-S | 1100 | 750 | 1400 | 350 |
| APE-HC-M | 1300 | 850 | 1400 | 350 |
| APE-HC-L | 1600 | 950 | 1500 | 350 |

*Note: External dimensions include 100mm intake module depth on each side.*

### 3.3 Component Dimensions

| Component | S | M | L | Notes |
|-----------|---|---|---|-------|
| Intake Module Depth | 100 mm | 100 mm | 100 mm | Per side |
| Hood Internal Height | 300 mm | 300 mm | 350 mm | Above frame |
| Hood Outlet Height | 200 mm | 200 mm | 250 mm | Per side |
| Baffle Spacing | 75 mm | 75 mm | 75 mm | Air path width |
| Insulation Thickness | 50 mm | 50 mm | 50 mm | Mineral wool |
| Perforated Liner | 1.0 mm | 1.0 mm | 1.0 mm | 23% open area |

---

## 4. Airflow Design

### 4.1 Design Airflow Rates

| Model | Design Airflow | Notes |
|-------|----------------|-------|
| APE-HC-S | 3,000 m³/h | Small heat pumps |
| APE-HC-M | 5,000 m³/h | Standard heat pumps |
| APE-HC-L | 8,000 m³/h | Large commercial units |

### 4.2 Free-Area Velocity Target

**Maximum free-area velocity: 2.0 m/s**

Higher velocities cause:
- Audible air rush noise
- Increased pressure drop
- Reduced equipment efficiency

### 4.3 Required Outlet Areas

Using `airflow_sizing.py` with 50% free-area ratio:

| Model | Airflow (m³/h) | Required Free Area (m²) | Required Face Area (m²) | Outlet Config |
|-------|----------------|------------------------|------------------------|---------------|
| APE-HC-S | 3,000 | 0.417 | 0.833 | 2 sides × 400×1050 mm |
| APE-HC-M | 5,000 | 0.694 | 1.389 | 2 sides × 500×1400 mm |
| APE-HC-L | 8,000 | 1.111 | 2.222 | 4 sides × 400×1400 mm |

### 4.4 Pressure Drop Budget

| Component | Target ΔP |
|-----------|-----------|
| Intake acoustic module | ≤15 Pa |
| Internal (equipment) | Equipment-dependent |
| Discharge hood | ≤25 Pa |
| **Total enclosure** | **≤40 Pa** |

---

## 5. Acoustic Design

### 5.1 Noise Reduction Mechanisms

| Mechanism | Implementation | Expected Reduction |
|-----------|----------------|-------------------|
| Baffling (line-of-sight blocking) | Hood + intake modules | 6–10 dB |
| Absorption (porous media) | 50mm mineral wool | 5–8 dB |
| Mass loading | Panel CLD, MLV | 3–5 dB |
| Vibration isolation | Anti-vib mounts | 3–5 dB (structure-borne) |
| **Combined** | | **15–25 dB** |

### 5.2 Discharge Hood Design

```
                 ┌─────────────────────────┐
                 │    Perforated Ceiling    │
                 │  ┌───────────────────┐  │
                 │  │   50mm Mineral    │  │
    ←── Air ─────┤  │      Wool         │  ├──── Air ──→
      (Outlet)   │  │                   │  │   (Outlet)
                 │  │   ┌───────────┐   │  │
                 │  │   │           │   │  │
                 │  │   │  Fan Area │   │  │
                 │  │   │     ↑     │   │  │
                 └──┴───┴─────┴─────┴───┴──┘
                         Open Frame
```

**Key Features:**
- Air enters from below (fan exhaust)
- Cannot exit straight up (ceiling blocks direct path)
- Exits sideways through acoustic louvers on 2–4 sides
- All internal surfaces lined with mineral wool behind perforated aluminum

### 5.3 Intake Module Design (Per Side)

```
     Outside           │    Inside
                       │
    ──────►  Weather   │   ┌─────────┐
             Louver    │   │ Mineral │
    ──────►            │   │  Wool   │
                       │   │ (50mm)  │
    ──────►  ┌────┐    │   └────┬────┘
             │    │────┼────────┘
    ──────►  │ B  │    │   (Air turns 90°)
             │ A  │    │
    ──────►  │ F  │    │   Equipment
             │ F  │    │   Intake
    ──────►  │ L  │    │      ↓
             │ E  │────┼───────────────►
    ──────►  │    │    │
             └────┘    │
    ──────►            │
                       │
    Module Depth: 100mm
```

**Key Features:**
- Weather louver (45°, 25mm spacing) on exterior face
- Vertical baffle forces 90° turn
- Baffle lined with mineral wool (25mm)
- No fine mesh — removable coarse screen (10mm) for cleaning

### 5.4 Panel Damping

**Constrained-Layer Damping (CLD):**
- Material: Butyl-based damping mat (2–3mm thick)
- Coverage: 60–80% of each large panel
- Application: Interior surface of all panels >300mm span
- Pattern: Strips or patches, avoiding airflow paths

**Mass-Loaded Vinyl (Optional):**
- Material: 1–2 lb/ft² MLV
- Application: Back of door panel, solid sections only
- NOT on louvers or airflow paths

---

## 6. Component Specifications

### 6.1 Structural

| Component | Material | Thickness | Finish |
|-----------|----------|-----------|--------|
| Frame | 5052-H32 Aluminum | 3.0 mm | Powder coat (2000hr salt spray) |
| Panels (sides, door) | 5052-H32 Aluminum | 2.0 mm | Powder coat |
| Hood structure | 5052-H32 Aluminum | 2.0 mm | Powder coat |
| Perforated liner | 5052-H32 Aluminum | 1.0 mm | Mill finish or powder coat |
| Fasteners | 316 Stainless Steel | — | Passivated |

### 6.2 Acoustic Materials

| Material | Specification | Notes |
|----------|---------------|-------|
| Mineral wool | 50mm, 48 kg/m³ density | Rockwool or equivalent |
| Perforated aluminum | 23% open area, 3mm holes | Protects insulation |
| Butyl damping mat | 2mm thick, self-adhesive | Dynamat or equivalent |
| MLV (optional) | 1 lb/ft² (4.9 kg/m²) | Mass barrier |

### 6.3 Sealing & Hardware

| Component | Specification |
|-----------|---------------|
| Door gasket | EPDM, D-profile, continuous perimeter |
| Door latches | Compression draw latches, 316 SS, qty 3 |
| Hood latches | Toggle clamps, 316 SS, qty 4 |
| Anti-vibration mounts | Rubber-metal, M10, 50–100 kg capacity each |

---

## 7. Assembly Instructions

### 7.1 Base Enclosure Assembly

1. **Frame Assembly**
   - Bolt corner posts to base frame using 316 SS M8 bolts
   - Verify squareness (diagonal measurement ±2mm)

2. **Panel Installation**
   - Install back panel first (fixed)
   - Install side intake modules (bolted, removable)
   - Install door with hinges and compression latches
   - Apply CLD damping mat to interior of all panels

3. **Open Top Frame**
   - Install top frame (structural members only)
   - Top frame supports discharge hood weight
   - Include lifting eyes for hood removal

### 7.2 Intake Module Assembly

1. Apply 25mm mineral wool to vertical baffle
2. Cover with perforated aluminum liner
3. Install coarse debris screen (removable)
4. Attach weather louver to exterior
5. Seal edges with silicone or gasket

### 7.3 Discharge Hood Assembly

1. **Structure**
   - Assemble hood frame
   - Install ceiling panel (solid)

2. **Acoustic Lining**
   - Line all interior surfaces with 50mm mineral wool
   - Cover with perforated aluminum liner
   - Secure liner with rivets or screws

3. **Outlets**
   - Install acoustic louvers on designated sides
   - Verify free-area calculation matches design

4. **Mounting**
   - Hood sits on top frame
   - Secure with toggle clamps (4 minimum)
   - Ensure 20mm clearance from fan discharge

### 7.4 Equipment Installation

1. Place anti-vibration mounts on enclosure floor
2. Position heat pump on mounts
3. Level using mount adjustment
4. Connect pipework with flexible sections
5. Route electrical through sealed gland

---

## 8. Maintenance Instructions

### 8.1 Cleaning Schedule

| Task | Frequency | Method |
|------|-----------|--------|
| Debris screen check | Monthly | Visual, remove debris |
| Weather louver cleaning | Quarterly | Hose down, brush if needed |
| Intake module inspection | Quarterly | Check for blockage, animal nests |
| Hood outlet inspection | Quarterly | Check louvers for debris |
| Acoustic lining inspection | Annually | Check for moisture damage |

### 8.2 Access Procedures

**Door Access (Daily Service):**
- Release 3 compression latches
- Swing door open (180°)
- Access: filter, controls, front of unit

**Hood Removal (Major Service):**
- Release 4 toggle clamps
- Lift hood vertically (2-person lift, ~25–40 kg)
- Access: fan, top of unit, crane lift

**Side Panel Removal (Deep Service):**
- Remove intake module bolts (8× M6)
- Pull module outward
- Access: sides of equipment, coils

### 8.3 Drainage

- Enclosure floor has 1° slope toward drain corner
- 25mm drain hole with removable plug
- Check drain quarterly for blockage
- Route condensate away from foundation

---

## 9. Installation Warnings

### ⚠️ DO NOT BLOCK AIRFLOW

**Critical:** This enclosure is designed for maximum noise reduction with ZERO airflow restriction. The following will cause equipment damage and void warranty:

- ❌ Adding solid panels to the open top frame
- ❌ Blocking discharge hood outlets
- ❌ Installing fine mesh screens without approval
- ❌ Covering more than 10% of intake louver area
- ❌ Placing objects on top of hood
- ❌ Operating without discharge hood (exposes mineral wool to weather)

### ⚠️ CLEARANCES

| Surface | Minimum Clearance | Notes |
|---------|-------------------|-------|
| Back | 300 mm | From wall |
| Sides | 200 mm | From obstructions |
| Front | 1000 mm | Service access |
| Top | Unlimited | Hood vents to open air |

### ⚠️ ELECTRICAL

- All electrical must be installed by licensed electrician
- Use weatherproof cable glands (IP66)
- Equipment disconnect must be accessible without opening enclosure

---

## 10. Acceptance Testing

### 10.1 Airflow Verification

**Test:** Measure air temperature rise at intake

| Condition | Acceptable Rise |
|-----------|-----------------|
| Equipment running at 50% | ≤3°C above ambient |
| Equipment running at 100% | ≤5°C above ambient |

**If exceeded:** Inspect for blockage, verify outlet areas, check hood installation.

### 10.2 Acoustic Performance

**Test:** Measure SPL at 1m from enclosure, A-weighted

| Reference | Measurement Point |
|-----------|-------------------|
| Baseline | 1m from bare equipment (no enclosure) |
| With enclosure | 1m from enclosure front |
| With enclosure | 1m from nearest neighbor property line |

**Target:** ≥15 dB reduction from baseline

### 10.3 Visual Inspection Checklist

- [ ] All panels secure, no rattles
- [ ] Door closes flush, latches engage
- [ ] Hood seated properly, clamps tight
- [ ] No gaps in acoustic lining
- [ ] Drain clear
- [ ] Anti-vibration mounts compressed evenly
- [ ] No direct line-of-sight through hood outlets to fan

---

## 11. Parameter Summary Table

| Parameter | S | M | L | Units |
|-----------|---|---|---|-------|
| Internal Width | 900 | 1100 | 1400 | mm |
| Internal Depth | 550 | 650 | 750 | mm |
| Internal Height | 1000 | 1000 | 1100 | mm |
| External Width | 1100 | 1300 | 1600 | mm |
| External Depth | 750 | 850 | 950 | mm |
| External Height (with hood) | 1400 | 1400 | 1500 | mm |
| Design Airflow | 3000 | 5000 | 8000 | m³/h |
| Required Free Area | 0.42 | 0.69 | 1.11 | m² |
| Hood Internal Height | 300 | 300 | 350 | mm |
| Intake Module Depth | 100 | 100 | 100 | mm |
| Insulation Thickness | 50 | 50 | 50 | mm |
| Equipment Capacity | 12 | 20 | 35 | kW |
| Estimated Weight (empty) | 85 | 110 | 145 | kg |
| Hood Weight | 25 | 32 | 40 | kg |

---

## 12. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-08 | Initial weather louver design |
| 2.0 | 2026-01-08 | Acoustic V2: Open frame + discharge hood + baffled intakes |

---

*Document: APE-HC-Acoustic-V2.md*
*Generated: 2026-01-08*
