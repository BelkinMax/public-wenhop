import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Launchpad from "@/models/Launchpad";

const state = () => {
  return {
    launchpads: [],
    isLoading: false,
    launchpad: new Launchpad()
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
