<script setup lang="ts">
import axios from 'axios';
import BaseButton from '@/components/BaseButton.vue';
import VueModal from '@/components/VueModal.vue';
import HomeModal from '@/components/Home Components/HomeModal.vue';
import type { QuizQuestions } from '@/stores/quiz'
import { useModalController } from '@/composables/useModal';
import { useQuizStore } from '@/stores/quiz';
import { nextTick } from 'vue';
import * as z from 'zod';



const quizSchema = z.object({
    topic: z.string().min(1, { message: "You must specify a topic" }).min(3, { message: "The topic must be at least 3 letters long" }),
    difficulty: z.enum([
        "easy",
        "medium",
        "hard",
        "emoji",
    ])
})


// console.log(quizSchema.shape["difficulty"].parse(quizStore.difficulty = ""));


const API_URL: string = 'https://api.openai.com/v1/chat/completions';


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

async function getQuizFromChatGPT(topic: string, difficulty: string): Promise<string> {
    const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
    const prompt = buildPrompt(topic, difficulty);
    let data: string;
    const response = await axios.post(
        API_URL,
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
    )
    if (response.data.choices.length > 0) {
        data = response.data.choices[0].message.content;
        return data
    } else {
        throw new Error("No quiz questions found");
    }
}

function parseQuizText(text: string): Promise<QuizQuestions[]> {
    return new Promise((resolve, reject) => {
        let questions: QuizQuestions[] = [];
        let match;

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

            resolve(questions)
        }
    })
}

async function generateQuiz(): Promise<void> {
    quizStore.showResults = false;
    quizStore.score = 0;
    quizStore.questionIndex = 0;
    quizStore.loading = true;
    let response: string;
    try {
        response = await getQuizFromChatGPT(
            quizStore.topic,
            quizStore.difficulty,
        )
        const questions = await parseQuizText(response);

        quizStore.questions = questions
        quizStore.quizGenerated = true;
        quizStore.loading = false;
        nextTick(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            })
        })
    } catch (error) {
        console.error("Failed to generate quiz:", error);
        console.log("Failed to parse questions from API response");
    }
}



</script>

<template>
    <form @submit.prevent="generateQuiz">
        <div :class="{
            'active-error':
                quizStore.validationErrors.topic
                ||
                quizStore.validationErrors.difficulty
        }" class="input-wrapper">
            <input type="text" v-model="quizStore.topic" placeholder="Enter any topic...">
            <select v-model="quizStore.difficulty" class="select remove-select-styles" name="dificulty-selector">
                <option disabled value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="emoji">Emojis</option>
            </select>
        </div>
        <div role="quiz-actions" class="quiz-controls">
            <BaseButton type="submit" color="var(--main-color)" hoverColor="#4eade4" :disabled="quizStore.loading"
                class="disabledStyle">
                Generate Quiz
            </BaseButton>
            <button class="info-button" @click="toggleModal">?</button>
        </div>
        <VueModal teleport="#home_modal" closeOnBackground :styling="{ overflowY: 'auto' }" defaultPosition
            :controller="homeModal">
            <HomeModal :showModal="homeModal.show.value" @close="toggleModal" />
        </VueModal>
    </form>
</template>

<style scoped>
form {
    width: 100%;
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

.input-wrapper.active-error {
    border: 1px solid var(--error-color);
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