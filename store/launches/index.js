import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Launch from "@/models/Launch";

const state = () => {
  return {
    isLoading: false,
    allLaunches: [],
    launch: new Launch(),
    nextLaunch: new Launch(),
    nextLaunchCountdown: {}
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
