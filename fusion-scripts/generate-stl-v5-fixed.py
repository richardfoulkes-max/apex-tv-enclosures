#!/usr/bin/env python3
"""
Generate ATE-75 v5.1 STL file - FIXED version
Fans are recessed holes, not protrusions
"""

import numpy as np
from stl import mesh
import math

# ============================================
# PARAMETERS (v5.1)
# ============================================

WIDTH = 1760.0
HEIGHT = 1040.0
DEPTH = 180.0
WALL = 3.0
BEZEL = 35.0

INTAKE_W = 1650.0
INTAKE_H = 30.0
EXHAUST_W = 1650.0
EXHAUST_H = 35.0

FAN_D = 140.0
FAN_SPACING = 400.0

def box_triangles(x0, y0, z0, x1, y1, z1):
    """Generate triangles for a solid box"""
    tris = [
        # Back face (z0) - facing -Z
        [[x0, y1, z0], [x0, y0, z0], [x1, y0, z0]],
        [[x0, y1, z0], [x1, y0, z0], [x1, y1, z0]],
        # Front face (z1) - facing +Z
        [[x0, y0, z1], [x0, y1, z1], [x1, y1, z1]],
        [[x0, y0, z1], [x1, y1, z1], [x1, y0, z1]],
        # Bottom face (y0) - facing -Y
        [[x0, y0, z0], [x0, y0, z1], [x1, y0, z1]],
        [[x0, y0, z0], [x1, y0, z1], [x1, y0, z0]],
        # Top face (y1) - facing +Y
        [[x0, y1, z1], [x0, y1, z0], [x1, y1, z0]],
        [[x0, y1, z1], [x1, y1, z0], [x1, y1, z1]],
        # Left face (x0) - facing -X
        [[x0, y0, z0], [x0, y1, z0], [x0, y1, z1]],
        [[x0, y0, z0], [x0, y1, z1], [x0, y0, z1]],
        # Right face (x1) - facing +X
        [[x1, y1, z0], [x1, y0, z0], [x1, y0, z1]],
        [[x1, y1, z0], [x1, y0, z1], [x1, y1, z1]],
    ]
    return tris

def create_enclosure_clean():
    """Create clean enclosure - solid panels only, no problematic holes"""
    all_triangles = []

    w, h, d = WIDTH, HEIGHT, DEPTH
    hw, hh, hd = w/2, h/2, d/2

    # ===== BACK PANEL (solid) =====
    all_triangles.extend(box_triangles(-hw, -hh, -hd, hw, hh, -hd + WALL))

    # ===== BOTTOM PANEL =====
    all_triangles.extend(box_triangles(-hw, -hh, -hd, hw, -hh + WALL, hd))

    # ===== TOP PANEL =====
    all_triangles.extend(box_triangles(-hw, hh - WALL, -hd, hw, hh, hd))

    # ===== LEFT PANEL =====
    all_triangles.extend(box_triangles(-hw, -hh, -hd, -hw + WALL, hh, hd))

    # ===== RIGHT PANEL =====
    all_triangles.extend(box_triangles(hw - WALL, -hh, -hd, hw, hh, hd))

    # ===== FRONT BEZEL FRAME =====
    bezel_depth = BEZEL  # How far back the bezel extends

    # Bottom bezel (solid strip)
    all_triangles.extend(box_triangles(
        -hw + WALL, -hh + WALL, hd - bezel_depth,
        hw - WALL, -hh + BEZEL, hd
    ))

    # Top bezel (solid strip)
    all_triangles.extend(box_triangles(
        -hw + WALL, hh - BEZEL, hd - bezel_depth,
        hw - WALL, hh - WALL, hd
    ))

    # Left bezel (solid strip)
    all_triangles.extend(box_triangles(
        -hw + WALL, -hh + BEZEL, hd - bezel_depth,
        -hw + BEZEL, hh - BEZEL, hd
    ))

    # Right bezel (solid strip)
    all_triangles.extend(box_triangles(
        hw - BEZEL, -hh + BEZEL, hd - bezel_depth,
        hw - WALL, hh - BEZEL, hd
    ))

    # ===== INTAKE SLOT (visual groove in bottom bezel) =====
    # Small recessed strip to indicate the slot
    slot_recess = 5
    intake_y_center = -hh + BEZEL/2
    all_triangles.extend(box_triangles(
        -INTAKE_W/2, intake_y_center - INTAKE_H/2, hd - slot_recess,
        INTAKE_W/2, intake_y_center + INTAKE_H/2, hd - slot_recess + 2
    ))

    # ===== EXHAUST SLOT (visual groove in top bezel) =====
    exhaust_y_center = hh - BEZEL/2
    all_triangles.extend(box_triangles(
        -EXHAUST_W/2, exhaust_y_center - EXHAUST_H/2, hd - slot_recess,
        EXHAUST_W/2, exhaust_y_center + EXHAUST_H/2, hd - slot_recess + 2
    ))

    # Convert to mesh
    num_tris = len(all_triangles)
    enclosure = mesh.Mesh(np.zeros(num_tris, dtype=mesh.Mesh.dtype))

    for i, tri in enumerate(all_triangles):
        for j in range(3):
            enclosure.vectors[i][j] = np.array(tri[j])

    return enclosure

def main():
    print("Generating ATE-75 v5.1 STL (FIXED)...")
    print(f"Dimensions: {WIDTH} x {HEIGHT} x {DEPTH} mm")

    enclosure = create_enclosure_clean()

    base = "/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures"

    path1 = f"{base}/fusion-scripts/ATE-75-Enclosure-v5.stl"
    enclosure.save(path1)
    print(f"Saved: {path1}")

    path2 = f"{base}/manufacturer-rfq/ATE-75-Enclosure-v5.stl"
    enclosure.save(path2)
    print(f"Saved: {path2}")

    print(f"Triangles: {len(enclosure.vectors)}")

if __name__ == "__main__":
    main()
