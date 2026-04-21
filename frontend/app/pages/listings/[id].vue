<script setup lang="ts">
const route = useRoute();
const listingId = route.params.id;

// Mock data
const listing = ref({
  title: 'Calculus Textbook',
  description: 'Slightly used, no highlights.',
  price: 50,
  seller: 'John Doe',
  status: 'available'
});

const messages = ref([
  { sender: 'System', content: 'Start a conversation with the seller.' }
]);
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value) {
    messages.value.push({ sender: 'Me', content: newMessage.value });
    newMessage.value = '';
  }
};

const markAsSold = () => {
  listing.value.status = 'sold';
};
</script>

<template>
  <div>
    <NuxtLink to="/">Back to Marketplace</NuxtLink>
    
    <article>
      <h1>{{ listing.title }}</h1>
      <p>Price: ${{ listing.price }}</p>
      <p>Seller: {{ listing.seller }}</p>
      <p>Description: {{ listing.description }}</p>
      <p>Status: {{ listing.status }}</p>
      
      <button @click="markAsSold" v-if="listing.status === 'available'">
        Handshake (Mark as Sold)
      </button>
    </article>

    <hr />

    <section>
      <h2>Chat with Seller</h2>
      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.sender }}:</strong> {{ msg.content }}
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </section>
  </div>
</template>
