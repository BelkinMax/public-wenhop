import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Rocket from "@/models/Rocket";

const state = () => {
  return {
    rockets: [],
    isLoading: false,
    rocket: new Rocket()
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
