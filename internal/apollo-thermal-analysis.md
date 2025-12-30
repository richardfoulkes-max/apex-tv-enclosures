# Apollo DS7570 Competitive Thermal Analysis
**INTERNAL - DO NOT PUBLISH**

Date: 29 December 2025

## Apollo 75" Recess Specifications (from their PDF)

| Parameter | Apollo DS7570 |
|-----------|---------------|
| Enclosure depth | 147mm |
| Cavity depth required | 220mm minimum |
| Cavity W × H | 1816 × 1099 mm |
| Side/top/bottom gap | 30mm each |
| Mount required | Vogels TVM 5855 (articulating) |

Source: "Recessing an enclosure rev 4.pdf"

---

## Thermal Analysis (Applying Roundtable AI Criteria)

### Apollo Internal Dimensions (Estimated)
- Enclosure depth: 147mm
- TV depth (typical 75"): ~80mm
- Mount + clearance: ~40mm
- **Available plenum:** ~27mm

### In 220mm Recess
- Behind enclosure: 73mm
- Mount bracket: ~40mm
- **Actual rear clearance:** ~33mm

---

## Heat Load Calculation (Gulf Worst-Case)

| Component | Heat (W) |
|-----------|----------|
| TV power consumption | 300W |
| Solar gain (800 W/m² × 0.5m² × 0.6) | 250W |
| **Total** | **550W** |

### Required Airflow
- At 55°C ambient + solar: **116+ CFM minimum**
- At 45°C typical summer: ~90 CFM adequate

### Apollo's Estimated Airflow
- 27mm plenum limits fan size to 40-60mm slim units
- Typical 60mm fans: 15-25 CFM each
- With 4× fans: **60-100 CFM maximum**
- In recess (30mm gap restriction): **~40-70 CFM effective**

---

## Recess Airflow Path Problem

```
Air in → 30mm bottom gap → 90° turn up → through enclosure → 90° turn → 30mm top gap → out
```

Each 90° turn loses ~30% flow efficiency.
Net effective flow: ~50-60% of rated CFM.

---

## Roundtable AI Verdict (If Apollo Were Reviewed)

| Criterion | Apex v5.1 | Apollo DS7570 (Recess) | Assessment |
|-----------|-----------|------------------------|------------|
| Plenum depth | 50mm | ~27mm | **FAIL** |
| Airflow capacity | 140-160 CFM | ~60-100 CFM | **MARGINAL** |
| Effective CFM in recess | N/A | ~40-70 CFM | **FAIL** at worst-case |
| Heat sink access | Direct rear flow | Limited | **MARGINAL** |
| Service access | Hinged door | Pull-out arm | OK |

### Scenario Verdicts

| Scenario | Apollo | Apex v5.1 |
|----------|--------|-----------|
| Wall mount, temperate | PASS | PASS |
| Wall mount, Gulf summer | MARGINAL | PASS |
| Recess, Gulf summer | **LIKELY FAIL** | Not recommended |
| Recess, worst-case (55°C + solar) | **FAIL** | Not supported |

---

## Why Apollo Gets Away With It

1. Most installations NOT worst-case (not full sun, not 55°C)
2. Primary markets: US, Australia (cooler than Gulf)
3. TVs throttle before dying (brightness reduction)
4. 1-year warranty limits exposure

## Apex Competitive Advantage

- Designed for Gulf worst-case from start
- 50mm plenum vs ~27mm
- 140-160 CFM vs ~80 CFM
- Honest positioning: "Not suitable for full recess"
- 2-year warranty (we can back it because margins are real)

---

## Apex v5.1 Recess Specs (If We Offered It)

| Parameter | Apex ATE-75 |
|-----------|-------------|
| Enclosure depth | 180mm |
| Cavity depth required | ~255mm minimum |
| Cavity W × H | 1820 × 1100 mm |
| Gaps required | 30mm each side |

**Note:** Not recommended due to rear plenum airflow restriction. Wall-mount with 50mm rear clearance preferred.
