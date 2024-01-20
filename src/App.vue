<script setup lang="ts">
import { onMounted } from 'vue';
import Footer from './components/Footer.vue'
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
import { useUserStore } from './stores/user'

const userStore = useUserStore()

let auth: Auth;
onMounted(() => {
  auth = getAuth();
  // console.log(auth, 'auth var from app.vue', 'this and user inside the callback are the same');

  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        userStore.isLoggedIn = true;
      } else {
        userStore.isLoggedIn = false
      }
      console.log(userStore.isLoggedIn, 'logged from app.vue')
    }
  )
})

</script>

<template>
  <main class="app">
    <RouterView v-slot="{ Component }">
      <!-- <transition name="page-fade" mode="out-in"> -->
      <!-- <div class="app" :key="$route.path"> -->
      <component :is="Component" />
      <!-- </div> -->
      <!-- </transition> -->
      <Footer />
    </RouterView>
  </main>
</template>


<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100svh;
  background-color: #f8f9fa;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s;
}

.page-fade-enter,
.page-fade-leave-to {
  opacity: 0;
}
</style>