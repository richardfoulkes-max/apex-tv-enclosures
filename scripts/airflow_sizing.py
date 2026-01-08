#!/usr/bin/env python3
"""
APE-HC Acoustic Enclosure — Airflow Sizing Calculator

Calculates required outlet areas for acoustic discharge hood and intake modules
based on target free-area velocity to minimize noise and pressure drop.

Usage:
    python airflow_sizing.py [--airflow Q] [--velocity V] [--free-area-ratio R]

    Or import and use functions directly.
"""

import argparse
import math
from dataclasses import dataclass
from typing import Tuple, List


@dataclass
class AirflowResult:
    """Results from airflow sizing calculation."""
    airflow_m3h: float
    airflow_m3s: float
    target_velocity_mps: float
    required_free_area_m2: float
    louver_free_area_ratio: float
    required_face_area_m2: float
    recommended_outlet_width_mm: float
    recommended_outlet_height_mm: float
    actual_free_area_m2: float
    actual_velocity_mps: float
    pressure_drop_estimate_pa: float


def calculate_airflow_sizing(
    Q_airflow_m3h: float,
    target_free_area_velocity_mps: float = 2.0,
    louver_free_area_ratio: float = 0.50,
    num_outlet_sides: int = 2,
    outlet_aspect_ratio: float = 3.0  # height/width
) -> AirflowResult:
    """
    Calculate required outlet areas for acoustic enclosure.

    Args:
        Q_airflow_m3h: Design airflow in cubic meters per hour
        target_free_area_velocity_mps: Maximum velocity through free area (m/s)
        louver_free_area_ratio: Free area / face area for acoustic louvers (typically 0.45-0.55)
        num_outlet_sides: Number of sides the discharge hood vents through (2 or 4)
        outlet_aspect_ratio: Height/width ratio for each outlet

    Returns:
        AirflowResult dataclass with all calculated values
    """
    # Convert airflow to m³/s
    Q_m3s = Q_airflow_m3h / 3600.0

    # Required free area to achieve target velocity
    # A_free = Q / V
    required_free_area_m2 = Q_m3s / target_free_area_velocity_mps

    # Required face area (accounting for louver blockage)
    required_face_area_m2 = required_free_area_m2 / louver_free_area_ratio

    # Divide among outlet sides
    face_area_per_side_m2 = required_face_area_m2 / num_outlet_sides

    # Calculate outlet dimensions using aspect ratio
    # A = W × H, and H = W × aspect_ratio
    # So A = W × W × aspect_ratio = W² × aspect_ratio
    # W = sqrt(A / aspect_ratio)
    outlet_width_m = math.sqrt(face_area_per_side_m2 / outlet_aspect_ratio)
    outlet_height_m = outlet_width_m * outlet_aspect_ratio

    # Convert to mm and round to practical dimensions (nearest 50mm)
    outlet_width_mm = round(outlet_width_m * 1000 / 50) * 50
    outlet_height_mm = round(outlet_height_m * 1000 / 50) * 50

    # Recalculate actual areas with rounded dimensions
    actual_face_area_per_side_m2 = (outlet_width_mm / 1000) * (outlet_height_mm / 1000)
    actual_total_face_area_m2 = actual_face_area_per_side_m2 * num_outlet_sides
    actual_free_area_m2 = actual_total_face_area_m2 * louver_free_area_ratio

    # Actual velocity
    actual_velocity_mps = Q_m3s / actual_free_area_m2

    # Estimate pressure drop (simplified)
    # Using ΔP ≈ 0.5 × ρ × V² × K, where K ≈ 2.5 for acoustic louvers
    air_density = 1.1  # kg/m³ at ~40°C
    K_factor = 2.5  # loss coefficient for acoustic louvers
    pressure_drop_pa = 0.5 * air_density * (actual_velocity_mps ** 2) * K_factor

    return AirflowResult(
        airflow_m3h=Q_airflow_m3h,
        airflow_m3s=Q_m3s,
        target_velocity_mps=target_free_area_velocity_mps,
        required_free_area_m2=required_free_area_m2,
        louver_free_area_ratio=louver_free_area_ratio,
        required_face_area_m2=required_face_area_m2,
        recommended_outlet_width_mm=outlet_width_mm,
        recommended_outlet_height_mm=outlet_height_mm,
        actual_free_area_m2=actual_free_area_m2,
        actual_velocity_mps=actual_velocity_mps,
        pressure_drop_estimate_pa=pressure_drop_pa
    )


def calculate_intake_module(
    Q_airflow_m3h: float,
    target_velocity_mps: float = 2.0,
    louver_free_area_ratio: float = 0.50,
    enclosure_height_mm: float = 1000,
    num_intake_sides: int = 2
) -> dict:
    """
    Calculate intake module dimensions.

    Args:
        Q_airflow_m3h: Design airflow in m³/h
        target_velocity_mps: Target velocity through intake
        louver_free_area_ratio: Free area ratio of weather louvers
        enclosure_height_mm: Height of enclosure (intake louver height)
        num_intake_sides: Number of sides with intake modules (typically 2)

    Returns:
        Dictionary with intake module specifications
    """
    Q_m3s = Q_airflow_m3h / 3600.0

    required_free_area_m2 = Q_m3s / target_velocity_mps
    required_face_area_m2 = required_free_area_m2 / louver_free_area_ratio

    face_area_per_side_m2 = required_face_area_m2 / num_intake_sides

    # Intake height is ~80% of enclosure height (leave margin top/bottom)
    intake_height_mm = enclosure_height_mm * 0.8
    intake_height_m = intake_height_mm / 1000

    # Required width per side
    required_width_m = face_area_per_side_m2 / intake_height_m
    required_width_mm = round(required_width_m * 1000 / 50) * 50

    # Recalculate actual
    actual_face_area_m2 = (required_width_mm / 1000) * intake_height_m * num_intake_sides
    actual_free_area_m2 = actual_face_area_m2 * louver_free_area_ratio
    actual_velocity_mps = Q_m3s / actual_free_area_m2

    return {
        'intake_louver_width_mm': required_width_mm,
        'intake_louver_height_mm': intake_height_mm,
        'num_intake_sides': num_intake_sides,
        'total_face_area_m2': actual_face_area_m2,
        'total_free_area_m2': actual_free_area_m2,
        'actual_velocity_mps': actual_velocity_mps
    }


def print_results(result: AirflowResult, intake: dict = None):
    """Print formatted results."""
    print("\n" + "="*60)
    print("APE-HC ACOUSTIC ENCLOSURE — AIRFLOW SIZING RESULTS")
    print("="*60)

    print(f"\n--- INPUT PARAMETERS ---")
    print(f"  Design Airflow:           {result.airflow_m3h:,.0f} m³/h ({result.airflow_m3s:.3f} m³/s)")
    print(f"  Target Free-Area Velocity: {result.target_velocity_mps:.1f} m/s")
    print(f"  Louver Free-Area Ratio:    {result.louver_free_area_ratio:.0%}")

    print(f"\n--- DISCHARGE HOOD OUTLETS ---")
    print(f"  Required Free Area:        {result.required_free_area_m2:.3f} m²")
    print(f"  Required Face Area:        {result.required_face_area_m2:.3f} m²")
    print(f"  Recommended Outlet Size:   {result.recommended_outlet_width_mm:.0f} × {result.recommended_outlet_height_mm:.0f} mm (per side)")
    print(f"  Actual Free Area:          {result.actual_free_area_m2:.3f} m²")
    print(f"  Actual Velocity:           {result.actual_velocity_mps:.2f} m/s")
    print(f"  Est. Pressure Drop:        {result.pressure_drop_estimate_pa:.1f} Pa")

    if result.actual_velocity_mps <= result.target_velocity_mps:
        print(f"  ✓ Velocity OK (≤{result.target_velocity_mps} m/s)")
    else:
        print(f"  ⚠ Velocity exceeds target! Increase outlet area.")

    if intake:
        print(f"\n--- INTAKE MODULES ---")
        print(f"  Intake Louver Size:        {intake['intake_louver_width_mm']:.0f} × {intake['intake_louver_height_mm']:.0f} mm (per side)")
        print(f"  Number of Intake Sides:    {intake['num_intake_sides']}")
        print(f"  Total Free Area:           {intake['total_free_area_m2']:.3f} m²")
        print(f"  Actual Velocity:           {intake['actual_velocity_mps']:.2f} m/s")

    print("\n" + "="*60 + "\n")


def run_examples():
    """Run example calculations for S/M/L enclosures."""
    print("\n" + "#"*60)
    print("# EXAMPLE CALCULATIONS FOR APE-HC-S / M / L")
    print("#"*60)

    models = [
        {'name': 'APE-HC-S', 'airflow': 3000, 'height': 1000, 'num_outlet_sides': 2},
        {'name': 'APE-HC-M', 'airflow': 5000, 'height': 1000, 'num_outlet_sides': 2},
        {'name': 'APE-HC-L', 'airflow': 8000, 'height': 1100, 'num_outlet_sides': 4},
    ]

    for model in models:
        print(f"\n{'='*60}")
        print(f"MODEL: {model['name']}")
        print(f"{'='*60}")

        result = calculate_airflow_sizing(
            Q_airflow_m3h=model['airflow'],
            target_free_area_velocity_mps=2.0,
            louver_free_area_ratio=0.50,
            num_outlet_sides=model['num_outlet_sides']
        )

        intake = calculate_intake_module(
            Q_airflow_m3h=model['airflow'],
            target_velocity_mps=2.0,
            louver_free_area_ratio=0.50,
            enclosure_height_mm=model['height'],
            num_intake_sides=2
        )

        print_results(result, intake)

    # Summary table
    print("\n" + "="*60)
    print("SUMMARY TABLE")
    print("="*60)
    print(f"{'Model':<12} {'Airflow':<10} {'Free Area':<12} {'Outlet Size':<16} {'Velocity':<10}")
    print(f"{'':12} {'(m³/h)':<10} {'(m²)':<12} {'(mm × mm)':<16} {'(m/s)':<10}")
    print("-"*60)

    for model in models:
        result = calculate_airflow_sizing(
            Q_airflow_m3h=model['airflow'],
            num_outlet_sides=model['num_outlet_sides']
        )
        print(f"{model['name']:<12} {model['airflow']:<10} {result.actual_free_area_m2:<12.3f} "
              f"{result.recommended_outlet_width_mm:.0f}×{result.recommended_outlet_height_mm:.0f}{'':8} "
              f"{result.actual_velocity_mps:<10.2f}")


def main():
    parser = argparse.ArgumentParser(
        description='APE-HC Acoustic Enclosure Airflow Sizing Calculator'
    )
    parser.add_argument(
        '--airflow', '-q', type=float, default=5000,
        help='Design airflow in m³/h (default: 5000)'
    )
    parser.add_argument(
        '--velocity', '-v', type=float, default=2.0,
        help='Target free-area velocity in m/s (default: 2.0)'
    )
    parser.add_argument(
        '--free-area-ratio', '-r', type=float, default=0.50,
        help='Louver free-area ratio (default: 0.50)'
    )
    parser.add_argument(
        '--num-outlets', '-n', type=int, default=2,
        help='Number of outlet sides on discharge hood (default: 2)'
    )
    parser.add_argument(
        '--enclosure-height', '-H', type=float, default=1000,
        dest='height',
        help='Enclosure height in mm for intake calc (default: 1000)'
    )
    parser.add_argument(
        '--examples', '-e', action='store_true',
        help='Run example calculations for S/M/L models'
    )

    args = parser.parse_args()

    if args.examples:
        run_examples()
    else:
        result = calculate_airflow_sizing(
            Q_airflow_m3h=args.airflow,
            target_free_area_velocity_mps=args.velocity,
            louver_free_area_ratio=args.free_area_ratio,
            num_outlet_sides=args.num_outlets
        )

        intake = calculate_intake_module(
            Q_airflow_m3h=args.airflow,
            target_velocity_mps=args.velocity,
            louver_free_area_ratio=args.free_area_ratio,
            enclosure_height_mm=args.height
        )

        print_results(result, intake)


if __name__ == '__main__':
    main()
