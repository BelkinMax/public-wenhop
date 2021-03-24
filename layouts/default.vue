<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <!--s-- Cookies popup -->
    <v-snackbar v-model="!cookie.wasShown" :timeout="cookie.timeout" light>
      <template v-slot:action="{ attrs }">
        {{ cookie.message }}
        <v-btn color="blue" text v-bind="attrs" @click="disableCookieMsg()">
          Fine
        </v-btn>
      </template>
    </v-snackbar>
    <!--e-- Cookies popup -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cookie: {
        wasShown: true,
        message:
          "We use cookies on this website because it helps us to provide you a better experience.",
        timeout: 60000
      }
    };
  },
  mounted() {
    if (!localStorage.wasShown) {
      this.cookie.wasShown = false;
    }
  }
};
</script>
