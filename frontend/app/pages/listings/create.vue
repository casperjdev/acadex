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
  alert('Demo: Listing submitted to the engine!');
};
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <!-- Header -->
    <header class="mb-16">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Cancel
      </NuxtLink>
      <h1 class="text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">Create Listing.</h1>
      <p class="text-gray-400 text-lg">Clear out your bookshelf and help a fellow student.</p>
    </header>

    <!-- Form Section -->
    <div class="bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-gray-100">
      <form @submit.prevent="submitListing" class="space-y-12">
        
        <!-- Section: Basic Info -->
        <div class="space-y-8">
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Item Title</label>
            <input 
              v-model="form.title" 
              placeholder="e.g. Organic Chemistry 2nd Edition" 
              class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
              required 
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Price ($)</label>
              <div class="relative">
                <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input 
                  type="number" 
                  v-model="form.price" 
                  class="w-full bg-gray-50 border border-transparent rounded-2xl pl-10 pr-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                  required 
                />
              </div>
            </div>
            <div>
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Subject</label>
              <input 
                v-model="form.subject" 
                placeholder="e.g. Science" 
                class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Section: Classification -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Category</label>
            <select 
              v-model="form.category"
              class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="TEXTBOOK">Textbook</option>
              <option value="NOTES">Study Notes</option>
              <option value="EQUIPMENT">Equipment</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Condition</label>
            <select 
              v-model="form.condition"
              class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="NEW">Brand New</option>
              <option value="USED">Pre-owned</option>
            </select>
          </div>
        </div>

        <!-- Section: Description -->
        <div class="pt-8 border-t border-gray-50">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Detailed Description</label>
          <textarea 
            v-model="form.description" 
            rows="6"
            placeholder="Describe any wear and tear, highlights, or missing pages..."
            class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-5 text-sm font-medium focus:bg-white focus:border-black/5 focus:ring-4 focus:ring-black/5 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <!-- Section: Photos Demo -->
        <div class="pt-8 border-t border-gray-50">
           <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-4 block">Upload Photos</label>
           <div class="flex items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-100/50 hover:border-gray-200 transition-all cursor-pointer group">
             <div class="text-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 text-gray-300 group-hover:text-gray-400 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
               <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Drop images or click to browse</p>
             </div>
           </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-6 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all transform active:scale-[0.99] shadow-2xl shadow-black/10 mt-12"
        >
          Publish Listing
        </button>
      </form>
    </div>

    <!-- Security Note -->
    <div class="mt-12 text-center">
       <div class="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
         <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
         <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Secured via Acadex School Network</span>
       </div>
    </div>
  </div>
</template>
