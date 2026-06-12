export function generateGoogleMapsUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function isValidCoordinates(latitude: number, longitude: number): boolean {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}
