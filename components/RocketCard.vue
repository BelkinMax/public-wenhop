<template>
  <div>
    <v-card-title>Rocket</v-card-title>
    <v-card-subtitle>{{ rocket.name }}</v-card-subtitle>

    <v-card-text class="mb-3">
      <v-row>
        <v-col>
          <v-progress-linear :value="rate" height="25">
            <strong>{{ Math.ceil(rate) }}% success launches</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row align="center" class="mx-0">
        <div>
          {{ rocket.description }}
        </div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="grey lighten-5"
        text
        :href="rocket.wikipedia"
        target="_blank"
      >
        wikipedia
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue";

export default {
  components: { BaseCard },
  props: {
    rocket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rate: this.rocket.success_rate_pct
    };
  }
};
</script>

<style lang="scss" scoped></style>
