const SPACEX_BASE = "https://api.spacexdata.com/v4";
const WEATHER_BASE = "https://api.stormglass.io/v2";

const LAUNCHES = SPACEX_BASE + "/launches";
const ROCKETS = SPACEX_BASE + "/rockets";
const PAYLOADS = SPACEX_BASE + "/payloads";
const LAUNCHPADS = SPACEX_BASE + "/launchpads";

const WEATHER = WEATHER_BASE + "/weather";

const ApiRoutes = {
  // Spacex
  Launches: {
    GetAllLaunches: LAUNCHES,
    GetOneLaunch: id => `${LAUNCHES}/${id}`,
    GetPastLaunches: `${LAUNCHES}/past`,
    GetUpcomingLaunches: `${LAUNCHES}/upcoming`,
    GetLatestLaunch: `${LAUNCHES}/latest`,
    GetNextLaunch: `${LAUNCHES}/next`
  },
  Rockets: {
    GetAllRockets: ROCKETS,
    GetOneRocket: id => `${ROCKETS}/${id}`
  },
  Payloads: {
    GetAllPayloads: PAYLOADS,
    GetOnePayload: id => `${PAYLOADS}/${id}`
  },
  Launchpads: {
    GetAllLaunchpads: LAUNCHPADS,
    GetOneLaunchpad: id => `${LAUNCHPADS}/${id}`
  },
  // Weather
  Weather: {
    GetWeather: data =>
      `${WEATHER}/point?lat=${data.lat}&lng=${data.lon}&params=${data.params}&start=${data.utcDate}&end=${data.utcDate}`
  }
};

export default ApiRoutes;
