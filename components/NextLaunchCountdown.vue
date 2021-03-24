<template>
  <v-container class="pt-16 pb-16">
    <v-row justify="center" no-gutters>
      <v-col class="d-flex flex-column justify-center align-center">
        <h1
          id="headline"
          class="text-md-h4 text-subtitle-1 text-center shadows"
        >
          {{ rocket.name }}: {{ launch.name }}
        </h1>
        <h2 class="text-md-h5 text-subtitle-2 text-center mt-3 shadows">
          {{ date.day }} {{ date.month }} {{ date.year }} at {{ date.hours }}:{{
            date.minutes
          }}
        </h2>
        <div
          v-if="nextLaunchCountdown.seconds !== null"
          id="countdown"
          class="shadows"
        >
          <v-row class="mt-5">
            <v-col
              class="col-6 col-md-3 text-md-subtitle-1 text-caption d-flex flex-column justify-center align-center"
            >
              <span class="text-h1">{{ nextLaunchCountdown.days }}</span
              >Days
            </v-col>
            <v-col
              class="col-6 col-md-3 text-md-subtitle-1 text-caption d-flex flex-column justify-center align-center"
            >
              <span class="text-h1">{{ nextLaunchCountdown.hours }}</span
              >Hours
            </v-col>
            <v-col
              class="col-6 col-md-3 text-md-subtitle-1 text-caption d-flex flex-column justify-center align-center"
            >
              <span class="text-h1">{{ nextLaunchCountdown.minutes }}</span
              >Minutes
            </v-col>
            <v-col
              class="col-6 col-md-3 text-md-subtitle-1 text-caption d-flex flex-column justify-center align-center"
            >
              <span class="text-h1">{{ nextLaunchCountdown.seconds }}</span
              >Seconds
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Utils from "@/helpers/Utils.js";

export default {
  props: {
    rocket: {
      type: Object,
      required: true
    },
    launch: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.countdown();
  },
  methods: {
    ...mapMutations("launches", ["SET_LAUNCH_COUNTDOWN"]),

    countdown() {
      const launchTime = new Date(this.launch.date_utc).getTime();

      setInterval(() => {
        const distance = launchTime - new Date().getTime();

        if (distance < 0) {
          this.SET_LAUNCH_COUNTDOWN({
            days: null,
            hours: null,
            minutes: null,
            seconds: null
          });

          return;
        }

        this.SET_LAUNCH_COUNTDOWN({
          days: ("0" + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2),
          hours: (
            "0" +
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          ).slice(-2),
          minutes: (
            "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          ).slice(-2),
          seconds: ("0" + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2)
        });
      }, 1000);
    }
  },
  computed: {
    ...mapGetters("launches", ["nextLaunchCountdown"]),

    date() {
      const date = new Date(this.launch.date_utc);

      return {
        day: date.getDate(),
        month: Utils.getMonthName(date.getMonth()),
        year: date.getFullYear(),
        hours: ("0" + Math.floor(date.getHours())).slice(-2),
        minutes: ("0" + Math.floor(date.getMinutes())).slice(-2)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: normal;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
}

.shadows {
  text-shadow: 0 1px 2px rgba(25, 32, 72, 0.7);
}
</style>
