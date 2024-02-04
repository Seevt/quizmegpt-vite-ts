<script setup lang="ts">
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BaseButton from "@/components/BaseButton.vue";
import type { PropType } from "vue";
import { ref } from "vue";
import type { QuizQuestions } from "@/stores/quiz";


const props = defineProps({
    score: {
        type: Number,
    },
    totalQuestions: {
        type: Number,
    },
    questions: {
        type: Array as PropType<QuizQuestions[]>,
    },
    userAnswers: {
        type: Array as PropType<string[]>,
    },
    expEarned: {
        type: Number,
    }
})


function getAnswerText(question: QuizQuestions, answerValue: string): string {
    const answers = question.options.find((option) => option.value === answerValue);
    return answers ? answers.text : "N/A";
}

function isAnswerCorrect(question: QuizQuestions, userAnswer: string): boolean {
    return userAnswer === question.correctAnswer
}


const results = ref<HTMLElement>()


async function downloadPDF() {
    const element = results.value; // reference to the quiz results div
    console.log(element);

    if (!element) return
    const canvas = await html2canvas(element!);
    console.log(canvas);
    const imgData = canvas.toDataURL("image/png");
    console.log(imgData);
    let pdf = new jsPDF("p", "mm", "a4");
    let imgProps = pdf.getImageProperties(imgData);
    let pdfWidth = pdf.internal.pageSize.getWidth();
    let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    console.log(pdf);
    pdf.save("quiz-results.pdf");
}

onUnmounted(() => {
    quizStore.showResults = false
})
</script>
  
<template>
    <div v-if="quizStore.showResults" class="results">

        <div class="score">
            <p>Your results</p>
            <span class="total-score">{{ quizStore.score }}/{{ props.questions?.length }}</span>
            <p>You earned {{ props.expEarned }} points</p>
        </div>

        <ol class="answers" ref="results">
            <li v-for="(question, index) in props.questions" :key="index">
                <h3>{{ question.question }}</h3>
                <p>Your answers: {{ getAnswerText(question, props.userAnswers[index]) }}</p>
                <span role="alert" v-if="isAnswerCorrect(question, props.userAnswers[index])" class="correct-answers">
                    Correct!
                </span>
                <span role="alert" v-else class="incorrect-answers">
                    Incorrect. The correct answers is:
                    {{ getAnswerText(question, question.correctAnswer) }}
                </span>
            </li>
        </ol>
        <base-button class="download-bt" @click="downloadPDF">Download Results</base-button>

    </div>
</template>

<style scoped>
.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(95%, 65ch);
    margin: 0 auto;
}

.score {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    color: white;
    background-color: var(--main-color);
    border-radius: var(--card-radius);
    padding-block: var(--padding-y);
    padding-inline: var(--padding-x);
    box-shadow: var(--card-shadow);
    margin-bottom: var(--margin-y);
}

.total-score {
    margin: 0;
    font-size: 80px;
    color: white;
    font-size: calc(var(--h1-size) *2);
    font-weight: 700;
}

.answers {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.answers li {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap-spacing)/2);
    margin-bottom: calc(var(--margin-y)*2);
    line-height: 1.25;
}

.answers h3 {
    font-weight: 500;
    margin-bottom: var(--margin-y);

}

.correct-answers {
    color: green;
}

.incorrect-answers {
    color: red;
}



.download-bt {
    display: flex;
    justify-content: center;
    margin-block: var(--margin-y);
    margin-bottom: calc(var(--margin-y) *2);
}
</style>