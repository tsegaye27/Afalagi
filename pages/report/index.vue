<script setup></script>

<template>
  <div class="report-form flex justify-center items-start my-[2rem]">
    <form
      class="flex flex-col gap-[3.5rem] px-[2rem] border border-slate-400 py-[2rem] w-[50%] rounded-md justify-start items-start"
    >
      <h1
        class="text-center w-full uppercase text-[var(--secondary-color)] text-3xl font-medium"
      >
        Missing person details
      </h1>
      <div class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >First name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="firstName"
            placeholder="Abraham"
            id="firstName"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Middle name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="middleName"
            placeholder="Desalegn"
            id="middleName"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="lastName"
            placeholder="Feleke"
            id="lastName"
          />
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Gender:</label
          >
          <select
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected disabled>Select your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Date of birth:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="dob"
            id="dob"
          />
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Date:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="lastSeenDate"
            id="lastSeenDate"
          />
        </div>
        <div class="flex gap-[5.5rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Location:
          </label>
          <div class="flex gap-[0.5rem]">
            <select
              class="p-1 border order-[var(--primary-color)] text-[var(--primary-color)]"
              name="lastSeenLocation"
              id="country"
            >
              <option disabled selected>Country</option>
            </select>
            <select
              class="p-1 border order-[var(--primary-color)] text-[var(--primary-color)]"
              name="lastSeenLocation"
              id="state"
            >
              <option disabled selected>State</option>
            </select>
            <select
              class="p-1 border order-[var(--primary-color)] text-[var(--primary-color)]"
              name="lastSeenLocation"
              id="city"
            >
              <option disabled selected>City</option>
            </select>
          </div>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Wearing:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            :name="cloth"
            id="cloth"
            placeholder="yellow jacket, blue jeans..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Description:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            :name="description"
            id="description"
            placeholder="write your description here..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Height(cm):
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] p-[0.1rem] outline-none text-[var(--primary-color)] pl-[0.5rem]"
            :name="height"
            placeholder="180"
            id="height"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Skin Color:
          </label>
          <select
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="skinColor"
            id="skinColor"
          >
            <option selected disabled>Select the Skin Color</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Hair Color:
          </label>
          <select
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="hairColor"
            id="hairColor"
          >
            <option selected disabled>Select the Hair Color</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Recognizable Feature:
          </label>
          <textarea
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none py-[0.5rem] text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="recognizableFeature"
            id="recognizableFeature"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Physical Disability:
          </label>
          <select
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected>None</option>
            <option value="">Mobility Issue</option>
            <option value="">Vision Impairment</option>
            <option value="">Hearing Loss</option>
            <option value="">Neurological Condition</option>
            <option value="">Non Verbal</option>
            <option value="">Limb Difference</option>
            <option value="">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Health Condition:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="healthCondition"
            id="healthCondition"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Education Qualification:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="education"
            id="education"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Video:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="video"
            id="video"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Image:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            :name="image"
            id="image"
          />
        </div>
      </div>
      <button
        class="bg-[var(--secondary-color)] text-white text-[1rem] flex gap-[0.35rem] font-medium py-[0.5rem] justify-center w-[30%] rounded-md ml-[16rem]"
      >
        <span class="flex justify-center items-center">
          <Icon name="heroicons-outline:clipboard-document-list" size="22px" />
        </span>
        Report
      </button>
    </form>
  </div>
</template>
