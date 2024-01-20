<script setup lang="ts">
import Login from '@/components/Login Components/Login.vue';
import Register from '@/components/Login Components/Register.vue';
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail, type Auth } from 'firebase/auth';

const registerForm = ref(false);

let auth: Auth;
async function resetPassword(): Promise<void> {
  auth = getAuth();
  let emailToReset = prompt("Please enter your email:");
  if (emailToReset) {
    try {
      await sendPasswordResetEmail(auth, emailToReset);
      alert("Password reset email!");
    } catch (error: any) {
      alert("Failed to send password reset email: " + error.message);
    }
  }
};
</script>

<template>
  <div class="login">
    <header>
      <RouterLink to="/">
        <img class="logo" loading="lazy" src="../assets/imgs/quizmegpt-logo2.png" />
      </RouterLink>
    </header>

    <div class="container">
      <div class="content">
        <Login v-if="!registerForm" />
        <Register v-else />
        <nav role="controls" class="options-wrapper">
          <button @click.prevent="registerForm = !registerForm" class="toggle-button">
            {{
              !registerForm ? "Create account" : "Already have an account? Log In"
            }}
          </button>
          <button v-if="!registerForm" class="toggle-button" @click.prevent="resetPassword">
            Forgot password?
          </button>
        </nav>
      </div>
    </div>

  </div>
</template>
  
  <!-- <h1> {{ isLoginForm ? 'Sign In' : 'Create Account' }}</h1>
        <form @submit.prevent="isLoginForm ? logIn() : signUp()" :autocomplete="isLoginForm ? 'on' : 'off'" class="form">
          
          <label for="email">Email</label>
          <input name="email" placeholder="Enter your email" type="email" id="email" v-model="email" />

          <label for="password">Password</label>
          <input name="password" type="password" placeholder="Enter your password" id="password" v-model="password" />

          <div class="form-group" v-if="!isLoginForm">
            <label for="passwordConfirmation">Confirm Password:</label>
            <input name="passwordConfirmation" type="password" id="passwordConfirmation" v-model="passwordConfirmation"
              autocomplete="new-password" />
          </div> -->

  <!-- error
          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
          <p v-if="accountCreated" class="account-created">
            Account successfully created, go to log in to access your account.
          </p> -->

  <!-- error message
          <p v-if="!isLoginForm && passwordConfirmation && !passwordsMatch" class="error">
            Passwords do not match.
          </p> -->



  <!-- submit button -->
  <!-- <button class="submit-button" type="submit" :disabled="!isLoginForm && !passwordsMatch">
          <p>Continue</p>
          <p> {{ isLoginForm ? "➜" : "✔" }}</p>
        </button> -->
  <!-- </form> -->



  <!-- form options -->
  <!-- <div class="options-wrapper">
          <button @click.prevent="toggleForm" class="toggle-button">
            {{
              isLoginForm ? "Create account" : "Already have an account? Log In"
            }}
          </button>
          <button class="toggle-button" v-if="isLoginForm" @click.prevent="resetPassword">
            Forgot password?
          </button>
        </div> -->

  <!-- <div v-if="loading" class="loading">Loading...</div> -->

<style scoped>
* {
  --form-text-weight: 500;
  --logo-height: 79px;
}

/* main container for the view */
.login {
  /* flex-grow was there before min-h to ensure it grew, but min-h is more realiable */
  position: relative;
  min-height: 100svh;
  flex-grow: 1;
  display: flex;
  --spacing: clamp(1rem, 5%, 2rem);
  padding-bottom: var(--spacing);
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.15)),
    url("../assets/imgs/logo_bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-height: 640px) or (max-width: 500px) {
  .login {
    gap: var(--spacing);
  }
}

/* logo */
.logo {
  position: relative;
  padding-top: 1rem;
  object-fit: contain;
  width: 70px;
  height: var(--logo-height);
  inset: 0;
  margin: 0 auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0;
  width: 100%;
}

h1 {
  padding-bottom: 1rem;
  text-align: center;
  cursor: default;
}

/* content container styles*/
.content {
  background-color: hsl(0, 0%, 96%);
  border-radius: var(--card-radius);
  box-shadow: 0 0 10px rgba(19, 19, 19, 0.1);
  padding: clamp(1rem, 5%, 2rem);
  padding-block: var(--padding-y);
  padding-inline: var(--padding-x);
  width: min(95%, 500px);
  font-weight: var(--form-text-weight);
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


/* TODO CHECK */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

/* ------ */


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


.options-wrapper {
  margin-top: 1rem;
  display: grid;
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

.error {
  text-align: center;
  color: rgb(255, 40, 40);
  margin-bottom: 1rem;
  margin-top: .5rem;
  padding-inline: var(--padding-x);

}

.toggle-button {
  padding-bottom: 0;
  background-color: transparent;
  color: rgb(46, 46, 46);
  border: none;
  cursor: pointer;
}

.toggle-button:hover {
  color: #080808;
}

.success {
  color: green;
  padding-inline: var(--padding-x);
  margin-top: .5rem;
  font-size: var(--p-size);
}
</style>
