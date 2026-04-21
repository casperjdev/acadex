<script setup lang="ts">
useHead({
	title: 'Acadex',
});

const me = await $fetch('/api/me', {
	method: 'GET',
});

const user = ref(me.user);

const listings = ref([
	{
		id: '1',
		title: 'Calculus: Early Transcendentals',
		price: 55,
		category: 'TEXTBOOK',
		subject: 'Mathematics',
		condition: 'USED',
		image:
			'https://images.unsplash.com/photo-1543004218-ee14110497f9?auto=format&fit=crop&q=80&w=600',
	},
]);

const filters = ref({ subject: '', category: '' });

const marketplace = useMarketplace();

const list = await marketplace.fetchListings();

const items = list.data;
</script>

<template>
	<div class="max-w-7xl mx-auto px-6 py-20">
		<!-- Hero Section -->
		<header class="mb-24 relative">
			<div class="max-w-3xl">
				<h1
					class="md:text-[8rem] text-5xl font-black text-gray-900 tracking-tighter leading-[0.8] mb-8">
					Acadex<span class="text-blue-600">.</span>
				</h1>
				<p class="text-2xl text-gray-400 font-medium leading-relaxed">
					The curated student marketplace. Buy and sell textbooks, gear, and knowledge with verified
					peers.
				</p>
			</div>

			<!-- Quick Action Floating Button -->
			<ClientOnly>
				<NuxtLink
					v-if="!user"
					to="/login"
					class="ml-auto w-max mt-8 right-0 bottom-0 bg-black text-white px-10 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-3 group">
					<span>Start Selling</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="group-hover:translate-x-1 transition-transform">
						<path d="m5 12 14 0" />
						<path d="m13 18 6-6-6-6" />
					</svg>
				</NuxtLink>
				<NuxtLink
					v-if="user"
					to="/listings/create"
					class="ml-auto w-max mt-8 right-0 bottom-0 bg-black text-white px-10 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 flex items-center gap-3 group">
					<span>Create Listing</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="group-hover:translate-x-1 transition-transform">
						<path d="m5 12 14 0" />
						<path d="m13 18 6-6-6-6" />
					</svg>
				</NuxtLink>
			</ClientOnly>
		</header>

		<!-- Search & Filters Container -->
		<section class="mb-20">
			<div
				class="bg-gray-50/50 border border-gray-100 p-2 rounded-[2.5rem] flex flex-col md:flex-row gap-2 shadow-sm">
				<div class="flex-1 relative">
					<input
						v-model="filters.subject"
						placeholder="Search by subject or keyword..."
						class="w-full bg-white border-transparent rounded-[2rem] px-8 py-6 text-sm font-medium focus:ring-4 focus:ring-black/5 outline-none transition-all" />
				</div>
				<div class="flex gap-2 p-1">
					<select
						v-model="filters.category"
						class="bg-white border-transparent rounded-[1.8rem] px-8 py-4 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-gray-100 transition-colors appearance-none min-w-[180px] text-center">
						<option value="">All Categories</option>
						<option value="TEXTBOOK">Textbooks</option>
						<option value="NOTES">Study Notes</option>
						<option value="EQUIPMENT">Equipment</option>
					</select>
					<button
						class="bg-black text-white px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
						Filter
					</button>
				</div>
			</div>
		</section>

		<!-- Listings Grid -->
		<main>
			<div class="flex items-center justify-between mb-12 px-2">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-gray-300">
					Active Listings ({{ listings.length }})
				</h2>
				<div class="flex gap-4">
					<button
						class="text-[10px] font-black uppercase tracking-widest text-black underline underline-offset-8 decoration-2">
						Newest First
					</button>
					<button
						class="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black transition-colors">
						Lowest Price
					</button>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
				<NuxtLink
					v-for="item in items"
					:key="item.id"
					:to="`/listings/${item.id}`"
					class="group block">
					<!-- Card Image Container -->
					<div
						class="aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 mb-6 relative transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gray-200 group-hover:-translate-y-2">
						<img
							:src="item.image_url"
							:alt="item.title"
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
						<!-- Status Badge Overlay -->
						<div class="absolute top-6 left-6">
							<span
								class="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
								{{ item.condition }}
							</span>
						</div>
						<!-- Price Overlay -->
						<div class="absolute bottom-6 right-6">
							<div
								class="bg-black text-white px-5 py-3 rounded-2xl font-black text-lg shadow-xl shadow-black/20">
								${{ item.price }}
							</div>
						</div>
					</div>

					<!-- Card Info -->
					<div class="px-2 space-y-2">
						<p class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
							{{ item.category }}
						</p>
						<h3
							class="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
							{{ item.title }}
						</h3>
						<p class="text-sm font-medium text-gray-400">{{ item.subject }}</p>
					</div>
				</NuxtLink>
			</div>

			<!-- Empty State -->
			<div
				v-if="listings.length === 0"
				class="py-40 text-center border-2 border-dashed border-gray-50 rounded-[3rem]">
				<p class="text-gray-300 font-black uppercase tracking-widest text-xs italic">
					No listings match your search.
				</p>
			</div>
		</main>

		<!-- Global Verified Footer Banner -->
		<section class="mt-40 border-t border-gray-50 pt-20 flex flex-col items-center">
			<div
				class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 rotate-12 group hover:rotate-0 transition-transform duration-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-gray-900">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				</svg>
			</div>
			<h3 class="text-2xl font-black text-gray-900 tracking-tight mb-2 text-center">
				Built for Students.
			</h3>
			<p class="text-gray-400 text-sm max-w-sm text-center leading-relaxed font-medium">
				Acadex is a closed-loop marketplace. Every user is verified via their institutional email to
				ensure a safe community.
			</p>
		</section>
	</div>
</template>
