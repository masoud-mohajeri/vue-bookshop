<template>
  <ion-page dir="rtl">
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>محصولات</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>لیست کتاب ها</h1>
      <div class="prods-body">
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
  },
  setup: () => {
    const BooksArray: any = ref([]);
    const toast = useToast;
    const getProdsHandler = async () => {
      try {
        const fetchedBooks = await GetProductHandler();
        fetchedBooks.forEach((doc) => {
          return BooksArray.value.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        toast("مشکلی در ارتباط وجود دارد ، با تحریک شکن امتحان کنید");
        console.log(error);
      }
    };

    onMounted(() => {
      getProdsHandler();
    });

    return { BooksArray };
  },
});
</script>

<style scoped>
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