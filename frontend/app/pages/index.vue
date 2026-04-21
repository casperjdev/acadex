<script setup lang="ts">
const listings = ref([
  { id: '1', title: 'Calculus Textbook', price: 50, category: 'TEXTBOOK', subject: 'Math', condition: 'USED' }
]);
const filters = ref({ subject: '', category: '' });
</script>

<template>
  <div>
    <h1>Acadex Marketplace</h1>
    <nav>
      <NuxtLink to="/listings/create">Sell Item</NuxtLink> |
      <NuxtLink to="/messages">Messages</NuxtLink>
    </nav>

    <section>
      <input v-model="filters.subject" placeholder="Search by subject..." />
      <select v-model="filters.category">
        <option value="">All Categories</option>
        <option value="TEXTBOOK">Textbook</option>
        <option value="NOTES">Notes</option>
        <option value="EQUIPMENT">Equipment</option>
      </select>
    </section>

    <main>
      <div v-for="item in listings" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.subject }} - {{ item.category }}</p>
        <p>${{ item.price }} ({{ item.condition }})</p>
        <NuxtLink :to="`/listings/${item.id}`">View Details</NuxtLink>
      </div>
      <p v-if="listings.length === 0">No listings found.</p>
    </main>
  </div>
</template>
