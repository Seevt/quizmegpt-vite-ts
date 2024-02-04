import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export type QuizQuestions = {
  question: string;
  options: Array<{ value: string; text: string }>;
  correctAnswer: string;
};

export const useQuizStore = defineStore("quiz", () => {
  const difficulty = ref("");
  const topic = ref("");
  const questions = ref<QuizQuestions[]>([]);
  const userAnswers = ref<string[]>([]);
  const quizGenerated = ref(false);
  const showResults = ref(false);
  const loading = ref(false);
  const score = ref(0);

  watchEffect(() => {
    console.log(difficulty.value, questions.value[1]?.question);
  });

  return {
    difficulty,
    topic,
    questions,
    userAnswers,
    quizGenerated,
    loading,
    score,
    showResults,
  };
});
