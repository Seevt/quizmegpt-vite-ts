import { ref, onMounted, onUnmounted } from "vue";

export function useInnerWidth() {
  const innerWidth = ref(window.innerWidth);

  onMounted(() => {
    window.addEventListener("resize", () => {
      innerWidth.value = window.innerWidth;
    });
  });

  onUnmounted(() => {
    window.removeEventListener("resize", () => {
      innerWidth.value = window.innerWidth;
    });
  });

  return {
    innerWidth,
  };
}
