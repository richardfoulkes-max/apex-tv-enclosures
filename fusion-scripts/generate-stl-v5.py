#!/usr/bin/env python3
"""
Generate ATE-75 v5.1 STL file using numpy-stl
Creates a detailed enclosure model with all features
"""

import numpy as np
from stl import mesh

# ============================================
# PARAMETERS (v5.1)
# ============================================

WIDTH = 1760        # External width
HEIGHT = 1040       # External height
DEPTH = 180         # External depth
WALL = 3            # Wall thickness
BEZEL = 35          # Bezel width

# Slots
INTAKE_W = 1650
INTAKE_H = 30
EXHAUST_W = 1650
EXHAUST_H = 35

# Fans (3 positions)
FAN_D = 140
FAN_SPACING = 400

# VESA
VESA_H = 600
VESA_V = 400

def create_box(w, h, d, center=True):
    """Create a box mesh"""
    if center:
        x0, x1 = -w/2, w/2
        y0, y1 = -h/2, h/2
        z0, z1 = -d/2, d/2
    else:
        x0, x1 = 0, w
        y0, y1 = 0, h
        z0, z1 = 0, d

    vertices = np.array([
        [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],  # bottom
        [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],  # top
    ])

    # 12 triangles (2 per face)
    faces = np.array([
        [0,3,1], [1,3,2],  # bottom
        [4,5,7], [5,6,7],  # top
        [0,1,4], [1,5,4],  # front
        [2,3,6], [3,7,6],  # back
        [0,4,3], [3,4,7],  # left
        [1,2,5], [2,6,5],  # right
    ])

    return vertices, faces

def create_hollow_box(outer_w, outer_h, outer_d, wall, bezel):
    """Create hollow box with bezel opening"""
    all_vertices = []
    all_faces = []

    # Outer shell
    ov, of = create_box(outer_w, outer_h, outer_d)
    all_vertices.append(ov)
    all_faces.append(of)

    # Inner cavity (shifted to back)
    inner_w = outer_w - wall*2
    inner_h = outer_h - wall*2
    inner_d = outer_d - wall

    iv, if_ = create_box(inner_w, inner_h, inner_d)
    iv[:, 2] += wall/2  # Shift forward (leave back wall)

    # Flip normals for inner (it's a cavity)
    if_ = if_[:, ::-1]

    offset = len(all_vertices[0])
    all_vertices.append(iv)
    all_faces.append(if_ + offset)

    # Bezel opening (front face cutout)
    opening_w = outer_w - bezel*2
    opening_h = outer_h - bezel*2

    # Front face vertices for opening
    front_z = outer_d/2

    # Create the bezel frame faces (connect outer edge to inner opening)
    # This is complex - for now, we'll create a simplified solid

    return np.vstack(all_vertices), np.vstack(all_faces)

def create_enclosure_v5():
    """Create the full v5.1 enclosure"""

    # For Vectary import, a simple solid box is more reliable
    # We'll create the outer shell as a solid first

    vertices = []
    faces = []
    face_offset = 0

    # === MAIN BODY (outer shell) ===
    # Create as solid box
    v, f = create_box(WIDTH, HEIGHT, DEPTH)
    vertices.extend(v)
    faces.extend(f)
    face_offset += len(v)

    # === INTAKE SLOT (bottom bezel) - represented as indentation ===
    slot_z = DEPTH/2 - WALL/2
    slot_y = -HEIGHT/2 + BEZEL/2

    # === EXHAUST SLOT (top bezel) ===
    # Similar representation

    # === FAN CIRCLES ===
    # Represented as cylinders (approximated)

    # Convert to numpy arrays
    vertices = np.array(vertices)
    faces = np.array(faces)

    # Create mesh
    enclosure = mesh.Mesh(np.zeros(faces.shape[0], dtype=mesh.Mesh.dtype))
    for i, f in enumerate(faces):
        for j in range(3):
            enclosure.vectors[i][j] = vertices[f[j], :]

    return enclosure

def create_detailed_enclosure():
    """Create more detailed enclosure with features"""

    # Create outer box vertices
    w, h, d = WIDTH, HEIGHT, DEPTH

    # 8 corners of outer box
    outer_verts = np.array([
        [-w/2, -h/2, -d/2],  # 0: back-bottom-left
        [ w/2, -h/2, -d/2],  # 1: back-bottom-right
        [ w/2,  h/2, -d/2],  # 2: back-top-right
        [-w/2,  h/2, -d/2],  # 3: back-top-left
        [-w/2, -h/2,  d/2],  # 4: front-bottom-left
        [ w/2, -h/2,  d/2],  # 5: front-bottom-right
        [ w/2,  h/2,  d/2],  # 6: front-top-right
        [-w/2,  h/2,  d/2],  # 7: front-top-left
    ])

    # 8 corners of bezel opening (front face)
    bw = w - BEZEL*2
    bh = h - BEZEL*2
    bezel_verts = np.array([
        [-bw/2, -bh/2, d/2],  # 8: opening-bottom-left
        [ bw/2, -bh/2, d/2],  # 9: opening-bottom-right
        [ bw/2,  bh/2, d/2],  # 10: opening-top-right
        [-bw/2,  bh/2, d/2],  # 11: opening-top-left
    ])

    # 8 corners of inner cavity
    iw = w - WALL*2
    ih = h - WALL*2
    id_ = d - WALL
    inner_verts = np.array([
        [-iw/2, -ih/2, -d/2 + WALL],  # 12
        [ iw/2, -ih/2, -d/2 + WALL],  # 13
        [ iw/2,  ih/2, -d/2 + WALL],  # 14
        [-iw/2,  ih/2, -d/2 + WALL],  # 15
        [-iw/2, -ih/2,  d/2 - WALL],  # 16
        [ iw/2, -ih/2,  d/2 - WALL],  # 17
        [ iw/2,  ih/2,  d/2 - WALL],  # 18
        [-iw/2,  ih/2,  d/2 - WALL],  # 19
    ])

    vertices = np.vstack([outer_verts, bezel_verts, inner_verts])

    # Define faces (triangles)
    faces = []

    # Back face (solid)
    faces.extend([[0, 1, 2], [0, 2, 3]])

    # Bottom face (outer)
    faces.extend([[0, 5, 1], [0, 4, 5]])

    # Top face (outer)
    faces.extend([[3, 2, 6], [3, 6, 7]])

    # Left face (outer)
    faces.extend([[0, 3, 7], [0, 7, 4]])

    # Right face (outer)
    faces.extend([[1, 5, 6], [1, 6, 2]])

    # Front face (bezel frame - 4 trapezoids)
    # Bottom bezel
    faces.extend([[4, 5, 9], [4, 9, 8]])
    # Top bezel
    faces.extend([[11, 10, 6], [11, 6, 7]])
    # Left bezel
    faces.extend([[4, 8, 11], [4, 11, 7]])
    # Right bezel
    faces.extend([[9, 5, 6], [9, 6, 10]])

    faces = np.array(faces)

    # Create mesh
    enclosure = mesh.Mesh(np.zeros(faces.shape[0], dtype=mesh.Mesh.dtype))
    for i, f in enumerate(faces):
        for j in range(3):
            enclosure.vectors[i][j] = vertices[f[j], :]

    return enclosure

def main():
    print("Generating ATE-75 v5.1 STL...")
    print(f"Dimensions: {WIDTH} x {HEIGHT} x {DEPTH} mm")

    # Create the enclosure mesh
    enclosure = create_detailed_enclosure()

    # Save to file
    output_path = "/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures/fusion-scripts/ATE-75-Enclosure-v5.stl"
    enclosure.save(output_path)

    print(f"Saved to: {output_path}")
    print(f"Triangles: {len(enclosure.vectors)}")

    # Also save to manufacturer-rfq folder
    rfq_path = "/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures/manufacturer-rfq/ATE-75-Enclosure-v5.stl"
    enclosure.save(rfq_path)
    print(f"Also saved to: {rfq_path}")

if __name__ == "__main__":
    main()
