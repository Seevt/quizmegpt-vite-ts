import { defineStore } from "pinia";
import { computed, ref } from "vue";

type User = {
  //   user: ReturnType<typeof firebasesomething>;
};

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const user = ref<User | null>(null);

  return { user, isLoggedIn };
});
