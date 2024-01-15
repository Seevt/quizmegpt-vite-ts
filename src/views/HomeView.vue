<script setup lang="ts">
import { ref } from 'vue';
import { useModalController } from '../composables/useModal'
import FloatingBackground from '@/components/FloatingBackground.vue';
import HomeNav from '@/components/Home Components/HomeNav.vue';
import HomeModal from '@/components/Home Components/HomeModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import VueModal from '@/components/VueModal.vue';

const difficultyLevel = ref("");
const quizTopic = ref("");
const quizGenerated = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const homeModal = useModalController()

function toggleModal(): void {
    if (!homeModal.show.value) {
        homeModal.open();
    } else {
        homeModal.close();
    }
}

const loggedInUser = ref(false)

function generateQuiz() {

}

</script>

<template>
    <div class="home-view">
        <FloatingBackground />
        <HomeNav />
        <RouterLink to="/profile">test</RouterLink>
        <div class="wrapper">
            <div class="container">
                <h1> {{ loggedInUser ? `Welcome back!, What do you want to be tested about?` : `Let's create a quiz! What do
                    you
                    want to be tested about ?` }} </h1>
                <p v-if="!loggedInUser" class="paragraph">
                    Log into your account to review your Quizzes
                    <br />
                    and get points from your
                    matches!
                </p>
                <div class="input-wrapper">
                    <input type="text" v-model="quizTopic" placeholder="Enter any topic...">
                    <select v-model="difficultyLevel" :disabled="loading" class="select remove-select-styles"
                        name="dificulty-selector">
                        <option disabled value="">Select difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="emoji">Emojis</option>
                    </select>
                </div>

                <div role="quiz-actions" class="quiz-controls">
                    <BaseButton color="var(--main-color)" hoverColor="#4eade4" @click="generateQuiz" :disabled="loading"
                        class="disabledStyle">
                        Generate Quiz
                    </BaseButton>
                    <button class="info-button" @click="toggleModal">?</button>
                </div>

                <p class="error-message">{{ errorMessage }}</p>
                <div v-if="loading" class="loading-spinner"></div>
                <p v-if="loading" class="waiting-text">
                    We are generating a quiz for you
                </p>
            </div>
            <img v-if="quizGenerated" class="illustration" src="@/assets/imgs/home-vector-design.png"
                alt="illustration vector">
            <img v-else class="illustration" src="@/assets/imgs/results-ill.png" alt="illustration vector">
        </div>

        <!-- <QuizComponent ref="quizComponent" v-if="quizGenerated" :questions="quizQuestions" @submit-answers="showResults">
        </QuizComponent> -->


        <!-- <results-component v-if="resultsShown" :score="score" :total-questions="quizQuestions.length"
      :questions="quizQuestions" :user-answers="userAnswers" :xp-earned="xpEarned" /> -->

        <VueModal teleport="#home_modal" closeOnBackground :styling="{ overflowY: 'auto' }" defaultPosition
            :controller="homeModal">
            <HomeModal :showModal="homeModal.show.value" @close="toggleModal" />
        </VueModal>
    </div>
</template>

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

.quiz-controls {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: var(--margin-y);
    gap: var(--margin-y);
}

.info-button {
    --min-size: 30px;
    --circle-size: min(5vw, 2rem);
    border: none;
    cursor: pointer;
    display: flex;
    padding-top: 1px;
    justify-content: center;
    align-items: center;
    background-color: hsl(0, 0%, 41%);
    color: white;
    border-radius: var(--input-radius);
    min-width: var(--min-size);
    min-height: var(--min-size);
    height: var(--circle-size);
    width: var(--circle-size);
    font-size: clamp(1rem, 1.8vw, 1.2rem);
}

.info-button:hover {
    background-color: #4e4e4e;
}



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


.waiting-text {
    animation: bounce 1s ease infinite;
    margin-top: var(--margin-y);
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