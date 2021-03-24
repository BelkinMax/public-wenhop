import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

const state = () => {
  return {
    weather: {},
    isLoading: false
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
