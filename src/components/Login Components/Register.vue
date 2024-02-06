<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, type Auth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { db } from '@/main'
import { useUserStore } from '@/stores/user';



const router = useRouter()
const userStore = useUserStore()

const register_form = ref({
    email: "",
    password: "",
    confirmPassword: "",
})

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
    console.log(auth);

    try {
        await createUserWithEmailAndPassword(
            auth,
            register_form.value.email, register_form.value.password
        )

        await checkUserAndCreateDocument(auth.currentUser?.uid!)
        router.push('/profile')

    } catch (error: any) {
        console.log('Error while registering', error.code);

    }


}
</script>

<template>
    <h1>Create an Account</h1>
    <form @submit.prevent="register" class="form">
        <label for="email">Email</label>
        <input name="email" placeholder="Enter your email" type="email" id="email" v-model="register_form.email" />

        <label for="password">Password</label>
        <input name="password" type="password" id="password" placeholder="Enter your password"
            v-model="register_form.password" />

        <label for="passwordConfirmation">Confirm Password:</label>
        <input name="passwordConfirmation" type="password" id="passwordConfirmation" placeholder="Comfirm your password"
            v-model="register_form.confirmPassword" autocomplete="new-password" />

        <button class="submit-button" type="submit">
            <p>Continue</p>
            <p> {{ "✔" }}</p>
        </button>
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