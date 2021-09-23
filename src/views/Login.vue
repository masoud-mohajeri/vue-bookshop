<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>ورود</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <LoginForm v-if="logReg" />
      <RegistrationForm v-else />
      <p class="reg" v-if="logReg">
        هنوز ثبت نام نکرده اید ؟
        <span class="link" @click="toggleRegHandler">عضو شوید</span>
      </p>
      <p class="reg" v-else>
        ثبت نام کرده اید ؟
        <span class="link" @click="toggleRegHandler">وارد شوید</span>
      </p>
    </ion-content>
  </ion-page>
</template>



<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { defineComponent, ref } from "@vue/runtime-core";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegisterationForm.vue";

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    LoginForm,
    RegistrationForm,
  },
  setup: () => {
    const logReg = ref(true);

    const toggleRegHandler = () => {
      logReg.value = !logReg.value;
    };

    return { logReg, toggleRegHandler };
  },
});
</script>

<style>
.reg {
  text-align: center;
}

.link {
  text-decoration: underline;
  color: var(--ion-color-primary);
  cursor: pointer;
}
</style>