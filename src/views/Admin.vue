<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>ادمین</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-segment v-model="status">
        <ion-segment-button value="add">
          <ion-label>اضافه کردن</ion-label>
        </ion-segment-button>
        <ion-segment-button value="edit">
          <ion-label>اصلاح </ion-label>
        </ion-segment-button>
        <ion-segment-button value="orders">
          <ion-label>سفارش ها </ion-label>
        </ion-segment-button>
      </ion-segment>
      <div class="body">
        <AddProducts v-if="status === 'add'" />
        <EditProducts v-if="status === 'edit'" />
        <AdminOrders v-if="status === 'orders'" />
      </div>
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";

import AddProducts from "@/components/AddProducts.vue";
import AdminOrders from "@/components/AdminOrders.vue";
import EditProducts from "@/components/EditProducts.vue";

import { ref } from "@vue/reactivity";
import { defineComponent, watch } from "@vue/runtime-core";

export default defineComponent({
  name: "Admin",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    AdminOrders,
    EditProducts,
    AddProducts,
  },
  setup: () => {
    const status = ref("add");

    return { status };
  },
});
</script>