<template>
  <h2>Admin Orders</h2>
  <div class="body-orders-admin">
    <AdminOrdersItems v-for="order in orders" :order="order" :key="order.id" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { getOrderInfoAdmin } from "@/Utilities/FireBase/purchse.utilities";
import AdminOrdersItems from "@/components/AdminOrdersItems.vue";

export default defineComponent({
  name: "AdminOrders",
  components: { AdminOrdersItems },
  setup: () => {
    const orders = ref([]);
    const getAllOrders = async () => {
      try {
        const fetchedData = await getOrderInfoAdmin();
        console.log(fetchedData);
        fetchedData.docs.forEach((doc) =>
          orders.value.push({ id: doc.id, ...doc.data() })
        );
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getAllOrders();
    });
    return { orders };
  },
});
</script>

<style scoped>
.body-orders-admin {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
}

@media (max-width: 1300px) {
  .body-orders-admin {
    width: 55%;
  }
}
@media (max-width: 1000px) {
  .body-orders-admin {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .body-orders-admin {
    width: 95%;
  }
}
</style>