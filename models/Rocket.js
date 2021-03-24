class Rocket {
  height = {
    meters: 0,
    feet: 0
  };

  diameter = {
    meters: 0,
    feet: 0
  };

  mass = {
    kg: 0,
    lb: 0
  };

  first_stage = {
    thrust_sea_level: {
      kN: 0,
      lbf: 0
    },
    thrust_vacuum: {
      kN: 0,
      lbf: 0
    },
    reusable: false,
    engines: 0,
    fuel_amount_tons: 0,
    burn_time_sec: 0
  };

  second_stage = {
    thrust: {
      kN: 0,
      lbf: 0
    },
    payloads: {
      composite_fairing: {
        height: {
          meters: 0,
          feet: 0
        },
        diameter: {
          meters: 0,
          feet: 0
        }
      },
      option_1: ""
    },
    reusable: false,
    engines: 0,
    fuel_amount_tons: 0,
    burn_time_sec: 0
  };

  engines = {
    isp: {
      sea_level: 0,
      vacuum: 0
    },
    thrust_sea_level: {
      kN: 0,
      lbf: 0
    },
    thrust_vacuum: {
      kN: 0,
      lbf: 0
    },
    number: 0,
    type: "",
    version: "",
    layout: "",
    engine_loss_max: 0,
    propellant_1: "",
    propellant_2: "",
    thrust_to_weight: 0
  };

  landing_legs = {
    number: 0,
    material: null
  };

  payload_weights = [
    {
      id: "",
      name: "",
      kg: 0,
      lb: 0
    }
  ];

  flickr_images = [];

  name = "";

  type = "";

  active = false;

  stages = 0;

  boosters = 0;

  cost_per_launch = 0;

  success_rate_pct = 0;

  first_flight = "";

  country = "";

  company = "";

  wikipedia = "";

  description = "";

  id = "";

  constructor(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        this[key] = attributes[key];
      });
    }
  }
}

export default Rocket;
