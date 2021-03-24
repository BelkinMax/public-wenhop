const allLaunches = state => {
  return state.allLaunches;
};

const launch = state => {
  return state.launch;
};

const nextLaunch = state => {
  return state.nextLaunch;
};

const nextLaunchCountdown = state => {
  return state.nextLaunchCountdown;
};

export default {
  allLaunches,
  launch,
  nextLaunch,
  nextLaunchCountdown
};
