<template>
  <nav class="flex shadow-md px-[2rem] h-[6rem] justify-between pr-[3rem]">
    <div
      class="logo text-[3rem] pl-[3rem] text-[#0097d3] font-[sora] flex items-center font-semibold"
    >
      <NuxtLink to="/"> Afalagi </NuxtLink>
    </div>
    <ul class="flex w-[70%] justify-end gap-[2.5rem] items-center">
      <li class="nav-menu">
        <NuxtLink to="/" class="flex gap-[0.35rem] justify-center items-center"
          ><span class="flex items-center"
            ><Icon name="heroicons-outline:home" size="22px" /></span
          >Home</NuxtLink
        >
      </li>
      <li class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/posts"
          ><span class="flex items-center"
            ><Icon name="material-symbols:post-add-sharp" size="22px" /></span
          >Posts</NuxtLink
        >
      </li>
      <li class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/success-story"
          ><span class="flex items-center"
            ><Icon name="material-symbols:history-edu" size="22px" /></span
          >Success Story</NuxtLink
        >
      </li>
      <ReportBtn />
      <select class="p-2 rounded-md outline-none" name="lang" id="lang">
        <option class="rounded-md bg-slate-100" value="English">🇬🇧</option>
        <option class="rounded-md bg-slate-100" value="አማርኛ">🇪🇹</option>
      </select>
      <li v-if="!isLogged" class="nav-menu">
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/auth/signup"
          ><span class="flex items-center"
            ><Icon name="material-symbols-light:login" size="22px" /></span
          >Signup</NuxtLink
        >
      </li>
      <li
        v-else
        class="rounded-full p-2 border border-[#0097d3] hover:text-[#0097d3]"
      >
        <NuxtLink
          class="flex gap-[0.35rem] justify-center items-center"
          to="/profile"
        >
          <span class="text-[#005782] flex justify-center items-center">
            <Icon name="humbleicons:user" size="25px" />
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isLogged: { type: Boolean, default: true },
});
const lang = ref("English");

const handleChange = () => {
  lang.value = document.getElementById("lang").value;
};
</script>
