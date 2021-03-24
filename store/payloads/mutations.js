import Payload from "@/models/Payload";

const SET_PAYLOADS = (state, data) => {
  data.forEach(payload => {
    state.payloads.push(new Rocket(payload));
  });
};

const SET_PAYLOAD = (state, data) => {
  state.payload = new Payload(data);
};

const SET_PAYLOADS_LOADING = (state, data) => {
  state.isLoading = data;
};

export default {
  SET_PAYLOADS,
  SET_PAYLOAD,
  SET_PAYLOADS_LOADING
};
