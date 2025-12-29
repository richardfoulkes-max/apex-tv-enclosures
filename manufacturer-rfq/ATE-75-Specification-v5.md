# ATE-75 Outdoor TV Enclosure - Manufacturing Specification v5.0

## Design Change Summary (v4 → v5)
| Change | v4.0 | v5.0 | Reason |
|--------|------|------|--------|
| Depth | 150mm | **180mm** | Space for proper plenum + service |
| Rear plenum | 30mm | **50mm** | Reduce ΔP, eliminate dead zones |
| Fans | 2× 120mm (80-100 CFM) | **2× 140mm** (140-160 CFM) | Thermal margin at 55°C + solar |
| Filter | Optional | **Standard** (MERV 8) | Prevent clog-induced failures |
| Glass retention | 8× M6 clips | **Continuous channel** | Even compression, no point loads |
| Service access | Remove glass | **Hinged service door** | Fan/PSU access without glass removal |
| VESA mount | Adhesive + rivets | **Through-bolted** | Validated load path |

---

## Product Overview
Weather-resistant enclosure for 75" commercial displays. **Ducted rear-plenum thermal design** with **hinged service access**. Validated for 55°C ambient + solar load. Recess-mountable.

---

## External Dimensions
| Dimension | Value |
|-----------|-------|
| Width | 1760 mm |
| Height | 1040 mm |
| Depth | **180 mm** |
| Weight | ~35 kg (enclosure only) |

---

## Construction

### Materials
| Component | Material | Thickness |
|-----------|----------|-----------|
| Body panels | 5052-H32 Aluminum | 3 mm |
| VESA reinforcement | 5052-H32 Aluminum | 6 mm |
| Internal stiffeners | 5052-H32 Aluminum | 2 mm |
| Front glass | Laminated tempered | 8 mm (4+4) |
| Gaskets | EPDM (UV-stable, 70A) | 5 mm |
| Glass retainer | Aluminum U-channel | 3 mm |

### Frame Construction
- Bezel width: 35mm all sides
- Corners: CNC brake bent with internal corner gussets
- Vertical stiffeners: 2× hat-channels connecting ribs to VESA plate
- Finish: Marine-grade powder coat, 60-80μm, chromate pre-treatment
- Joints: Structural adhesive (2-part acrylic, Tg >80°C) + rivets

---

## Thermal Design (v5.0 High-Capacity Ducted)

### Concept
Air enters front bottom → filter → internal baffle routes to rear → 50mm plenum → air rises across TV back → exits top via 2× 140mm fans.

```
CROSS-SECTION VIEW (side):

         ┌─ TOP EXHAUST (3 positions) ──┐
         │  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  │
         │                              │
         ├──────────────────────────────┤ ← Fan mounting plate (3× 140mm)
         │                              │
         │  ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑  │ ← Hot air rising
    ┌────┤       TV BACK                │
    │    │       (hot side)             │
    │ G  │                              │
    │ L  │  ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑  │ ← Air flows UP across heat sinks
    │ A  ├──────────────────────────────┤
    │ S  │                              │
    │ S  │   REAR PLENUM (50mm)         │ ← Generous air channel
    │    │                              │
    └────┤  ← ← ← ← ← ← ← ← ← ← ← ← ←  │ ← Baffle directs air back
         │                              │
         │  FILTER (MERV 8) ════════    │ ← Standard, tool-less drawer
         │         ↓                    │
         └─ BOTTOM INTAKE (louvered) ───┘

         ◄── FRONT              BACK ──►

TOP VIEW (fan layout):

    ┌─────────────────────────────────────────┐
    │  ┌─────┐      ┌─────┐      ┌─────┐     │
    │  │ FAN │      │BLANK│      │ FAN │     │
    │  │  L  │      │PLATE│      │  R  │     │
    │  └─────┘      └─────┘      └─────┘     │
    │    ←───400mm───→←───400mm───→          │
    └─────────────────────────────────────────┘

    Standard: 2× active fans (L + R), center blanking plate
    Upgrade:  3× active fans (L + C + R) for ~200+ CFM
```

### Depth Allocation (180mm total)
| Zone | Depth | Purpose |
|------|-------|---------|
| Glass + air gap | 35mm | Glass (8mm) + front clearance (27mm) |
| TV mounting zone | 90mm | TV depth + VESA bracket + wiring |
| Rear plenum | **50mm** | High-flow air channel behind TV |
| Back panel + standoff | 5mm | 3mm panel + air guides |

### Airflow Specifications
| Parameter | Value |
|-----------|-------|
| Target airflow | **140-160 CFM** (system level) |
| Design delta-T | 10K above ambient |
| Max operating ambient | **55°C** (with solar load) |
| Max internal temp | 65°C (TV inlet air) |
| Worst-case heat load | 550W (300W TV + 250W solar gain) |

### Fan Specifications
| Spec | Value |
|------|-------|
| Quantity | **2× installed** (3rd position available) |
| Size | **140mm × 25mm** |
| Type | IP55-rated, ball bearing, PWM, EC motor |
| Airflow | **70-80 CFM each** (free air) |
| Static pressure | **3-4 mmH₂O** (high-static design) |
| Noise | ≤38 dBA at full speed |
| Control | PWM via thermal controller |
| Suggested models | Delta AFB1412SH, Noctua NF-A14 iPPC-3000 IP67 |

### Third Fan Provision (Future-Proofing)
| Spec | Value |
|------|-------|
| Purpose | Redundancy / high-ambient upgrade path |
| Location | Center position in top exhaust assembly |
| Default | Blanking plate (sealed, powder-coated aluminum) |
| Mounting | Same 4-screw pattern as active fans |
| Wiring | Pre-routed PWM cable with capped connector |
| Upgrade | Field-installable without disassembly |

**Rationale:** Provides production de-risk option if thermal margin proves insufficient in field conditions. Allows upgrade to 3-fan configuration (~200+ CFM) without chassis retooling.

### Thermal Control Logic
| Temp (internal) | Action |
|-----------------|--------|
| <40°C | Fans off or 20% PWM |
| 40-50°C | Fans 20-60% PWM |
| 50-60°C | Fans 60-100% PWM |
| 60°C | Alert signal (smart controller) |
| 65°C | TV black-screen command (CEC) |
| 70°C | Latching shutdown, manual reset |

### End-of-Life Margin
- Fan derate assumption: 30% CFM loss at year 5
- Filter clog assumption: 50% ΔP increase at 3-month service
- Design margin: **≥20% airflow headroom** at worst-case + EoL

---

## Ventilation Slots

### Bottom Intake Assembly
| Spec | Value |
|------|-------|
| Slot width | 1650 mm |
| Slot height | **30 mm** |
| Open area | 49,500 mm² gross |
| Protection | 45° rain louvers + hydrophobic mesh |
| Filter | **MERV 8 standard** (tool-less drawer) |
| Filter ΔP | ≤20 Pa clean, ≤40 Pa @ 50% clog |

### Top Exhaust Assembly
| Spec | Value |
|------|-------|
| Slot width | 1650 mm |
| Slot height | **35 mm** |
| Open area | 57,750 mm² gross |
| Protection | 45° rain louvers (angled up) |
| Fan positions | **3× 140mm** (2 active + 1 blanking plate) |
| Fan layout | Left, Center (blank), Right |
| Fan spacing | 400mm between positions |

### Louver Design
- Angle: 45° (down for intake, up for exhaust)
- Blade overlap: 12mm
- Material: Integral aluminum
- Drainage: Channels route to side weep system
- Labyrinth depth: 25mm (extended hood)

---

## Service Access System (NEW in v5.0)

### Hinged Service Door
Located in **bottom bezel** area, below the glass panel.

| Spec | Value |
|------|-------|
| Door size | 1650mm × 80mm |
| Location | Bottom front bezel |
| Hinge | Piano hinge (stainless steel) |
| Retention | 4× quarter-turn latches (tool-less) |
| Seal | EPDM gasket, compression fit |
| Access to | Filter drawer, fan wiring, PSU bay |

### Service Procedure (Fan Replacement)
1. Open 4× quarter-turn latches on service door
2. Swing door down (piano hinge)
3. Slide out filter drawer
4. Disconnect fan cable (quick-connect)
5. Remove 4× fan mounting screws
6. Replace fan, reverse steps
7. **Time target: <20 minutes, single technician, no glass removal**

### Filter Access
- Slide-out drawer from service door opening
- Filter size: 1600 × 60 × 25mm
- Replacement interval: 3-6 months (environment dependent)
- Tool-less removal

---

## Glass Panel & Retention (v5.0 Continuous Channel)

### Glass Specifications
| Spec | Value |
|------|-------|
| Width | 1680 mm |
| Height | 960 mm |
| Thickness | **8 mm** (4mm tempered + PVB + 4mm tempered) |
| Type | Heat-strengthened laminated safety glass |
| Coating | Anti-reflective (standard), low-E optional |
| Impact rating | 10 J safe-break with retention |

### Retention System (Continuous Channel)
| Spec | Value |
|------|-------|
| Type | Aluminum U-channel, full perimeter |
| Channel size | 15mm wide × 12mm deep |
| Material | 3mm 5052-H32 aluminum |
| Gasket | EPDM (70A), continuous strip |
| Compression | 25-35% uniform |
| Thermal float | ±3mm allowed |
| Fastening | Channel screwed to bezel frame (M5 × 12, every 200mm) |

### Glass Installation
1. EPDM gasket seated in channel groove
2. Glass positioned with setting blocks (EPDM, 100mm from corners)
3. Channel frame assembled around glass
4. Frame secured to bezel with M5 screws
5. Gasket compression verified (25-35%)

### Glass Removal (for TV service)
1. Remove M5 screws around perimeter (qty: ~40)
2. Lift channel frame with glass as unit (two-person, suction cups)
3. Set aside on padded surface
4. Reverse for reinstallation

---

## Structural Design (v5.0 Enhanced)

### VESA Mount (Through-Bolted)
| Spec | Value |
|------|-------|
| Pattern | 600 × 400 mm (VESA MIS-F) |
| Hole size | M8 |
| Reinforcement plate | **6mm** aluminum, 750 × 550mm |
| Attachment | **Through-bolted** (M6 × 12) to back panel |
| Backing washers | 25mm OD fender washers |
| Load rating | 75 kg (with 3× safety factor) |

### Internal Stiffening
| Component | Specification |
|-----------|---------------|
| Horizontal ribs | 2× pressed ribs in back panel |
| Vertical stiffeners | 2× hat-channels (30 × 30 × 2mm) |
| Stiffener attachment | Riveted to ribs + through-bolted to VESA plate |
| Corner gussets | 4× internal (60 × 60 × 3mm angle) |

### Deflection Limits
| Load Case | Limit |
|-----------|-------|
| Wind load (1.2 kPa) | Back panel: <L/200 (8.8mm) |
| Wind load (1.2 kPa) | Glass: <L/200 (8.4mm) |
| Static (self-weight) | <2mm permanent set |

---

## Weather Protection

### Target Rating: IP54
- IP5X: Dust protected (limited ingress, no harmful deposits)
- IPX4: Splash resistant from all directions

### Sealing Strategy
| Location | Method |
|----------|--------|
| Glass channel | Continuous EPDM gasket, uniform compression |
| Service door | EPDM gasket + quarter-turn latches |
| Vent louvers | 45° angle + 25mm labyrinth hood + hydrophobic mesh |
| Cable entries | 2× IP68 cable glands (PG21) |
| Panel joints | Structural adhesive + mechanical fasteners |

### Drainage System
| Feature | Specification |
|---------|---------------|
| Wet zone | Intake plenum (isolated from TV cavity) |
| Dry zone | TV cavity + electronics |
| Overflow weirs | Between wet/dry zones, 15mm height |
| Drain channels | Side channels, 10mm wide, route to drip edges |
| Drain capacity | 2 L/min transient |
| Insect screens | Stainless mesh at drain outlets |
| Pressure vent | Gore-Tex breather vent on back panel |

### Condensation Management
| Feature | Specification |
|---------|---------------|
| Anti-fog heater | 15W strip at glass bottom edge |
| Heater control | Humidity sensor, activates >80% RH |
| Weep drainage | Condensate routes to side drains |

---

## Electrical

### Power Supply
| Spec | Value |
|------|-------|
| Location | Segregated bay (accessed via service door) |
| Input | 100-240V AC, IEC C14 inlet |
| Output | 12V DC, 5A (60W capacity) |
| Rating | IP20 internal (protected by enclosure) |
| Thermal rating | Operates to 70°C ambient |

### Thermal Controller
| Spec | Value |
|------|-------|
| Type | Digital, PWM output |
| Sensors | 2× NTC thermistors (TV exhaust + PSU area) |
| Outputs | 2× PWM fan channels, 1× heater relay, 1× alert |
| Optional | WiFi module for remote monitoring/alerts |
| Conformal coat | Required on PCB |

### Surge Protection
| Protection | Spec |
|------------|------|
| AC input | MOV (275V) + TVS |
| 12V DC | TVS diode array |
| Ground bonding | All panels bonded, <0.1Ω continuity |

### Cable Entries
| Spec | Value |
|------|-------|
| Quantity | 2× |
| Type | IP68 cable glands (PG21) |
| Location | Bottom of back panel, ±300mm from center |
| Drip loop | Required (min 50mm sag) |

---

## Manufacturability

### Construction Sequence
1. Laser cut flat patterns (body, VESA plate, stiffeners)
2. CNC brake bend body panels
3. Install pressed ribs in back panel
4. Rivet corner gussets
5. Assemble body with structural adhesive + rivets
6. Through-bolt VESA plate and vertical stiffeners
7. Install service door with piano hinge
8. Install louver assemblies
9. Pre-treatment and powder coat
10. Install gaskets, glands, electrical
11. Final assembly: glass channel, filter, QC

### Tolerances
| Feature | Tolerance |
|---------|-----------|
| Overall dimensions | ±2mm |
| Glass opening | ±1mm |
| VESA pattern | ±0.5mm |
| Gasket groove | ±0.3mm |
| Service door fit | ±1mm |

### Adhesive Specification
| Property | Requirement |
|----------|-------------|
| Type | 2-part structural acrylic or epoxy |
| Shear strength | >15 MPa |
| Glass transition (Tg) | >80°C |
| Cure time | Per manufacturer spec |
| QA test | Destructive pull test on 5% of joints |

### Finish Specification
| Property | Requirement |
|----------|-------------|
| Pre-treatment | Chromate or zirconium conversion |
| Powder type | Polyester, UV-stable |
| Thickness | 60-80μm |
| Color | RAL 7016 (Anthracite Grey) standard |
| Salt spray | 500 hours minimum (ASTM B117) |
| Edge coverage | Inspect and touch-up all cut edges |

---

## Final Dimensions Summary

| Feature | Dimension |
|---------|-----------|
| External | 1760 × 1040 × **180 mm** |
| Weight | ~35 kg |
| Glass opening | 1684 × 964 mm |
| Glass panel | 1680 × 960 × 8 mm |
| Bezel width | 35 mm |
| Wall thickness | 3 mm (6mm at VESA) |
| Intake slot | 1650 × 30 mm |
| Exhaust slot | 1650 × 35 mm |
| Fans | **2× 140mm** |
| Target airflow | **140-160 CFM** |
| Rear plenum | **50 mm** depth |
| VESA pattern | 600 × 400 mm (M8) |
| Service door | 1650 × 80 mm |

---

## Validation Test Requirements

### Pre-Production Validation
| Test | Requirement |
|------|-------------|
| Thermal chamber | 55°C ambient + 800 W/m² solar, 350W load, 50% clogged filter |
| Pass criteria | TV inlet ≤65°C, PSU ≤75°C, 20% fan margin remaining |
| IP54 verification | IEC 60529 IP5X dust, IPX4 splash |
| Structural | 1.2 kPa wind load, VESA 75kg × 3× SF, 10k thermal cycles |
| Impact | 2J and 10J pendulum per EN 12600 |
| Salt spray | ASTM B117, 500 hours |
| Service time trial | Fan replacement <20 min, single technician |

---

## Revision History
| Version | Date | Changes |
|---------|------|---------|
| v3.0 | 2024-12 | Initial front-breathing design |
| v4.0 | 2024-12 | Ducted rear plenum, 150mm depth, 2×120mm fans |
| v5.0 | 2024-12 | 180mm depth, 50mm plenum, 2×140mm fans, hinged service door, continuous glass channel, through-bolted VESA |
| v5.1 | 2024-12 | Added third fan provision (blanking plate) for production de-risk |

---

## Included Files
1. `ATE-75-Specification-v5.md` - This document
2. `ATE-75-Enclosure.scad` - OpenSCAD model (needs update for v5)
3. `engineering-brief-v4.txt` - Previous review submission

---

## Contact
Apex Enclosures
Request for Quotation - ATE-75 Series v5.0

---

*Please provide quotation for:*
- [ ] Unit pricing (1, 10, 50, 100 units)
- [ ] Tooling costs if applicable
- [ ] Lead time
- [ ] MOQ
- [ ] Prototype cost and timeline
- [ ] Thermal testing capability
