<script setup lang="ts">
import { ref } from "vue";
import { type Auth, getAuth } from "firebase/auth";
import { useUserStore } from "@/stores/user";

// global store
const userStore = useUserStore();

// firebase auth data
let auth: Auth = getAuth();

// reactive declarations
const isOpen = ref(false);

const fetch = await userStore.fetchUserQuizesData(auth.currentUser!.uid);

userStore.quizHistory = fetch?.userQuizData
</script>

<template>
    <div>
        <button class="history-bt" @click="() => isOpen = !isOpen">
            <span class="past-quiz">
                <p>
                    Past quizzes
                </p>
                <svg :style="isOpen ? 'rotate: -180deg' : 'rotate: 0deg'" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
            </span>
        </button>

        <ol :style="isOpen ? 'grid-template-rows: 1fr; background-color: #fff; box-shadow: var(--card-shadow);' : ''"
            class="quiz-history">
            <div class="quiz-history-transition-container">
                <li v-for="(quiz, index) in userStore.quizHistory?.quizes" :key="quiz" class="quiz-history-item">
                    <div class="quiz-content">
                        <div class="quiz-header">
                            <h2>Quiz {{ index + 1 }}</h2>
                            <p>
                                Your score: {{ quiz.score }}
                            </p>
                        </div>
                        <ol class="quiz-questions">
                            <li v-for="(question, qIndex) in quiz.questions" :key="qIndex" class="question-info">
                                <p class="title">
                                    {{ question.question }}
                                </p>
                                <p class="answer">Answer: {{ question.correctAnswer }}</p>
                            </li>
                        </ol>
                    </div>

                    <button class='delete-button'
                        @click="userStore.deleteQuiz(auth.currentUser!.uid, index)">&times;</button>
                </li>
            </div>

        </ol>
    </div>
</template>

<style scoped>
.past-quiz {
    display: flex;
    align-items: center;
    padding-bottom: 0.25rem;
    cursor: pointer;
}

.past-quiz p {
    flex-grow: 1;
    text-align: left;
}

.past-quiz svg {
    width: 2rem;
    height: 1.5rem;
    justify-self: end;
}

.history-bt {
    border: none;
    background: none;
    color: hsl(0, 0%, 25%);
    font-weight: bold;
    letter-spacing: .5px;
    width: 100%;
    cursor: pointer;
    margin-bottom: calc(var(--gap-spacing)/2);
}

.quiz-history {
    display: grid;
    grid-template-rows: 0fr;
    transition: 350ms all ease;

    border-radius: var(--card-radius);
    margin-bottom: var(--gap-spacing);
    padding-block: var(--padding-y);
    padding-inline: var(--padding-x);

}

.quiz-history-transition-container {
    overflow: hidden;
}


.quiz-history-item {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.quiz-history-item h2 {
    text-align: left;
}

.quiz-history-item .delete-button {
    border: none;
    background-color: transparent;
    height: fit-content;
    font-size: var(--h2-size);
    cursor: pointer;
}

.quiz-content {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--margin-y);
    width: 100%;
}

.quiz-header {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.quiz-header p {
    justify-self: center;
    width: 100%;
    margin-bottom: calc(var(--margin-y)/3);
}



.quiz-questions {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: var(--gap-spacing)
}

.question-info {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap-spacing)/4);
}
</style>