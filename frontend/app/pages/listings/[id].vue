<script setup lang="ts">
const route = useRoute();
const listingId = route.params.id;

// High-fidelity Mock data
const listing = ref({
	id: listingId,
	title: 'Calculus: Early Transcendentals',
	description:
		'This is the 8th edition of the Stewart Calculus textbook. It is in great condition with no highlights or markings inside. Perfect for Engineering or Math students who want to save on bookstore prices. Includes access code for online resources (unused).',
	price: 55,
	subject: 'Mathematics',
	category: 'TEXTBOOK',
	condition: 'USED',
	seller: {
		name: 'Jane Smith',
		trust_score: 98,
		joined: 'Jan 2024',
	},
	status: 'available',
	image_url: 'https://picsum.photos/800',
});

const marketplace = useMarketplace();

const itemRes = await marketplace.getListingDetails(listingId as string);

const item = ref<any>(itemRes.data)!;
const sellerRes = await marketplace.getSellerDetails(item.value.seller_id as string);

const seller = ref<any>(sellerRes.data);

const messages = ref([
	{
		sender: 'System',
		content: `You can now chat with ${seller.value.firstname} about this listing.`,
		time: '10:00 AM',
	},
]);
const newMessage = ref('');

const sendMessage = () => {
	if (newMessage.value.trim()) {
		messages.value.push({
			sender: 'Me',
			content: newMessage.value,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
		});
		newMessage.value = '';
	}
};

const markAsSold = () => {
	item.value.status = 'sold';
};

useHead({
	title: `${item.value.title} - Acadex`,
});
</script>

<template>
	<div class="max-w-6xl mx-auto px-4 py-12">
		<!-- Breadcrumb / Back Navigation -->
		<nav
			class="mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
			<NuxtLink to="/" class="hover:text-black transition-colors">Marketplace</NuxtLink>
			<span>/</span>
			<span class="text-gray-300">{{ item.category }}</span>
		</nav>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
			<!-- Left Column: Visuals -->
			<div class="space-y-6 top-24">
				<div
					class="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
					<img :src="listing.image_url" alt="Product Image" class="w-full h-full object-cover" />
				</div>
				<!-- Simple Gallery Thumbnails Demo -->
				<div class="flex gap-4">
					<div class="w-20 h-20 bg-gray-100 rounded-xl border border-black/5 overflow-hidden">
						<img :src="listing.image_url" class="w-full h-full object-cover opacity-50" />
					</div>
					<div class="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100"></div>
					<div class="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100"></div>
				</div>
			</div>

			<!-- Right Column: Info & Actions -->
			<div class="flex flex-col">
				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-8">
					<span
						class="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
						{{ item.category }}
					</span>
					<span
						class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
						Condition: {{ item.condition }}
					</span>
				</div>

				<h1 class="text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
					{{ item.title }}
				</h1>

				<div class="flex items-baseline gap-4 mb-10 pb-10 border-b border-gray-100">
					<span class="text-4xl font-light text-gray-900">${{ item.price }}</span>
					<span class="text-xs font-bold text-gray-400 line-through tracking-widest"
						>$120.00 NEW</span
					>
				</div>

				<!-- Details List -->
				<div class="grid grid-cols-2 gap-y-8 mb-12">
					<div>
						<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">
							Subject
						</h4>
						<p class="text-sm font-bold text-gray-900">{{ item.subject }}</p>
					</div>
					<div>
						<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">
							Listing ID
						</h4>
						<p class="text-sm font-mono text-gray-400">#{{ listingId!.toString().slice(0, 8) }}</p>
					</div>
				</div>

				<div class="prose prose-sm text-gray-500 mb-12">
					<h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4">
						Description
					</h4>
					<p class="leading-relaxed text-base">{{ item.description }}</p>
				</div>

				<!-- Seller Profile -->
				<div
					class="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 mb-10 transition-all hover:shadow-lg hover:shadow-gray-100">
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center gap-5">
							<div
								class="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center font-black text-xl text-gray-900 shadow-sm">
								{{ seller.firstname }}
							</div>
							<div>
								<h4 class="font-black text-gray-900 text-lg">{{ seller.lastname2 }}</h4>
								<p class="text-xs text-gray-400 font-bold uppercase tracking-widest">
									Active Student Seller
								</p>
							</div>
						</div>
						<div class="text-right">
							<div class="flex items-center gap-1 justify-end">
								<span class="text-2xl font-black text-green-500">{{
									listing.seller.trust_score
								}}</span>
								<span class="text-xs font-bold text-green-500 mt-1">%</span>
							</div>
							<p class="text-[9px] text-gray-400 uppercase font-black tracking-widest">
								Trust Score
							</p>
						</div>
					</div>
					<div class="flex gap-4">
						<button
							class="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white hover:border-black transition-all">
							View Profile
						</button>
					</div>
				</div>

				<!-- Actions -->
				<div class="space-y-4">
					<button
						v-if="listing.status === 'available'"
						@click="markAsSold"
						class="w-full py-6 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all transform active:scale-[0.99] shadow-xl shadow-gray-200">
						Instant Handshake
					</button>
					<div
						v-else
						class="w-full py-6 bg-gray-100 text-gray-400 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-center">
						Reserved / Sold
					</div>
				</div>
			</div>
		</div>

		<!-- Communication Section -->
		<div class="mt-32 border-t border-gray-100 pt-20 max-w-3xl">
			<div class="flex items-center justify-between mb-12">
				<div>
					<h3 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Inquiry.</h3>
					<p class="text-sm text-gray-400">Negotiate, ask for details, or arrange a meeting.</p>
				</div>
				<div class="px-4 py-2 bg-blue-50 rounded-full">
					<span class="text-[10px] font-black text-blue-600 uppercase tracking-widest"
						>Verified Chat</span
					>
				</div>
			</div>

			<div
				class="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-100">
				<!-- Chat Area -->
				<div class="h-[500px] overflow-y-auto p-10 flex flex-col gap-8 scroll-smooth">
					<div
						v-for="(msg, index) in messages"
						:key="index"
						:class="[
							'max-w-[80%] px-6 py-5 rounded-[2rem] text-sm leading-relaxed relative group',
							msg.sender === 'Me'
								? 'bg-black text-white self-end rounded-tr-none shadow-xl shadow-gray-200'
								: 'bg-gray-50 text-gray-700 self-start rounded-tl-none border border-gray-100',
						]">
						<p
							v-if="msg.sender !== 'System' && msg.sender !== 'Me'"
							class="text-[9px] font-black uppercase tracking-widest mb-3 opacity-40">
							{{ msg.sender }}
						</p>
						<p class="font-medium">{{ msg.content }}</p>
						<p
							:class="[
								'text-[8px] mt-3 font-bold opacity-30 uppercase tracking-widest',
								msg.sender === 'Me' ? 'text-right' : '',
							]">
							{{ msg.time }}
						</p>
					</div>
				</div>

				<!-- Input Area -->
				<form
					@submit.prevent="sendMessage"
					class="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
					<input
						v-model="newMessage"
						placeholder="Type your question here..."
						class="flex-1 bg-white border border-gray-100 px-8 py-5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm" />
					<button
						type="submit"
						class="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="group-hover:translate-x-1 transition-transform">
							<path d="m5 12 14 0" />
							<path d="m13 18 6-6-6-6" />
						</svg>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Hidden scrollbar but keeps functionality */
.h-\[500px\]::-webkit-scrollbar {
	display: none;
}
.h-\[500px\] {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
