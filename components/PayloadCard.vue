<template>
  <v-card class="mx-auto" height="100%">
    <v-card-title>Payload</v-card-title>
    <v-card-subtitle>Orbit: {{ orbit }}</v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <v-list-group
            v-for="(item, idx) in payloadsList"
            :key="item.id"
            :prepend-icon="'mdi-satellite-variant'"
            no-action
            :value="idx === 0"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <th>Type</th>
                    <td>{{ item.type }}</td>
                  </tr>
                  <tr>
                    <th>Customer</th>
                    <td>{{ item.customers.join(", ") }}</td>
                  </tr>
                  <tr>
                    <th>Manufacturer</th>
                    <td>{{ item.manufacturers.join(", ") }}</td>
                  </tr>
                  <tr>
                    <th>Mass</th>
                    <td>{{ item.mass_kg }} kg</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    payloadsList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      orbits: {
        VLEO: "Very low Earth orbit",
        ISS: "International Space Station",
        LEO: "Low Earth orbit",
        PO: "Polar orbit",
        GTO: "Geostationary transfer orbit",
        "ES-L1": "L1 Lagrange point",
        SSO: "Sun-synchronous orbit",
        HCO: "Heliocentric orbit",
        HEO: "Highly elliptical orbit",
        MEO: "Medium Earth orbit",
        SO: "Sun-synchronous orbit",
        TLI: "Trans-lunar injection"
      }
    };
  },
  computed: {
    orbit() {
      const orbitAbbr = this.payloadsList[0].orbit;

      if (this.orbits[orbitAbbr]) {
        return this.orbits[orbitAbbr];
      }

      return orbitAbbr;
    }
  }
};
</script>

<style lang="scss" scoped></style>
