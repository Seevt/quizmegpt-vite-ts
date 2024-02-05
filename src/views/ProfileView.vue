<script setup lang="ts">
import FloatingBackground from '@/components/FloatingBackground.vue';
import UserNav from '@/components/Porfile Components/UserNav.vue';
import { useUserStore } from '@/stores/user';
import { getAuth, type Auth } from 'firebase/auth';
import { nextTick, onMounted } from 'vue';

let auth: Auth;
auth = getAuth()
const userStore = useUserStore();




onMounted(async () => {
    nextTick(
        async () => {
            await userStore.fetchUserData(auth.currentUser!.uid)

        }
    )
})

</script>

<template>
    <div class="my-account">
        <FloatingBackground />

        <!-- missing user prop -->
        <UserNav :username="userStore.user?.email" />


        <h2 class="user-level">{{ userStore.user?.title }}</h2>
        <div class="user-score">
            <p>Your quiz score is</p>
            <span class="user-points">{{ userStore.user?.experience }}</span>
        </div>

        <div>
            <!-- <button class="history-bt" @click="toggleQuizHistory">
                <span class="past-quiz">
                    <p>
                        Past quizzes
                    </p>
                    <svg :style="isQuizHistoryOpen ? 'rotate: -180deg' : 'rotate: 0deg'" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                </span>
            </button> -->

            <!-- <ol :style="isQuizHistoryOpen ? 'grid-template-rows: 1fr; background-color: #fff; box-shadow: var(--card-shadow);' : ''"
                class="quiz-history">
                <div class="quiz-history-transition-container">
                    <li v-for="(     quiz, index     ) in      quizHistoryData     " :key="quiz.id"
                        class="quiz-history-item">
                        <div class="quiz-content">
                            <div class="quiz-header">
                                <h2>Quiz {{ index + 1 }}</h2>
                                <p>
                                    Your score: {{ quiz.score }} / {{ quiz.questions.length }}
                                </p>
                            </div>
                            <ol class="quiz-questions">
                                <li v-for="(     question, qIndex     ) in      quiz.questions     " :key="qIndex"
                                    class="question-info">
                                    <p class="title">
                                        {{ question.question }}
                                    </p>
                                    <p class="answer">Answer: {{ question.correctAnswer }}</p>
                                </li>
                            </ol>
                        </div>

                        <button class='delete-button' @click="deleteQuiz(quiz.id)">&times;</button>
                    </li>
                </div>

            </ol> -->
        </div>

    </div>
    <!-- <div v-else>
        <div class="loading-spinner"></div>
    </div> -->
</template>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

* {
    list-style: none;
}

.my-account {
    display: flex;
    align-self: center;
    flex-direction: column;
    width: min(95%, 65ch);
    flex-grow: 1;
    text-align: center;
    gap: var(--gap-spacing);
}

.user-level,
.user-score {
    padding-block: var(--padding-x);
    border-radius: var(--card-radius);
    padding-block: var(--padding-y);
    box-shadow: var(--card-shadow);
    background-color: #fff;
    letter-spacing: .6px;
    color: rgba(43, 43, 43, 0.8);
}

.user-level {
    background: var(--main-color);
    color: #fff;
    letter-spacing: 1px;
}


.user-points {
    color: var(--main-color);
    font-size: calc(var(--h1-size) *2);
    font-weight: 700;
}


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

.loading-spinner {
    display: flex;
    width: 80px;
    height: 80px;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #ffc973;
    animation: spin 0.7s linear infinite;
    margin: 300px auto;
}

.loading-spinner {
    display: flex;
    width: 80px;
    height: 80px;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #ffc973;
    animation: spin 0.7s linear infinite;
    margin: 300px auto;
}
</style>