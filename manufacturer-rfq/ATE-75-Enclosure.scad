// ATE-75 Outdoor TV Enclosure - OpenSCAD Model
// Apex Enclosures v3.0 Front-Breathing Design
// All dimensions in mm

// ============================================
// PARAMETERS
// ============================================

// Overall dimensions
WIDTH = 1760;       // External width
HEIGHT = 1040;      // External height
DEPTH = 120;        // External depth

// Frame construction
BEZEL_WIDTH = 35;   // Bezel width
WALL_THICK = 3;     // Aluminum wall thickness

// Air channel
AIR_GAP = 25;       // Gap between glass and TV

// Airflow slots
INTAKE_SLOT_WIDTH = 1700;   // Bottom intake slot length
INTAKE_SLOT_HEIGHT = 15;    // Bottom intake slot height
EXHAUST_SLOT_WIDTH = 1700;  // Top exhaust slot length
EXHAUST_SLOT_HEIGHT = 20;   // Top exhaust slot height

// Fan specifications
FAN_COUNT = 4;
FAN_DIAMETER = 60;
FAN_DEPTH = 15;

// VESA mount (600x400 for 75" TV)
VESA_H = 600;
VESA_V = 400;
VESA_HOLE = 8;      // M8 holes

// Glass
GLASS_THICK = 6;

// Corner radius for aesthetics
CORNER_R = 5;

// ============================================
// MAIN ENCLOSURE
// ============================================

module outer_shell() {
    difference() {
        // Outer body with rounded corners
        minkowski() {
            cube([WIDTH - CORNER_R*2, HEIGHT - CORNER_R*2, DEPTH - CORNER_R], center=true);
            cylinder(r=CORNER_R, h=CORNER_R, $fn=32);
        }

        // Inner cavity (hollow out)
        translate([0, 0, WALL_THICK])
        cube([WIDTH - BEZEL_WIDTH*2, HEIGHT - BEZEL_WIDTH*2, DEPTH], center=true);
    }
}

// ============================================
// BOTTOM BEZEL - INTAKE SLOT
// ============================================

module intake_slot() {
    translate([0, -HEIGHT/2 + BEZEL_WIDTH/2, DEPTH/2])
    cube([INTAKE_SLOT_WIDTH, INTAKE_SLOT_HEIGHT, DEPTH + 10], center=true);
}

// ============================================
// TOP BEZEL - EXHAUST SLOT
// ============================================

module exhaust_slot() {
    translate([0, HEIGHT/2 - BEZEL_WIDTH/2, DEPTH/2])
    cube([EXHAUST_SLOT_WIDTH, EXHAUST_SLOT_HEIGHT, DEPTH + 10], center=true);
}

// ============================================
// FAN HOLES (4x 60mm in top bezel)
// ============================================

module fan_holes() {
    fan_spacing = EXHAUST_SLOT_WIDTH / (FAN_COUNT + 1);

    for (i = [1:FAN_COUNT]) {
        translate([-EXHAUST_SLOT_WIDTH/2 + fan_spacing * i,
                   HEIGHT/2 - BEZEL_WIDTH/2,
                   DEPTH - FAN_DEPTH/2])
        cylinder(d=FAN_DIAMETER, h=FAN_DEPTH + 10, center=true, $fn=64);
    }
}

// ============================================
// VESA MOUNT PATTERN
// ============================================

module vesa_holes() {
    positions = [
        [-VESA_H/2, -VESA_V/2],
        [VESA_H/2, -VESA_V/2],
        [-VESA_H/2, VESA_V/2],
        [VESA_H/2, VESA_V/2]
    ];

    for (pos = positions) {
        translate([pos[0], pos[1], -DEPTH/2])
        cylinder(d=VESA_HOLE, h=WALL_THICK + 10, $fn=32);
    }
}

// ============================================
// CABLE ENTRY HOLES (bottom of rear panel)
// ============================================

module cable_holes() {
    // Two cable entry points
    for (x = [-200, 200]) {
        translate([x, -HEIGHT/2 + 100, -DEPTH/2])
        cylinder(d=30, h=WALL_THICK + 10, $fn=32);
    }
}

// ============================================
// GLASS PANEL (separate for visualization)
// ============================================

module glass_panel() {
    color("LightBlue", 0.3)
    translate([0, 0, DEPTH/2 - GLASS_THICK/2 - 1])
    cube([WIDTH - BEZEL_WIDTH*2 - 4, HEIGHT - BEZEL_WIDTH*2 - 4, GLASS_THICK], center=true);
}

// ============================================
// ASSEMBLE COMPLETE ENCLOSURE
// ============================================

module enclosure() {
    difference() {
        outer_shell();
        intake_slot();
        exhaust_slot();
        fan_holes();
        vesa_holes();
        cable_holes();
    }
}

// ============================================
// RENDER
// ============================================

// Main enclosure body (aluminum)
color("DimGray")
enclosure();

// Glass panel (transparent blue)
glass_panel();

// Info text (won't appear in STL)
echo("ATE-75 Enclosure: 1760 x 1040 x 120mm");
echo("v3.0 Front-Breathing Design");
