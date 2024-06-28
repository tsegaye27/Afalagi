<template>
  <NavBar />
  <div class="mt-[3rem]">
    <div class="flex justify-around items-baseline">
      <h1 class="text-[40px] text-[#868686] font-[poppins] font-semibold">
        Missing Reported
      </h1>
      <SearchBar />
      <FilterBox />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
    </div>
  </div>
  <Footer />
</template>

<script setup></script>
