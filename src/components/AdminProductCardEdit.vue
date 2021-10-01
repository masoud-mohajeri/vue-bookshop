<template>
  <div class="prdcard-edit-body">
    <ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <img :src="book.imageUrl" :alt="book.name" />
          </ion-col>
          <ion-col size="9">
            <div class="flex-container">
              <h5 class="flex-items">نام کتاب : {{ book.name }}</h5>
              <h5 class="flex-items">قیمت : {{ book.price }}</h5>
              <h5 class="flex-items">نویسنده : {{ book.author }}</h5>
              <h5 class="flex-items">خلاصه : {{ book.description }}</h5>
              <ion-button fill="solid" color="primary" @click="editModeHandler"
                >اصلاح</ion-button
              >
            </div>
            <ProductForm
              editMode
              v-if="editMode"
              :book="book"
              @edit="editTheBase($event)"
              @delete="deleteTheBase"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { IonCard, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import ProductForm from "@/components/ProductInfoForm.vue";
import {
  deleteProductHandler,
  updateProductHandler,
} from "@/Utilities/FireBase/prods.utilitis";

export default defineComponent({
  name: "AdminProductCardEdit",
  components: { ProductForm, IonCard, IonGrid, IonRow, IonCol, IonButton },
  props: {
    book: {
      required: true,
    },
  },
  setup: (props) => {
    const editMode = ref(false);
    const editModeHandler = () => {
      editMode.value = !editMode.value;
      console.log("editMode", editMode.value);
    };

    const editTheBase = (e) => {
      console.log("edit", e);
      updateProductHandler({ ...e, id: props.book.id })
        .then((res) => {
          console.log("updated successfully ", res);
        })
        .catch((err) => {
          console.log("update error", err);
        });
    };

    const deleteTheBase = () => {
      console.log("delete");
      deleteProductHandler(props.book.id)
        .then((res) => {
          console.log("deleted successfully ", res);
        })
        .catch((err) => {
          console.log("delete error", err);
        });
    };

    onMounted(() => {
      // console.log(props);
    });

    return { editMode, editModeHandler, deleteTheBase, editTheBase };
  },
});
</script>

<style scoped>
.prdcard-edit-body {
  padding: 10px;
  margin: 10px;
  width: 100%;
}

.flex-container {
  padding: 15px;
  /* display: flex;
  justify-content: space-between;
  align-content: flex-end; */
}

.flex-items {
  width: 45%;
  display: inline-block;
}
</style>