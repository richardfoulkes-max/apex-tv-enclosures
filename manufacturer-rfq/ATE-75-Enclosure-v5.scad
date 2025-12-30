// ATE-75 Outdoor TV Enclosure - OpenSCAD Model v5.1
// Apex Enclosures - Ducted Rear Plenum Design
// All dimensions in mm

// ============================================
// PARAMETERS (v5.1)
// ============================================

// Overall dimensions
WIDTH = 1760;       // External width
HEIGHT = 1040;      // External height
DEPTH = 180;        // External depth (was 120mm in v3)

// Frame construction
BEZEL_WIDTH = 35;   // Bezel width
WALL_THICK = 3;     // Aluminum wall thickness

// Internal layout
GLASS_THICK = 8;        // 4+4 laminated glass
FRONT_GAP = 27;         // Gap between glass and TV
TV_ZONE = 90;           // TV mounting depth
REAR_PLENUM = 50;       // Air channel behind TV

// Airflow slots
INTAKE_SLOT_WIDTH = 1650;
INTAKE_SLOT_HEIGHT = 30;
EXHAUST_SLOT_WIDTH = 1650;
EXHAUST_SLOT_HEIGHT = 35;

// Fan specifications (3 positions, 2 active + 1 blank)
FAN_POSITIONS = 3;
FAN_DIAMETER = 140;
FAN_SPACING = 400;

// Service door
SERVICE_DOOR_WIDTH = 1650;
SERVICE_DOOR_HEIGHT = 80;

// VESA mount (600x400 for 75" TV)
VESA_H = 600;
VESA_V = 400;
VESA_HOLE = 8;      // M8 holes

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

        // Inner cavity (hollow out, leaving walls)
        translate([0, 0, WALL_THICK])
        cube([WIDTH - WALL_THICK*2, HEIGHT - WALL_THICK*2, DEPTH], center=true);
    }
}

// ============================================
// FRONT BEZEL FRAME
// ============================================

module bezel_frame() {
    difference() {
        // Full front face
        translate([0, 0, DEPTH/2 - WALL_THICK/2])
        cube([WIDTH, HEIGHT, WALL_THICK], center=true);

        // Glass opening (cut out center)
        translate([0, 0, DEPTH/2])
        cube([WIDTH - BEZEL_WIDTH*2, HEIGHT - BEZEL_WIDTH*2, WALL_THICK*2], center=true);
    }
}

// ============================================
// BOTTOM INTAKE SLOT
// ============================================

module intake_slot() {
    translate([0, -HEIGHT/2 + BEZEL_WIDTH/2, DEPTH/2])
    cube([INTAKE_SLOT_WIDTH, INTAKE_SLOT_HEIGHT, WALL_THICK*3], center=true);
}

// ============================================
// TOP EXHAUST SLOT
// ============================================

module exhaust_slot() {
    translate([0, HEIGHT/2 - BEZEL_WIDTH/2, DEPTH/2])
    cube([EXHAUST_SLOT_WIDTH, EXHAUST_SLOT_HEIGHT, WALL_THICK*3], center=true);
}

// ============================================
// FAN HOLES (3 positions in top bezel)
// ============================================

module fan_holes() {
    for (i = [-1, 0, 1]) {
        translate([i * FAN_SPACING, HEIGHT/2 - BEZEL_WIDTH/2, DEPTH/2])
        cylinder(d=FAN_DIAMETER, h=WALL_THICK*3, center=true, $fn=64);
    }
}

// ============================================
// SERVICE DOOR OUTLINE
// ============================================

module service_door() {
    // Visual outline of service door in bottom bezel
    translate([0, -HEIGHT/2 + BEZEL_WIDTH + SERVICE_DOOR_HEIGHT/2, DEPTH/2])
    difference() {
        cube([SERVICE_DOOR_WIDTH + 4, SERVICE_DOOR_HEIGHT + 4, WALL_THICK*0.5], center=true);
        cube([SERVICE_DOOR_WIDTH, SERVICE_DOOR_HEIGHT, WALL_THICK], center=true);
    }
}

// ============================================
// VESA MOUNT PATTERN (on rear panel)
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
        cylinder(d=VESA_HOLE, h=WALL_THICK*3, $fn=32);
    }
}

// ============================================
// CABLE ENTRY HOLES
// ============================================

module cable_holes() {
    for (x = [-300, 300]) {
        translate([x, -HEIGHT/2 + 150, -DEPTH/2])
        cylinder(d=25, h=WALL_THICK*3, $fn=32);
    }
}

// ============================================
// GLASS PANEL
// ============================================

module glass_panel() {
    color("LightBlue", 0.3)
    translate([0, 0, DEPTH/2 - GLASS_THICK/2 - 2])
    cube([WIDTH - BEZEL_WIDTH*2 - 8, HEIGHT - BEZEL_WIDTH*2 - 8, GLASS_THICK], center=true);
}

// ============================================
// INTERNAL BAFFLE (visualization)
// ============================================

module internal_baffle() {
    color("DarkGray", 0.5)
    translate([0, -HEIGHT/2 + BEZEL_WIDTH + 60, DEPTH/2 - FRONT_GAP - GLASS_THICK - 50])
    rotate([45, 0, 0])
    cube([WIDTH - BEZEL_WIDTH*2 - 20, 80, 2], center=true);
}

// ============================================
// ASSEMBLE COMPLETE ENCLOSURE
// ============================================

module enclosure() {
    difference() {
        union() {
            outer_shell();
            bezel_frame();
        }
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

// Service door outline
color("Gray")
service_door();

// Glass panel (transparent blue)
glass_panel();

// Internal baffle (for visualization)
internal_baffle();

// Info text
echo("ATE-75 Enclosure v5.1");
echo(str("Dimensions: ", WIDTH, " x ", HEIGHT, " x ", DEPTH, "mm"));
echo("Ducted Rear Plenum Design - PASS FOR PROTOTYPE VALIDATION");
