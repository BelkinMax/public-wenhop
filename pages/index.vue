<template>
  <section>
    <v-row>
      <v-img
        :src="imageUrl"
        :lazy-src="imageUrl"
        style="object-fit: cover; height: 100vh;"
        width="auto"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        eager
      >
        <template>
          <div class="countdown-container">
            <v-row
              class="ma-0"
              align="center"
              justify="center"
              style="height: inherit;"
            >
              <NextLaunchCountdown
                v-if="rocket.id && nextLaunch.id"
                :rocket="rocket"
                :launch="nextLaunch"
              />
            </v-row>

            <!--s-- Desktop cards -->
            <v-row v-if="!$vuetify.breakpoint.mobile" style="padding: 1rem">
              <v-col class="col-3">
                <base-card :loading="rocket.id ? false : true">
                  <RocketCard v-if="rocket.id" :rocket="rocket" />
                </base-card>
              </v-col>
              <v-col class="col-3">
                <base-card :loading="payloadsList.length ? false : true">
                  <PayloadCard
                    v-if="payloadsList.length"
                    :payloadsList="payloadsList"
                  />
                </base-card>
              </v-col>
              <v-col class="col-3">
                <base-card :loading="launchpad.id ? false : true">
                  <LaunchpadCard v-if="launchpad.id" :launchpad="launchpad" />
                </base-card>
              </v-col>
              <v-col class="col-3">
                <base-card :loading="weather.time ? false : true">
                  <WeatherCard v-if="weather.time" :weather="weather"
                /></base-card>
              </v-col>
            </v-row>
            <!--e-- Desktop cards -->
          </div>
        </template>
      </v-img>
    </v-row>

    <!--s-- Mobile cards -->
    <v-row v-if="$vuetify.breakpoint.mobile">
      <v-col class="col-12">
        <base-card :loading="rocket.id ? false : true">
          <RocketCard v-if="rocket.id" :rocket="rocket" />
        </base-card>
      </v-col>
      <v-col class="col-12">
        <base-card :loading="payloadsList.length ? false : true">
          <PayloadCard
            v-if="payloadsList.length"
            :payloadsList="payloadsList"
          />
        </base-card>
      </v-col>
      <v-col class="col-12">
        <base-card :loading="launchpad.id ? false : true">
          <LaunchpadCard v-if="launchpad.id" :launchpad="launchpad" />
        </base-card>
      </v-col>
      <v-col class="col-12">
        <base-card :loading="weather.time ? false : true">
          <WeatherCard v-if="weather.time" :weather="weather"
        /></base-card>
      </v-col>
    </v-row>
    <!--e-- Mobile cards -->
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BaseCard from "@/components/base/BaseCard.vue";
import NextLaunchCountdown from "@/components/NextLaunchCountdown.vue";
import RocketCard from "@/components/RocketCard.vue";
import PayloadCard from "~/components/PayloadCard.vue";
import LaunchpadCard from "~/components/LaunchpadCard.vue";
import WeatherCard from "~/components/WeatherCard.vue";

export default {
  components: {
    BaseCard,
    NextLaunchCountdown,
    RocketCard,
    PayloadCard,
    LaunchpadCard,
    WeatherCard
  },
  data() {
    return {
      imageUrl: "#",
      payloadsList: []
    };
  },
  head() {
    if (this.rocket.name && this.nextLaunch.name) {
      return {
        titleTemplate: `${this.rocket.name}: ${this.nextLaunch.name}`,
        meta: [
          {
            name: "description",
            content: `🚀 Live information about SpaceX Falcon and Starship rocket launches. See the next launch of ${this.rocket.name} rocket.`
          }
        ]
      };
    } else {
      return {
        titleTemplate: `Wenhop Live`,
        meta: [
          {
            name: "description",
            content: `🚀 Live information about SpaceX Falcon and Starship rocket launches.`
          }
        ]
      };
    }
  },
  async created() {
    await this.getNextLaunch();
    await this.getLaunchRocket();
    this.getRandomImage();
    await this.getLaunchPayload();
    await this.getLaunchLaunchpad();
    await this.getLaunchpadWeather();
  },
  methods: {
    ...mapActions("rockets", ["getRocket"]),
    ...mapActions("launches", ["getNextLaunch"]),
    ...mapActions("payloads", ["getPayload"]),
    ...mapActions("launchpads", ["getLaunchpad"]),
    ...mapActions("weather", ["getWeather"]),

    async getLaunchRocket() {
      if (this.nextLaunch.id) {
        await this.getRocket(this.nextLaunch.rocket);
      }
    },

    async getLaunchPayload() {
      if (this.nextLaunch.id) {
        for (const item of this.nextLaunch.payloads) {
          await this.getPayload(item);
          this.payloadsList.push(this.payload);
        }
      }
    },

    async getLaunchLaunchpad() {
      if (this.nextLaunch.id) {
        await this.getLaunchpad(this.nextLaunch.launchpad);
      }
    },

    async getLaunchpadWeather() {
      if (this.launchpad.id) {
        await this.getWeather({
          lat: this.launchpad.latitude,
          lon: this.launchpad.longitude,
          date: this.nextLaunch.date_local
        });
      }
    },

    getRandomImage() {
      if (this.rocket.flickr_images.length) {
        const image = this.rocket.flickr_images[
          Math.floor(Math.random() * this.rocket.flickr_images.length)
        ];

        this.imageUrl = image;
      }
    }
  },
  computed: {
    ...mapGetters("rockets", ["rocket"]),
    ...mapGetters("launches", ["nextLaunch"]),
    ...mapGetters("payloads", ["payload"]),
    ...mapGetters("launchpads", ["launchpad"]),
    ...mapGetters("weather", ["weather"]),
    ...mapGetters("autoupdates", ["autoUpdate"])
  }
};
</script>

<style lang="scss" scoped>
.countdown-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
