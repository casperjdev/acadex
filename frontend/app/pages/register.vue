<script setup lang="ts">
useHead({
	title: 'Sign Up - Acadex',
});

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const userUUID = useCookie('user-uuid');

if (userUUID.value) {
	navigateTo('/');
}

const handleRegister = async () => {
	const res = (await $fetch('/api/register', {
		method: 'POST',
		body: {
			firstname: firstname.value,
			lastname: lastname.value,
			email: email.value,
			password: password.value,
		},
	})) as {
		user: unknown;
	};

	console.log(res);

	if (res.user) {
		const login = (await $fetch('/api/login', {
			method: 'POST',
			body: {
				email: email.value,
				password: password.value,
			},
		})) as {
			user: unknown;
		};

		if (login.user) {
			reloadNuxtApp();
			navigateTo('/');
		}
	}
};
</script>

<template>
	<div class="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20">
		<div class="max-w-md w-full">
			<!-- Branding & Header -->
			<header class="text-center mb-12">
				<NuxtLink
					to="/"
					class="inline-block text-4xl font-black text-gray-900 tracking-tighter mb-8 group">
					Acadex<span class="text-blue-600 group-hover:text-black transition-colors">.</span>
				</NuxtLink>
				<h1 class="text-4xl font-black text-gray-900 tracking-tight mb-3">Sign up</h1>
				<p class="text-gray-400 font-medium">Access the exclusive school marketplace.</p>
			</header>

			<!-- Login Card -->
			<div
				class="bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-gray-100">
				<form @submit.prevent="handleRegister" class="space-y-8">
					<div>
						<label
							class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block"
							>First Name</label
						>
						<div class="relative">
							<input
								v-model="firstname"
								type="text"
								placeholder="John"
								class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
								required />
							<div class="absolute right-6 top-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-gray-200">
									<path
										d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
									<path d="m22 7-10 7L2 7" />
								</svg>
							</div>
						</div>
					</div>
					<div>
						<label
							class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block"
							>Last Name</label
						>
						<div class="relative">
							<input
								v-model="lastname"
								type="text"
								placeholder="Doe"
								class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
								required />
							<div class="absolute right-6 top-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-gray-200">
									<path
										d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
									<path d="m22 7-10 7L2 7" />
								</svg>
							</div>
						</div>
					</div>
					<!-- Email Input -->
					<div>
						<label
							class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block"
							>Institutional Email</label
						>
						<div class="relative">
							<input
								v-model="email"
								type="email"
								placeholder="you@university.edu"
								class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
								required />
							<div class="absolute right-6 top-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-gray-200">
									<path
										d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
									<path d="m22 7-10 7L2 7" />
								</svg>
							</div>
						</div>
					</div>

					<!-- Password Input -->
					<div>
						<div class="flex justify-between items-center mb-4">
							<label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 block"
								>Security Key</label
							>
							<a
								href="#"
								class="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
								>Forgot?</a
							>
						</div>
						<div class="relative">
							<input
								v-model="password"
								type="password"
								placeholder="••••••••"
								class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
								required />
							<div class="absolute right-6 top-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-gray-200">
									<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0 1 10 0v4" />
								</svg>
							</div>
						</div>
					</div>

					<button
						type="submit"
						class="w-full py-6 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all transform active:scale-[0.99] shadow-2xl shadow-black/10 mt-4">
						Sign Up
					</button>
				</form>

				<!-- Secondary Actions -->
				<div class="mt-10 pt-10 border-t border-gray-50 text-center">
					<p class="text-xs font-medium text-gray-400">
						Already a member?
						<NuxtLink
							to="/login"
							class="text-black font-black hover:underline underline-offset-4 decoration-2"
							>Log in</NuxtLink
						>
					</p>
				</div>
			</div>

			<!-- Verified Badge -->
			<div class="mt-12 text-center">
				<div
					class="inline-flex items-center gap-3 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
					<div class="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]"></div>
					<span class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400"
						>Institutional Access Only</span
					>
				</div>
			</div>
		</div>
	</div>
</template>
