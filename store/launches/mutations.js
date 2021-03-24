import Launch from "@/models/Launch";

const SET_LAUNCHES = (state, data) => {
  data.forEach(launch => {
    state.allLaunches.push(new Launch(launch));
  });
};

const SET_LAUNCH = (state, data) => {
  state.launch = new Launch(data);
};

const SET_NEXT_LAUNCH = (state, data) => {
  state.nextLaunch = new Launch(data);
};

const SET_LAUNCHES_LOADING = (state, data) => {
  state.isLoading = data;
};

const SET_LAUNCH_COUNTDOWN = (state, data) => {
  state.nextLaunchCountdown = data;
};

export default {
  SET_LAUNCHES,
  SET_LAUNCH,
  SET_NEXT_LAUNCH,
  SET_LAUNCHES_LOADING,
  SET_LAUNCH_COUNTDOWN
};
