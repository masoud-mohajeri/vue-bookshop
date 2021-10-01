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
          name="inventory"
          v-model="inventory"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="inventoryError">{{ inventoryError }}</p>
      <ion-item>
        <ion-label position="fixed"> عکس </ion-label>
        <ion-input
          @change="imageSelectHandler"
          type="file"
          name="image"
          v-model="imageUrl"
          accept="image/*"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="mageUrlError">{{ mageUrlError }}</p>

      <ion-item>
        <ion-label position="fixed"> توضیحات </ion-label>
        <ion-textarea
          name="description"
          v-model="description"
          autoGrow
        ></ion-textarea>
      </ion-item>
      <p class="error" v-if="descriptionError">{{ descriptionError }}</p>
      <img class="image-preview" v-if="imageRef" :src="imageRef" />
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
            <ion-button
              @click="editHandler"
              fill="solid"
              expand="full"
              color="success"
            >
              تغییر
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button
              @click="deleteHandler"
              fill="solid"
              expand="full"
              color="danger"
            >
              حذف
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
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
import { useUploadHandler } from "@/Utilities/FireBase/prods.utilitis";
import useToast from "@/Utilities/Hooks/useToast";

export default defineComponent({
  name: "ProductForm",
  props: {
    editMode: { type: Boolean, default: false },
    book: { required: false },
  },
  emits: ["data", "delete", "edit"],
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
    const toast = useToast;
    const imageRef = ref(imageDefault);
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
      inventory: yup
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
        inventory: 0,
        price: 0,
      },
    });
    // Create form fields
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: price, errorMessage: priceError } = useField("price");
    const { value: author, errorMessage: authorError } = useField("author");
    const { value: inventory, errorMessage: inventoryError } =
      useField("inventory");
    const { value: description, errorMessage: descriptionError } =
      useField("description");
    const { value: imageUrl, errorMessage: mageUrlError } =
      useField("imageUrl");
    // in case form is used to edit a prod
    onMounted(() => {
      // console.log("edit mode");
      if (props.editMode) {
        // console.log("we have book");
        setFieldValue("name", props.book.name);
        setFieldValue("price", props.book.price);
        setFieldValue("author", props.book.author);
        setFieldValue("inventory", props.book.inventory);
        setFieldValue("description", props.book.description);
        setFieldValue("imageUrl", props.book.imageUrl);
        imageRef.value = props.book.imageUrl;
      }
    });
    //  image change handler
    const imageSelectHandler = (e) => {
      toast(" درحال آپلود عکس ...");
      // console.log(e.target.files[0]);
      useUploadHandler(e.target.files[0])
        .then((res) => {
          // console.log(res);
          setFieldValue("imageUrl", res);
          imageRef.value = res;
          toast("عکس با موفقیت آپلود شد");
        })
        .catch((err) => {
          // Error would be handled after ading state manaement and creating modal
          toast("مشکلی در آپلود عکس وجود دارد. با تحریم شکن امتحان کنید .");
          console.log(err);
        });
    };
    // form submit
    const submitHandler = handleSubmit((values) => {
      context.emit("data", values);
    });
    // Reset Form

    const formResetHandler = () => {
      resetForm();
      setFieldValue("imageUrl", "");
      imageRef.value = imageDefault;
    };

    const deleteHandler = () => {
      context.emit("delete", props.book.id);
    };

    const editHandler = handleSubmit((values) => {
      context.emit("edit", values);
    });

    return {
      name,
      nameError,
      price,
      priceError,
      author,
      authorError,
      inventory,
      inventoryError,
      description,
      descriptionError,
      imageUrl,
      mageUrlError,
      imageRef,
      submitHandler,
      imageSelectHandler,
      formResetHandler,
      editHandler,
      deleteHandler,
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