<template>
  <div>
    <v-card-title>{{ launchpad.locality }}</v-card-title>
    <v-card-subtitle>Launch day forecast</v-card-subtitle>
    <v-row>
      <v-col>
        <v-simple-table dense class="mb-3">
          <template v-slot:default>
            <tbody>
              <tr>
                <th>Temperature at sea level</th>
                <td>{{ weather.airTemperature.noaa.toFixed(1) }}&deg;C</td>
              </tr>
              <tr>
                <th>Wind at sea level</th>
                <td>{{ weather.windSpeed.noaa }} m/s</td>
              </tr>
              <tr>
                <th>Temperature at 1400m alt.</th>
                <td>
                  {{ weather.airTemperature800hpa.noaa.toFixed(1) }}&deg;C
                </td>
              </tr>
              <tr>
                <th>Wind at 1400m alt.</th>
                <td>{{ weather.windSpeed800hpa.noaa }} m/s</td>
              </tr>
              <tr>
                <th>Cloud cover</th>
                <td>{{ weather.cloudCover.noaa }} %</td>
              </tr>
              <tr>
                <th>Precipitation</th>
                <td>{{ weather.precipitation.noaa }} kg/m²</td>
              </tr>
              <tr>
                <th>Horizontal visibility</th>
                <td>{{ weather.visibility.noaa }} km</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("launchpads", ["launchpad"]),

    getVisibility() {
      for (let i = 0; i <= this.visibility.values.length; i++) {
        if (this.weather.visibility >= this.visibility.values[i]) {
          return this.visibility.labels[i];
        }
      }
    },

    getWind() {
      return ((this.weather.wind.speed * (60 * 60)) / 1000).toFixed(1);
    }
  }
};
</script>
