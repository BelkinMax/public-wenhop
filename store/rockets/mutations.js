import Rocket from "@/models/Rocket";

const SET_ROCKETS = (state, data) => {
  data.forEach(rocket => {
    state.rockets.push(new Rocket(rocket));
  });
};

const SET_ROCKET = (state, data) => {
  state.rocket = new Rocket(data);
};

const SET_ROCKETS_LOADING = (state, data) => {
  state.isLoading = data;
};

export default {
  SET_ROCKETS,
  SET_ROCKET,
  SET_ROCKETS_LOADING
};
