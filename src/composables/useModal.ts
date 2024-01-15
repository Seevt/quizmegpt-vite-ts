import { ref } from "vue";

export type ModalController = ReturnType<typeof useModalController>;

export function useModalController() {
  const show = ref(false);
  let body = document.body;
  return {
    show,
    open: () => {
      body.style.overflow = "hidden";
      show.value = true;
    },
    close: () => {
      body.style.overflow = "visible";

      show.value = false;
    },
  };
}