<script setup>
import ProfileImageInput from "~/components/ProfileImageInput.vue";

definePageMeta({ layout: "default" });
// const headers = new Headers();
// headers.append("X-CSCAPI-KEY", "API_KEY");

// const requestOptions = {
//   method: "GET",
//   headers: headers,
//   redirect: "follow",
// };

// fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
</script>

<template>
  <div class="report-form flex justify-center items-start my-[2rem]">
    <form
      class="flex flex-col gap-[3.5rem] px-[2rem] border border-slate-400 py-[2rem] w-[40%] rounded-md justify-start items-start"
    >
      <h1
        class="text-center w-full uppercase text-[#788dd5] text-3xl font-medium"
      >
        Missing person details
      </h1>
      <div class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >First name:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="firstName"
            id="firstName"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Middle name:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="middleName"
            id="middleName"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Last name:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="lastName"
            id="lastName"
          />
        </div>
        <SelectLabel
          class="pl-[4.9rem]"
          label="Gender"
          :options="[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ]"
          placeholder="Select your Gender"
        />
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Date of birth:
          </label>
          <input
            type="date"
            class="border border-[#868686] w-[320px] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="dob"
            id="dob"
          />
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Last Seen Date:
          </label>
          <input
            type="date"
            class="border border-[#868686] w-[320px] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="lastSeenDate"
            id="lastSeenDate"
          />
        </div>
        <div class="flex gap-[5.5rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Last Seen:
          </label>
          <div class="flex gap-[0.5rem]">
            <select
              class="p-1 border order-[#868686] text-[#707070]"
              name="lastSeenLocation"
              id="country"
            >
              <option disabled selected>Country</option>
            </select>
            <select
              class="p-1 border order-[#868686] text-[#707070]"
              name="lastSeenLocation"
              id="state"
            >
              <option disabled selected>State</option>
            </select>
            <select
              class="p-1 border order-[#868686] text-[#707070]"
              name="lastSeenLocation"
              id="city"
            >
              <option disabled selected>City</option>
            </select>
          </div>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Last Seen Wearing:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="cloth"
            id="cloth"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium">Height: </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Skin Color:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Hair Color:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Recognizable Feature:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Physical Disability:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium">Health: </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="height"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Education:
          </label>
          <input
            type="text"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="education"
            id="education"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium"
            >Video Message:
          </label>
          <input
            type="file"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="video"
            id="video"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[#707070] text-[1rem] font-medium">Image: </label>
          <input
            type="file"
            class="border border-[#868686] rounded outline-none text-[#868686] p-[0.1rem] pl-[0.5rem]"
            :name="image"
            id="image"
          />
        </div>
      </div>
    </form>
  </div>
</template>
