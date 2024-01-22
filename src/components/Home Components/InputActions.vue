<script setup lang="ts">
import axios from 'axios';
import BaseButton from '@/components/BaseButton.vue';
import VueModal from '@/components/VueModal.vue';
import HomeModal from '@/components/Home Components/HomeModal.vue';
import type { QuizQuestions } from '@/stores/quiz'
import { useModalController } from '@/composables/useModal';
import { useQuizStore } from '@/stores/quiz';
import { ref, nextTick } from 'vue';

const loading = ref(false);
const quizGenerated = ref(false)

// composables
const homeModal = useModalController()

// stores
const quizStore = useQuizStore()

const regex: RegExp =
    /(?<=^|\n)\s*(.+)\s*\n*\s*A\)(.+)\s*B\)(.+)\s*C\)(.+)\s*\n*\s*(?:Correct\s*)?Answer:\s*(A|B|C)/gmi;


function toggleModal(): void {
    if (!homeModal.show.value) {
        homeModal.open();
    } else {
        homeModal.close();
    }
}


function buildPrompt(topic: string, difficulty: string): string {
    let prompt: string;

    if (difficulty === 'emoji') {
        prompt =
            `You're a QuizMaker. 
         Create 5 questions to be responded with emojis
          about ${topic}; each with 3 multiple choice
           answers, the choice answers can only be written
            using multiple emojis, 
            unless the question its a name, 
            it would need to be followed 
            an emoji after the name to
            represent the character. 
            Indicate the correct answer for each question
            with a letter (A, B, or C). 
            Answer letters should use ')'. Also,
            make sure that the response given matches
            the regex ${regex} for formatting purposes.`;
    } else {
        prompt = `You're a QuizMaker. Create 5 ${difficulty} questions about ${topic}, each with 3 multiple choice ${difficulty} answers. Indicate the correct answer for each question with a letter (A, B, or C). Answer letters should use ')'. Also, make sure that the response given matches the regex ${regex} for formatting purposes. Provide the correct answer at the last paragraph by responding 'Correct Answer: {CorrectAnswerLetter}'`;
    }
    return prompt
}



async function getQuizFromChatGPT(topic: string, difficulty: string) {
    const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
    const prompt = buildPrompt(topic, difficulty);

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.8,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        // console.log("API response:", response);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error generating quiz:", error);
    }
}



function parseQuizText(text: string): QuizQuestions[] {
    let match;
    let questions: QuizQuestions[] = [];

    while ((match = regex.exec(text)) !== null) {
        questions.push({
            question: match[1].trim(),
            options: [
                { text: match[2].trim(), value: "A" },
                { text: match[3].trim(), value: "B" },
                { text: match[4].trim(), value: "C" },
            ],
            correctAnswer: match[5],
        });
    }
    console.log(questions);

    // return questions.length > 0 ? questions : null;
    return questions
}

async function generateQuiz() {
    // hide results when generating a new quiz
    // resultsShown.value = false;
    console.log('is generatequiz loggin');

    loading.value = true;

    const response = await getQuizFromChatGPT(
        quizStore.topic,
        quizStore.difficulty,
    )

    loading.value = false;

    quizStore.apiDataOutput = response;

    if (response) {
        const questions = parseQuizText(response);

        if (questions !== null) {
            quizStore.questions = questions;
            quizGenerated.value = true;

            // errorMessage.value = ""
            nextTick(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                })
            })
        } else {
            console.error("Failed to parse questions from API response")
            console.log(
                "Failed to generate quiz. Please try a different topic."
            );
        }
    }
}

</script>
<template>
    <div role="quiz-actions" class="quiz-controls">
        <BaseButton color="var(--main-color)" hoverColor="#4eade4" @click="generateQuiz" :disabled="loading"
            class="disabledStyle">
            Generate Quiz
        </BaseButton>
        <button class="info-button" @click="toggleModal">?</button>
    </div>
    <VueModal teleport="#home_modal" closeOnBackground :styling="{ overflowY: 'auto' }" defaultPosition
        :controller="homeModal">
        <HomeModal :showModal="homeModal.show.value" @close="toggleModal" />
    </VueModal>
</template>

<style scoped>
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
</style>