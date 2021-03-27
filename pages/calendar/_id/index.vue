<template>
  <section>
    <v-row>
      <v-col class="col-12 col-sm-6 col-lg-3">
        <base-card :loading="rocket.id ? false : true">
          <RocketCard v-if="rocket.id" :rocket="rocket" />
        </base-card>
      </v-col>
      <!-- <v-col class="col-12 col-sm-6 col-lg-3">
        <base-card :loading="payloadsList.length ? false : true">
          <PayloadCard
            v-if="payloadsList.length"
            :payloadsList="payloadsList"
          />
        </base-card>
      </v-col> -->
      <v-col class="col-12 col-sm-6 col-lg-3">
        <base-card :loading="launchpad.id ? false : true">
          <LaunchpadCard v-if="launchpad.id" :launchpad="launchpad" />
        </base-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import RocketCard from "@/components/RocketCard.vue";
import PayloadCard from "~/components/PayloadCard.vue";
import LaunchpadCard from "~/components/LaunchpadCard.vue";

export default {
  components: {
    RocketCard,
    PayloadCard,
    LaunchpadCard
  },
  data() {
    return {
      id: this.$route.params.id,

      payloadsList: []
    };
  },
  async created() {
    if (!this.launch.id) await this.getLaunch(this.id);
    if (!this.rocket.id) await this.getRocket(this.launch.rocket);
    if (!this.payload.id) await this.getLaunchPayload(this.launch.payloads);
    if (!this.launchpad.id) await this.getLaunchpad(this.launch.launchpad);
  },
  methods: {
    ...mapActions("launches", ["getLaunch"]),
    ...mapActions("rockets", ["getRocket"]),
    ...mapActions("payloads", ["getPayload"]),
    ...mapActions("launchpads", ["getLaunchpad"]),

    async getLaunchPayload(payloads) {
      for (const item of payloads) {
        await this.getPayload(item);
        this.payloadsList.push(this.payload);
      }
    }
  },
  computed: {
    ...mapGetters("launches", ["launch"]),
    ...mapGetters("rockets", ["rocket"]),
    ...mapGetters("payloads", ["payload"]),
    ...mapGetters("launchpads", ["launchpad"])
  }
};
</script>

<style lang="scss" scoped></style>
