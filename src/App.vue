<template>
  <ion-app dir="rtl">
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
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
}
</style>