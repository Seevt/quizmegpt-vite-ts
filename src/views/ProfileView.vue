<script setup lang="ts">
import FloatingBackground from '@/components/FloatingBackground.vue';
import Loader from '@/components/Loader.vue';
import UserData from '@/components/Porfile Components/UserData.vue';

</script>

<template>
    <FloatingBackground />
    <div class="my-account">

        <Suspense>

            <UserData />
            <template #fallback>
                <Loader text="Loading user data..." />
            </template>
        </Suspense>

    </div>
</template>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

* {
    list-style: none;
}



.my-account {
    display: flex;
    align-self: center;
    flex-direction: column;
    width: min(95%, 65ch);
    flex-grow: 1;
    text-align: center;
    gap: var(--gap-spacing);
}
</style>