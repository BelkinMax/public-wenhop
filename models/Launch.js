class Launch {
  fairings = {
    reused: null,
    recovery_attempt: null,
    recovered: null,
    ships: []
  };

  links = {
    patch: {
      small: "",
      large: ""
    },
    reddit: {
      campaign: "h",
      launch: null,
      media: null,
      recovery: ""
    },
    flickr: {
      small: [],
      original: []
    },
    presskit: null,
    webcast: null,
    youtube_id: null,
    article: null,
    wikipedia: ""
  };

  static_fire_date_utc = null;

  static_fire_date_unix = null;

  tbd = false;

  net = false;

  window = null;

  rocket = "";

  success = null;

  details = null;

  crew = [];

  ships = [];

  capsules = [];

  payloads = [""];

  launchpad = "";

  auto_update = true;

  launch_library_id = "";

  failures = [];

  flight_number = null;

  name = "";

  date_utc = "";

  date_unix = null;

  date_local = "";

  date_precision = "";

  upcoming = true;

  cores = [
    {
      core: null,
      flight: null,
      gridfins: null,
      legs: null,
      reused: null,
      landing_attempt: null,
      landing_success: null,
      landing_type: null,
      landpad: null
    }
  ];

  id = "";

  constructor(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        this[key] = attributes[key];
      });
    }
  }
}

export default Launch;
