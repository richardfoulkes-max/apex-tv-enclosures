# ATE-75 Outdoor TV Enclosure - Manufacturing Specification v4.0

## Design Change Summary (v3 → v4)
| Change | v3.0 | v4.0 | Reason |
|--------|------|------|--------|
| Airflow | Front-breathing (glass gap) | Front-ducted (TV back) | v3 cooled glass, not TV |
| Depth | 120mm | 150mm | Space for ducting plenum |
| Fans | 4× 60mm | 2× 120mm | More CFM, less noise |
| Back panel | 3mm flat | 3mm + 5mm VESA plate | Structural reinforcement |
| Intake | Open slot | Louvered + mesh | Rain/dust protection |

---

## Product Overview
Weather-resistant enclosure for 75" commercial displays. **Front-ducted thermal design** routes intake air across TV back for effective heat removal. Recess-mountable.

---

## External Dimensions
| Dimension | Value |
|-----------|-------|
| Width | 1760 mm |
| Height | 1040 mm |
| Depth | **150 mm** (increased from 120mm) |
| Weight | ~30 kg (enclosure only) |

---

## Construction

### Materials
| Component | Material | Thickness |
|-----------|----------|-----------|
| Body panels | 5052-H32 Aluminum | 3 mm |
| VESA reinforcement | 5052-H32 Aluminum | 5 mm |
| Front glass | Tempered, laminated | 6 mm |
| Gaskets | EPDM (UV-stable) | 4 mm |

### Frame Construction
- Bezel width: 35mm all sides
- Corners: Bent with internal corner gussets (not welded where possible)
- Finish: Powder-coated, 60-80μm, marine-grade primer

---

## Thermal Design (v4.0 Ducted Airflow)

### Concept
Air enters front bottom → internal baffle routes to rear plenum → air rises across TV back → exits top via fans.

```
CROSS-SECTION VIEW (side):

         ┌─ TOP EXHAUST (fans) ─┐
         │  ▲    ▲    ▲    ▲   │
         │  │    │    │    │   │
         ├──┴────┴────┴────┴───┤ ← Fan mounting plate
         │                     │
         │  ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑  │ ← Hot air rising
    ┌────┤                     │
    │    │      TV BACK        │ ← Heat sinks here
    │ G  │      (hot side)     │
    │ L  │                     │
    │ A  │  ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑  │ ← Air flows UP
    │ S  ├─────────────────────┤
    │ S  │   REAR PLENUM       │ ← 30mm gap behind TV
    │    │   (air channel)     │
    └────┤  ← ← ← ← ← ← ← ←   │ ← Baffle directs air back
         │                     │
         │  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  │
         └─ BOTTOM INTAKE ─────┘
              (louvered)

         ◄── FRONT    BACK ──►
              (wall/recess)
```

### Airflow Path
1. **Intake**: Cool air enters via front bottom louvered slot
2. **Baffle**: Internal baffle (bottom) redirects air to rear plenum
3. **Plenum**: 30mm channel between TV back and enclosure back panel
4. **Rise**: Air rises naturally (convection) + fan assist across TV heat sinks
5. **Exhaust**: Hot air exits via top slot with 2× 120mm fans

### Airflow Specifications
| Parameter | Value |
|-----------|-------|
| Target airflow | 80-100 CFM |
| Design delta-T | 10-15K above ambient |
| Max operating ambient | 45°C |
| Max internal temp | 60°C |

### Fan Specifications
| Spec | Value |
|------|-------|
| Quantity | 2× |
| Size | 120mm × 25mm |
| Type | IP55-rated, ball bearing, PWM |
| Airflow | 50-60 CFM each (free air) |
| Static pressure | 2-3 mmH₂O |
| Noise | ≤35 dBA at full speed |
| Control | Thermostat (on at 40°C, full at 50°C) |

**Suggested models**: Delta AFB1212SH, Noctua NF-F12 iPPC-3000 IP67

### Thermal Cutoff
- Primary: 55°C - fans to 100%
- Secondary: 65°C - alert signal (optional smart controller)
- Tertiary: 70°C - latching shutdown, manual reset required

---

## Ventilation Slots

### Bottom Intake Slot
| Spec | Value |
|------|-------|
| Width | 1650 mm |
| Height | 25 mm |
| Open area | 41,250 mm² gross |
| Protection | Rain louvers (45°) + hydrophobic mesh |
| Filter | MERV 5 slide-out filter tray (optional) |

### Top Exhaust Slot
| Spec | Value |
|------|-------|
| Width | 1650 mm |
| Height | 30 mm |
| Open area | 49,500 mm² gross |
| Protection | Rain louvers (45°) |
| Fans | 2× 120mm mounted behind slot |

### Louver Design
- Angled 45° downward (intake) / upward (exhaust)
- Overlap: 10mm between blades
- Material: Same as enclosure (aluminum)
- Drainage: Channels to side weep slots

---

## Internal Layout

### Depth Allocation (150mm total)
| Zone | Depth | Purpose |
|------|-------|---------|
| Glass + air gap | 35mm | Glass (6mm) + front clearance (29mm) |
| TV mounting zone | 80mm | TV depth + VESA bracket |
| Rear plenum | 30mm | Airflow channel behind TV |
| Back panel | 5mm | 3mm panel + 2mm standoff |

### Internal Baffle
- Location: Bottom of enclosure, behind intake slot
- Material: 2mm aluminum
- Function: Redirects intake air to rear plenum
- Size: Full width × 100mm tall × angled 45°

---

## Structural Design

### VESA Mount Reinforcement
| Spec | Value |
|------|-------|
| Pattern | 600 × 400 mm (VESA MIS-F) |
| Hole size | M8 |
| Reinforcement plate | 5mm aluminum, 700 × 500mm |
| Attachment | Bonded + riveted to back panel |
| Load rating | 60 kg (with 2× safety factor) |

### Corner Gussets
- 4× internal corner brackets (50 × 50 × 3mm aluminum angle)
- Riveted, not welded
- Prevents frame racking

### Back Panel
- 3mm 5052-H32 with formed stiffening ribs (2× horizontal)
- 5mm VESA reinforcement plate bonded to center

---

## Weather Protection

### Target Rating: IP54
(Adjusted from IP55 - realistic with ventilation slots)

### Sealing Strategy
| Location | Method |
|----------|--------|
| Glass panel | EPDM gasket, 20-40% compression |
| Vent slots | 45° louvers + hydrophobic mesh |
| Cable entries | IP68 cable glands (2× PG21) |
| Panel joints | Silicone sealant + mechanical fasteners |

### Drainage
- Side weep channels (not holes) at bottom corners
- Drain to external drip edge
- Internal baffles prevent direct water path to electronics

### UV Protection
- Powder coat: Marine-grade, UV-stable
- Glass: UV-filtering tempered laminate
- Gaskets: EPDM with UV stabilizers

---

## Glass Panel

| Spec | Value |
|------|-------|
| Width | 1686 mm |
| Height | 966 mm |
| Thickness | 6 mm (laminated: 3mm tempered + PVB + 3mm tempered) |
| Coating | Anti-reflective (optional) |
| Retention | Captured in bezel with EPDM gasket |
| Access | Removable for TV service (retained by screws, not friction) |

### Glass Retention
- 8× M6 stainless steel retainer clips around perimeter
- Gasket compression: 20-40%
- Allows thermal expansion (±2mm float)

---

## Cable Management

### Cable Entry Points
| Spec | Value |
|------|-------|
| Quantity | 2× |
| Type | IP68 cable glands (PG21) |
| Location | Bottom of back panel |
| Position | ±250mm from center |

### Internal Routing
- Cable clips to guide wiring away from fan zone
- Drip loop required before gland entry
- Segregated from airflow plenum

---

## Electrical

### Power Supply
| Spec | Value |
|------|-------|
| Location | External (preferred) or segregated internal bay |
| Input | 100-240V AC |
| Output | 12V DC, 3A (36W) |
| Rating | IP65 if external |

### Thermal Controller
- Input: NTC thermistor (mounted near TV exhaust)
- Output: PWM fan control
- Thresholds: 40°C start, 50°C full, 65°C alert, 70°C shutdown
- Optional: WiFi module for remote monitoring

### Surge Protection
- MOV + TVS on AC input
- TVS on 12V rail

---

## Serviceability

### Access Method
1. Remove 8× M6 glass retainer screws
2. Lift glass panel out (two-person job, suction cups)
3. Full access to TV, fans, wiring

### Service Intervals
| Component | Interval |
|-----------|----------|
| Filter (if installed) | 3 months |
| Fan inspection | 12 months |
| Gasket inspection | 24 months |

---

## Manufacturing Notes

### Preferred Methods
- Laser cut flat patterns
- CNC brake bending (not welding) for corners where possible
- Structural adhesive + rivets for joints
- Weld only where bending not feasible; grind and treat HAZ

### Tolerances
| Feature | Tolerance |
|---------|-----------|
| Overall dimensions | ±2mm |
| Glass opening | ±1mm |
| VESA pattern | ±0.5mm |
| Gasket groove depth | ±0.3mm |

### Finish Specification
- Pre-treatment: Chromate or zirconium conversion
- Powder coat: Polyester, 60-80μm
- Color: RAL 7016 (Anthracite Grey) standard
- Salt spray: 500 hours minimum (ASTM B117)

---

## Final Dimensions Summary

| Feature | Dimension |
|---------|-----------|
| External | 1760 × 1040 × 150 mm |
| Glass opening | 1690 × 970 mm |
| Glass panel | 1686 × 966 × 6 mm |
| Bezel width | 35 mm |
| Wall thickness | 3 mm (5mm at VESA) |
| Intake slot | 1650 × 25 mm |
| Exhaust slot | 1650 × 30 mm |
| Fans | 2× 120mm |
| VESA pattern | 600 × 400 mm (M8) |
| Rear plenum | 30 mm depth |
| Weight | ~30 kg |

---

## Included Files
1. `ATE-75-Specification-v4.md` - This document
2. `ATE-75-Enclosure.scad` - OpenSCAD model (needs update for v4)
3. `ATE-75-Enclosure.stl` - 3D mesh (needs update for v4)

---

## Revision History
| Version | Date | Changes |
|---------|------|---------|
| v3.0 | 2024-12 | Initial front-breathing design |
| v4.0 | 2024-12 | Ducted airflow, deeper enclosure, larger fans, VESA reinforcement |

---

## Contact
Apex Enclosures
Request for Quotation - ATE-75 Series v4.0

---

*Please provide quotation for:*
- [ ] Unit pricing (1, 10, 50, 100 units)
- [ ] Tooling costs if applicable
- [ ] Lead time
- [ ] MOQ
- [ ] Prototype cost and timeline
