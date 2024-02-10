<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, type Auth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { db } from '@/main'
import * as z from 'zod';



const router = useRouter()

const register_form = ref({
    email: "",
    password: "",
    confirmPassword: "",
})

const formSchema = z.object({
    email: z.string().min(1, { message: "You must specify an email" }).email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "You must enter a password" }).min(6, { message: "Your password must have at least 6 characters" }),
    confirmPassword: z.string()
        .min(1, { message: "You must confirm your password" })
        .refine((value) => value === register_form.value.password, { path: ["confirmPassword"], message: "Your passwords don't match" })
})



const firebaseError = ref<string | null>(null)
const errors = ref<{ email: string | null, password: string | null, confirmPassword: string | null }>({
    email: null,
    password: null,
    confirmPassword: null,
});


function validateField(fieldName: keyof typeof formSchema.shape) {
    try {

        formSchema.shape[fieldName].parse(register_form.value[fieldName]);
        errors.value[fieldName] = null;

    } catch (error: any) {
        errors.value[fieldName] = error.issues[0].message
    }
}




async function checkUserAndCreateDocument(user_id: string) {
    const auth: Auth = getAuth();
    const userDocReference = doc(db, 'users', user_id);
    const userDocumentSnapshot = await getDoc(userDocReference);
    const quizesDocReference = doc(db, 'quizes', user_id);
    const quizesDocumentSnapshot = await getDoc(quizesDocReference);

    if (userDocumentSnapshot.exists()
        || quizesDocumentSnapshot.exists()) return

    if (auth.currentUser) {
        await setDoc(userDocReference, {
            uid: user_id,
            email: auth.currentUser?.email,
            experience: 0,
            title: "Newbie Quizzer"
        })
        await setDoc(quizesDocReference, {
            uid: user_id,
            quizes: [],
        })
    }
}

async function register(): Promise<void> {
    const auth: Auth = getAuth();
    firebaseError.value = null


    try {



        await createUserWithEmailAndPassword(
            auth,
            register_form.value.email, register_form.value.password
        )

        await checkUserAndCreateDocument(auth.currentUser?.uid!)
        router.push('/profile')

    } catch (error: any) {
        console.log('Error while registering', error.code);
        const formattedError = error.code
            .replace(/^auth\//, '') // Remove "auth/"
            .split('-') // Split by "-"
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Uppercase first letter of each word
            .join(' '); // Join with spaces

        firebaseError.value = formattedError
    }


}
</script>

<template>
    <h1>Create an Account</h1>
    <form @submit.prevent="register" class="form">
        <label for="email">Email</label>
        <input @blur="validateField('email')" :class="{ 'active-error': errors.email }" name="email"
            placeholder="Enter your email" type="email" id="email" v-model="register_form.email" />

        <span role="error message" v-if="errors.email" class="zod-error">{{ errors.email }}</span>

        <label for="password">Password</label>
        <input @input="validateField('password')" @blur="validateField('password')"
            :class="{ 'active-error': errors.password }" name="password" type="password" id="password"
            placeholder="Enter your password" v-model="register_form.password" />

        <span role="error message" v-if="errors.password" class="zod-error">{{ errors.password }}</span>


        <label for="passwordConfirmation">Confirm Password:</label>
        <input @input="validateField('confirmPassword')" @blur="validateField('confirmPassword')"
            :class="{ 'active-error': errors.confirmPassword }" name="passwordConfirmation" type="password"
            id="passwordConfirmation" placeholder="Comfirm your password" v-model="register_form.confirmPassword"
            autocomplete="new-password" />

        <span role="error message" v-if="errors.confirmPassword" class="zod-error">{{ errors.confirmPassword }}</span>


        <button class="submit-button" type="submit">
            <p>Continue</p>
            <p> {{ "✔" }}</p>
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