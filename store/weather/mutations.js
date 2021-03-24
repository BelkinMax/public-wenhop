const SET_WEATHER = (state, data) => {
  state.weather = data;
};

const SET_WEATHER_LOADING = (state, data) => {
  state.isLoading = data;
};

export default {
  SET_WEATHER,
  SET_WEATHER_LOADING
};
