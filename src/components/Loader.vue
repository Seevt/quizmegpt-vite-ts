<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true,
    }
})
</script>
        
<template>
    <div class="loader">
        <span>{{ props.text }}</span>
    </div>
</template>


<style scoped>
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

.loader {
    display: grid;
    min-height: 80svh;
    place-items: center;
    animation: bounce 1s ease infinite;

}
</style>