<script setup lang="ts">
const email = ref('');
const password = ref('');

const handleLogin = () => {
  alert(`Login attempt with: ${email.value}`);
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <p>Only school emails allowed (@.edu or school domain)</p>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="School Email" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
    <p>Don't have an account? <NuxtLink to="/register">Register</NuxtLink></p>
  </div>
</template>
