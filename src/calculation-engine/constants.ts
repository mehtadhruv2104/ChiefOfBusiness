/**
 * Mild steel density: 7850 kg/m³.
 * Expressed as kg per mm² of cross-section per metre of length, so every
 * linear-shape formula reduces to `area(mm²) * MS_DENSITY_FACTOR`.
 * (7850 kg/m³ * 1 mm² * 1 m length, converted to kg = 7850 / 1e6 = 0.00785)
 */
export const MS_DENSITY_FACTOR = 0.00785

/** Plate/sheet formula constant: kg per m² per mm of thickness. */
export const MS_SHEET_DENSITY_FACTOR = 7.85
