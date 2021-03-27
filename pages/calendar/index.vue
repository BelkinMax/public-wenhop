<template>
  <section>
    <v-sheet tile class="d-flex mb-4">
      <v-row dense>
        <v-col>
          <v-select
            v-model="filters.year"
            ref="year"
            :items="select.years"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Year"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="filters.month"
            ref="month"
            :items="select.months"
            :disabled="filters.year === 'All'"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Month"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="filters.rocket"
            :items="select.rockets"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Rocket"
          ></v-select>
        </v-col>
        <!-- <v-col>
          <v-select
            v-model="filters.payload"
            :items="select.payloads"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Payload"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="filters.status"
            :items="select.statuses"
            dense
            outlined
            hide-details
            label="Status"
            class="ma-2"
          ></v-select> -->
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mb-4">
      <v-chip-group multiple show-arrows class="pa-2">
        <v-chip small outlined>
          {{ filteredLaunches.length }} results found:
        </v-chip>

        <v-chip
          v-for="launch in filteredLaunches"
          :key="launch.id"
          small
          :color="getEventColor(launch)[0]"
          text-color="white"
          @click="focusDate(launch)"
        >
          {{ launch.name }}
        </v-chip>
      </v-chip-group>
    </v-sheet>

    <v-sheet class="mb-4">
      <v-card-subtitle v-if="focus">
        {{
          `${getMonthName(new Date(focus).getMonth())} ${new Date(
            focus
          ).getFullYear()}`
        }}
      </v-card-subtitle>
      <v-card-subtitle v-else>
        {{
          `${getMonthName(new Date().getMonth())} ${new Date().getFullYear()}`
        }}
      </v-card-subtitle>
    </v-sheet>

    <v-sheet class="mb-4">
      <v-calendar
        v-model="focus"
        ref="calendar"
        type="month"
        :events="events"
        @click:event="showEvent"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card class="mx-auto" light height="100%">
          <v-card-title class="headline mb-1">
            {{ selectedEvent.name }}
            <v-spacer></v-spacer>
            <v-chip
              class="ml-4"
              :color="selectedEvent.color"
              text-color="white"
              small
              >{{ selectedEvent.status }}</v-chip
            >
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text v-if="selectedEvent.description">
            {{ selectedEvent.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              :href="`/calendar/${selectedEvent.id}`"
              color="orange lighten-2"
              text
              disabled
            >
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Utils from "@/helpers/Utils.js";

export default {
  data() {
    return {
      filteredLaunches: [],

      select: {
        months: ["All"],
        years: ["All"],
        rockets: ["All"],
        payloads: ["All", "Dragon", "Starlink", "Other"],
        statuses: ["All", "Success", "Failure", "Upcoming"]
      },

      focus: "",

      filters: {
        year: new Date().getFullYear().toString(10),
        month: Utils.getMonthName(new Date().getMonth()),
        rocket: "All",
        payload: "All",
        status: "All"
      },

      value: "",
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      colors: { s: "green", f: "orange", u: "grey darken-1" }
    };
  },
  async created() {
    if (!this.allLaunches.length) {
      await this.getLaunches();
    }
    if (!this.rockets.length) {
      await this.getRockets();
    }
    this.setYears();
    this.setFilters(this.filters);
    this.getEvents();
  },
  watch: {
    filters: {
      handler(newVal) {
        this.filteredLaunches = [];
        this.events = [];

        if (newVal.year === "All") {
          this.filters.month = "All";
        }

        this.select.months = ["All"];

        this.setFilters(this.filters);
        this.getEvents();
        this.focusMonth(this.events);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("launches", ["getLaunches"]),
    ...mapActions("rockets", ["getRockets"]),

    focusMonth(events) {
      if (events.length) {
        this.focus = events[0].start;
      } else {
        this.focus = "";
      }
    },

    focusDate(launch) {
      const date = launch.date_local.split("T");
      this.focus = date[0];
    },

    setYears() {
      let years = [];

      this.allLaunches.map(launch => {
        const date = launch.date_local.split("-");

        if (years.indexOf(date[0]) === -1) {
          years.push(date[0]);
        }
      });

      years = years.sort((a, b) => b - a);
      this.select.years = ["All", ...years];
    },

    setFilters({ year, month, rocket, payload, status }) {
      const all = "All";
      let months = [];
      let rockets = [];

      const res = this.allLaunches.filter(launch => {
        const date = launch.date_local.split("-");
        const rocketObj = this.rockets.find(el => el.id === launch.rocket);

        // set months
        if (
          date[0] === year.toString(10) &&
          months.indexOf(+date[1] - 1) === -1
        ) {
          months.push(+date[1] - 1);
        }

        // set rockets
        if (
          (date[0] === year.toString(10) || year === all) &&
          (Utils.getMonthName(+date[1] - 1) === month || month === all) &&
          rockets.indexOf(rocketObj.name) === -1
        ) {
          rockets.push(rocketObj.name);
        }

        const filters = [
          year === all ? true : date[0] === year.toString(10),
          month === all ? true : Utils.getMonthName(+date[1] - 1) === month,
          rocket === all ? true : rocketObj.name === rocket
        ];

        return filters.every(el => el);
      });

      // sort
      months = months.sort();
      this.select.months = ["All"];
      months.map(el => this.select.months.push(Utils.getMonthName(el)));
      if (this.select.months.indexOf(this.filters.month) === -1) {
        this.filters.month = all;
      }

      rockets = rockets.sort();
      this.select.rockets = ["All"];
      rockets.map(el => this.select.rockets.push(el));
      if (this.select.rockets.indexOf(this.filters.rocket) === -1) {
        this.filters.rocket = all;
      }

      this.filteredLaunches = res;
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    getMonthName(month) {
      return Utils.getMonthName(month);
    },

    getEvents() {
      const events = [];

      this.filteredLaunches.map(el => {
        events.push({
          id: el.id,
          name: el.name,
          start: el.date_local.split("T")[0],
          end: el.date_local.split("T")[0],
          color: this.getEventColor(el)[0],
          timed: false,
          status: this.getEventColor(el)[1],
          description: el.details || ""
        });
      });

      this.events = events;
    },

    getEventColor(launch) {
      if (launch.success === true) {
        return [this.colors.s, "Success"];
      } else if (launch.success === false) {
        return [this.colors.f, "Failure"];
      } else {
        return [this.colors.u, "Upcoming"];
      }
    }
  },
  computed: {
    ...mapGetters("launches", ["allLaunches"]),
    ...mapGetters("rockets", ["rockets"])
  }
};
</script>

<style lang="scss" scoped></style>
