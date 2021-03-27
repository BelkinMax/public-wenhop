<template>
  <section>
    <v-sheet tile class="d-flex mb-4">
      <v-row dense>
        <v-col>
          <v-select
            v-model="filters.year"
            ref="year"
            :items="years"
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
            :items="months"
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
            :items="rockets"
            dense
            outlined
            hide-details
            class="ma-2"
            label="Rocket"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="filters.payload"
            :items="payloads"
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
            :items="statuses"
            dense
            outlined
            hide-details
            label="Status"
            class="ma-2"
          ></v-select>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mb-4">
      <v-row>
        <v-col>
          <v-chip small outlined class="ma-2">
            {{ filteredLaunches.length }} results found:
          </v-chip>

          <v-chip
            v-for="launch in filteredLaunches"
            :key="launch.id"
            small
            color="green"
            text-color="white"
            class="ma-2"
          >
            {{ launch.name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mb-4">
      <v-calendar
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
            <!-- {{ item.name }} -->
            Name
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <!-- {{ item.details }} -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ut
            ipsam expedita illo modi, doloremque sint deleniti nam eos
            voluptatibus officia voluptate distinctio! Molestias eum impedit
            esse ratione totam aperiam placeat cumque? Soluta, in quod.
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange lighten-2" text>
              <!-- :href="`/calendar/${item.id}`" -->
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

      months: ["All"],
      years: ["All"],
      rockets: ["All", "Falcon 1", "Falcon 9", "Falcon Heavy"],
      payloads: ["All", "Dragon", "Starlink", "Other"],
      statuses: ["All", "Success", "Failure", "Upcoming"],

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
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party"
      ]
    };
  },
  async created() {
    if (!this.allLaunches.length) {
      await this.getLaunches();
    }
    this.setYears();
    this.setFilters(this.filters);
    this.getEvents();
  },
  watch: {
    filters: {
      handler(newVal) {
        this.filteredLaunches = [];
        if (newVal.year === "All") {
          this.filters.month = "All";
        }

        this.months = ["All"];

        this.setFilters(this.filters);
        this.getEvents();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("launches", ["getLaunches"]),

    focusOnMonth(year, month) {
      this.focus = year + "-" + month;
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
      this.years = ["All", ...years];
    },
    setFilters({ year, month, rocket, payload, status }) {
      const all = "All";
      let months = [];

      const res = this.allLaunches.filter(launch => {
        const date = launch.date_local.split("-");

        // set months
        if (
          date[0] === year.toString(10) &&
          months.indexOf(+date[1] - 1) === -1
        ) {
          months.push(+date[1] - 1);
        }

        const filters = [
          year === all ? true : date[0] === year.toString(10),
          month === all ? true : Utils.getMonthName(+date[1] - 1) === month,
          rocket === all ? true : Utils.getMonthName(+date[1] - 1) === month
        ];

        return filters.every(el => el);
      });

      // sort
      months = months.sort();
      this.months = ["All"];
      months.map(el => this.months.push(Utils.getMonthName(el)));
      if (this.months.indexOf(this.filters.month) === -1) {
        this.filters.month = all;
      }

      if (month === all) {
        this.focusOnMonth(year, "01");
      } else {
        this.focusOnMonth(year, Utils.getMonthNum(month));
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
          name: el.name,
          start: el.date_utc.split("T")[0],
          end: el.date_utc.split("T")[0],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: false
        });
      });

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  },
  computed: {
    ...mapGetters("launches", ["allLaunches"])
  }
};
</script>

<style lang="scss" scoped></style>
