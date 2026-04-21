<script setup lang="ts">
const conversations = ref([
  { id: '1', listingTitle: 'Calculus Textbook', lastMessage: 'Is it still available?' }
]);
</script>

<template>
  <div>
    <h1>Your Conversations</h1>
    <NuxtLink to="/">Back to Home</NuxtLink>
    <ul>
      <li v-for="chat in conversations" :key="chat.id">
        <NuxtLink :to="`/listings/${chat.id}`">
          <strong>{{ chat.listingTitle }}</strong>: {{ chat.lastMessage }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
