class Payload {
  dragon = {
    capsule: null,
    mass_returned_kg: null,
    mass_returned_lbs: null,
    flight_time_sec: null,
    manifest: null,
    water_landing: null,
    land_landing: null
  };

  name = "";

  type = "";

  reused = false;

  launch = "";

  customers = [];

  norad_ids = [];

  nationalities = [];

  manufacturers = [];

  mass_kg = null;

  mass_lbs = null;

  orbit = "";

  reference_system = "";

  regime = "";

  longitude = null;

  semi_major_axis_km = null;

  eccentricity = null;

  periapsis_km = null;

  apoapsis_km = null;

  inclination_deg = null;

  period_min = null;

  lifespan_years = null;

  epoch = null;

  mean_motion = null;

  raan = null;

  arg_of_pericenter = null;

  mean_anomaly = null;

  id = "";

  constructor(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        this[key] = attributes[key];
      });
    }
  }
}

export default Payload;
