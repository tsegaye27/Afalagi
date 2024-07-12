<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cloth: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoMessage: {
    type: String,
  },
});

const previousPage = () => {
  navigateTo("/posts");
};
</script>
<template>
  <div>
    <div class="flex items-center m-8">
      <button
        @click="previousPage"
        class="flex btn-round justify-center items-center mr-[1rem]"
      >
        <</button
      ><span class="text-[#868686] text-2xl">Back</span>
    </div>
    <h1 class="text-center text-[#868686] my-3 text-5xl justify-self-center">
      John Charles Doe
    </h1>
    <hr />
    <div class="flex mx-[5rem] my-[2rem] justify-between gap-[5rem]">
      <div class="person-image">
        <img
          class="w-[400px] h-[500px]"
          src="@/assets/img/missing.png"
          alt="missing_person"
        />
      </div>
      <div class="w-[800px] justify-start flex mt-[2rem]">
        <ul class="flex flex-col gap-4">
          <div class="flex justify-start gap-[6rem]">
            <li class="font-medium w-[170px] text-[#001001] text-lg">
              Full Name:
            </li>
            <span>John Charles Doe</span>
          </div>
          <div class="flex justify-start">
            <li class="font-medium w-[265px] text-[#001001] text-lg">Age:</li>
            <span>35</span>
          </div>
          <div class="flex justify-start gap-[6rem] wrap">
            <li class="font-medium w-[170px] text-[#001001] text-lg">
              Gender:
            </li>
            <span>Male</span>
          </div>
          <div class="flex justify-start gap-[6rem] wrap">
            <li class="font-medium w-[170px] text-[#001001] text-lg">
              Last-seen Wearing:
            </li>
            <span>Yellow Jacket, blue jeans</span>
          </div>
          <div class="flex justify-start gap-[4.25rem] wrap">
            <li class="font-medium w-[200px] text-[#001001] text-lg">
              Last-seen Location:
            </li>
            <span>Kality</span>
          </div>
          <div class="flex justify-start gap-[6rem] wrap">
            <li class="font-medium w-[170px] text-[#181818] text-lg">
              Last-seen Date:
            </li>
            <span>20-06-2024</span>
          </div>
          <div class="flex justify-start gap-[10rem] wrap">
            <li class="font-medium w-[170px] text-[#001001] text-lg">
              Description:
            </li>
            <span
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
              sapiente, fuga beatae quos natus dolorem, atque veritatis
              reiciendis laudantium totam est officia libero at nulla magni
              praesentium provident, repudiandae nam.</span
            >
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
