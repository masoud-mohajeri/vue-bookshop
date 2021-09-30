<template>
  <ion-app dir="rtl">
    <tab-for-nav>
      <ion-router-outlet />
    </tab-for-nav>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import TabForNav from "@/components/TabForNav.vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    TabForNav,
  },
});
</script>

<style >
@font-face {
  font-family: "Vazir";
  font-weight: bold;
  src: url("./assets/Fonts/Vazir-Bold-UI.ttf");
}

@font-face {
  font-family: "Vazir";
  src: url("./assets/Fonts/Vazir-Regular-UI.ttf");
}

/* @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"); */

* {
  font-family: "Vazir", "Roboto", sans-serif;
  --ion-font-family: "Vazir", "Roboto", sans-serif;
}
</style>