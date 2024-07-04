<template>
  <div class="mt-[3rem]">
    <div
      class="flex mx-[2.5rem] mb-[2rem] gap-[14rem] justify-start items-center"
    >
      <h1 class="text-[40px] text-[#868686] font-[poppins] font-semibold">
        Missing Reported
      </h1>
      <SearchBar />
      <FilterBox />
    </div>
    <hr />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2rem] m-[2rem]"
    >
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
      <MissingCard />
    </div>
  </div>
</template>

<script setup></script>
