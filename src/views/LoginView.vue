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

.options-wrapper {
  margin-top: 1rem;
  display: grid;
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
</style>
