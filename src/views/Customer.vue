<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title> 🧑 مشتری</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="body-orders-customer">
        <ion-card v-for="(order, i) of customerOrder" :key="i">
          <ion-card-header>
            <ion-card-title
              >آدرس تحویل : {{ order.ownerAddress }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <h4>کتاب ها :</h4>
            <ul>
              <li v-for="(book, i) of order.bookIdArray" :key="i">
                {{ book.name }} - {{ book.price }} تومان
              </li>
            </ul>
            <div v-if="order.status === 'paied'">
              این سفارش در حال پردازش است
            </div>
            <div v-if="order.status === 'sent'">این سفارش ارسال شده است</div>
          </ion-card-content>
          <!-- <pre>{{ customerOrder }}</pre> -->
        </ion-card>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { getOrderInfo } from "@/Utilities/FireBase/purchse.utilities";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Customer",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  },
  setup: () => {
    const customerOrder = ref<any[]>([]);
    const store = useStore();

    const getOrdersHandler = async () => {
      try {
        if (store.getters.isCustomer) {
          const fetchedOrders = await getOrderInfo(store.state.Auth.email);
          fetchedOrders.docs.forEach((doc) =>
            customerOrder.value.push({ id: doc.id, ...doc.data() })
          );
        } else {
          console.log("not a customer ");
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getOrdersHandler();
    });

    return { customerOrder };
  },
};
</script>

<style scoped>
.body-orders-customer {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
}

@media (max-width: 1300px) {
  .body-orders-customer {
    width: 55%;
  }
}
@media (max-width: 1000px) {
  .body-orders-customer {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .body-orders-customer {
    width: 95%;
  }
}
</style>