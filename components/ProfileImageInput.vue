<script setup>
    const image = ref(null);
    const browseImage = () => {
        // image.value = 
    }
</script>
<template>
  <div>
    <img
      src="@/assets/img/default-user.jpg"
      class="rounded-full w-[100px] h-[100px] relative border-2 opacity-40 border-[#868686] backdrop-blur[7px]"
      alt="profile-img"
    >
    <span
    class="rounded-full absolute top-[3.15rem] left-[21rem] text-[#788dd5] text-[3.5rem] cursor-pointer"
    @click="browseImage"
    >+</span
    >
</img>
  </div>
</template>
