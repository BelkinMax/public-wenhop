<template>
  <section>
    <v-list>
      <v-list-item>
        <v-list-item-title class="d-flex justify-center">
          <v-chip color="green" small light label class="mr-3"> Success</v-chip>
          <v-chip color="red" small light label class="mr-3"> Failure</v-chip>
          <v-chip color="white" small light label class="mr-3">
            Upcoming</v-chip
          ></v-list-item-title
        >
      </v-list-item>
    </v-list>
    <v-list v-if="launchesAreLoaded">
      <v-list-group v-for="year in yearsList" :key="year" v-if="launches[year]">
        <template v-slot:activator>
          <v-list-item-title>
            <v-chip
              v-if="launchesStatus[year].all.success"
              color="green"
              small
              light
              label
              class="mr-3"
            >
              {{ launchesStatus[year].all.success }}</v-chip
            >
            <v-chip
              v-if="launchesStatus[year].all.failures"
              color="red"
              small
              light
              label
              class="mr-3"
            >
              {{ launchesStatus[year].all.failures }}</v-chip
            >
            <v-chip
              v-if="launchesStatus[year].all.upcoming"
              color="white"
              small
              light
              label
              class="mr-3"
            >
              {{ launchesStatus[year].all.upcoming }}</v-chip
            >{{ year }}</v-list-item-title
          >
        </template>

        <v-list-group
          v-for="(list, month) in launches[year]"
          :key="month"
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip
                  v-if="launchesStatus[year][month].success"
                  color="green"
                  small
                  light
                  label
                  class="mr-3"
                >
                  {{ launchesStatus[year][month].success }}</v-chip
                >
                <v-chip
                  v-if="launchesStatus[year][month].failures"
                  color="red"
                  small
                  light
                  label
                  class="mr-3"
                >
                  {{ launchesStatus[year][month].failures }}</v-chip
                >
                <v-chip
                  v-if="launchesStatus[year][month].upcoming"
                  color="white"
                  small
                  light
                  label
                  class="mr-3"
                >
                  {{ launchesStatus[year][month].upcoming }}</v-chip
                >
                {{ monthName(month) }}</v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-row class="mt-2 mb-2 ml-2 mr-2">
            <v-col class="col" v-for="(item, idx) in list" :key="idx">
              <v-card class="mx-auto" light height="100%">
                <v-card-title class="headline mb-1">
                  {{ item.name }}
                </v-card-title>

                <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <td>
                            {{ date(item).day }} {{ date(item).month }}
                            {{ date(item).year }}
                          </td>
                        </tr>
                        <tr v-if="!item.upcoming">
                          <th>Status</th>
                          <td>{{ item.success ? "Success" : "Failure" }}</td>
                        </tr>
                        <tr v-else>
                          <th>Status</th>
                          <td>Upcoming</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text>
                    <!-- :href="`/calendar/${item.id}`" -->
                    Details
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    v-show="!showDetails.some(i => i === item.id)"
                    icon
                    @click="openCard(item.id)"
                  >
                    <v-icon>{{ "mdi-chevron-down" }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-divider></v-divider>
                <v-expand-transition>
                  <div v-show="showDetails.some(i => i === item.id)">
                    <v-divider></v-divider>

                    <v-card-text>
                      {{ item.details }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-list-group>
      </v-list-group>
    </v-list>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Utils from "@/helpers/Utils.js";
// import Launch from "~/models/Launch";

export default {
  data() {
    return {
      launches: {},
      launchesStatus: {},
      yearsList: [],
      launchesAreLoaded: false,
      showDetails: []
    };
  },
  async created() {
    await this.getLaunches();
    this.setLaunches();
  },
  methods: {
    ...mapActions("launches", ["getLaunches"]),

    monthName(month) {
      return Utils.getMonthName(month);
    },

    openCard(id) {
      this.showDetails.push(id);
    },

    date(launch) {
      const date = new Date(launch.date_utc);

      return {
        day: date.getDate(),
        month: Utils.getMonthName(date.getMonth()),
        year: date.getFullYear(),
        hours: ("0" + Math.floor(date.getHours())).slice(-2),
        minutes: ("0" + Math.floor(date.getMinutes())).slice(-2)
      };
    },

    setLaunches() {
      this.allLaunches.map(launch => {
        const year = new Date(launch.date_utc).getFullYear();
        const monthIdx = new Date(launch.date_utc).getMonth();

        if (!this.launches[year]) {
          this.launches[year] = {};
          this.launchesStatus[year] = {};

          this.launches[year][monthIdx] = [launch];

          if (launch.upcoming) {
            this.launchesStatus[year][monthIdx] = {
              success: 0,
              failures: 0,
              upcoming: 1
            };
            this.launchesStatus[year].all = {
              success: 0,
              failures: 0,
              upcoming: 1
            };
          } else if (launch.success) {
            this.launchesStatus[year][monthIdx] = {
              success: 1,
              failures: 0,
              upcoming: 0
            };
            this.launchesStatus[year].all = {
              success: 1,
              failures: 0,
              upcoming: 0
            };
          } else {
            this.launchesStatus[year][monthIdx] = {
              success: 0,
              failures: 1,
              upcoming: 0
            };
            this.launchesStatus[year].all = {
              success: 0,
              failures: 1,
              upcoming: 0
            };
          }

          this.yearsList.unshift(year);
        } else if (this.launches[year][monthIdx]) {
          this.launches[year][monthIdx].push(launch);

          if (launch.upcoming) {
            this.launchesStatus[year][monthIdx].upcoming++;
            this.launchesStatus[year].all.upcoming++;
          } else if (launch.success) {
            this.launchesStatus[year][monthIdx].success++;
            this.launchesStatus[year].all.success++;
          } else {
            this.launchesStatus[year][monthIdx].failures++;
            this.launchesStatus[year].all.failures++;
          }
        } else {
          this.launches[year][monthIdx] = [launch];

          if (launch.upcoming) {
            this.launchesStatus[year][monthIdx] = {
              success: 0,
              failures: 0,
              upcoming: 1
            };
            this.launchesStatus[year].all.upcoming++;
          } else if (launch.success) {
            this.launchesStatus[year][monthIdx] = {
              success: 1,
              failures: 0,
              upcoming: 0
            };
            this.launchesStatus[year].all.success++;
          } else {
            this.launchesStatus[year][monthIdx] = {
              success: 0,
              failures: 1,
              upcoming: 0
            };
            this.launchesStatus[year].all.failures++;
          }
        }
      });

      this.launchesAreLoaded = true;
    }
  },
  computed: {
    ...mapGetters("launches", ["allLaunches"])
  }
};
</script>

<style lang="scss" scoped></style>
