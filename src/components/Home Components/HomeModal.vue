<script setup lang="ts">
const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    }
})


</script>

<template>
    <div v-if="props.showModal" class=" home-modal">
        <div class="modal-header">
            <h1>Welcome to QuizMEGPT!</h1>
            <span class="close-button" @click="$emit('close')">&times;</span>
        </div>
        <p>
            QuizMEGPT is an interactive web application that generates quizzes for
            you based on the topic of your choice. It utilizes the power of
            OpenAI's advanced language model, chat-gpt-turbo, to process your
            requests and provide insightful, challenging, and fun quizzes in
            return.
        </p>
        <div class="instructions">
            <h2>Here's how it works:</h2>
            <ol>
                <li>
                    <strong>Choose Your Topic</strong>: Just enter a topic you're
                    interested in, and QuizMEGPT will use it to create a quiz. The more
                    specific you are with your topic, the more targeted the quiz will
                    be.
                </li>
                <li>
                    <strong>Select Difficulty Level</strong>: You can choose the
                    difficulty level of your quiz from easy, medium, hard, to emojis.
                    The higher the level, the more challenging the questions! And let's
                    not talk about the emojies difficulty...
                </li>
                <li>
                    <strong>Quiz Generation</strong>: After you've chosen a topic and
                    difficulty, click on 'Generate Quiz'.
                </li>
                <li>
                    <strong>Account Benefits</strong>: If you have an account and are
                    logged in, you can track your progress, review past quizzes, and
                    even earn points from your quiz results!
                </li>
                <li>
                    <strong>Load Sample Quiz</strong>: Not sure what topic to choose?
                    Try out the 'Load Sample Quiz' feature! This gives you a pre-made
                    quiz to explore.
                </li>
            </ol>
        </div>

        <p role="note" class="note">
            <strong>Note</strong>: While ChatGPT strives to provide accurate
            information, there might be instances where the generated content may
            be incorrect or out-of-date. However, it's important to remember that the
            underlying model was last trained on new data in September 2021, and
            thus it doesn't have information about the world after that point.
        </p>
    </div>
</template>


<style scoped>
.home-modal {
    display: flex;
    flex-direction: column;
    gap: var(--gap-spacing);
    margin-block: var(--margin-y);
    background-color: #fefefe;
    padding-inline: var(--padding-x);
    padding-block: var(--padding-y);
    border: 1px solid #888;
    width: min(95%, 80ch);
    border-radius: var(--card-radius);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-header span {
    font-size: var(--h2-size);
}

p {
    font-family: var(--roboto);
}

ol {
    counter-reset: orderedList;
}

li {
    list-style: none;
}

li::before {
    counter-increment: orderedList;
    content: counter(orderedList) '.';
    font-weight: bold;
    margin-right: 10px
}

li strong {
    font-weight: bold;
}

.close-button {
    font-weight: bold;
    cursor: pointer;

}

.close-button:hover,
.close-button:focus {
    color: #000;
    text-decoration: none;
}

.note {
    font-weight: 500;
    opacity: 60%;
    color: rgb(85, 0, 0);
}
</style>