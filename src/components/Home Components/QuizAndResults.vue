<script setup lang="ts">
import QuizComponent from '@/components/Home Components/QuizComponent.vue';
import { useQuizStore } from '@/stores/quiz';
import ResultsComponent from './ResultsComponent.vue';

const quizStore = useQuizStore()
</script>
        
<template>
    <QuizComponent :questions="quizStore.questions" />
    <ResultsComponent :questions="quizStore.questions" />
</template>

<style scoped></style>