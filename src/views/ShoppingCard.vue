<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>سبد خرید </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="body-shcart">
        <h2>سبد خرید</h2>
        <!-- total + address -->
        <h5>مبلغ قابل پرداخت : {{ store.getters.getCard.price }} تومان</h5>
        <form>
          <ion-item>
            <ion-label position="fixed">آدرس </ion-label>
            <ion-textarea auto-grow></ion-textarea>
          </ion-item>
          <ion-button type="submit" color="success">پرداخت</ion-button>
        </form>
        <!-- items in card  -->

        <CardItem
          v-for="book of store.getters.getCard.prods"
          :book="book"
          :key="book.id"
          @onDelete="deleteHandler($event)"
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
} from "@ionic/vue";
import CardItem from "@/components/CardItem.vue";
// import { GetProductHandler } from "@/Utilities/FireBase/prods.utilitis";
import { onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "ShoppingCard",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    CardItem,
  },
  setup: () => {
    const store = useStore();
    // const ShCard = reactive({
    //   books: null,
    //   price: 0,
    // });
    // const fetchDataHandler = async () => {
    //   const fetcheData = await GetProductHandler();
    // };
    // onMounted(() => {
    //   ShCard.books = store.getters.getCard.prods;
    //   ShCard.price = store.getters.getCard.price;
    // });
    const deleteHandler = (e: { id: any; price: any }) => {
      // console.log(e);
      store.commit("removeProd", { id: e.id, price: e.price });
    };
    return { deleteHandler, store };
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