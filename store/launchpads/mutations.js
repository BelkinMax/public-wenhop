import Launchpad from "@/models/Launchpad";

const SET_LAUNCHPADS = (state, data) => {
  data.forEach(launchpad => {
    state.launchpads.push(new Launchpad(launchpad));
  });
};

const SET_LAUNCHPAD = (state, data) => {
  state.launchpad = new Launchpad(data);
};

const SET_LAUNCHPADS_LOADING = (state, data) => {
  state.isLoading = data;
};

export default {
  SET_LAUNCHPADS,
  SET_LAUNCHPAD,
  SET_LAUNCHPADS_LOADING
};
