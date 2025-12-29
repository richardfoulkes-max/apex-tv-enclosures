# ATE-75 Enclosure - Fusion 360 Build Instructions

## Step 1: Import the STL

1. Drag `ATE-75-Enclosure.stl` into Fusion 360
2. Click **OK** on the import dialog
3. Right-click the mesh body → **Mesh to BRep** (converts to solid)
   - This may take a moment for large meshes

---

## Step 2: Hollow Out the Interior

We need to create the internal cavity (leaving 35mm bezel and 3mm back wall).

1. Click **Modify → Shell**
2. Select the **front face** (the large flat face facing you)
3. Set **Inside Thickness: 3mm**
4. Click **OK**

*This hollows out the box leaving 3mm walls*

---

## Step 3: Create the Bezel Frame

The bezel should be 35mm wide. We'll cut out the center opening.

1. Click the **front face** → **Create Sketch**
2. Draw a **Rectangle** (R key):
   - Center it on the face
   - Width: **1690mm** (1760 - 35×2)
   - Height: **970mm** (1040 - 35×2)
3. Press **F** (Finish Sketch)
4. Select the rectangle → **Extrude** (E key)
   - Operation: **Cut**
   - Distance: **-117mm** (leaves 3mm back wall)
5. Click **OK**

---

## Step 4: Bottom Intake Slot

1. Click the **front face** → **Create Sketch**
2. Draw a **Rectangle**:
   - Position: Centered horizontally, in the bottom bezel
   - Width: **1700mm**
   - Height: **15mm**
   - Distance from bottom edge: **10mm**
3. **Finish Sketch** (F)
4. **Extrude** → **Cut** → Distance: **-120mm** (through all)

---

## Step 5: Top Exhaust Slot

1. Click the **front face** → **Create Sketch**
2. Draw a **Rectangle**:
   - Position: Centered horizontally, in the top bezel
   - Width: **1700mm**
   - Height: **20mm**
   - Distance from top edge: **7.5mm**
3. **Finish Sketch**
4. **Extrude** → **Cut** → Distance: **-120mm** (through all)

---

## Step 6: Fan Mounting Holes (4× 60mm)

1. Click the **front face** → **Create Sketch**
2. Draw **4 Circles** (C key):
   - Diameter: **60mm** each
   - Vertical position: Center of top bezel (17.5mm from top edge)
   - Horizontal spacing: **340mm** apart (evenly across 1700mm)

   Circle centers at X positions:
   - -510mm, -170mm, +170mm, +510mm

3. **Finish Sketch**
4. **Extrude** → **Cut** → Distance: **-15mm** (fan depth)

---

## Step 7: VESA Mount Pattern (600×400)

1. Click the **back face** (Z=0) → **Create Sketch**
2. Draw **4 Circles**:
   - Diameter: **8mm** (M8 holes)
   - Pattern: 600mm horizontal × 400mm vertical, centered

   Circle centers:
   - (-300, -200), (300, -200), (-300, 200), (300, 200)

3. **Finish Sketch**
4. **Extrude** → **Cut** → Distance: **-3mm** (through back wall)

---

## Step 8: Cable Entry Holes

1. Click the **back face** → **Create Sketch**
2. Draw **2 Circles**:
   - Diameter: **30mm**
   - Positions: (-200, -420) and (200, -420) — near bottom
3. **Finish Sketch**
4. **Extrude** → **Cut** → Distance: **-3mm**

---

## Step 9: Add Glass Panel (Optional)

1. Create a **New Component** (right-click in Browser → New Component)
2. Name it "Glass Panel"
3. **Create Sketch** on XY plane
4. Draw **Rectangle**:
   - Width: **1686mm**
   - Height: **966mm**
   - Centered at origin
5. **Extrude**: **6mm** thickness
6. Move to position: Z = **113mm** (near front)
7. Apply glass appearance: **Modify → Appearance → Glass**

---

## Step 10: Apply Materials

1. Click **Modify → Appearance**
2. Drag materials onto bodies:
   - Main enclosure: **Aluminum - Anodized Dark**
   - Glass panel: **Glass - Heavy Color Tint**

---

## Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| S | Search commands |
| R | Rectangle |
| C | Circle |
| E | Extrude |
| F | Finish Sketch |
| L | Line |
| D | Dimension |

---

## Final Dimensions Reference

| Feature | Dimension |
|---------|-----------|
| Overall | 1760 × 1040 × 120mm |
| Bezel width | 35mm |
| Wall thickness | 3mm |
| Intake slot | 1700 × 15mm |
| Exhaust slot | 1700 × 20mm |
| Fans | 4× 60mm dia, 15mm deep |
| VESA pattern | 600 × 400mm, M8 holes |
| Glass | 1686 × 966 × 6mm |

---

## Tips

- Use **Ctrl+Z** (Cmd+Z on Mac) to undo mistakes
- Press **Shift+Middle Mouse** to pan
- **Scroll wheel** to zoom
- Press **Home** key to fit view
- Save frequently! (Ctrl+S / Cmd+S)
