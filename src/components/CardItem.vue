<template>
  <ion-card>
    <div class="body-card-item">
      <div class="image">
        <img :src="book.imageUrl" alt="" />
      </div>
      <div class="info">
        <h6>{{ book.name }}</h6>
        <h6>{{ book.price }}</h6>
      </div>
      <div class="delete-btn">
        <ion-button color="danger" @click="deleteEmitter">حذف</ion-button>
      </div>
    </div>
  </ion-card>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { IonCard, IonButton } from "@ionic/vue";
export default defineComponent({
  name: "CardItem",
  components: { IonCard, IonButton },
  emits: ["onDelete"],
  props: { book: { required: true } },
  setup: (props, context) => {
    const deleteEmitter = () => {
      // console.log("delete", { id: props.book.id, price: props.book.price });
      context.emit("onDelete", { id: props.book.id, price: props.book.price });
    };

    return { deleteEmitter };
  },
});
</script>

<style>
.body-card-item {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.image {
  width: 25%;
  max-width: 160px;
  height: auto;
  padding: 5px;
  display: inline-block;
}
.info {
  width: 25%;
  height: auto;
  padding: 5px;
  display: inline-block;
}
.delete-btn {
  width: 25%;
  height: auto;
  padding: 5px;
  display: inline-block;
}
</style>