<template>
  <v-card
    class="mx-auto"
    :height="loading ? '15rem' : '100%'"
    :loading="loading"
    style="overflow: hidden; min-height: .5rem;"
  >
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>
