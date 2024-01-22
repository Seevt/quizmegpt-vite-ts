<script setup lang="ts">
import BaseButton from "../BaseButton.vue";

const props = defineProps({
    showUserModal: {
        type: Boolean,
        required: true,
    }
})
</script>

<template>
    <Transition name="user-modal">
        <div role="controls" v-if="props.showUserModal" class="drawer">
            <span class="close-button" @click="$emit('close')">&times;</span>
            <RouterLink class="link" to="/">
                <BaseButton padding_x="0.5rem">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path
                            d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                </BaseButton>
                <span>Home Page</span>

            </RouterLink>
            <a class="link" @click="$emit('logout')">
                <BaseButton padding_x="0.5rem" color="#f64c4c" hoverColor="#ff7979">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </BaseButton>
                <span>Log Out</span>
            </a>
        </div>
    </Transition>
</template>



<style  scoped>
.drawer {
    display: flex;
    position: relative;
    flex-direction: column;
    width: min(95%, 65ch);
    gap: calc(var(--gap-spacing)/2);
    padding-inline: var(--padding-x);
    padding-block: var(--padding-y);
    border-top-right-radius: var(--card-radius);
    border-top-left-radius: var(--card-radius);
    background-color: white;
    font-weight: 500;
    transition: all 0.25s ease;
}


.close-button {
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: var(--padding-x);
    top: var(--padding-y);
    font-size: 1.8rem;
}

.close-button:hover,
.close-button:focus {
    color: #000;
    text-decoration: none;

}

.link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--text-color);
    gap: calc(var(--gap-spacing)/2);
    cursor: pointer;
}

svg {
    width: 1.2rem;
    height: 1.2rem;
}

.user-modal-enter-from,
.user-modal-leave-to {
    transform: translateY(50%);
}

.user-modal-enter-active,
.user-modal-leave-active {
    transition: 0.25s ease all;
}
</style>