<template>
  <div class="body-edit-prod">
    <h2 v-if="products.length === 0">کالایی موجود نیست</h2>
    <AdminProductCardEdit
      v-for="prod of products"
      :key="prod.id"
      :book="prod"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { GetProductHandler } from "@/Utilities/FireBase/prods.utilitis";
import AdminProductCardEdit from "@/components/AdminProductCardEdit.vue";
import useToast from "@/Utilities/Hooks/useToast";

export default defineComponent({
  name: "EditProducts",
  components: { AdminProductCardEdit },
  setup: () => {
    const products = ref([]);
    const toast = useToast;
    onMounted(() => {
      GetProductHandler()
        .then((res) => {
          res.docs.forEach((element) => {
            products.value.push({
              id: element.id,
              ...element.data(),
            });
          });
        })
        .catch((err) => {
          toast("مشکلی در ارتباط وجود دارد ، دوباره امتحان کنید");

          console.log(err);
        });
    });

    return { products };
  },
});
</script>

<style  scoped>
.body-edit-prod {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
}

@media (max-width: 1300px) {
  .body-edit-prod {
    width: 55%;
  }
}
@media (max-width: 1000px) {
  .body-edit-prod {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .body-edit-prod {
    width: 95%;
  }
}
</style> >
