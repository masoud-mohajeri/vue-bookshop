<template>
  <ion-page dir="rtl">
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>محصولات</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>لیست کتاب ها</h1>
      <ProductCard v-for="(item, index) in fackArray" :key="index" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ProductCard from "@/components/ProductCard.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Products",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    ProductCard,
  },
  setup: () => {
    const fackArray = [1, 2, 3, 4];

    return { fackArray };
  },
});
</script>