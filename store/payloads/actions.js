import ApiRoutes from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async getPayloads({ commit }, params) {
    commit("SET_PAYLOADS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Payloads.GetAllPayloads, { params })
      .then(data => {
        commit("SET_PAYLOADS", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_PAYLOADS_LOADING", false);
      });
  },

  async getPayload({ commit }, id) {
    commit("SET_PAYLOADS_LOADING", true);

    await this.$axios
      .get(ApiRoutes.Payloads.GetOnePayload(id))
      .then(data => {
        commit("SET_PAYLOAD", data.data);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_PAYLOADS_LOADING", false);
      });
  }
};
