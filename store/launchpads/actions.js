import ApiRoutes from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async getLaunchpads({ commit }, params) {
    commit("SET_LAUNCHPADS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Launchpads.GetAllLaunchpads, { params })
      .then(data => {
        commit("SET_LAUNCHPADS", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_LAUNCHPADS_LOADING", false);
      });
  },

  async getLaunchpad({ commit }, id) {
    commit("SET_LAUNCHPADS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Launchpads.GetOneLaunchpad(id))
      .then(data => {
        commit("SET_LAUNCHPAD", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_LAUNCHPADS_LOADING", false);
      });
  }
};
