import ApiRoutes from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async getRockets({ commit }, params) {
    commit("SET_ROCKETS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Rockets.GetAllRockets, { params })
      .then(data => {
        commit("SET_ROCKETS", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_ROCKETS_LOADING", false);
      });
  },

  async getRocket({ commit }, id) {
    commit("SET_ROCKETS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Rockets.GetOneRocket(id))
      .then(data => {
        commit("SET_ROCKET", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_ROCKETS_LOADING", false);
      });
  }
};
