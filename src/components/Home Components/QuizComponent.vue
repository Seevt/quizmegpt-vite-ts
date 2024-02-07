<script setup lang="ts">
import { useQuizStore, type QuizQuestions } from "@/stores/quiz";
import BaseButton from "../BaseButton.vue";
import { useUserStore } from "@/stores/user";
import { type PropType } from "vue";
import { getAuth, type Auth } from "firebase/auth";



const props = defineProps({
    questions: {
        type: Array as PropType<QuizQuestions[]>,
        required: true
    }
})

// firebase user data
let auth: Auth = getAuth()

// global stores
const userStore = useUserStore()
const quizStore = useQuizStore()


function selectAnswer(answer: string) {
    quizStore.userAnswers[quizStore.questionIndex] = answer
}

function nextQuestion() {
    if (quizStore.userAnswers[quizStore.questionIndex] !== null) {
        quizStore.questionIndex = quizStore.questionIndex + 1;
    }
}


async function submitAnswers() {
    // this score variable will send the new exp earned
    let score: number = 0;
    let expEarned: number;
    for (let i = 0; i < props.questions.length; i++) {
        if (quizStore.userAnswers[i] === props.questions[i].correctAnswer) {
            score++;
        }
    }
    // this score variable just serves the porpuse of showing the user how many right answer they have
    // could be optimized to only have one
    quizStore.score = score
    expEarned = score * 10;

    quizStore.quizGenerated = false;
    quizStore.showResults = true

    await userStore.updateFirebaseUserData(auth.currentUser!.uid, expEarned);
    await userStore.saveQuiz(auth.currentUser!.uid, props.questions, score)

}





</script>

<template>
    <div v-if="quizStore.quizGenerated && !quizStore.loading" class="quiz-component">
        <div class="question">
            <b role="question-number" class="question-number">
                Question {{ quizStore.questionIndex + 1 }} / {{ props.questions?.length }}
            </b>
            <p role="question-description" class="question-title">
                {{ props.questions[quizStore.questionIndex]?.question }}
            </p>
        </div>
        <ul v-if="quizStore.questionIndex < props.questions?.length" class="answer-options">
            <li class="option" v-for="(option, optionIndex) in questions[quizStore.questionIndex]?.options"
                :key="optionIndex" :class="{
                    selected: quizStore.userAnswers[quizStore.questionIndex] === option.value,
                }" @click="selectAnswer(option.value)">
                {{
                    option.text
                }}
            </li>
        </ul>

        <BaseButton class="quiz-button" @click="nextQuestion" v-if="quizStore.questionIndex < questions.length - 1">
            Next Question
        </BaseButton>
        <BaseButton class="quiz-button" @click="submitAnswers" v-else>Submit</BaseButton>

    </div>
    <p role="loader" class="waiting-text" v-else-if="quizStore.loading && !quizStore.quizGenerated">We are generating a quiz
        for you</p>
</template>
  
//   import { addDoc, collection } from "firebase/firestore";
//   import { db } from "@/firebase.js";

  
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

.waiting-text {
    animation: bounce 1s ease infinite;
    margin-top: var(--margin-y);
    align-self: center;
}
</style>