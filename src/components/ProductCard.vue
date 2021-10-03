<template>
  <ion-card class="body">
    <img :src="book.imageUrl" class="image" />

    <ion-card-header>
      <ion-card-title>{{ book.name }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <p>{{ +book.price }} تومان</p>
      <ion-button fill="solid" @click="addToCard">
        افزودن به سبد خرید
      </ion-button>
      <!-- <ion-button fill="outline" color="success"> مشاهده جزعیات </ion-button> -->
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent, onMounted } from "@vue/runtime-core";
// import image from "@/assets/Images/compound-effect.jpg";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/vue";
import { useStore } from "vuex";
import useToast from "@/Utilities/Hooks/useToast";

export default defineComponent({
  name: "ProductCard",
  props: { book: { required: true } },
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
  },
  setup: (props) => {
    const store = useStore();
    const toast = useToast;
    const addToCard = () => {
      // console.log({ ...props.book });
      store.commit("addProd", props.book);
      toast("کالا به سبد خرید اضافه شد .");
    };

    return { addToCard };
  },
});
</script>


<style scoped>
.image {
  width: 100%;
  height: 340px;
}

.body {
  height: 490px;
  width: 240px;
  display: inline-block;
  margin: 10px;
}
</style>