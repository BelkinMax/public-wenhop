import ApiRoutes from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async getLaunches({ commit }, params) {
    commit("SET_LAUNCHES_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Launches.GetAllLaunches, { params })
      .then(data => {
        commit("SET_LAUNCHES", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_LAUNCHES_LOADING", false);
      });
  },

  async getLaunch({ commit }, id) {
    commit("SET_LAUNCHES_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Launches.GetOneLaunch(id))
      .then(data => {
        commit("SET_LAUNCH", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_LAUNCHES_LOADING", false);
      });
  },

  async getNextLaunch({ commit }, params) {
    commit("SET_LAUNCHES_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Launches.GetNextLaunch, { params })
      .then(data => {
        commit("SET_NEXT_LAUNCH", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_LAUNCHES_LOADING", false);
      });
  }
};
