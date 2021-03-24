import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Payload from "@/models/Payload";

const state = () => {
  return {
    payloads: [],
    isLoading: false,
    payload: new Payload()
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
