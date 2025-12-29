#!/usr/bin/env python3
"""
Generate ATE-75 v5.1 STL file - Detailed version with slots and features
Uses numpy-stl with more geometric detail
"""

import numpy as np
from stl import mesh
import math

# ============================================
# PARAMETERS (v5.1)
# ============================================

WIDTH = 1760.0      # External width
HEIGHT = 1040.0     # External height
DEPTH = 180.0       # External depth
WALL = 3.0          # Wall thickness
BEZEL = 35.0        # Bezel width

# Slots
INTAKE_W = 1650.0
INTAKE_H = 30.0
EXHAUST_W = 1650.0
EXHAUST_H = 35.0

# Fans (3 positions)
FAN_D = 140.0
FAN_SPACING = 400.0

# Service door
SERVICE_W = 1650.0
SERVICE_H = 80.0

def box_triangles(x0, y0, z0, x1, y1, z1):
    """Generate triangles for a box from min/max corners"""
    verts = [
        [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],  # back
        [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],  # front
    ]

    # 12 triangles, 2 per face, with correct winding for outward normals
    tris = [
        # Back face (z0)
        [[x0, y0, z0], [x0, y1, z0], [x1, y1, z0]],
        [[x0, y0, z0], [x1, y1, z0], [x1, y0, z0]],
        # Front face (z1)
        [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1]],
        [[x0, y0, z1], [x1, y1, z1], [x0, y1, z1]],
        # Bottom face (y0)
        [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1]],
        [[x0, y0, z0], [x1, y0, z1], [x0, y0, z1]],
        # Top face (y1)
        [[x0, y1, z0], [x0, y1, z1], [x1, y1, z1]],
        [[x0, y1, z0], [x1, y1, z1], [x1, y1, z0]],
        # Left face (x0)
        [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1]],
        [[x0, y0, z0], [x0, y1, z1], [x0, y1, z0]],
        # Right face (x1)
        [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1]],
        [[x1, y0, z0], [x1, y1, z1], [x1, y0, z1]],
    ]
    return tris

def cylinder_triangles(cx, cy, cz, radius, height, segments=32, axis='z'):
    """Generate triangles for a cylinder"""
    tris = []
    angles = [2 * math.pi * i / segments for i in range(segments)]

    if axis == 'z':
        # Bottom cap
        for i in range(segments):
            a1, a2 = angles[i], angles[(i+1) % segments]
            tris.append([
                [cx, cy, cz],
                [cx + radius * math.cos(a1), cy + radius * math.sin(a1), cz],
                [cx + radius * math.cos(a2), cy + radius * math.sin(a2), cz],
            ])

        # Top cap
        for i in range(segments):
            a1, a2 = angles[i], angles[(i+1) % segments]
            tris.append([
                [cx, cy, cz + height],
                [cx + radius * math.cos(a2), cy + radius * math.sin(a2), cz + height],
                [cx + radius * math.cos(a1), cy + radius * math.sin(a1), cz + height],
            ])

        # Side wall
        for i in range(segments):
            a1, a2 = angles[i], angles[(i+1) % segments]
            x1, y1 = cx + radius * math.cos(a1), cy + radius * math.sin(a1)
            x2, y2 = cx + radius * math.cos(a2), cy + radius * math.sin(a2)
            # Two triangles per segment
            tris.append([[x1, y1, cz], [x2, y2, cz], [x2, y2, cz + height]])
            tris.append([[x1, y1, cz], [x2, y2, cz + height], [x1, y1, cz + height]])

    return tris

def create_enclosure():
    """Create complete enclosure with all features"""
    all_triangles = []

    w, h, d = WIDTH, HEIGHT, DEPTH
    half_w, half_h, half_d = w/2, h/2, d/2

    # ===== BACK PANEL =====
    # Solid back panel with VESA holes (holes not cut for simplicity)
    back_tris = box_triangles(-half_w, -half_h, -half_d,
                               half_w, half_h, -half_d + WALL)
    all_triangles.extend(back_tris)

    # ===== BOTTOM PANEL =====
    bottom_tris = box_triangles(-half_w, -half_h, -half_d,
                                 half_w, -half_h + WALL, half_d)
    all_triangles.extend(bottom_tris)

    # ===== TOP PANEL =====
    top_tris = box_triangles(-half_w, half_h - WALL, -half_d,
                              half_w, half_h, half_d)
    all_triangles.extend(top_tris)

    # ===== LEFT PANEL =====
    left_tris = box_triangles(-half_w, -half_h, -half_d,
                               -half_w + WALL, half_h, half_d)
    all_triangles.extend(left_tris)

    # ===== RIGHT PANEL =====
    right_tris = box_triangles(half_w - WALL, -half_h, -half_d,
                                half_w, half_h, half_d)
    all_triangles.extend(right_tris)

    # ===== FRONT BEZEL (frame around glass opening) =====
    # Bottom bezel strip
    bezel_bottom = box_triangles(-half_w, -half_h, half_d - BEZEL,
                                  half_w, -half_h + BEZEL, half_d)
    all_triangles.extend(bezel_bottom)

    # Top bezel strip
    bezel_top = box_triangles(-half_w, half_h - BEZEL, half_d - BEZEL,
                               half_w, half_h, half_d)
    all_triangles.extend(bezel_top)

    # Left bezel strip
    bezel_left = box_triangles(-half_w, -half_h + BEZEL, half_d - BEZEL,
                                -half_w + BEZEL, half_h - BEZEL, half_d)
    all_triangles.extend(bezel_left)

    # Right bezel strip
    bezel_right = box_triangles(half_w - BEZEL, -half_h + BEZEL, half_d - BEZEL,
                                 half_w, half_h - BEZEL, half_d)
    all_triangles.extend(bezel_right)

    # ===== INTAKE SLOT (cut into bottom bezel) =====
    # Represented as recessed area
    slot_depth = 10
    intake_y = -half_h + BEZEL/2
    intake_tris = box_triangles(-INTAKE_W/2, intake_y - INTAKE_H/2, half_d - slot_depth,
                                 INTAKE_W/2, intake_y + INTAKE_H/2, half_d)
    # Invert for cavity effect (flip normals)
    for t in intake_tris:
        t.reverse()
    all_triangles.extend(intake_tris)

    # ===== EXHAUST SLOT (cut into top bezel) =====
    exhaust_y = half_h - BEZEL/2
    exhaust_tris = box_triangles(-EXHAUST_W/2, exhaust_y - EXHAUST_H/2, half_d - slot_depth,
                                  EXHAUST_W/2, exhaust_y + EXHAUST_H/2, half_d)
    for t in exhaust_tris:
        t.reverse()
    all_triangles.extend(exhaust_tris)

    # ===== FAN HOLES (3 circles in top bezel) =====
    fan_y = half_h - BEZEL/2
    fan_z = half_d - WALL
    for fan_x in [-FAN_SPACING, 0, FAN_SPACING]:
        fan_tris = cylinder_triangles(fan_x, fan_y, fan_z - 15,
                                       FAN_D/2, 20, segments=24, axis='z')
        # Invert for hole effect
        for t in fan_tris:
            t.reverse()
        all_triangles.extend(fan_tris)

    # Convert to mesh
    num_tris = len(all_triangles)
    enclosure = mesh.Mesh(np.zeros(num_tris, dtype=mesh.Mesh.dtype))

    for i, tri in enumerate(all_triangles):
        for j in range(3):
            enclosure.vectors[i][j] = np.array(tri[j])

    return enclosure

def main():
    print("Generating ATE-75 v5.1 Detailed STL...")
    print(f"Dimensions: {WIDTH} x {HEIGHT} x {DEPTH} mm")

    enclosure = create_enclosure()

    # Save files
    base_path = "/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures"

    stl_path = f"{base_path}/fusion-scripts/ATE-75-Enclosure-v5.stl"
    enclosure.save(stl_path)
    print(f"Saved: {stl_path}")

    rfq_path = f"{base_path}/manufacturer-rfq/ATE-75-Enclosure-v5.stl"
    enclosure.save(rfq_path)
    print(f"Saved: {rfq_path}")

    print(f"Total triangles: {len(enclosure.vectors)}")
    print("\nUpload to vectary.com to visualize with materials!")

if __name__ == "__main__":
    main()
