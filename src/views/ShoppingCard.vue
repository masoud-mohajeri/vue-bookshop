<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title> 🛒 سبد خرید </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="body-shcart">
        <h2>سبد خرید</h2>
        <!-- total + address -->
        <h5>مبلغ قابل پرداخت : {{ store.getters.getCard.price }} تومان</h5>
        <form @submit.prevent="payCartHandler($event)">
          <ion-item>
            <ion-label position="fixed">آدرس </ion-label>
            <ion-textarea
              name="address"
              v-model="address"
              auto-grow
            ></ion-textarea>
          </ion-item>
          <ion-button type="submit" color="success">پرداخت</ion-button>
        </form>
        <!-- items in card  -->
        <h2 v-if="store.getters.getCard.prods.length === 0">
          کالایی در سبد نیست
        </h2>
        <CardItem
          v-for="book of store.getters.getCard.prods"
          :book="book"
          :key="book.id"
          @onDelete="deleteHandler"
        />
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
  IonLabel,
  IonTextarea,
  IonItem,
  IonButton,
} from "@ionic/vue";
import CardItem from "@/components/CardItem.vue";
import { useStore } from "vuex";
import useToast from "@/Utilities/Hooks/useToast";
import { addOrderToDB } from "@/Utilities/FireBase/purchse.utilities";
import { ref } from "@vue/reactivity";

export default {
  name: "ShoppingCard",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    CardItem,
    IonLabel,
    IonTextarea,
    IonItem,
    IonButton,
  },
  setup: () => {
    const store = useStore();
    const toast = useToast;
    const address = ref("");
    const deleteHandler = (e: { id: any; price: any }) => {
      store.commit("removeProd", { id: e.id, price: e.price });
    };
    const purchase = async (address: string) => {
      try {
        const dbRes = await addOrderToDB({
          email: store.state.Auth.email,
          address,
          prods: store.getters.getCard.prods,
        });

        store.commit("purchase");

        toast("خرید با موفقیت انجام شد ");
      } catch (error) {
        console.log(error);
        toast("مشکلی در فرایند خرید وجود دارد . لطفا دوباره امتحان کنید. ");
      }
    };

    const payCartHandler = () => {
      // const toast = useToast;

      if (!store.getters.isCustomer) {
        toast("لطفا وارد شوید ");
        return;
      }

      if (!address.value.trim()) {
        toast("لطفا آدرس را وارد کنید ");
        return;
      }
      if (store.getters.getCard.prods.length === 0) {
        toast("محصولی در سبد نیست !  ");
        return;
      }
      purchase(address.value);
    };
    return { deleteHandler, store, payCartHandler, address };
  },
};
</script>


<style scoped>
.body-shcart {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
}

@media (max-width: 1300px) {
  .body-shcart {
    width: 55%;
  }
}
@media (max-width: 1000px) {
  .body-shcart {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .body-shcart {
    width: 95%;
  }
}
</style>