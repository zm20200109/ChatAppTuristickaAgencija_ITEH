export interface Flight {
  icao24: string;
  callsign: string;
  originCountry: string;
  latitude: number;
  longitude: number;
  baroAltitude: number;
  onGround: boolean;
  velocity: number;
  trueTrack: number;
  verticalRate: number;
  geoAltitude: number;
}
