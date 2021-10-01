<template>
  <ion-tabs>
    <slot></slot>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="login" href="/login" v-if="!store.getters.isAuth">
        <ion-icon :icon="logIn"></ion-icon>
        <ion-label>ورود</ion-label>
      </ion-tab-button>
      <ion-tab-button
        tab="logout"
        v-if="store.getters.isAuth"
        @click="logoutHandler"
      >
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
        <ion-badge
          color="danger"
          v-if="store.getters.getCard.prods.length > 0"
          >{{ store.getters.getCard.prods.length }}</ion-badge
        >
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
import { userLogout } from "@/Utilities/FireBase/auth.utilitis";
import useToast from "@/Utilities/Hooks/useToast";
import { useRouter } from "vue-router";

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
    // const tabMethod = (e) => {
    //   console.log(e);
    // };
    const toast = useToast;
    const router = useRouter();
    const logoutHandler = async () => {
      try {
        const logoutRes = await userLogout();
        toast("شما با موفقیت از حساب کاربری خود خارج شدید.");
        store.commit("logedOut");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    return {
      storefront,
      store,
      logIn,
      logOut,
      cart,
      personCircle,
      person,
      logoutHandler,
      // tabMethod,
    };
  },
});
</script>

<style>
</style>