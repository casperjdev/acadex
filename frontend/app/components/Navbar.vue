<script setup lang="ts">
const res = await $fetch('/api/me', {
	method: 'GET',
});

const user = ref(res.user);

const userUUID = useCookie('user-uuid');

async function signOut() {
	await $fetch('/api/logout');
	reloadNuxtApp();
	navigateTo('/login');
}
</script>

<template>
	<nav class="fixed z-100 top-0 w-svw px-8 py-4">
		<div class="flex flex-row justify-between">
			<NuxtLink to="/" class="text-gray-900 font-black text-3xl">acadex</NuxtLink>
			<ClientOnly>
				<div v-if="user" class="flex flex-row items-center gap-12">
					<div class="space-x-2 sm:block hidden">
						<span class="text-gray-900 font-bold text-2xl">{{ user.firstname }}</span>
						<span class="text-gray-400">{{ user.email }}</span>
					</div>
					<button
						@click="signOut"
						class="bg-black cursor-pointer text-white px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
						sign out
					</button>
				</div>
			</ClientOnly>
		</div>
	</nav>
</template>
