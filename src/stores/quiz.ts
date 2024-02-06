import { defineStore } from "pinia";
import { ref } from "vue";

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
  const score = ref(0);
  const loading = ref(false);
  const questionIndex = ref(0);

  return {
    difficulty,
    topic,
    questions,
    userAnswers,
    quizGenerated,
    loading,
    score,
    showResults,
    questionIndex,
  };
});
