import getters from "./getters";
import mutations from "./mutations";

const state = () => {
  return {
    autoUpdate: true
  };
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
