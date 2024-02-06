<script setup lang="ts">
import BaseButton from '../BaseButton.vue';
import VueModal from "../VueModal.vue";
import UserModal from "./UserModal.vue";
import { computed } from 'vue';
import { useInnerWidth } from '@/composables/useInnerWidth'
import { useModalController } from '@/composables/useModal';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getAuth, signOut, type Auth } from 'firebase/auth';



const props = defineProps({
    username: {
        type: String,
        default: 'Username',
    },

})



const windowSize = useInnerWidth();
const userModal = useModalController()

const router = useRouter()
const userStore = useUserStore();

let auth: Auth = getAuth()
function logOut() {
    signOut(auth).then(() => {
        router.push("/home")
        console.log(userStore.isLoggedIn, 'log from profileView.vue');

    })
}

const initial = computed(() => {
    return props.username[0].toUpperCase();
});



function toggleModal() {
    if (windowSize.innerWidth.value > 1024) return
    if (userModal.show.value) {
        userModal.close()
    } else {
        userModal.open()
    }
}
</script>

<template>
    <header>
        <nav>
            <div class="user-data">
                <button tabindex="0" @click="toggleModal" class="profile-icon">
                    <span>{{ initial }}</span>
                </button>
                <div class="welcome-message-wrapper">
                    <h2>Welcome Back</h2>
                    <p>{{ props.username.substring(0, props.username.indexOf('@')) }}</p>
                </div>
                <template v-if="windowSize.innerWidth.value < 1024">
                    <VueModal customTransition closeOnBackground :controller="userModal"
                        :styling="{ display: 'grid', placeItems: 'end center' }">
                        <UserModal @close="toggleModal" @logout="logOut" :showUserModal="userModal.show.value" />
                    </VueModal>
                </template>
            </div>
            <div class="controls">
                <RouterLink class="link" to="/home">
                    <BaseButton padding_x="0.5rem">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="">
                            <path
                                d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path
                                d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                    </BaseButton>
                </RouterLink>
                <BaseButton @click="logOut" padding_x="0.5rem" color="#f64c4c" hoverColor="#ff7979">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </BaseButton>
            </div>
        </nav>
    </header>
</template>

<style  scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--padding-y);
    color: var(--text-color)
}

.user-data {
    display: flex;
    align-items: center;
    gap: var(--gap-spacing)
}

.profile-icon {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--input-radius);
    background: white;
    box-shadow: var(--card-shadow);
    min-width: 50px;
    min-height: 50px;
    width: min(15vw, 90px);
    height: min(15vw, 90px);

}

.profile-icon span {
    font-size: var(--h1-size);
    cursor: default;
}

.welcome-message-wrapper {
    display: flex;
    flex-direction: column;
}

.welcome-message-wrapper h2,
.welcome-message-wrapper p {
    text-align: left;
    opacity: 0.8;
}


.controls {
    display: flex;
    gap: var(--gap-spacing)
}

@media (max-width: 1024px) {
    .controls {
        display: none;
    }

    .profile-icon,
    .profile-icon span {
        cursor: pointer;
    }
}

.controls .link {
    display: flex;
    align-items: center;
    color: white;
}



svg {
    width: 1.4rem;
    height: 1.4rem;
}
</style>