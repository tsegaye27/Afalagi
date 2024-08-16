<template>
  <div
    class="grid grid-cols-[18rem_1fr] grid-rows-[auto_1fr] h-[100vh] overflow-hidden"
  >
    <!-- Sidebar -->
    <Sidebar class="col-start-1 col-end-2 row-start-1 row-end-3" />

    <!-- Navbar -->
    <ProfileNav class="col-start-2 col-end-3 row-start-1 row-end-2 px-[2rem]" />

    <!-- Main Content -->
    <div class="col-start-2 col-end-3 row-start-2 overflow-auto row-end-3">
      <Spinner v-if="isLoading" />
      <!-- Show spinner if loading -->
      <div v-else>
        <slot />
        <!-- Show slot content when not loading -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const store = useUserStore();
const isLoading = store.isLoading; // Get the isLoading state from the store
</script>
