<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, type Auth, type UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import * as z from 'zod';

const router = useRouter();

const formSchema = z.object({
    email: z.string().min(1, { message: "You must specify an email" }).email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "You must enter a password" }),
})

const login_form = ref({
    email: "",
    password: "",
})

const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const firebaseError = ref<string | null>(null)


function validateField(fieldName: keyof typeof formSchema.shape) {
    try {
        formSchema.shape[fieldName].parse(login_form.value[fieldName]);
        (fieldName === 'email' ? emailError : passwordError).value = null
    } catch (error: any) {
        (fieldName === 'email' ? emailError : passwordError).value = error.issues[0].message
        console.log(error.issues);
    }
}

function login(): void {
    const auth: Auth = getAuth()

    if (emailError.value || passwordError.value) return

    signInWithEmailAndPassword(
        auth,
        login_form.value.email, login_form.value.password
    )
        .then((data: UserCredential) => {
            router.push('/profile')
        })
        .catch((error: any) => {

            if (error instanceof FirebaseError) {
                firebaseError.value = error.code;
            }
            firebaseError.value = "The username or password you entered is incorrect. Please try again"
            console.log(error.code);
            // alert(error.message)
        })
}

</script>

<template>
    <h1>Sign In</h1>
    <form @submit.prevent="login" class="form">
        <label for="email">Email</label>
        <input @blur="validateField('email')" name="email" :class="{ 'active-error': emailError }"
            placeholder="Enter your email" id="email" v-model="login_form.email" />

        <span role="error message" v-if="emailError" class="zod-error">{{ emailError }}</span>


        <label for="password">Password</label>
        <input @blur="validateField('password')" name="password" :class="{ 'active-error': passwordError }" type="password"
            placeholder="Enter your password" id="password" v-model="login_form.password" />

        <span role="error message" v-if="passwordError" class="zod-error">{{ passwordError }}</span>

        <button class="submit-button" type="submit">
            <p>Continue</p>
            <p> {{ "➜" }}</p>
        </button>

        <div v-if="firebaseError" class="firebase-error">
            <span role="error message">{{ firebaseError }}</span>
        </div>
    </form>
</template>

<style scoped>
h1 {
    padding-bottom: 1rem;
    text-align: center;
    cursor: default;
}

.form {
    display: flex;
    flex-direction: column;
}

.form input {
    margin-bottom: 25px;
}

.form input:last-of-type {
    margin-bottom: 10px;
}

label {
    display: flex;
    margin-bottom: 0.5rem;
    margin-left: .5rem;


}

.zod-error {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-left: .8rem;
    margin-bottom: 20px;
    font-size: calc(var(--p-size)/1.3);
    color: var(--error-color);
    font-weight: 400;
    transition: all;
}

.firebase-error {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-left: .8rem;
    margin-bottom: 20px;
    font-size: calc(var(--p-size)/1.25);
    color: var(--error-color);
    font-weight: 500;
    /* max-width: 350px; */
}

.firebase-error span {
    max-width: 350px;
}

input {
    display: flex;
    align-items: center;
    background: hsl(0, 0%, 90%);
    border: none;
    padding: var(--input-sizing-y) var(--input-sizing-x);
    border-radius: var(--input-radius);
    font-size: medium;
    border: 1px solid hsl(0, 0%, 86%);
}

input.active-error {
    border: 1px solid var(--error-color);
}


.form input.active-error {
    margin-bottom: 0;
}

.form input:last-of-type.active-error {
    margin-bottom: 0;
}


input::placeholder {
    opacity: 1;
    font-size: clamp(.8rem, 2vw, .88rem);
}

input:focus {
    outline: none;
    box-shadow: 0 0 2px hsl(0, 0%, 10%);
}

.submit-button {
    display: flex;
    margin-top: 2rem;
    --pading-inline: 1.5rem;
    padding-block: var(--input-sizing-y);
    padding-inline: var(--pading-inline);
    justify-content: center;
    /* font-size: 1.5rem; */
    font-weight: 500;
    background-color: hsl(202, 74%, 53%);
    color: #ffffff;
    border: none;
    border-radius: var(--input-radius);
    cursor: pointer;
    transition: background-color 0.2s ease;
    position: relative;
    transition: 0.2s;

}

.submit-button p:last-child {
    position: absolute;
    right: var(--pading-inline);
}

@media (max-width: 768px) {
    .submit-button p:last-child {
        display: none;
    }
}


.submit-button:hover {
    background-color: hsl(202, 74%, 60%);
    transition: 0.2s;
}

.submit-button:disabled {
    color: #c9c9c9;
    background-color: #b2b2b2;
    /* A gray color */
    /* box-shadow: inset 0 -2px 0 #303030; */
    cursor: not-allowed;
}

.submit-button:active {
    outline: none;
    transform: scale(0.95);
    transition: all 0.3s ease-in-out;
}
</style>

 