<script setup lang="ts">
import QuizHistory from '@/components/Porfile Components/QuizHistory.vue';
import UserNav from '@/components/Porfile Components/UserNav.vue';
import { useUserStore } from '@/stores/user';
import { getAuth, type Auth } from 'firebase/auth';

const userStore = useUserStore();

// firebase user data
let auth: Auth = getAuth()

await userStore.fetchUserData(auth.currentUser!.uid)

</script>
        
<template>
    <UserNav :username="userStore.user?.email" />
    <h2 class="user-level">{{ userStore.user?.title }}</h2>
    <div class="user-score">
        <p>Your quiz score is</p>
        <span class="user-points">{{ userStore.user?.experience }}</span>
    </div>
    <QuizHistory />
</template>

<style scoped>
.user-level,
.user-score {
    padding-block: var(--padding-x);
    border-radius: var(--card-radius);
    padding-block: var(--padding-y);
    box-shadow: var(--card-shadow);
    background-color: #fff;
    letter-spacing: .6px;
    color: rgba(43, 43, 43, 0.8);
}

.user-level {
    background: var(--main-color);
    color: #fff;
    letter-spacing: 1px;
}


.user-points {
    color: var(--main-color);
    font-size: calc(var(--h1-size) *2);
    font-weight: 700;
}



.loading-spinner {
    display: flex;
    width: 80px;
    height: 80px;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #ffc973;
    animation: spin 0.7s linear infinite;
    margin: 300px auto;
}

.loading-spinner {
    display: flex;
    width: 80px;
    height: 80px;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #ffc973;
    animation: spin 0.7s linear infinite;
    margin: 300px auto;
}
</style>