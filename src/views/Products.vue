<template>
  <ion-page dir="rtl">
    <ion-header>
      <ion-toolbar color="success">
        <ion-title> ✨ محصولات</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>لیست کتاب ها</h1>
      <div class="prods-body">
        <div class="centrize" v-if="spin">
          <ion-spinner></ion-spinner>
        </div>
        <ProductCard
          v-for="(item, index) in BooksArray"
          :key="index"
          :book="item"
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
  IonSpinner,
} from "@ionic/vue";
import ProductCard from "@/components/ProductCard.vue";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { GetProductHandler } from "@/Utilities/FireBase/prods.utilitis";
import useToast from "@/Utilities/Hooks/useToast";

export default defineComponent({
  name: "Products",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    ProductCard,
    IonSpinner,
  },
  setup: () => {
    const BooksArray: any = ref([]);
    const spin = ref(false);
    const toast = useToast;
    const getProdsHandler = async () => {
      spin.value = true;
      try {
        const fetchedBooks = await GetProductHandler();
        fetchedBooks.forEach((doc) => {
          return BooksArray.value.push({ id: doc.id, ...doc.data() });
        });
        spin.value = false;
      } catch (error) {
        toast("مشکلی در ارتباط وجود دارد ، با تحریک شکن امتحان کنید");
        console.log(error);
        spin.value = false;
      }
    };

    onMounted(() => {
      getProdsHandler();
    });

    return { BooksArray, spin };
  },
});
</script>

<style scoped>
.centrize {
  display: flex;
  justify-content: center;
}
.prods-body {
  padding: 15px;
  padding-bottom: 55px;
}
@media (max-width: 811px) {
  .prods-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>