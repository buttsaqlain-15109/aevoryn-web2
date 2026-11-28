/**
 * AEVORYN 3D DOTTED GLOBE ENGINE
 * High-performance HTML Canvas 3D Fibonacci sphere with geographic landmass sampling,
 * registered facility beacon, atmospheric rim glow, and inertia rotation.
 */

export interface GlobePoint {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  isLand: boolean;
  size: number;
}

export interface GlobeConfig {
  pointCount?: number;
  radius?: number;
  baseColor?: string;
  landColor?: string;
  oceanColor?: string;
  glowColor?: string;
  beaconColor?: string;
  tiltAngle?: number;
  autoRotateSpeed?: number;
  isDarkTheme?: boolean;
}

/**
 * Checks if a given latitude and longitude falls on earth continental landmasses.
 * Uses a polygon/bounding box classifier optimized for global continental resolution.
 */
export function isLandCoordinate(lat: number, lng: number): boolean {
  // Normalize longitude to [-180, 180]
  let nLng = lng;
  while (nLng > 180) nLng -= 360;
  while (nLng < -180) nLng += 360;

  // 1. Arabian Peninsula & Middle East (Crucial precision)
  if (lat >= 12 && lat <= 33 && nLng >= 34 && nLng <= 60) return true;
  if (lat >= 20 && lat <= 42 && nLng >= 25 && nLng <= 65) return true; // Levant & Anatolia

  // 2. Africa
  if (lat >= -35 && lat <= 37 && nLng >= -18 && nLng <= 52) {
    if (lat > 10 && nLng < -15) return false;
    if (lat < -10 && nLng > 42) return false;
    return true;
  }

  // 3. Europe
  if (lat >= 36 && lat <= 71 && nLng >= -10 && nLng <= 40) return true;
  if (lat >= 50 && lat <= 71 && nLng >= 40 && nLng <= 65) return true;

  // 4. Asia (Central, South, East, Southeast)
  if (lat >= 5 && lat <= 75 && nLng >= 60 && nLng <= 145) {
    if (lat < 10 && nLng < 95) return false; // Indian Ocean
    return true;
  }
  if (lat >= -10 && lat <= 15 && nLng >= 95 && nLng <= 142) return true; // Indonesia/Malay archipelago

  // 5. North America
  if (lat >= 15 && lat <= 72 && nLng >= -168 && nLng <= -52) {
    if (lat < 25 && nLng < -105) return false;
    return true;
  }

  // 6. South America
  if (lat >= -56 && lat <= 13 && nLng >= -82 && nLng <= -34) {
    if (lat < -40 && nLng > -60) return false;
    return true;
  }

  // 7. Australia
  if (lat >= -44 && lat <= -10 && nLng >= 112 && nLng <= 154) return true;

  // 8. Scandinavia & Japan
  if (lat >= 30 && lat <= 46 && nLng >= 129 && nLng <= 146) return true; // Japan
  if (lat >= 55 && lat <= 71 && nLng >= 4 && nLng <= 32) return true; // Norway/Sweden

  return false;
}

/**
 * Generates Fibonacci spherical distribution of points with landmass classification
 */
export function generateGlobePoints(count: number = 2800): GlobePoint[] {
  const points: GlobePoint[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // From 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Convert cartesian unit vector to Lat/Lng
    const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
    const lng = Math.atan2(x, z) * (180 / Math.PI);

    const isLand = isLandCoordinate(lat, lng);

    points.push({
      x,
      y,
      z,
      lat,
      lng,
      isLand,
      size: isLand ? 1.6 : 0.7,
    });
  }

  return points;
}

/**
 * Converts registered Baish facility coordinates (17.37° N, 42.53° E) to unit sphere vector
 */
export function getFacilityCoordinates(): { x: number; y: number; z: number } {
  const latRad = 17.37 * (Math.PI / 180);
  const lngRad = 42.53 * (Math.PI / 180);

  const y = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const x = cosLat * Math.sin(lngRad);
  const z = cosLat * Math.cos(lngRad);

  return { x, y, z };
}
