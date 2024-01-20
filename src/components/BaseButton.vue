<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: "#333",

    },
    hoverColor: {
        type: String,
        default: "#333",
    },
    padding_y: {
        type: String,
        default: '0.5rem'
    },
    padding_x: {
        type: String,
        default: '1rem'
    }
})

let style = ref({
    '--color': props.color,
    '--hover-color': props.hoverColor,
    '--padding-x-axis': props.padding_x,
    '--padding-y-axis': props.padding_y,
})
</script>

<template>
    <button :style="style">
        <slot></slot>
    </button>
</template>


<style  scoped>
button {
    border: none;
    color: white;
    padding-block: var(--padding-y-axis);
    padding-inline: var(--padding-x-axis);
    border-radius: 41px;
    width: fit-content;
    background: var(--color);
    cursor: pointer;
}

button:hover {
    background: var(--hover-color);
}

button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}
</style>