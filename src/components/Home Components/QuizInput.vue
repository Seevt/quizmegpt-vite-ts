<script setup lang="ts">
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";

const quizStore = useQuizStore()
const loading = ref(false);



</script>

<template>
    <div class="input-wrapper">
        <input type="text" v-model="quizStore.topic" placeholder="Enter any topic...">
        <select v-model="quizStore.difficulty" :disabled="loading" class="select remove-select-styles"
            name="dificulty-selector">
            <option disabled value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="emoji">Emojis</option>
        </select>
    </div>
</template>

<style scoped>
.input-wrapper {
    --input-sizing-y: clamp(0.4rem, 5%, 0.6rem);
    --b-style: 1px solid hsl(0, 0%, 70%);
    display: flex;
    flex-wrap: wrap;
    font-size: var(--p-size);
    width: min(100%, 65ch - 5ch);
    margin-block: calc(var(--margin-y)/2);
    border-radius: var(--input-radius);
    padding-block: var(--input-sizing-y);
    padding-inline: var(--input-sizing-x);
    border: var(--b-style);
}

.input-wrapper::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: #4e4e4e;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    align-self: center;
    cursor: pointer;

}

.input-wrapper input {
    flex: 2;
    border: none;
    background: transparent;
    border-bottom-left-radius: var(--b-radius);
    border-top-left-radius: var(--b-radius);
    border-right: var(--b-style);
}

.input-wrapper input:focus {
    outline: none;
}

@media (max-width: 648px) {

    .input-wrapper {
        justify-content: center;
        gap: 5px;
        border-radius: 10px;
    }

    .input-wrapper::after {
        display: none;
    }

    .input-wrapper input {
        border-right: 0;
        border-bottom: var(--b-style);
        text-align: center;
    }

    .input-wrapper input::placeholder {
        text-align: center;
    }


    .remove-select-styles {
        padding: 0;
    }

}


.remove-select-styles {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    padding: 0 1.5em 0 1.5em;
    margin: 0;
    border: 0;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
}

.remove-select-styles::-ms-expand {
    display: none;
}

.select {
    font-size: var(--p-size);
    line-height: 1.1;
    cursor: pointer;
    position: relative;
    color: #4e4e4e;
    text-align: left;
}


.select:hover {
    opacity: 0.8;
}


@media (max-width: 648px) {
    .select {
        text-align: center;
    }
}
</style>