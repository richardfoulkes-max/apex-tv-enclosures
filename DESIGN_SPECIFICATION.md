# Apex TV Enclosures - Design Specification for Manufacturing

## Document Purpose
This specification is for manufacturing outdoor TV enclosures designed for Gulf region climate conditions (UAE, Saudi Arabia, Qatar, Kuwait). Product must withstand extreme heat (50°C+), dust, humidity, and occasional rain.

---

## 1. Product Line Overview

### Size Variants Required
| Model | Fits TV Size | Internal Dimensions (W x H x D) | External Dimensions |
|-------|-------------|--------------------------------|---------------------|
| ATE-43 | 39" - 43" | 1000 x 600 x 100mm | 1080 x 680 x 150mm |
| ATE-55 | 49" - 55" | 1260 x 740 x 100mm | 1340 x 820 x 150mm |
| ATE-65 | 60" - 65" | 1480 x 860 x 100mm | 1560 x 940 x 150mm |
| ATE-75 | 70" - 75" | 1700 x 980 x 100mm | 1780 x 1060 x 150mm |
| ATE-86 | 82" - 86" | 1940 x 1120 x 120mm | 2020 x 1200 x 170mm |

*Note: Depth must accommodate TVs up to 80mm thick plus mounting hardware*

---

## 2. Enclosure Construction

### 2.1 Frame Material
- **Primary**: 6063-T5 Aluminum extrusion
- **Thickness**: 2.0mm minimum wall thickness
- **Finish**: Powder coated (see Section 6)
- **Alternative**: 1.5mm galvanized steel (budget option)

### 2.2 Back Panel
- **Material**: 1.5mm aluminum sheet OR 1.2mm galvanized steel
- **Finish**: Powder coated black (RAL 9005)
- **Features**:
  - Hinged access door (full width) with gas struts
  - OR removable panel with captive screws
  - Pre-punched fan mounting holes
  - Cable entry grommets (weatherproof)
  - VESA mounting plate integrated

### 2.3 Front Frame & Glass
- **Frame**: Aluminum with 15mm face width
- **Glass Specifications**:
  - Type: Tempered safety glass (toughened)
  - Thickness: 4mm
  - Treatment: Anti-reflective coating (AR coating both sides)
  - Alternative: Anti-glare etched finish
  - UV filtering: Optional UV-blocking layer
- **Seal**: EPDM rubber gasket, continuous seal

### 2.4 Weatherproofing
- **IP Rating Target**: IP55 minimum (dust protected, water jets)
- **Gaskets**: EPDM rubber, closed-cell foam backing
- **Cable Entry**: IP68 cable glands (M20 thread)
- **Drainage**: Weep holes at bottom corners (with mesh)

---

## 3. Thermal Management System

### 3.1 Cooling Requirements
**Critical**: Gulf region ambient temperatures reach 50°C (122°F). Internal temperature must stay below 45°C for TV longevity.

### 3.2 Fan Specification
| Parameter | Specification |
|-----------|--------------|
| Size | 80mm x 80mm x 25mm |
| Voltage | 12V DC |
| Current | 0.15A - 0.25A per fan |
| Airflow | 35-45 CFM per fan |
| Noise | <30 dB(A) |
| Bearing | Ball bearing (longer life in heat) |
| Connector | 2-pin or 3-pin JST |
| IP Rating | IP55 or higher |

**Reference Model**: FD8025B2H-AP00 or equivalent

### 3.3 Fan Quantity by Size
| Model | Intake Fans | Exhaust Fans | Total |
|-------|-------------|--------------|-------|
| ATE-43 | 2 | 1 | 3 |
| ATE-55 | 2 | 2 | 4 |
| ATE-65 | 3 | 2 | 5 |
| ATE-75 | 3 | 3 | 6 |
| ATE-86 | 4 | 3 | 7 |

### 3.4 Airflow Design
```
[INTAKE - Bottom/Sides] → [Internal Chamber] → [EXHAUST - Top]

- Intake: Filtered (removable mesh filter, dust-proof)
- Exhaust: Top-mounted, allows heat rise naturally
- Air path: Must flow across TV rear panel
```

### 3.5 Thermostat Control
- **Controller**: Digital thermostat with relay
- **Set Point**: Fans ON at 35°C, OFF at 28°C
- **Hysteresis**: 5°C to prevent cycling
- **Display**: Optional LED temperature display (external)
- **Override**: Manual ON switch

### 3.6 Intake Filter
- **Material**: Washable polyester mesh
- **Mesh Size**: 40-60 PPI (dust filtering)
- **Access**: Tool-free removal for cleaning
- **Frame**: Magnetic or clip-in

---

## 4. Electrical System

### 4.1 Power Input
- **Voltage**: 220-240V AC, 50Hz (Gulf standard)
- **Plug**: UK 3-pin (Type G) - UAE/Gulf standard
- **Entry**: Weatherproof cable gland
- **Fuse**: 3A fuse in-line

### 4.2 Internal Power Distribution
- **Power Strip**: 4-outlet minimum, surge protected
- **Fan Power**: 12V DC power supply (Mean Well or equivalent)
  - Input: 220V AC
  - Output: 12V DC, 2A minimum
  - Efficiency: >85%
- **Cable Management**: Velcro straps, cable clips

### 4.3 Electrical Components List
| Component | Quantity | Specification |
|-----------|----------|---------------|
| AC Power inlet | 1 | IEC C14 with fuse holder |
| Power strip | 1 | 4-way, surge protected |
| DC Power supply | 1 | 12V 2A, enclosed |
| Thermostat | 1 | W3230 or equivalent |
| Fan splitter | 1 | 4-way for DC fans |
| Cable glands | 3 | M20, IP68 |

---

## 5. Mounting System

### 5.1 VESA Compatibility
Internal VESA mounting plate must support:
- VESA 200x200, 300x300, 400x400, 600x400

### 5.2 Wall Mount Options
**Option A - Fixed Mount**
- Heavy-duty steel bracket
- 50mm wall standoff
- Load capacity: 80kg

**Option B - Articulating Mount**
- Full motion arm (sold separately)
- Tilt: +15° / -5°
- Swivel: ±45°

### 5.3 Enclosure Wall Mounting
- **Bracket Type**: French cleat system OR direct bolt
- **Wall Anchors**: Included for concrete/masonry
- **Load Rating**: Must support 2x enclosure weight

---

## 6. Finish & Aesthetics

### 6.1 Standard Colors
| Color | RAL Code | Name |
|-------|----------|------|
| Primary | RAL 9005 | Jet Black |
| Alternative | RAL 7016 | Anthracite Grey |
| Premium | RAL 9006 | White Aluminum |

### 6.2 Powder Coating Specification
- **Type**: Polyester powder coat
- **Thickness**: 60-80 microns
- **Finish**: Semi-gloss (30-50 gloss units)
- **Salt Spray Test**: 500 hours minimum
- **UV Resistance**: Excellent (outdoor grade)

### 6.3 Branding
- **Logo Position**: Bottom right corner of front frame
- **Method**: Laser etched OR vinyl decal
- **Size**: 80mm x 20mm maximum

---

## 7. Audio Consideration

### 7.1 Sound Ports
- **Location**: Bottom of enclosure
- **Design**: Louvered openings with mesh backing
- **Size**: 150mm x 30mm (2 ports)
- **Purpose**: Allow TV speaker audio to escape

---

## 8. Quality Requirements

### 8.1 Testing Requirements
| Test | Requirement |
|------|-------------|
| IP Rating | IP55 verified |
| Temperature | Operational -10°C to 60°C |
| Thermal | Internal temp <45°C at 50°C ambient |
| Load | Support 50kg TV + 30% safety margin |
| Salt Spray | 500 hours |
| UV Exposure | 1000 hours, no yellowing |

### 8.2 Certifications Required
- CE marking
- RoHS compliant
- FCC (for electronics)

---

## 9. Packaging & Shipping

### 9.1 Packaging Requirements
- Double-wall cardboard box
- Foam corner protectors
- Glass protection: Cardboard + foam frame
- Accessories box (hardware, manual)
- Weight per unit (packaged):
  - ATE-55: ~25kg
  - ATE-65: ~32kg
  - ATE-75: ~40kg

### 9.2 Shipping Configuration
- Palletized, 4-6 units per pallet
- Stackable: 2 layers maximum
- Container loading: 40ft container = ~200 units (55")

---

## 10. Bill of Materials (Per Unit - ATE-55)

| Item | Description | Qty | Est. Cost (USD) |
|------|-------------|-----|-----------------|
| Frame | Aluminum extrusion, powder coated | 1 set | $45 |
| Back Panel | 1.5mm aluminum, powder coated | 1 | $25 |
| Front Glass | 4mm tempered AR glass | 1 | $35 |
| Gaskets | EPDM rubber seal kit | 1 set | $8 |
| Fans | 80mm DC fans | 4 | $12 |
| DC PSU | 12V 2A power supply | 1 | $6 |
| Thermostat | Digital controller | 1 | $5 |
| Power Strip | 4-way surge protected | 1 | $8 |
| Cable Glands | IP68 M20 | 3 | $4 |
| Filter | Washable mesh filter | 1 | $3 |
| Hardware | Screws, brackets, clips | 1 set | $10 |
| VESA Mount | Universal mount plate | 1 | $15 |
| Packaging | Box, foam, manual | 1 set | $12 |
| **TOTAL** | | | **~$188** |

*Target FOB price: $200-250 per unit (55")*

---

## 11. Accessories (Separate SKUs)

1. **Articulating Wall Mount** - Full motion arm
2. **Ceiling Mount** - Adjustable height pole
3. **Remote Control Extender** - IR repeater kit
4. **Replacement Filter Pack** - 3x filters
5. **Outdoor Cover** - Protective cover for non-use

---

## 12. Contact for Manufacturing Inquiries

**Apex TV Enclosures**
Dubai, United Arab Emirates

*[Contact details to be added]*

---

## Appendix A: Reference Images

See attached photos showing:
1. Back panel with fan layout
2. Fan mounting detail (80mm fans)
3. Internal wiring configuration
4. Cable management setup
5. Fan specifications (FD8025B2H-AP00)

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-23 | Initial specification |
