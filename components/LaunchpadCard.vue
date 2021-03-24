<template>
  <v-card class="mx-auto" height="100%">
    <v-card-title>Launchpad</v-card-title>
    <v-card-subtitle>{{ launchpad.full_name }}</v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <GeolocationMap v-if="launchpad.id" :coordinates="coordinates" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GeolocationMap from "@/components/GeolocationMap.vue";

export default {
  props: {
    launchpad: {
      type: Object,
      required: true
    }
  },
  components: {
    GeolocationMap
  },
  computed: {
    coordinates() {
      return { lat: this.launchpad.latitude, lon: this.launchpad.longitude };
    }
  }
};
</script>

<style lang="scss" scoped></style>
