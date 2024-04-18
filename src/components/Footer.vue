<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <p class="footer-title">QuizMEGPT built by</p>
    <p class="footer-link">
      <a href="https://seevt.dev/" target="_blank"> Seevt </a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  /* display: flex; */
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: calc(var(--gap-spacing) / 2);
  padding-block: calc(var(--padding-y) / 2 + 0.2rem);
  background: var(--main-color);
  color: white;
}

.footer a {
  color: white;
  transition: all 0.15s ease;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.footer-title {
  cursor: default;
  text-align: center;
  font-weight: 600;
  font-family: var(--poppins);
  /* letter-spacing: .4px; */
  font-size: calc(var(--h2-size) / 1.5);
}

.footer-link {
  text-decoration: none;
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: calc(var(--p-size) / 1.2);
  font-style: italic;
  gap: calc(var(--gap-spacing) / 2);
}

.footer-link a {
  font-size: calc(var(--p-size) / 1.2);
}
</style>
