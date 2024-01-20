<script setup lang="ts">
</script>

<template>
    <!-- balls -->
    <div class="ball" style="top: 5vh; left: 10vw"></div>
    <div class="ball" style="top: 95vh; left: 10vw"></div>
    <div class="ball" style="top: 20vh; left: 30vw"></div>
    <div class="ball-b" style="top: 15.8vh; left: 70vw"></div>
    <div class="ball-b" style="top: 70vh; left: 40vw"></div>
    <div class="ball" style="top: 95vh; left: 80vw"></div>
    <div class="ball" style="top: 45.8vh; left: 90vw"></div>
    <div class="ball" style="top: 80vh; left: 60vw"></div>
</template>

<style  scoped>
@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0);
    }
}


.ball {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: var(--main-color);
    opacity: 0.3;
    z-index: 0;
    border-radius: 50%;
    animation: float 3s infinite ease-in-out;
}

.ball-b {
    position: absolute;
    z-index: 0;
    width: 20px;
    height: 20px;
    background-color: var(--accent-color);
    opacity: 0.4;
    border-radius: 50%;
    animation: float 3s infinite ease-in-out;
}
</style>