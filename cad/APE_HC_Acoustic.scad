/*
 * APE-HC Acoustic Enclosure V2 — Parametric OpenSCAD Model
 *
 * Pool heat pump/chiller enclosure with:
 * - Open frame top
 * - Removable acoustic discharge hood
 * - Baffled intake modules
 * - Constrained-layer damping panels
 *
 * Author: Apex Enclosures
 * Date: 2026-01-08
 * Version: 2.0
 */

// ============================================================
// PARAMETERS — Adjust these for different configurations
// ============================================================

// Model selection: "S", "M", or "L"
model_size = "M";  // [S, M, L]

// Panel thickness (mm)
panel_thickness = 2.0;

// Frame thickness (mm)
frame_thickness = 3.0;

// Hood internal height (mm)
hood_height = 300;

// Intake module depth (mm)
intake_module_depth = 100;

// Insulation thickness (mm)
insulation_thickness = 50;

// Perforated liner thickness (mm)
liner_thickness = 1.0;

// Door side: "front" or "back"
door_side = "front";

// Wall clearance at back (mm)
wall_clearance_back = 300;

// Visualization options
exploded_view = false;      // Explode components for visibility
show_flat_panels = false;   // Show flat panel layout for fabrication
show_equipment = true;      // Show placeholder heat pump
show_airflow = true;        // Show airflow arrows
show_insulation = true;     // Show acoustic insulation

// Color scheme
color_frame = [0.3, 0.3, 0.35];
color_panel = [0.5, 0.5, 0.55];
color_louver = [0.45, 0.45, 0.5];
color_insulation = [1.0, 0.9, 0.3, 0.7];
color_equipment = [0.2, 0.2, 0.2];
color_airflow = [0.2, 0.6, 1.0, 0.5];

// ============================================================
// CALCULATED DIMENSIONS
// ============================================================

// Internal dimensions based on model size
internal_dims =
    model_size == "S" ? [900, 550, 1000] :
    model_size == "M" ? [1100, 650, 1000] :
    model_size == "L" ? [1400, 750, 1100] :
    [1100, 650, 1000];  // Default to M

internal_width = internal_dims[0];
internal_depth = internal_dims[1];
internal_height = internal_dims[2];

// External dimensions (including intake modules)
external_width = internal_width + 2 * intake_module_depth;
external_depth = internal_depth + 2 * intake_module_depth;
external_height_base = internal_height + frame_thickness;
external_height_total = external_height_base + hood_height + 50;

// Frame member size
frame_size = 40;

// Louver specifications
louver_blade_spacing = 25;
louver_blade_angle = 45;
louver_blade_depth = 40;

// Door dimensions
door_width = internal_width - 100;
door_height = internal_height - 100;

// Hood outlet dimensions (calculated for 2 m/s velocity)
// Using simplified formula for visualization
airflow_m3h = model_size == "S" ? 3000 : model_size == "M" ? 5000 : 8000;
outlet_free_area = (airflow_m3h / 3600) / 2.0;  // m²
outlet_face_area = outlet_free_area / 0.5;  // 50% free area
outlet_height = hood_height - 100;
outlet_width = (outlet_face_area * 1000000) / outlet_height / 2;  // Per side

// Exploded view offsets
explode_offset = exploded_view ? 150 : 0;

// ============================================================
// MODULES
// ============================================================

// Basic frame member
module frame_member(length, width=frame_size, height=frame_size) {
    color(color_frame)
    cube([length, width, height]);
}

// Aluminum panel
module panel(width, height, thickness=panel_thickness) {
    color(color_panel)
    cube([width, thickness, height]);
}

// Louver blade
module louver_blade(width, depth=louver_blade_depth) {
    color(color_louver)
    rotate([louver_blade_angle, 0, 0])
    cube([width, depth, panel_thickness]);
}

// Weather louver panel
module weather_louver(width, height) {
    num_blades = floor(height / louver_blade_spacing);

    color(color_louver)
    for (i = [0:num_blades-1]) {
        translate([0, 0, i * louver_blade_spacing + 10])
        louver_blade(width);
    }
}

// Perforated panel (acoustic liner)
module perforated_panel(width, height, thickness=liner_thickness) {
    hole_spacing = 8;
    hole_dia = 3;

    color([0.6, 0.6, 0.65])
    difference() {
        cube([width, thickness, height]);

        // Simplified perforation pattern (not all holes for performance)
        for (x = [hole_spacing : hole_spacing*3 : width - hole_spacing]) {
            for (z = [hole_spacing : hole_spacing*3 : height - hole_spacing]) {
                translate([x, -1, z])
                rotate([-90, 0, 0])
                cylinder(h=thickness+2, d=hole_dia, $fn=8);
            }
        }
    }
}

// Mineral wool insulation block
module insulation_block(width, depth, height) {
    if (show_insulation) {
        color(color_insulation)
        cube([width, depth, height]);
    }
}

// ============================================================
// BASE ENCLOSURE
// ============================================================

module base_frame() {
    // Bottom frame
    translate([0, 0, 0]) {
        // Front/back rails
        frame_member(external_width);
        translate([0, external_depth - frame_size, 0])
        frame_member(external_width);

        // Side rails
        translate([0, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth);
        translate([external_width, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth);
    }

    // Corner posts
    for (x = [0, external_width - frame_size]) {
        for (y = [0, external_depth - frame_size]) {
            translate([x, y, 0])
            frame_member(frame_size, frame_size, internal_height + frame_size);
        }
    }

    // Top frame (open - no roof panel)
    translate([0, 0, internal_height]) {
        // Front/back rails
        frame_member(external_width);
        translate([0, external_depth - frame_size, 0])
        frame_member(external_width);

        // Side rails
        translate([0, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth);
        translate([external_width, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth);

        // Cross braces for hood support
        translate([external_width/3, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth, frame_size/2, frame_size/2);
        translate([2*external_width/3, 0, 0])
        rotate([0, 0, 90])
        frame_member(external_depth, frame_size/2, frame_size/2);
    }
}

// Back panel (solid with damping)
module back_panel() {
    translate([frame_size, external_depth - frame_size - panel_thickness, frame_size])
    panel(external_width - 2*frame_size, internal_height - frame_size);
}

// ============================================================
// INTAKE MODULES
// ============================================================

module intake_module(width, height) {
    module_width = intake_module_depth;

    // Outer weather louver
    translate([0, 0, 0])
    weather_louver(width, height);

    // Vertical baffle
    translate([module_width * 0.6, 0, 0])
    panel(panel_thickness, height, module_width * 0.8);

    // Insulation on baffle
    translate([module_width * 0.6 - insulation_thickness/2, panel_thickness, 20])
    insulation_block(insulation_thickness/2, height * 0.8, module_width * 0.6);

    // Perforated liner over insulation
    translate([module_width * 0.6 - insulation_thickness/2 - liner_thickness, panel_thickness, 20])
    perforated_panel(liner_thickness, height * 0.8, module_width * 0.5);
}

module left_intake_module() {
    translate([0 - explode_offset, frame_size, frame_size])
    rotate([0, 0, -90])
    intake_module(external_depth - 2*frame_size, internal_height - frame_size);
}

module right_intake_module() {
    translate([external_width + explode_offset, frame_size, frame_size])
    rotate([0, 0, 90])
    translate([-intake_module_depth, 0, 0])
    intake_module(external_depth - 2*frame_size, internal_height - frame_size);
}

// ============================================================
// DISCHARGE HOOD
// ============================================================

module discharge_hood() {
    hood_ext_width = external_width + 100;
    hood_ext_depth = external_depth + 100;
    hood_wall = panel_thickness + insulation_thickness + liner_thickness;

    translate([-50, -50, internal_height + frame_size + explode_offset]) {
        // Hood frame
        color(color_frame) {
            // Bottom frame
            difference() {
                cube([hood_ext_width, hood_ext_depth, frame_size]);
                translate([frame_size, frame_size, -1])
                cube([hood_ext_width - 2*frame_size, hood_ext_depth - 2*frame_size, frame_size + 2]);
            }

            // Corner posts
            for (x = [0, hood_ext_width - frame_size]) {
                for (y = [0, hood_ext_depth - frame_size]) {
                    translate([x, y, 0])
                    cube([frame_size, frame_size, hood_height]);
                }
            }

            // Top frame
            translate([0, 0, hood_height - frame_size])
            difference() {
                cube([hood_ext_width, hood_ext_depth, frame_size]);
                translate([frame_size, frame_size, -1])
                cube([hood_ext_width - 2*frame_size, hood_ext_depth - 2*frame_size, frame_size + 2]);
            }
        }

        // Solid ceiling (blocks direct upward sound)
        translate([hood_wall, hood_wall, hood_height - frame_size - panel_thickness])
        color(color_panel)
        cube([hood_ext_width - 2*hood_wall, hood_ext_depth - 2*hood_wall, panel_thickness]);

        // Ceiling insulation
        translate([hood_wall, hood_wall, hood_height - frame_size - panel_thickness - insulation_thickness])
        insulation_block(hood_ext_width - 2*hood_wall, hood_ext_depth - 2*hood_wall, insulation_thickness);

        // Perforated ceiling liner
        translate([hood_wall, hood_wall, hood_height - frame_size - panel_thickness - insulation_thickness - liner_thickness])
        perforated_panel(hood_ext_width - 2*hood_wall, hood_ext_depth - 2*hood_wall, liner_thickness);

        // Side outlet louvers (left and right)
        // Left outlet
        translate([0, frame_size, frame_size])
        rotate([0, 0, -90])
        weather_louver(hood_ext_depth - 2*frame_size, hood_height - 2*frame_size);

        // Right outlet
        translate([hood_ext_width, frame_size, frame_size])
        rotate([0, 0, 90])
        translate([-louver_blade_depth, 0, 0])
        weather_louver(hood_ext_depth - 2*frame_size, hood_height - 2*frame_size);

        // Wall insulation (front and back - solid with lining)
        // Front wall
        translate([frame_size, frame_size, frame_size]) {
            color(color_panel)
            cube([hood_ext_width - 2*frame_size, panel_thickness, hood_height - 2*frame_size]);
            translate([0, panel_thickness, 0])
            insulation_block(hood_ext_width - 2*frame_size, insulation_thickness, hood_height - 2*frame_size);
        }

        // Back wall
        translate([frame_size, hood_ext_depth - frame_size - panel_thickness - insulation_thickness, frame_size]) {
            insulation_block(hood_ext_width - 2*frame_size, insulation_thickness, hood_height - 2*frame_size);
            translate([0, insulation_thickness, 0])
            color(color_panel)
            cube([hood_ext_width - 2*frame_size, panel_thickness, hood_height - 2*frame_size]);
        }
    }
}

// ============================================================
// DOOR
// ============================================================

module door() {
    door_x = (external_width - door_width) / 2;
    door_z = (internal_height - door_height) / 2;

    translate([door_x, -explode_offset, door_z]) {
        // Door panel
        color(color_panel)
        cube([door_width, panel_thickness, door_height]);

        // Door frame
        color(color_frame) {
            cube([door_width, frame_size/2, frame_size/2]);
            translate([0, 0, door_height - frame_size/2])
            cube([door_width, frame_size/2, frame_size/2]);
            cube([frame_size/2, frame_size/2, door_height]);
            translate([door_width - frame_size/2, 0, 0])
            cube([frame_size/2, frame_size/2, door_height]);
        }

        // Gasket (green line around perimeter)
        color([0.2, 0.8, 0.2]) {
            cube([door_width, 3, 5]);
            translate([0, 0, door_height - 5])
            cube([door_width, 3, 5]);
            cube([5, 3, door_height]);
            translate([door_width - 5, 0, 0])
            cube([5, 3, door_height]);
        }

        // Compression latches (3 total)
        color([0.7, 0.7, 0.7])
        for (z = [door_height * 0.2, door_height * 0.5, door_height * 0.8]) {
            translate([door_width - 20, -10, z])
            cube([15, 15, 30]);
        }
    }
}

// ============================================================
// EQUIPMENT PLACEHOLDER
// ============================================================

module equipment_placeholder() {
    if (show_equipment) {
        eq_width = internal_width * 0.6;
        eq_depth = internal_depth * 0.6;
        eq_height = internal_height * 0.7;

        translate([
            intake_module_depth + (internal_width - eq_width) / 2,
            intake_module_depth + (internal_depth - eq_depth) / 2,
            frame_size + 50  // On anti-vib mounts
        ]) {
            color(color_equipment) {
                // Main body
                cube([eq_width, eq_depth, eq_height * 0.7]);

                // Top fan shroud
                translate([eq_width * 0.15, eq_depth * 0.15, eq_height * 0.7])
                cylinder(h=eq_height * 0.3, d=eq_width * 0.7, $fn=32);
            }

            // Fan blades indicator
            color([0.4, 0.4, 0.4])
            translate([eq_width * 0.5, eq_depth * 0.5, eq_height])
            cylinder(h=5, d=eq_width * 0.5, $fn=32);
        }
    }
}

// ============================================================
// AIRFLOW ARROWS
// ============================================================

module airflow_arrow(length) {
    color(color_airflow) {
        cylinder(h=length, d=20, $fn=16);
        translate([0, 0, length])
        cylinder(h=30, d1=40, d2=0, $fn=16);
    }
}

module airflow_visualization() {
    if (show_airflow) {
        // Intake arrows (sides)
        translate([-50, external_depth/2, internal_height/2])
        rotate([0, 90, 0])
        airflow_arrow(80);

        translate([external_width + 50, external_depth/2, internal_height/2])
        rotate([0, -90, 0])
        airflow_arrow(80);

        // Vertical arrow (through equipment)
        translate([external_width/2, external_depth/2, internal_height * 0.3])
        airflow_arrow(internal_height * 0.5);

        // Hood exhaust arrows (sides)
        translate([-80, external_depth/2, internal_height + hood_height/2 + frame_size])
        rotate([0, -90, 0])
        airflow_arrow(80);

        translate([external_width + 80, external_depth/2, internal_height + hood_height/2 + frame_size])
        rotate([0, 90, 0])
        airflow_arrow(80);
    }
}

// ============================================================
// ANTI-VIBRATION MOUNTS
// ============================================================

module anti_vib_mount() {
    color([0.2, 0.2, 0.2]) {
        // Base plate
        cylinder(h=5, d=60, $fn=24);
        // Rubber element
        translate([0, 0, 5])
        color([0.3, 0.3, 0.3])
        cylinder(h=30, d=50, $fn=24);
        // Top plate
        translate([0, 0, 35])
        cylinder(h=5, d=60, $fn=24);
    }
}

module anti_vib_mounts() {
    mount_inset = 150;

    translate([intake_module_depth + mount_inset, intake_module_depth + mount_inset, frame_size])
    anti_vib_mount();

    translate([external_width - intake_module_depth - mount_inset, intake_module_depth + mount_inset, frame_size])
    anti_vib_mount();

    translate([intake_module_depth + mount_inset, external_depth - intake_module_depth - mount_inset, frame_size])
    anti_vib_mount();

    translate([external_width - intake_module_depth - mount_inset, external_depth - intake_module_depth - mount_inset, frame_size])
    anti_vib_mount();
}

// ============================================================
// FLAT PANEL LAYOUT (for fabrication)
// ============================================================

module flat_panel_layout() {
    spacing = 50;

    // Back panel
    translate([0, 0, 0])
    color(color_panel)
    cube([external_width - 2*frame_size, internal_height - frame_size, panel_thickness]);

    // Door panel
    translate([external_width + spacing, 0, 0])
    color(color_panel)
    cube([door_width, door_height, panel_thickness]);

    // Side intake module panels (4 total)
    translate([0, internal_height + spacing, 0])
    color(color_louver)
    cube([external_depth - 2*frame_size, internal_height - frame_size, panel_thickness]);

    // Hood ceiling
    translate([external_width + spacing, internal_height + spacing, 0])
    color(color_panel)
    cube([external_width + 100 - 2*(panel_thickness + insulation_thickness),
          external_depth + 100 - 2*(panel_thickness + insulation_thickness),
          panel_thickness]);
}

// ============================================================
// MAIN ASSEMBLY
// ============================================================

module complete_enclosure() {
    base_frame();
    back_panel();
    left_intake_module();
    right_intake_module();
    discharge_hood();
    door();
    equipment_placeholder();
    anti_vib_mounts();
    airflow_visualization();
}

// ============================================================
// RENDER
// ============================================================

if (show_flat_panels) {
    flat_panel_layout();
} else {
    complete_enclosure();
}

// Info text
echo(str("Model: APE-HC-", model_size));
echo(str("Internal: ", internal_width, " x ", internal_depth, " x ", internal_height, " mm"));
echo(str("External: ", external_width, " x ", external_depth, " x ", external_height_total, " mm"));
echo(str("Design Airflow: ", airflow_m3h, " m³/h"));
