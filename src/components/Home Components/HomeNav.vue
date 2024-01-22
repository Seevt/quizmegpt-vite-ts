<script setup lang="ts">
import { useUserStore } from '@/stores/user';


const userStore = useUserStore();
</script>

<template>
    <header>
        <nav>
            <RouterLink class="logo-container  nav-controls" to="/home">
                <h1 class="logo-name">QUIZME</h1>
            </RouterLink>
            <RouterLink v-if="!userStore.isLoggedIn" class="nav-button nav-controls" to="/login">
                Log In
            </RouterLink>
            <RouterLink v-else to="/profile" class="nav-button nav-controls">
                <span>
                    Account
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" data-slot="icon" class="svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

            </RouterLink>
        </nav>
    </header>
</template>



<style  scoped>
nav {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    /* padding-inline: var(--padding-x); */
    padding-top: calc(var(--padding-y)/2);
    width: min(95%, 65ch);
}

@media (max-width: 700px) or (max-height: 500px) {
    nav {
        padding-block: calc(var(--padding-y)/2);
    }

}

.nav-controls {
    text-decoration: none;
}

.logo-name {
    position: relative;
    color: rgb(55, 55, 55);
}

.logo-name::after {
    content: 'gpt';
    /* margin-left: 2px; */
    /* position: absolute; */
    /* bottom: -5px; */
    /* right: -10px; */
    color: var(--main-color);
    font-size: var(--p-size);
}

.logo {
    margin: 0 auto;
    aspect-ratio: 1/1;
    height: min(12vw, 100px);
    min-height: 50px;

    object-fit: contain;
    margin-left: -5px;
}

.nav-button {
    color: var(--text-color);
    font-weight: bold;
    padding: .4rem 1rem;
    border: 1px solid var(--text-color);
    border-radius: 5px;
}


.svg {
    display: none;
    width: 1.5rem;
    height: 1.5rem;
}

@media (max-width: 500px) {
    .nav-button span {
        display: none;
    }

    .nav-button {
        /* border-radius: var(--input-radius); */
        padding: .3rem .3rem;

    }

    .nav-button .svg {
        display: block;
    }
}


.nav-button:hover {
    text-decoration: underline;
}
</style>