<template>
  <div class="body">
    <h2 class="header">ثبت نام</h2>
    <form @submit.prevent="submitHandler">
      <ion-item>
        <ion-label position="floating">نام</ion-label>
        <ion-input type="text" name="name" v-model="name"></ion-input>
      </ion-item>
      <p class="error" v-if="nameError">* {{ nameError }}</p>
      <ion-item>
        <ion-label position="floating"> نام خانوادگی</ion-label>
        <ion-input type="text" name="lastName" v-model="lastName"></ion-input>
      </ion-item>
      <p class="error" v-if="lastNameError">* {{ lastNameError }}</p>

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
      <ion-item>
        <ion-label position="floating">تکرار رمز عبور</ion-label>
        <ion-input
          type="password"
          name="confirmPassword"
          v-model="confirmPassword"
        ></ion-input>
      </ion-item>
      <p class="error" v-if="confirmPasswordError">
        * {{ confirmPasswordError }}
      </p>
      <p class="error" v-if="passwordRepError">* {{ passwordRepError }}</p>

      <ion-list>
        <ion-radio-group value="biff" v-model="role">
          <ion-list-header>
            <ion-label>نقش</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label>مشتری</ion-label>
            <ion-radio slot="start" value="customer"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>ادمین</ion-label>
            <ion-radio slot="start" value="admin"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>

      <ion-button fill="solid" type="submit" expand="block">
        ثبت نام
      </ion-button>
    </form>
  </div>
</template>


<script>
import { defineComponent, ref } from "@vue/runtime-core";
import {
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import {
  RegWithEmail,
  SaveUser,
  UnregisterEmail,
} from "@/Utilities/FireBase/auth.utilitis";
import { useStore } from "vuex";
import useToast from "@/Utilities/Hooks/useToast";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegistrationForm",
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
  },
  setup: () => {
    const toast = useToast;
    const passwordRepError = ref(null);
    const store = useStore();
    const router = useRouter();

    // Forem schema
    const schema = yup.object({
      name: yup
        .string()
        .required("این فیلد الزامیست . ")
        .min(3, "نام باید حداقل 3 کارکتر داشته باشد "),
      lastName: yup
        .string()
        .required("این فیلد الزامیست . ")
        .min(3, "نام خانوادگی باید حداقل 3 کارکتر داشته باشد "),
      email: yup
        .string()
        .required("این فیلد الزامیست . ")
        .email("ایمیل معتبر نیست."),
      password: yup
        .string()
        .required("این فیلد الزامیست . ")
        .min(6, " پسورد معتبر باید حداقل 6 کارکتر باشد"),
      confirmPassword: yup.string().required("این فیلد الزامیست . "),
      role: yup.string().required("این فیلد الزامیست . "),
    });
    //  Form creation
    const { meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        name: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        role: "customer",
      },
    });
    // Feilds
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: lastName, errorMessage: lastNameError } =
      useField("lastName");
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: confirmPassword, errorMessage: confirmPasswordError } =
      useField("confirmPassword");
    const { value: role, errorMessage: roleError } = useField("role");
    // Registeration
    const registeration = async (values) => {
      try {
        const registerOfFirebase = await RegWithEmail(
          values.email,
          values.password
        );

        // registerOfFirebase &&
        //   console.log(
        //     "firebase registered that email successfully",
        //     registerOfFirebase
        //   );

        const registerInDB = await SaveUser({
          name: values.name,
          email: values.email,
          role: values.role,
          uid: registerOfFirebase.user.uid,
        });

        store.commit("logedIn", {
          name: values.name,
          email: values.email,
          role: values.role,
        });
        toast("شما با موفقید ثبت نام کردید.");
        router.push("/");
      } catch (error) {
        const unregisterInError = await UnregisterEmail();
        console.log(error);
        toast("مشکلی در ثبت نام وجود دارد . دوباره امتحان کنید.");
        if (unregisterInError) {
          console.log(
            "because of error in registration we unregistered that email"
          );
        }
      }
    };

    // Submit and register
    const submitHandler = handleSubmit((values) => {
      passwordRepError.value = null;
      if (password.value === confirmPassword.value && password.value) {
        // console.log(values);
        registeration(values);
      } else {
        passwordRepError.value = "رمز های عبور مطابقت ندارند";
      }
    });

    return {
      name,
      nameError,
      lastName,
      lastNameError,
      email,
      emailError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      passwordRepError,
      submitHandler,
      role,
      roleError,
    };
  },
});
</script>

<style scoped >
.body {
  width: 30%;
  margin-bottom: 10px;
  margin: 45px auto;
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