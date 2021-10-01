<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>آدرس تحویل : {{ order.ownerAddress }}</ion-card-title>
      <ion-card-subtitle>راه ارتباط : {{ order.ownerEmail }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <h4>سفارش ها :</h4>
      <ul>
        <li v-for="(book, i) of order.bookIdArray" :key="i">
          {{ book.name }} - {{ book.price }} تومان
        </li>
      </ul>
      <div v-if="order.status === 'paied'">
        <ion-item>
          <ion-label position="fixed">کد رهگیری</ion-label>
          <ion-input type="number" v-model="postTrackCode"></ion-input>
        </ion-item>
        <ion-button @click="sendHandler(order.id)">ارسال</ion-button>
      </div>
      <div v-if="order.status !== 'paied'">این سفارش ارسال شده است</div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";

import { postOrder } from "@/Utilities/FireBase/purchse.utilities";
import useToast from "@/Utilities/Hooks/useToast";

export default defineComponent({
  name: "AdminOrdersItems",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonInput,
    IonButton,
  },
  props: { order: { required: true } },
  setup: (props, context) => {
    const postTrackCode = ref(null);
    const toast = useToast;
    const postLogic = async (id, post) => {
      try {
        const postingAction = await postOrder(id, post);
        // console.log("posted");
        toast("کالا با موفقیت ارسال شد .");
      } catch (error) {
        toast("مشکلی در ارتباط وجود دارد ، دوباره امتحان کنید");
        console.log(error);
      }
    };

    const sendHandler = (id) => {
      if (postTrackCode.value) {
        // console.log("sent", postTrackCode);
        // console.log(id);
        postLogic(id, postTrackCode.value);
      } else {
        console.log("no code ! ");
        toast("لطفا کد رهگیری پستی را وارد کنید . ");
      }
    };

    return { props, context, postTrackCode, sendHandler };
  },
});
</script>

<style>
</style>