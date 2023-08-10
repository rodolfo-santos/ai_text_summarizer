<script lang="ts" setup>
import { ref } from 'vue';

const textInput = ref('');
const summary = ref('');
const isLoading = ref(false);
const requestError = ref();

async function summarizeText() {
  isLoading.value = true;

  try {
    const response = await $fetch('/api/summarizer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textInput.value,
      }),
    });

    const data = await response;

    summary.value = data.result;
  } catch (error) {
    requestError.value = error;
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Text Summarizer</h1>
    </header>

    <main class="main">
      <div class="input-container">
        <textarea rows="10" v-model="textInput" placeholder="Input text here..."></textarea>
        <button @click="summarizeText">Summarizer</button>
      </div>

      <div class="result-container">
        <h2>Result</h2>
        <p v-if="isLoading">Loading...</p>
        <p v-else-if="summary">{{ summary }}</p>
        <p v-else-if="requestError">{{ requestError }}</p>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: #111;
  color: #fff;
}

.app {
  font-family: Arial, sans-serif;
}

.header {
  background-color: #444;
  color: white;
  padding: 1rem;
  text-align: center;
}

.main {
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

button {
  margin-top: 0.5rem;
  padding: 0.3rem 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.result-container {
  margin-top: 2rem;
}
</style>
