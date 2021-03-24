<template>
  <v-app dark>
    <!--s-- Desktop nav -->
    <v-navigation-drawer
      v-if="!$vuetify.breakpoint.mobile"
      permanent
      expand-on-hover
      floating
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          dense
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <v-list>
          <v-list-item dense>
            <v-list-item-action>
              <v-checkbox
                v-if="!isLoading"
                v-model="modelAutoUpdate"
                color="success"
                @change="toggleAutoUpdate"
              ></v-checkbox>
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="warning"
              ></v-progress-circular>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Auto update'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <!--e-- Desktop nav -->

    <!--s-- Mobile nav -->
    <v-bottom-navigation v-if="$vuetify.breakpoint.mobile" app fixed>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :disabled="item.disabled"
        :to="item.to"
        style="height: auto; width: 100%;"
      >
        <span>{{ item.title }}</span>

        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!--e-- Mobile nav -->

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
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      modelAutoUpdate: false,
      cookie: {
        wasShown: true,
        message:
          "We use cookies on this website because it helps us to provide you a better experience.",
        timeout: 60000
      },
      items: [
        {
          icon: "mdi-rocket-launch",
          title: "Upcoming",
          to: "/"
        },
        {
          icon: "mdi-calendar-month",
          title: "Calendar",
          to: "/calendar"
        },
        {
          icon: "mdi-wikipedia",
          title: "Wiki",
          to: "/wiki"
        },
        {
          icon: "mdi-information",
          title: "About",
          to: "/about"
        }
      ]
    };
  },
  mounted() {
    if (!localStorage.wasShown) {
      this.cookie.wasShown = false;
    }
    if (!localStorage.autoUpdate) {
      this.modelAutoUpdate = false;
    }
  },
  methods: {
    ...mapMutations("autoupdates", ["SET_AUTO_UPDATE"]),

    disableCookieMsg() {
      this.cookie.wasShown = true;
      localStorage.wasShown = true;
    },
    toggleAutoUpdate() {
      this.SET_AUTO_UPDATE(this.modelAutoUpdate);
      localStorage.autoUpdate = this.autoUpdate;
    }
  },
  computed: {
    ...mapGetters("autoupdates", ["autoUpdate"]),

    isLoading() {
      return Object.values(this.$store.state).some(state => state.isLoading);
    }
  }
};
</script>
