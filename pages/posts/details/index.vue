<script setup>
const props = defineProps({
  fullName: {
    type: String,
    required: true,
  },
  lastSeenLocation: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  lastSeenWearing: {
    type: String,
  },
  lastSeenDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  videoMessage: {
    type: String,
    default: "",
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

    <hr />
    <div class="flex flex-col">
      <div>
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
                <span>John Charles Doe</span
                ><!-- fullName-->
              </div>
              <div class="flex justify-start">
                <li class="font-medium w-[265px] text-[#001001] text-lg">
                  Age:
                </li>
                <!-- Calculate from dob -->
                <span>35</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li class="font-medium w-[170px] text-[#001001] text-lg">
                  <!-- gender -->
                  Gender:
                </li>
                <span>Male</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <li class="font-medium w-[170px] text-[#001001] text-lg">
                  <!-- lastSeenWearing -->
                  Last-seen Wearing:
                </li>
                <span>Yellow Jacket, blue jeans</span>
              </div>
              <div class="flex justify-start gap-[4.25rem] wrap">
                <!-- lastSeenLocation -->
                <li class="font-medium w-[200px] text-[#001001] text-lg">
                  Last-seen Location:
                </li>
                <span>Kality</span>
              </div>
              <div class="flex justify-start gap-[6rem] wrap">
                <!-- lastSeenDate -->
                <li class="font-medium w-[170px] text-[#181818] text-lg">
                  Last-seen Date:
                </li>
                <span>20-06-2024</span>
              </div>
              <div class="flex justify-start gap-[10rem] wrap">
                <li class="font-medium w-[170px] text-[#001001] text-lg">
                  <!-- Description -->
                  Description:
                </li>
                <span
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nostrum sapiente, fuga beatae quos natus dolorem, atque
                  veritatis reiciendis laudantium totam est officia libero at
                  nulla magni praesentium provident, repudiandae nam.</span
                >
              </div>
            </ul>
          </div>
        </div>
      </div>
      <hr class="mb-[2rem]" />
      <div class="video-card">
        <div
          class="flex flex-col items-center justify-center gap-[1rem] mb-[3rem]"
        >
          <h1 class="text-[30px] text-[#393939] font-medium font-[poppins]">
            Message from his mother
          </h1>
          <video class="w-[600px] h-[400px] rounded-md" controls src=""></video>
          <button
            class="p-3 bg-[#788dd5] rounded-lg text-medium text-white"
            @click="navigateTo('/profile/messages')"
          >
            Chat with the reporter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
