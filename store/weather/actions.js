import ApiRoutes from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  // sustained wind at the 162 feet (49 m) foot level of the launch pad in excess of 30 knots (56 km/h; 35 mph) => windSpeed50m
  // upper-level conditions containing wind shear[quantify] that could lead to control problems for the launch vehicle. => ?
  // launch through a cloud layer greater than 4,500 feet (1,400 m) thick that extends into freezing temperatures => cloudCover + airTemperature800hpa
  // launch within 19 kilometres (10 nmi) of cumulus clouds with tops that extend into freezing temperatures,
  // within 19 kilometres (10 nmi) of the edge of a thunderstorm that is producing lightning within 30 minutes after the last lightning is observed.
  // within 19 kilometres (10 nmi) of an attached thunderstorm anvil cloud
  // within 9.3 kilometres (5 nmi) of disturbed weather clouds that extend into freezing temperatures
  // within 5.6 kilometres (3 nmi) of a thunderstorm debris cloud,
  // through cumulus clouds formed as the result of or directly attached to a smoke plume,

  async getWeather({ commit }, location) {
    commit("SET_WEATHER_LOADING", true);

    const fullDate = location.date.split("T");

    const date = fullDate[0].split("-");
    const time = fullDate[1].split(":");

    const params = {
      lat: location.lat,
      lon: location.lon,
      params:
        "windSpeed,windSpeed800hpa,airTemperature,airTemperature800hpa,precipitation,visibility,cloudCover",
      utcDate: Date.UTC(date[0], +date[1] - 1, date[2], time[0]) / 1000
    };

    await this.$axios
      .get(ApiRoutes.Weather.GetWeather(params), {
        headers: {
          Authorization: process.env.weatherKey
        }
      })
      .then(data => {
        commit("SET_WEATHER", data.data.hours[0]);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        commit("SET_WEATHER_LOADING", false);
      });
  }
};
