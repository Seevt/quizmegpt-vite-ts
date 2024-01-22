<template>
    <div class="quiz-component">
        <div class="question">
            <b role="question-number" class="question-number">
                Question {{ currentQuestionIndex + 1 }} / {{ props.questions?.length }}
            </b>
            <p role="question-description" class="question-title">
                {{ props.questions[currentQuestionIndex]?.question }}
            </p>
        </div>
        <ul v-if="currentQuestionIndex < props.questions?.length" class="answer-options">
            <li class="option" v-for="(option, optionIndex) in questions[currentQuestionIndex]?.options" :key="optionIndex"
                :class="{
                    selected: userAnswers[currentQuestionIndex] === option.value,
                }" @click="selectAnswer(option.value)">
                {{
                    option.text
                }}
            </li>
        </ul>

        <BaseButton class="quiz-button" @click="nextQuestion" v-if="currentQuestionIndex < questions.length - 1">
            Next Question
        </BaseButton>
        <BaseButton class="quiz-button" @click="submitAnswers" v-else>Submit</BaseButton>

    </div>
</template>
  
//   import { addDoc, collection } from "firebase/firestore";
//   import { db } from "@/firebase.js";
<script setup lang="ts">
import type { QuizQuestions } from "@/stores/quiz";
import BaseButton from "../BaseButton.vue";
import { useUserStore } from "@/stores/user";
import { ref, type PropType } from "vue";


const props = defineProps({
    questions: {
        type: Object as PropType<QuizQuestions[]>,
        required: true,
    }
})

const currentQuestionIndex = ref(0);
const userAnswers = ref<string[]>(Array(props.questions?.length).fill(null))
const score = ref(0);

const userStore = useUserStore()


async function showResults(payload: any) {

    score.value = payload.score;
    // this variable is created twice so that u send it via ref template to use it in a userAnswer varaible 
    // in parent, 
    // but this can be done exposin the variable to parent via ref and just sending it to Quiz Results component
    // userAnswers.value = quizComponent.value.userAnswers;

    // this booleans can be changed to suspense elements so that it has a x10 dx/ux
    // resultsShown.value = true;
    // quizGenerated.value = false;


    // await updateUserXp(payload.xpEarned)
    // await saveQuizToHistory({ ...payload })

    window.scrollBy({
        top: window.scrollY - 40,
        behavior: "smooth",
    })
}

function selectAnswer(answer: string) {
    userAnswers.value[currentQuestionIndex.value] = answer
}

function nextQuestion() {
    if (userAnswers.value[currentQuestionIndex.value] !== null) {
        currentQuestionIndex.value = currentQuestionIndex.value + 1;
    }
}

function submitAnswers() {
    let score = 0;
    let expEarned;
    for (let i = 0; i < props.questions.length; i++) {
        if (userAnswers.value[i] === props.questions[i].correctAnswer) {
            score++;
        }
    }
    expEarned = score * 10;
    saveQuizHistory({ score, questions: props.questions })
    // emit if needed
}

function saveQuizHistory(quizData: any) {
    // .... something firebase
    // store loggedInUser here uuid used.
}
</script>
  
<style scoped>
.quiz-component {
    display: flex;
    flex-direction: column;
    width: min(95%, 65ch);
    align-self: center;
}

.question {
    display: flex;
    flex-direction: column;
    gap: var(--gap-spacing);
}

.question .question-number {
    font-size: calc(var(--p-size)*1.5);
    text-align: center;
    color: var(--text-color);
    opacity: 0.7;
}

.question .question-title {
    font-weight: 700;
    letter-spacing: .6px;
    color: hsla(0, 0%, 100%, 0.9);
    background: var(--main-color);
    padding-inline: var(--padding-x);
    padding-block: var(--padding-y);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);

}

.answer-options {
    display: flex;
    flex-direction: column;
    gap: var(--gap-spacing);
    margin-top: var(--margin-y);
    padding-inline: var(--padding-x);
    padding-block: var(--padding-y);
    background: hsla(0, 0%, 83%, 0.308);
    border-radius: var(--card-radius);
}

.answer-options li {
    list-style: none;
    cursor: pointer;
    border-radius: var(--card-radius);
    padding-block: var(--padding-y);
    padding-inline: var(--padding-x);
    background-color: white;
    font-size: calc(var(--p-size)*1.1);
    transition: 0.25s;
    font-weight: 500;
    border: 1px solid transparent;
}

.answer-options li.selected {

    transition: 0.25s;
    border: 1px solid var(--text-color);
}

.quiz-button {
    margin-block: var(--margin-y);
    margin-inline: auto;
}
</style>