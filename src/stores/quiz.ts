import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export type Options = {
  value: string;
  text: string;
};

export type QuizQuestions = {
  question: string;
  options: Options[];
  correctAnswer: string;
};

export const useQuizStore = defineStore("quiz", () => {
  const difficulty = ref<string>("");
  const topic = ref<string>("");
  const apiDataOutput = ref<string | null>(null);
  const questions = ref<QuizQuestions[]>([]);
  const userAnswers = ref<string[]>([]);

  watchEffect(() => {
    console.log(difficulty.value, questions.value[1]?.question);
  });

  return {
    difficulty,
    topic,
    apiDataOutput,
    questions,
    userAnswers,
  };
});
