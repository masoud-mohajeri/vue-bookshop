<template>
  <div class="body">
    <h2 class="header">ورود</h2>
    <form @submit.prevent="submitHandler">
      <ion-item>
        <ion-label position="floating">ایمیل</ion-label>
        <ion-input type="email" name="email" v-model="email"></ion-input>
      </ion-item>
      <p class="error" v-if="emailError">* {{ emailError }}</p>

      <ion-item>
        <ion-label position="floating">رمز عبور</ion-label>
        <ion-input
          type="password"
          name="password"
          v-model="password"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="passwordError">* {{ passwordError }}</p>

      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-button fill="solid" type="submit" expand="block">
              ورود
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button
              fill="solid"
              type="submit"
              color="danger"
              expand="block"
            >
              ورود با گوگل
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
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "LoginForm",
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup: () => {
    const schema = yup.object({
      email: yup
        .string()
        .required("این فیلد الزامیست . ")
        .email("ایمیل معتبر نیست."),
      password: yup
        .string()
        .required("این فیلد الزامیست . ")
        .min(6, " پسورد معتبر باید حداقل 6 کارکتر باشد"),
    });

    const { meta, handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const submitHandler = handleSubmit((values) => {
      console.log(values);
    });

    return { submitHandler, email, emailError, password, passwordError };
  },
});
</script>

<style >
.body {
  width: 30%;
  margin: 45px auto;
  margin-bottom: 10px;
}
@media (max-width: 1000px) {
  .body {
    width: 60%;
  }
}
@media (max-width: 600px) {
  .body {
    width: 95%;
  }
}

.link {
  margin: 10px auto;
  /* display: block; */
  text-align: center;
}
.header {
  text-align: center;
}
.error {
  font-size: 0.8rem;
  color: var(--ion-color-danger);
}
</style>