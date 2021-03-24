class Launchpad {
  name = "";

  full_name = "";

  locality = "";

  region = "";

  timezone = "";

  latitude = null;

  longitude = null;

  launch_attempts = null;

  launch_successes = null;

  rockets = [];

  launches = [];

  details = "";

  status = "";

  id = "";

  constructor(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        this[key] = attributes[key];
      });
    }
  }
}

export default Launchpad;
