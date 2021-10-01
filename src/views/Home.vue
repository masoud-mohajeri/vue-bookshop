<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>کتابفروشی</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-slides pager="true" :options="slideOpts">
        <ion-slide>
          <h1>
            <div class="slide-body">
              <div class="image">
                <img src="@/assets/Images/vue.png" alt="" />
              </div>
              <div class="content">
                <p>
                  این سایت یک نمونه کار فروشگاهی Vue انجام شده توسط مسعود مهاجری
                  است .
                </p>
                <p>
                  لطفا تحریم شکنتون روشن باشه و اسلاید های بعد رو هم ببینید 👈
                </p>
              </div>
            </div>
          </h1>
        </ion-slide>
        <ion-slide>
          <h1>
            <div class="slide-body">
              <div class="image">
                <img src="@/assets/Images/shop.png" alt="" />
              </div>
              <div class="content">
                <p>قابلیت ها :</p>
                <p>
                  شما میتوانید تحت عنوان ادمین و یا مشتری ثبت نام کنید . ادمین
                  میتواند به فروشگاه کالا اضافه کند و یا کالا های موجود را اصلاح
                  کند
                </p>
              </div>
            </div>
          </h1>
        </ion-slide>
        <ion-slide>
          <h1>
            <div class="slide-body">
              <div class="image">
                <img src="@/assets/Images/shop.png" alt="" />
              </div>
              <div class="content">
                <p>
                  ادمین همچنین میتواند پس از ثبت کد رهگیری پستی وضعیت سفارشات را
                  از حالت پردازش انبار به حالت ارسال شده درآورد و مشتری هم
                  میتواند وضعیت سفارش های خود را از پنل خود مشاهده کند .
                </p>
              </div>
            </div>
          </h1>
        </ion-slide>
        <ion-slide>
          <h1>
            <div class="slide-body">
              <div class="image">
                <img src="@/assets/Images/man.png" alt="" />
              </div>
              <div class="content">
                <p>
                  میتوانید از ایمیل های زیر برای تست برنامه استفاده کنید ( صد
                  البته که میتوانید ثبت نام هم کنید ! ) :
                </p>
                <p>ادمین : admin@test.test</p>
                <p>مشتری : test@test.test</p>
                <p>رمز : 123123</p>
              </div>
            </div>
          </h1>
        </ion-slide>
        <ion-slide>
          <h1>
            <div class="slide-body">
              <div class="image">
                <img src="@/assets/Images/github.png" alt="" />
              </div>
              <div class="content">
                <p>
                  از
                  <a href="https://github.com/mohajerimasoud" target="_blanck"
                    >اینجا</a
                  >
                  هم به صفحه گیت هاب م سر بزنید و کد این پروژه و دیگر پروژه ها
                  رو هم ببینید
                </p>
              </div>
            </div>
          </h1>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSlides,
  IonSlide,
} from "@ionic/vue";
// import VueLogo from "@/assets/Images/vue.png";

export default {
  name: "Home",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
  },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
      slidesPerView: 1,
      freeMode: false,
    };
    return { slideOpts };
  },
};
</script>


<style scoped>
.slide-body {
  width: 90vw;
  max-width: 500px;
  height: 70vh;
  padding: 15px;
  /* border: 1px solid red; */
}
.image {
  width: auto;
  height: 45%;
}

.content {
  font-size: 65%;
  text-align: right;
}
</style>