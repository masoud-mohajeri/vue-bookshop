<template>
  <ion-card class="body">
    <img :src="image" class="image" />

    <ion-card-header>
      <ion-card-title>اثر مرکب</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <p>15000 تومان</p>
      <ion-button fill="solid"> افزودن به سبد خرید </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import image from "@/assets/Images/compound-effect.jpg";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  name: "ProductCard",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
  },
  setup: () => {
    return { image };
  },
});
</script>


<style scoped>
.image {
  width: 240px;
  height: 340px;
}

.body {
  height: 480px;
  width: 240px;
  display: inline-block;
}
</style>