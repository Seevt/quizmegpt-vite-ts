<script setup  lang="ts">
import FloatingBackground from '@/components/FloatingBackground.vue';
import HomeNav from '@/components/Home Components/HomeNav.vue';
import QuizComponent from '@/components/Home Components/QuizComponent.vue';
import ResultsComponent from '@/components/Home Components/ResultsComponent.vue';

import QuizControls from '@/components/Home Components/QuizControls.vue';
import { useUserStore } from '@/stores/user';
import { useQuizStore, } from '@/stores/quiz';

// pinia stores
const userStore = useUserStore();
const quizStore = useQuizStore();

</script>

<template>
    <HomeNav />
    <div class="home-view">
        <FloatingBackground />
        <div class="wrapper">
            <div class="container">
                <h1> {{ userStore.isLoggedIn ? `Welcome back!, What do you want to be tested about?` : `Let's create a quiz!
                    What do
                    you
                    want to be tested about ?` }} </h1>
                <p v-if="!userStore.isLoggedIn" class="paragraph">
                    Log into your account to review your Quizzes
                    <br />
                    and get points from your
                    matches!
                </p>
                <QuizControls />
            </div>
            <img v-if="quizStore.quizGenerated" class="illustration" src="@/assets/imgs/home-vector-design.png"
                alt="illustration vector">
            <img v-else class="illustration" src="@/assets/imgs/results-ill.png" alt="illustration vector">


            <QuizComponent :questions="quizStore.questions" />

            <ResultsComponent :userAnswers="quizStore.userAnswers" :questions="quizStore.questions" />
        </div>
        <!-- <p class="error-message">{{ errorMessage }}</p> -->
    </div>
</template>

<style scoped>
.home-view {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100svh;
}

.wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(95%, 65ch);
    margin-inline: auto;
    margin-block: 0;
    padding-inline: var(--padding-x);
    padding-block: var(--padding-y);
    text-align: center;
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    background-color: #fff;
}

h1 {
    margin-bottom: var(--margin-y);
    color: #4e4e4e;
}

.paragraph {
    display: flex;
    justify-content: center;
    justify-items: center;
    margin-bottom: var(--margin-y);
    opacity: 75%;
}



.illustration {
    margin: 0 auto;
    width: 317px;
    height: 317px;
}

@media (max-width: 600px) {
    .illustration {
        width: 200px;
        height: 200px;
        margin-top: var(--margin-y);
    }
}




.output-container {
    padding: 20px;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    display: none;
    display: block;
}

#quiz-output {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
}
</style>