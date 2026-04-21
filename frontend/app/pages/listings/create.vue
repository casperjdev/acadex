<script setup lang="ts">
const form = ref({
  title: '',
  description: '',
  price: 0,
  subject: '',
  category: 'TEXTBOOK',
  condition: 'USED'
});

const submitListing = () => {
  console.log('Submitting:', form.value);
  alert('Listing Created (Demo)');
};
</script>

<template>
  <div>
    <h1>List an Item</h1>
    <form @submit.prevent="submitListing">
      <div>
        <label>Title:</label>
        <input v-model="form.title" required />
      </div>
      <div>
        <label>Description:</label>
        <textarea v-model="form.description"></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" v-model="form.price" required />
      </div>
      <div>
        <label>Subject:</label>
        <input v-model="form.subject" />
      </div>
      <div>
        <label>Category:</label>
        <select v-model="form.category">
          <option value="TEXTBOOK">Textbook</option>
          <option value="NOTES">Notes</option>
          <option value="EQUIPMENT">Equipment</option>
        </select>
      </div>
      <div>
        <label>Condition:</label>
        <select v-model="form.condition">
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>
      </div>
      <button type="submit">Post Listing</button>
    </form>
    <NuxtLink to="/">Cancel</NuxtLink>
  </div>
</template>
