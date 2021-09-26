<template>
  <div class="body-form">
    <div class="title"></div>
    <form @submit.prevent="submitHandler">
      <ion-item>
        <ion-label position="fixed"> نام کتاب </ion-label>
        <ion-input type="text" name="name" v-model="name"></ion-input>
      </ion-item>
      <p class="error" v-if="nameError">{{ nameError }}</p>

      <ion-item>
        <ion-label position="fixed"> قیمت </ion-label>
        <ion-input type="number" name="price" v-model="price"></ion-input>
      </ion-item>
      <p class="error" v-if="priceError">{{ priceError }}</p>

      <ion-item>
        <ion-label position="fixed"> نویسنده </ion-label>
        <ion-input type="text" name="author" v-model="author"></ion-input>
      </ion-item>
      <p class="error" v-if="authorError">{{ authorError }}</p>

      <ion-item>
        <ion-label position="fixed"> موجودی انبار </ion-label>
        <ion-input
          type="number"
          name="investory"
          v-model="investory"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="investoryError">{{ investoryError }}</p>
      <ion-item>
        <ion-label position="fixed"> عکس </ion-label>
        <ion-input
          @change="imageSelectHandler"
          type="file"
          name="image"
          v-model="image"
          accept="image/*"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="imageError">{{ imageError }}</p>

      <ion-item>
        <ion-label position="fixed"> توضیحات </ion-label>
        <ion-textarea
          name="description"
          v-model="description"
          autoGrow
        ></ion-textarea>
      </ion-item>
      <p class="error" v-if="descriptionError">{{ descriptionError }}</p>
      <img class="image-preview" v-if="imageURL" :src="imageURL" />
      <ion-grid v-if="!editMode">
        <ion-row>
          <ion-col size="6">
            <ion-button
              fill="solid"
              expand="full"
              color="success"
              type="submit"
            >
              ثبت
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button
              fill="solid"
              expand="full"
              color="danger"
              @click="formResetHandler"
            >
              پاک کردن
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid v-if="editMode">
        <ion-row>
          <ion-col size="6">
            <ion-button fill="solid" expand="full" color="success">
              تغییر
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button fill="solid" expand="full" color="danger">
              حذف
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import imageDefault from "@/assets/Images/book.default.png";

export default defineComponent({
  name: "ProductForm",
  props: {
    editMode: { type: Boolean, default: false },
  },
  emits: ["data"],
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
  setup: (props, context) => {
    const imageURL = ref(imageDefault);
    // Form schema
    const schema = yup.object({
      name: yup
        .string("*مقدار این فیلد باید حروف باشد.")
        .required(" * این فیلد اجباری است . "),
      price: yup
        .number("*مقدار این فیلد باید عددی باشد .")
        .required(" * این فیلد اجباری است . ")
        .min(1000, "* باید بزرگتر از 1000 باشد . "),
      author: yup
        .string("*مقدار این فیلد باید حروف باشد.")
        .required(" * این فیلد اجباری است . "),
      investory: yup
        .number("*مقدار این فیلد باید عددی باشد .")
        .required(" * این فیلد اجباری است . ")
        .min(0, "* باید بزرگتر از 0 باشد . "),
      description: yup
        .string("*مقدار این فیلد باید حروف باشد.")
        .required(" * این فیلد اجباری است . "),
    });
    // Create form with "vee-validat"
    const { handleSubmit, resetForm, setFieldValue } = useForm({
      validationSchema: schema,
      initialValues: {
        name: "",
        author: "",
        description: "",
        investory: 0,
        price: 0,
      },
    });
    // Create form fields
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: price, errorMessage: priceError } = useField("price");
    const { value: author, errorMessage: authorError } = useField("author");
    const { value: investory, errorMessage: investoryError } =
      useField("investory");
    const { value: description, errorMessage: descriptionError } =
      useField("description");
    const { value: image, errorMessage: imageError } = useField("image");
    //  image change handler
    const imageSelectHandler = (e) => {
      imageURL.value = URL.createObjectURL(e.target.files[0]);
      setFieldValue("image", imageURL.value);
    };
    // form submit
    const submitHandler = handleSubmit((values) => {
      context.emit("data", values);
    });
    // Reset Form

    const formResetHandler = () => {
      resetForm();
      setFieldValue("image", "");
      imageURL.value = imageDefault;
    };

    return {
      name,
      nameError,
      price,
      priceError,
      author,
      authorError,
      investory,
      investoryError,
      description,
      descriptionError,
      image,
      imageError,
      imageURL,
      submitHandler,
      imageSelectHandler,
      formResetHandler,
    };
  },
});
</script>

<style scoped>
.body-form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.error {
  font-size: 0.8rem;
  color: var(--ion-color-danger);
}
.image-preview {
  margin: 20px auto;
  width: 80%;
  height: auto;
  display: block;
}
</style>