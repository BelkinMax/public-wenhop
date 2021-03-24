<template>
  <GmapMap
    :center="{ lat: coordinates.lat, lng: coordinates.lon }"
    :zoom="12"
    map-type-id="satellite"
    style="width: 100%; height: 10rem;"
  >
    <GmapMarker
      :position="{ lat: coordinates.lat, lng: coordinates.lon }"
      :clickable="false"
      :draggable="false"
    />
  </GmapMap>
</template>

<script>
export default {
  props: {
    coordinates: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
