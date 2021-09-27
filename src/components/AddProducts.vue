<template>
  <div class="body-add-prod">
    <h2>Add Products</h2>
    <ProductForm @data="bookSaverHandler" />
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ProductForm from "@/components/ProductInfoForm.vue";
import { SaveProductHandler } from "@/Utilities/FireBase/prods.utilitis";

export default defineComponent({
  name: "AddProducts",
  components: { ProductForm },
  setup: () => {
    const bookSaverHandler = (e) => {
      console.log(e);
      SaveProductHandler(e)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return { bookSaverHandler };
  },
});
</script>

<style scoped >
.body-add-prod {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
}

@media (max-width: 1300px) {
  .body-add-prod {
    width: 55%;
  }
}
@media (max-width: 1000px) {
  .body-add-prod {
    width: 80%;
  }
}
@media (max-width: 600px) {
  .body-add-prod {
    width: 95%;
  }
}
</style>