<template>
  <ion-tabs @getTab="tabMethod($event)">
    <slot></slot>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="login" href="/login" v-if="!store.getters.isAuth">
        <ion-icon :icon="logIn"></ion-icon>
        <ion-label>ورود</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="logout" v-if="store.getters.isAuth">
        <ion-icon :icon="logOut"></ion-icon>
        <ion-label>خروج</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="products" href="/products">
        <ion-icon :icon="storefront"></ion-icon>
        <ion-label>محصولات</ion-label>
      </ion-tab-button>
      <ion-tab-button
        tab="shopping-card"
        href="/shopping-card"
        v-if="!store.getters.isAdmin"
      >
        <ion-icon :icon="cart"></ion-icon>
        <ion-label>سبد خرید</ion-label>
        <ion-badge color="danger">6</ion-badge>
      </ion-tab-button>
      <ion-tab-button tab="admin" href="/admin" v-if="store.getters.isAdmin">
        <ion-icon :icon="personCircle"></ion-icon>
        <ion-label>ادمین</ion-label>
      </ion-tab-button>
      <ion-tab-button
        tab="customer"
        href="/customer"
        v-if="store.getters.isCustomer"
      >
        <ion-icon :icon="person"></ion-icon>
        <ion-label>مشتری</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge,
} from "@ionic/vue";
import {
  storefront,
  logIn,
  logOut,
  cart,
  personCircle,
  person,
} from "ionicons/icons";
import { useStore } from "vuex";
export default defineComponent({
  name: "TabForNav",
  components: {
    IonIcon,
    IonBadge,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
  },
  setup: () => {
    const store = useStore();
    const tabMethod = (e) => {
      console.log(e);
    };
    return {
      storefront,
      store,
      logIn,
      logOut,
      cart,
      personCircle,
      person,
      tabMethod,
    };
  },
});
</script>

<style>
</style>