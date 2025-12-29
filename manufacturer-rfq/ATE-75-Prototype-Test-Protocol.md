# ATE-75 Prototype Test Protocol

## Document Purpose
This protocol defines the minimum validation testing required before production release of the ATE-75 outdoor TV enclosure. Tests are designed to prove margin in the three critical domains identified during engineering review: **thermal performance**, **weather protection**, and **acoustic compliance**.

---

## Test Equipment Required

### Thermal Testing
| Equipment | Specification |
|-----------|---------------|
| Environmental chamber | 0-70°C range, ±1°C accuracy |
| Solar simulator | 800-1000 W/m² output, adjustable |
| Thermal load (TV simulator) | 300-350W resistive heater panel, sized to TV footprint |
| Temperature sensors | 8× K-type thermocouples, ±0.5°C |
| Data logger | 8+ channels, 1 Hz sample rate minimum |
| Anemometer | Hot-wire type, 0-10 m/s range |
| Filter clog simulator | Calibrated restriction plates (25%, 50%, 75% blockage) |

### Weather Testing
| Equipment | Specification |
|-----------|---------------|
| Water spray apparatus | IPX4 oscillating spray head per IEC 60529 |
| Wind source | Industrial fan capable of 20+ mph directed flow |
| Water flow meter | 0-15 L/min range |
| Humidity sensor | 0-100% RH, ±3% accuracy |
| Moisture detection | UV dye + blacklight, paper indicators |

### Acoustic Testing
| Equipment | Specification |
|-----------|---------------|
| Sound level meter | Class 2 minimum, A-weighting |
| Spectrum analyzer | 1/3 octave bands, 20 Hz - 20 kHz |
| Anechoic or hemi-anechoic space | Or outdoor with <25 dBA background |
| PWM controller | Variable duty cycle 0-100% |

### Structural Testing
| Equipment | Specification |
|-----------|---------------|
| Pendulum impactor | EN 12600 compliant, 2J and 10J capability |
| Deflection gauges | Dial indicators, 0.01mm resolution |
| Load weights | Calibrated, 10-100 kg range |
| Torque wrench | 0-25 Nm range |

---

## Sensor Placement Diagram

```
SIDE VIEW (sensor positions):

         ┌─────────────────────────────┐
         │  T1 ▲   T2 ▲   T3 ▲        │ ← T1-T3: Exhaust air (3 positions)
         ├─────────────────────────────┤
         │                             │
         │       T4 ●                  │ ← T4: TV back center (hottest point)
         │                             │
         │  T5 ●              T6 ●     │ ← T5: TV PSU area, T6: TV top edge
         ├─────────────────────────────┤
         │       T7 ●                  │ ← T7: Rear plenum center
         │                             │
         │       T8 ▼                  │ ← T8: Intake air (post-filter)
         └─────────────────────────────┘

SENSOR KEY:
T1-T3: Exhaust air temperature (average = exhaust temp)
T4: TV back surface center
T5: TV PSU area (typically lower-left of TV back)
T6: TV top edge (heat accumulation zone)
T7: Plenum air mid-height
T8: Intake air after filter

ADDITIONAL:
A1: Ambient temperature (1m from unit)
A2: Ambient humidity
V1: Airflow velocity at exhaust slot center
```

---

## TEST 1: Thermal Worst-Case

### Objective
Prove ≥20% airflow margin under worst-case operating conditions.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Ambient temperature | 55°C |
| Solar load | 800 W/m² on glass surface |
| Internal heat load | 350W (TV simulator) |
| Filter condition | 50% clogged (use restriction plate) |
| Installation | Recessed cavity (50mm clearance top/sides) |
| Fan configuration | 2× 140mm at 100% duty |
| Duration | 6 hours steady-state |

### Procedure
1. Install unit in recessed test cavity (simulates wall recess)
2. Attach thermal load panel to VESA mount inside enclosure
3. Position solar simulator at 45° angle to glass surface
4. Install 50% restriction plate in filter drawer slot
5. Place thermocouples per sensor diagram
6. Stabilize chamber at 55°C (allow 2 hours)
7. Activate solar simulator and thermal load
8. Run fans at 100% duty
9. Log temperatures every 60 seconds for 6 hours
10. Record airflow velocity at exhaust at T=1h, 3h, 6h

### Pass/Fail Criteria
| Measurement | Pass | Fail |
|-------------|------|------|
| T8 (intake air) | ≤60°C | >60°C |
| T4 (TV back center) | ≤70°C | >70°C |
| T5 (TV PSU area) | ≤75°C | >75°C |
| T6 (TV top edge) | ≤75°C | >75°C |
| Exhaust velocity | ≥2.5 m/s | <2.5 m/s |
| Fan duty headroom | ≥15% below max | <15% headroom |

### Margin Calculation
```
Thermal Margin = (T_limit - T_measured) / (T_limit - T_ambient) × 100%

Example: If T5 = 68°C at 55°C ambient (limit 75°C):
Margin = (75 - 68) / (75 - 55) × 100% = 35% ✓

Target: ≥20% margin on all critical sensors
```

---

## TEST 2: Single Fan Failure

### Objective
Verify graceful degradation and safe shutdown when one fan fails.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Ambient temperature | 45°C |
| Internal heat load | 300W |
| Filter condition | Clean |
| Initial fan state | 2× fans at auto-control |
| Test action | Disconnect one fan at T=30 min |

### Procedure
1. Run TEST 1 setup at 45°C ambient (moderate conditions)
2. Allow system to reach steady-state (1 hour)
3. Disconnect one fan (simulate failure)
4. Monitor temperature rise rate
5. Verify thermal controller response:
   - Remaining fan should increase to 100%
   - Alert signal should activate at 60°C
   - Black-screen command at 65°C (if CEC connected)
   - Latching shutdown at 70°C
6. Record time-to-shutdown and max temperatures reached

### Pass/Fail Criteria
| Measurement | Pass | Fail |
|-------------|------|------|
| Alert activation | At 60±2°C | No alert |
| Safe shutdown | Before any sensor >75°C | Sensor exceeds 75°C |
| Shutdown latch | Requires manual reset | Auto-restarts |
| Time to shutdown | <30 minutes from fan loss | >30 minutes |

---

## TEST 3: Water Ingress (IPX4 + Failure Conditions)

### Objective
Verify wet/dry zone segregation under spray + partial drain blockage.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Spray type | IPX4 oscillating (IEC 60529) |
| Duration | 30 minutes |
| Drain blockage | 75% blocked (leave one drain open) |
| Wind | 20 mph (9 m/s) directed at intake |
| Fan state | Running at 50% duty |
| Ambient | 25°C, >80% RH |

### Procedure
1. Apply UV-sensitive dye to spray water
2. Block 75% of drain channel capacity
3. Install moisture indicator papers:
   - Inside intake plenum (wet zone - expected wet)
   - On TV mount surface (dry zone - must stay dry)
   - Inside electrical bay (dry zone - must stay dry)
4. Start fans at 50% duty
5. Begin IPX4 spray + wind simultaneously
6. Continue for 30 minutes
7. Stop spray, open enclosure within 5 minutes
8. Inspect with UV light and check indicator papers

### Pass/Fail Criteria
| Zone | Pass | Fail |
|------|------|------|
| Intake plenum | May be wet | N/A (expected) |
| Overflow weir | Wet below weir height only | Water above weir |
| TV mount surface | Completely dry | Any moisture |
| Electrical bay | Completely dry | Any moisture |
| Drain outlets | Flowing during test | Backed up/overflowing |

---

## TEST 4: Condensation Cycling

### Objective
Verify anti-fog heater and drainage prevent condensation drip onto TV.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Hot phase | 40°C, 95% RH, 4 hours |
| Cold phase | 10°C, ambient RH, 4 hours |
| Cycles | 5 complete cycles (40 hours total) |
| Heater | Auto-controlled (>80% RH activation) |

### Procedure
1. Install moisture indicator paper on TV mount surface
2. Install condensation collection tray below unit
3. Begin thermal cycling per schedule
4. Monitor heater activation (should trigger during transitions)
5. After each cold phase, inspect glass interior for fogging
6. After final cycle, open and inspect all surfaces

### Pass/Fail Criteria
| Measurement | Pass | Fail |
|-------------|------|------|
| Glass fogging | Clears within 10 min of heater activation | Persistent fog >30 min |
| Drip onto TV | None | Any visible drip marks |
| Condensate routing | To side drains | Pooling inside |
| Heater activation | At 80±5% RH | No activation or wrong threshold |

---

## TEST 5: Acoustic Under Restriction

### Objective
Verify noise levels and absence of tonal content under real operating conditions.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Background noise | <25 dBA |
| Measurement distance | 1 meter from front face center |
| Filter conditions | Clean, 50% blocked |
| Fan duty cycles | 30%, 60%, 100% |

### Procedure
1. Position sound level meter at 1m, perpendicular to front face
2. Record background noise (fans off)
3. For each filter condition (clean, 50% blocked):
   a. Set fans to 30% duty, wait 60 sec, record SPL and spectrum
   b. Set fans to 60% duty, wait 60 sec, record SPL and spectrum
   c. Set fans to 100% duty, wait 60 sec, record SPL and spectrum
4. Analyze 1/3 octave spectrum for tonal peaks

### Pass/Fail Criteria
| Condition | dBA Limit | Tonal Limit |
|-----------|-----------|-------------|
| Clean filter, 30% duty | ≤30 dBA | No peak >6 dB above neighbors |
| Clean filter, 60% duty | ≤35 dBA | No peak >6 dB above neighbors |
| Clean filter, 100% duty | ≤40 dBA | No peak >6 dB above neighbors |
| 50% blocked, 100% duty | ≤42 dBA | No peak >6 dB above neighbors |

### Tonal Analysis Method
```
For each 1/3 octave band:
  Tonal Prominence = Band_Level - Average(Adjacent_Bands)

  If Tonal Prominence > 6 dB in 500 Hz - 4 kHz range → FAIL

  Common problem frequencies:
  - Fan blade pass: RPM × blades / 60 (typically 200-500 Hz)
  - Motor whine: Often 1-2 kHz
```

---

## TEST 6: Glass Impact (EN 12600)

### Objective
Verify laminated glass survives impact and retains fragments.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Test standard | EN 12600 |
| Impact energies | 2 J (soft body), 10 J (hard body) |
| Impact locations | Center, 100mm from corner |

### Procedure
1. Mount enclosure with glass installed and gasketed
2. 2 J impact at center - inspect for damage
3. 2 J impact at corner zone - inspect for damage
4. 10 J impact at center - verify safe break behavior
5. Photograph all impact results

### Pass/Fail Criteria
| Impact | Pass | Fail |
|--------|------|------|
| 2 J center | No crack or damage | Crack or shatter |
| 2 J corner | No crack or damage | Crack or shatter |
| 10 J center | May crack, fragments retained by PVB | Fragments fall out |

---

## TEST 7: VESA Load + Thermal Cycling

### Objective
Verify structural integrity of through-bolted VESA mount under load and thermal stress.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Static load | 75 kg (3× safety factor for 25 kg TV) |
| Thermal cycles | 100 cycles, -20°C to +70°C |
| Cycle duration | 2 hours per cycle (200 hours total) |

### Procedure
1. Mount enclosure on rigid test fixture
2. Attach 75 kg calibrated weight to VESA mount
3. Measure initial deflection at center of back panel
4. Begin thermal cycling
5. At cycles 1, 10, 50, 100: measure deflection, check fastener torque

### Pass/Fail Criteria
| Measurement | Pass | Fail |
|-------------|------|------|
| Deflection increase | <1 mm over baseline | >1 mm increase |
| Fastener torque loss | <10% | >10% loss |
| Visual inspection | No cracking, yielding, or deformation | Any visible damage |
| VESA plate bond | Intact | Any delamination |

---

## TEST 8: Service Time Trial

### Objective
Verify field serviceability meets target times.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Technician | Single person, not involved in design |
| Tools | Standard hand tools only |
| Documentation | Service manual provided |

### Procedure
1. Provide technician with service manual (5 min review)
2. Time each task:
   - Filter replacement (target: <5 min)
   - Fan replacement (target: <20 min)
   - PSU replacement (target: <25 min)
3. Note any difficulties or required clarifications
4. Verify enclosure seals correctly after reassembly

### Pass/Fail Criteria
| Task | Pass | Fail |
|------|------|------|
| Filter replacement | <5 min, tool-less | >5 min or tools required |
| Fan replacement | <20 min, no glass removal | >20 min or glass removal needed |
| PSU replacement | <25 min, no glass removal | >25 min or glass removal needed |
| Post-service leak test | Pass IPX4 spot check | Leaks detected |

---

## TEST 9: Manufacturing Consistency (Pilot Build)

### Objective
Verify production repeatability across multiple units.

### Test Conditions
| Parameter | Value |
|-----------|-------|
| Sample size | 5 units (minimum pilot build) |
| Tests per unit | Dimensional, leak test, thermal spot check |

### Procedure
1. Measure critical dimensions on all 5 units:
   - Overall dimensions (±2mm tolerance)
   - Glass opening (±1mm)
   - VESA pattern (±0.5mm)
   - Gasket groove depth (±0.3mm)
2. Perform IPX4 leak test on all units
3. Perform 1-hour thermal spot check (45°C ambient, 300W load)
4. Calculate Cpk for critical dimensions

### Pass/Fail Criteria
| Measurement | Pass | Fail |
|-------------|------|------|
| Dimensional Cpk | ≥1.33 | <1.33 |
| Leak test first-pass | ≥4/5 units (80%) | <4/5 units |
| Thermal spot check | All units within ±3°C of each other | >3°C variation |

---

## Test Sequence & Duration

| Phase | Tests | Duration |
|-------|-------|----------|
| **Week 1** | Thermal worst-case (TEST 1) | 3 days |
| | Single fan failure (TEST 2) | 1 day |
| | Acoustic (TEST 5) | 1 day |
| **Week 2** | Water ingress (TEST 3) | 1 day |
| | Condensation cycling (TEST 4) | 5 days |
| **Week 3** | Glass impact (TEST 6) | 1 day |
| | VESA thermal cycling (TEST 7) | 8 days |
| **Week 4** | Service time trial (TEST 8) | 1 day |
| | Manufacturing pilot (TEST 9) | 3 days |

**Total: ~4 weeks for complete validation**

---

## Results Documentation

### Required Deliverables
1. **Test Report** for each test with:
   - Date, operator, equipment serial numbers
   - Raw data files (temperature logs, spectra, photos)
   - Pass/fail determination with calculations
   - Any anomalies or observations

2. **Summary Matrix**
| Test | Result | Notes |
|------|--------|-------|
| TEST 1: Thermal | PASS/FAIL | Margin: __% |
| TEST 2: Fan Failure | PASS/FAIL | Shutdown time: __ min |
| TEST 3: Water Ingress | PASS/FAIL | |
| TEST 4: Condensation | PASS/FAIL | |
| TEST 5: Acoustic | PASS/FAIL | Max SPL: __ dBA |
| TEST 6: Impact | PASS/FAIL | |
| TEST 7: VESA Cycling | PASS/FAIL | |
| TEST 8: Service | PASS/FAIL | Fan swap: __ min |
| TEST 9: Pilot Build | PASS/FAIL | Cpk: __ |

3. **Production Release Recommendation**
   - All tests PASS → Approved for production
   - Any FAIL → Document issue, remediation plan, retest

---

## Revision History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12-29 | Initial protocol based on Roundtable AI validation feedback |
