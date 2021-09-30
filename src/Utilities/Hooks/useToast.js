import { toastController } from '@ionic/core';

const useToast = async (message) => {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    cssClass: 'text-align-center',
  });
  return toast.present();
};

export default useToast;
