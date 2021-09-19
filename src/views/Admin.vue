<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Admin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h2>Admin</h2>
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

export default {
  name: "Admin",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
};
</script>