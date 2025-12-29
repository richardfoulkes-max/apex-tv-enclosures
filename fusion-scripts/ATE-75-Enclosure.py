# ATE-75 Outdoor TV Enclosure - Fusion 360 Script
# Apex Enclosures v3.0 Front-Breathing Design
#
# HOW TO USE:
# 1. In Fusion 360: Utilities menu → Scripts and Add-Ins
# 2. Click "+" next to My Scripts → Create New Script → Python
# 3. Name it "ATE-75-Enclosure"
# 4. Replace the default code with this entire script
# 5. Click Run
#
# The script will create a complete parametric model of the enclosure.

import adsk.core, adsk.fusion, traceback
import math

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        # Create a new component for the enclosure
        occurrence = rootComp.occurrences.addNewComponent(adsk.core.Matrix3D.create())
        enclosure = occurrence.component
        enclosure.name = "ATE-75 Enclosure"

        # ============================================
        # PARAMETERS (all in cm - Fusion default unit)
        # Modify these to change the design
        # ============================================

        # Overall dimensions (mm converted to cm)
        WIDTH = 176.0       # 1760mm - external width
        HEIGHT = 104.0      # 1040mm - external height
        DEPTH = 12.0        # 120mm - external depth

        # Frame construction
        BEZEL_WIDTH = 3.5   # 35mm bezel width
        WALL_THICK = 0.3    # 3mm aluminum wall thickness

        # Air channel
        AIR_GAP = 2.5       # 25mm gap between glass and TV

        # Airflow slots
        INTAKE_SLOT_WIDTH = 170.0   # 1700mm intake slot length
        INTAKE_SLOT_HEIGHT = 1.5    # 15mm intake slot height
        EXHAUST_SLOT_WIDTH = 170.0  # 1700mm exhaust slot length
        EXHAUST_SLOT_HEIGHT = 2.0   # 20mm exhaust slot height

        # Fan specifications (4x 60mm fans in top bezel)
        FAN_COUNT = 4
        FAN_DIAMETER = 6.0   # 60mm fans
        FAN_DEPTH = 1.5      # 15mm slim fans

        # VESA mount (600x400 pattern for 75" TV)
        VESA_H = 60.0        # 600mm horizontal
        VESA_V = 40.0        # 400mm vertical
        VESA_HOLE = 0.8      # M8 holes

        # Glass thickness
        GLASS_THICK = 0.6    # 6mm tempered glass

        # ============================================
        # CREATE MAIN ENCLOSURE BODY
        # ============================================

        sketches = enclosure.sketches
        xyPlane = enclosure.xYConstructionPlane

        # --- Outer Shell ---
        sketchOuter = sketches.add(xyPlane)

        # Draw outer rectangle
        lines = sketchOuter.sketchCurves.sketchLines
        rect = lines.addTwoPointRectangle(
            adsk.core.Point3D.create(-WIDTH/2, -HEIGHT/2, 0),
            adsk.core.Point3D.create(WIDTH/2, HEIGHT/2, 0)
        )

        # Extrude outer shell
        prof = sketchOuter.profiles.item(0)
        extrudes = enclosure.features.extrudeFeatures
        extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeature)
        distance = adsk.core.ValueInput.createByReal(DEPTH)
        extInput.setDistanceExtent(False, distance)
        outerBody = extrudes.add(extInput)
        outerBody.name = "Outer Shell"

        # --- Create Inner Cavity (hollow out) ---
        # Create sketch on front face
        frontFace = None
        for face in outerBody.bodies.item(0).faces:
            normal = face.geometry.normal
            if abs(normal.z - 1.0) < 0.01:  # Front face
                frontFace = face
                break

        if frontFace:
            sketchInner = sketches.add(frontFace)
            linesInner = sketchInner.sketchCurves.sketchLines

            # Inner rectangle (leaving bezel width on all sides)
            innerRect = linesInner.addTwoPointRectangle(
                adsk.core.Point3D.create(-WIDTH/2 + BEZEL_WIDTH, -HEIGHT/2 + BEZEL_WIDTH, 0),
                adsk.core.Point3D.create(WIDTH/2 - BEZEL_WIDTH, HEIGHT/2 - BEZEL_WIDTH, 0)
            )

            # Extrude cut (leave back wall)
            profInner = sketchInner.profiles.item(0)
            cutInput = extrudes.createInput(profInner, adsk.fusion.FeatureOperations.CutFeature)
            cutDistance = adsk.core.ValueInput.createByReal(DEPTH - WALL_THICK)
            cutInput.setDistanceExtent(False, cutDistance)
            extrudes.add(cutInput)

        # ============================================
        # BOTTOM BEZEL - INTAKE SLOT
        # ============================================

        # Find bottom face of bezel
        bottomSketch = sketches.add(xyPlane)
        bottomLines = bottomSketch.sketchCurves.sketchLines

        # Intake slot centered on bottom bezel
        slotLeft = -INTAKE_SLOT_WIDTH / 2
        slotRight = INTAKE_SLOT_WIDTH / 2
        slotBottom = -HEIGHT/2 + (BEZEL_WIDTH - INTAKE_SLOT_HEIGHT) / 2
        slotTop = slotBottom + INTAKE_SLOT_HEIGHT

        intakeSlot = bottomLines.addTwoPointRectangle(
            adsk.core.Point3D.create(slotLeft, slotBottom, 0),
            adsk.core.Point3D.create(slotRight, slotTop, 0)
        )

        # Extrude cut through bezel
        if bottomSketch.profiles.count > 0:
            slotProf = bottomSketch.profiles.item(0)
            slotCut = extrudes.createInput(slotProf, adsk.fusion.FeatureOperations.CutFeature)
            slotCut.setDistanceExtent(False, adsk.core.ValueInput.createByReal(DEPTH))
            extrudes.add(slotCut)

        # ============================================
        # TOP BEZEL - EXHAUST SLOT
        # ============================================

        topSketch = sketches.add(xyPlane)
        topLines = topSketch.sketchCurves.sketchLines

        # Exhaust slot centered on top bezel
        exSlotLeft = -EXHAUST_SLOT_WIDTH / 2
        exSlotRight = EXHAUST_SLOT_WIDTH / 2
        exSlotBottom = HEIGHT/2 - (BEZEL_WIDTH + EXHAUST_SLOT_HEIGHT) / 2
        exSlotTop = exSlotBottom + EXHAUST_SLOT_HEIGHT

        exhaustSlot = topLines.addTwoPointRectangle(
            adsk.core.Point3D.create(exSlotLeft, exSlotBottom, 0),
            adsk.core.Point3D.create(exSlotRight, exSlotTop, 0)
        )

        # Extrude cut through bezel
        if topSketch.profiles.count > 0:
            exSlotProf = topSketch.profiles.item(0)
            exSlotCut = extrudes.createInput(exSlotProf, adsk.fusion.FeatureOperations.CutFeature)
            exSlotCut.setDistanceExtent(False, adsk.core.ValueInput.createByReal(DEPTH))
            extrudes.add(exSlotCut)

        # ============================================
        # FAN MOUNTING HOLES (4x 60mm in top bezel)
        # ============================================

        # Create construction plane at back of top bezel
        backPlane = enclosure.xYConstructionPlane
        fanSketch = sketches.add(backPlane)
        fanCircles = fanSketch.sketchCurves.sketchCircles

        # Space fans evenly across top bezel
        fanSpacing = EXHAUST_SLOT_WIDTH / (FAN_COUNT + 1)
        fanY = HEIGHT/2 - BEZEL_WIDTH/2  # Center of top bezel

        for i in range(FAN_COUNT):
            fanX = -EXHAUST_SLOT_WIDTH/2 + fanSpacing * (i + 1)
            center = adsk.core.Point3D.create(fanX, fanY, 0)
            fanCircles.addByCenterRadius(center, FAN_DIAMETER/2)

        # Cut fan holes (partial depth into bezel)
        for j in range(fanSketch.profiles.count):
            fanProf = fanSketch.profiles.item(j)
            fanCut = extrudes.createInput(fanProf, adsk.fusion.FeatureOperations.CutFeature)
            fanCut.setDistanceExtent(False, adsk.core.ValueInput.createByReal(FAN_DEPTH))
            extrudes.add(fanCut)

        # ============================================
        # VESA MOUNT PATTERN (on rear panel)
        # ============================================

        # Create sketch on back face (Z = 0)
        vesaSketch = sketches.add(xyPlane)
        vesaCircles = vesaSketch.sketchCurves.sketchCircles

        # 4 mounting holes in VESA 600x400 pattern
        vesaPositions = [
            (-VESA_H/2, -VESA_V/2),
            (VESA_H/2, -VESA_V/2),
            (-VESA_H/2, VESA_V/2),
            (VESA_H/2, VESA_V/2)
        ]

        for pos in vesaPositions:
            center = adsk.core.Point3D.create(pos[0], pos[1], 0)
            vesaCircles.addByCenterRadius(center, VESA_HOLE/2)

        # Cut VESA holes through back panel
        for k in range(vesaSketch.profiles.count):
            vesaProf = vesaSketch.profiles.item(k)
            vesaCut = extrudes.createInput(vesaProf, adsk.fusion.FeatureOperations.CutFeature)
            vesaCut.setDistanceExtent(False, adsk.core.ValueInput.createByReal(WALL_THICK))
            extrudes.add(vesaCut)

        # ============================================
        # GLASS PANEL (separate body)
        # ============================================

        glassSketch = sketches.add(xyPlane)
        glassLines = glassSketch.sketchCurves.sketchLines

        # Glass fits inside bezel
        glassRect = glassLines.addTwoPointRectangle(
            adsk.core.Point3D.create(-WIDTH/2 + BEZEL_WIDTH + 0.2, -HEIGHT/2 + BEZEL_WIDTH + 0.2, 0),
            adsk.core.Point3D.create(WIDTH/2 - BEZEL_WIDTH - 0.2, HEIGHT/2 - BEZEL_WIDTH - 0.2, 0)
        )

        # Extrude glass (positioned at front)
        if glassSketch.profiles.count > 0:
            glassProf = glassSketch.profiles.item(0)
            glassExt = extrudes.createInput(glassProf, adsk.fusion.FeatureOperations.NewBodyFeature)
            glassExt.setDistanceExtent(False, adsk.core.ValueInput.createByReal(GLASS_THICK))

            # Offset to front position
            startOffset = adsk.fusion.OffsetStartDefinition.create(adsk.core.ValueInput.createByReal(DEPTH - GLASS_THICK - 0.1))
            glassExt.startExtent = startOffset

            glassBody = extrudes.add(glassExt)
            if glassBody.bodies.count > 0:
                glassBody.bodies.item(0).name = "Glass Panel"

        # ============================================
        # FINISH UP
        # ============================================

        # Zoom to fit
        viewport = app.activeViewport
        viewport.fit()

        # Success message
        ui.messageBox(
            'ATE-75 Enclosure created successfully!\n\n' +
            'Dimensions: 1760 x 1040 x 120mm\n' +
            'Features:\n' +
            '- Front-breathing design\n' +
            '- Bottom intake slot (1700x15mm)\n' +
            '- Top exhaust slot with 4x 60mm fan holes\n' +
            '- VESA 600x400 mount pattern\n' +
            '- 6mm glass panel\n\n' +
            'Tip: Use Modify > Appearance to add materials',
            'Apex Enclosures'
        )

    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))

def stop(context):
    pass
