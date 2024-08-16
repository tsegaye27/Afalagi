<script setup>
import { useUserStore } from "#imports";

// State to control the toaster
const toasterVisible = ref(false);
const toasterMessage = ref("");
const toasterType = ref("success"); // or 'error'
const toasterDuration = ref(3000);

function showToaster(message, type = "success", duration = 3000) {
  toasterMessage.value = message;
  toasterType.value = type;
  toasterDuration.value = duration;
  toasterVisible.value = true;

  setTimeout(() => {
    toasterVisible.value = false;
  }, duration);
}

const store = useUserStore();
const { $axios } = useNuxtApp();
const postData = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  images: "",
  legalDocs: "",
  description: "",
  lastSeenLocation: "",
  lastSeenDate: "",
  languageSpoken: "",
  nationality: "",
  hairColor: "",
  skinColor: "",
  recognizableFeatures: "",
  physicalDisability: "",
  mentalDisability: "",
  medicalIssues: "",
  posterRelation: "",
  gender: "",
  dateOfBirth: "",
  educationalLevel: "",
  videoMessage: "",
  maritalStatus: "",
});

const code = ref("");
const number = ref("");
const phoneNumber = computed(() => `${code.value}${number.value}`);
const lastSeenWearing = ref("");
const height = ref("");

const currentStep = ref(1); // Track the current step

const handleLegalDocs = (event) => {
  postData.value.legalDocs = event.target.files[0];
};
const handleImages = (event) => {
  postData.value.images = event.target.files[0];
};
const handleVideoMessage = (event) => {
  postData.value.legalDocs = event.target.files[0];
};

const progressWidth = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "33%";
    case 2:
      return "66%";
    case 3:
      return "100%";
    default:
      return "0%";
  }
});

const reportMissing = async () => {
  const formData = new FormData();

  postData.value.maritalStatus = postData.value.maritalStatus.toUpperCase();
  postData.value.medicalIssues = postData.value.medicalIssues.toUpperCase();
  postData.value.physicalDisability =
    postData.value.physicalDisability.toUpperCase();
  postData.value.mentalDisability =
    postData.value.mentalDisability.toUpperCase();
  postData.value.posterRelation = postData.value.posterRelation.toUpperCase();
  postData.value.educationalLevel =
    postData.value.educationalLevel.toUpperCase();
  postData.value.hairColor = postData.value.hairColor.toUpperCase();
  postData.value.skinColor = postData.value.skinColor.toUpperCase();

  formData.append("postImages", postData.value.images);
  formData.append("legalDocs", postData.value.legalDocs);
  // formData.append("videoMessage", postData.value.videoMessage);
  formData.append("dateOfBirth", postData.value.dateOfBirth);
  // formData.append("height", height.value * 1);
  formData.append("maritalStatus", postData.value.maritalStatus.toUpperCase());
  formData.append("medicalIssues", postData.value.medicalIssues.toUpperCase());
  formData.append(
    "physicalDisability",
    postData.value.physicalDisability.toUpperCase()
  );
  formData.append(
    "mentalDisability",
    postData.value.mentalDisability.toUpperCase()
  );
  formData.append(
    "posterRelation",
    postData.value.posterRelation.toUpperCase()
  );
  formData.append(
    "educationalLevel",
    postData.value.educationalLevel.toUpperCase()
  );
  formData.append("hairColor", postData.value.hairColor.toUpperCase());
  formData.append("skinColor", postData.value.skinColor.toUpperCase());
  formData.append("description", postData.value.description);
  formData.append("recognizableFeatures", postData.value.recognizableFeatures);
  formData.append("firstName", postData.value.firstName);
  formData.append("middleName", postData.value.middleName);
  formData.append("lastName", postData.value.lastName);
  formData.append("birthDate", postData.value.birthDate);
  formData.append("gender", postData.value.gender);
  formData.append("phoneNumber", phoneNumber);
  formData.append("nationality", postData.value.nationality);
  formData.append("languageSpoken", postData.value.languageSpoken);
  // formData.append("lastSeenWearing", lastSeenWearing.value);
  formData.append("lastSeenDate", postData.value.lastSeenDate);
  formData.append("lastSeenLocation", postData.value.lastSeenLocation);
  formData.append("lastSeenWearing", lastSeenWearing.value);
  try {
    const response = await $axios.post("/post", formData, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Success✅", response.data.data);
    showToaster("Operation successful", "success");
    navigateTo("/profile/my-posts");
  } catch (error) {
    console.log(
      "Failure❌",
      error.response ? error.response.data : error.message,
      postData,
      height.value,
      lastSeenWearing.value,
      phoneNumber
    );
    showToaster(
      error.response ? error.response.data.message : error.message,
      "error"
    );
  }
};

const goNext = () => {
  if (currentStep.value < 3) currentStep.value += 1;
};

const goBack = () => {
  if (currentStep.value > 1) currentStep.value -= 1;
};
</script>

<template>
  <div class="report-form flex flex-col justify-center items-center my-[2rem]">
    <div class="w-[750px] h-[10px] bg-gray-400 rounded my-[1rem] relative">
      <div
        class="h-full bg-[var(--secondary-color)] rounded absolute top-0 left-0 progress-fill"
        :style="{ width: progressWidth }"
      ></div>
    </div>

    <Toaster
      v-if="toasterVisible"
      :message="toasterMessage"
      :type="toasterType"
      :duration="toasterDuration"
    />

    <form
      @submit.prevent="reportMissing"
      class="flex flex-col gap-[3.5rem] px-[2rem] border border-slate-400 py-[2rem] w-[50%] rounded-md justify-start items-start"
    >
      <h1
        class="text-center w-full uppercase text-[var(--secondary-color)] text-3xl font-medium"
      >
        Missing person details
      </h1>

      <!-- Step 1 -->
      <div v-if="currentStep === 1" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >First name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.firstName"
            placeholder="Abraham"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Middle name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.middleName"
            placeholder="Desalegn"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last name:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.lastName"
            placeholder="Feleke"
          />
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Gender:</label
          >
          <select
            v-model="postData.gender"
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Nationality:</label
          >
          <select
            v-model="postData.nationality"
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select nationality</option>
            <option value="ethiopian">Ethiopian</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Date of birth:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.dateOfBirth"
          />
        </div>
        <div class="flex gap-[0.9rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Date:
          </label>
          <input
            type="date"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.lastSeenDate"
          />
        </div>
        <div class="flex gap-[5.5rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Location:
          </label>
          <div class="flex gap-[0.5rem] w-[320px] flex-wrap">
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
            >
              <option value="" disabled selected>Country</option>
              <option value="ethiopia">Ethiopia</option>
              <option value="other">Other</option>
            </select>
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
            >
              <option value="" disabled selected>State</option>
              <option value="addis-ababa">Addis-Ababa</option>
              <option value="other">other</option>
            </select>
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
              v-model="postData.lastSeenLocation"
            >
              <option value="" disabled selected>City</option>
              <option value="nefas-silk">nefas-silk</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div v-if="currentStep === 2" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Wearing:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="lastSeenWearing"
            placeholder="yellow jacket, blue jeans..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Description:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="postData.description"
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
            v-model="height"
            placeholder="180"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Language Spoken:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.languageSpoken"
            placeholder="Amharic"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Skin Color:
          </label>
          <select
            class="border border-[var(--primary-color)] h-[30px] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.skinColor"
          >
            <option value="" selected disabled>Select the Skin Color</option>
            <option value="dark">Dark</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
            <option value="light-skin">light-skin</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Hair Color:
          </label>
          <select
            class="border border-[var(--primary-color)] rounded h-[30px] w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.hairColor"
          >
            <option selected value="" disabled>Select the Hair Color</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
            <option value="blonde">Blonde</option>
            <option value="grey">Grey</option>
            <option value="orange">Orange</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Recognizable Feature:
          </label>
          <textarea
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none py-[0.5rem] text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="postData.recognizableFeatures"
            placeholder="thick eyebrows, scar on face"
          />
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="currentStep === 3" class="flex flex-col gap-[0.7rem]">
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Physical Disability:
          </label>
          <select
            v-model="postData.physicalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>
              Select Physical Disability
            </option>
            <option value="none">None</option>
            <option value="mobility issue">Mobility Issue</option>
            <option value="vision impairment">Vision Impairment</option>
            <option value="hearing loss">Hearing Loss</option>
            <option value="neurological condition">
              Neurological Condition
            </option>
            <option value="non verbal">Non Verbal</option>
            <option value="limb difference">Limb Difference</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Mental Disability:
          </label>
          <select
            v-model="postData.mentalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="" disabled>Select Mental Disability</option>
            <option value="none">None</option>
            <option value="intellectual disability">
              Intellectual Disability
            </option>
            <option value="autism spectrum disorder">
              Autism Spectrum Disorder
            </option>
            <option value="adhd">ADHD</option>
            <option value="schizophrenia">Schizophrenia</option>
            <option value="bipolar disorder">Bipolar Disorder</option>
            <option value="anxiety disorder">Anxiety Disorder</option>
            <option value="depression">Depression</option>
            <option value="ocd">OCD</option>
            <option value="ptsd">PTSD</option>
            <option value="dementia">Dementia</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Health Condition:
          </label>
          <select
            v-model="postData.medicalIssues"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select Health Condition</option>
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="astma">Astma</option>
            <option value="hypertension">Hypertension</option>
            <option value="heart disease">Heart Disease</option>
            <option value="autoImmune disorder">Auto Immune Disorder</option>
            <option value="epilepsy">Epilepsy</option>
            <option value="multiple sclerosis">Multiple Sclerosis</option>
            <option value="lupus">Lupus</option>
            <option value="crohns disease">Crohns Disease</option>
            <option value="migraine">Migraine</option>
            <option value="fibromyalgia">Fibromyalgia</option>
            <option value="psoriasis">Psoriasis</option>
            <option value="irritable bowel syndrome">
              Irritable Bowel Syndrome
            </option>
            <option value="parkinsons">Parkinsons Disease</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Education:
          </label>
          <select
            v-model="postData.educationalLevel"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select Educational Level</option>
            <option value="none">None</option>
            <option value="primary school">Primary School</option>
            <option value="secondary school">Secondary School</option>
            <option value="high school">High School</option>
            <option value="associate">Associate</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Martial Status:
          </label>
          <select
            v-model="postData.maritalStatus"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" disabled selected>
              Select your Marital Status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Poster Relation:
          </label>
          <select
            v-model="postData.posterRelation"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>
              Your relation with the person
            </option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
            <option value="guardian">Guardian</option>
            <option value="neighbor">Neighbor</option>
            <option value="colleague">Colleague</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Image:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleImages"
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Video Message:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleVideoMessage"
            accept="video/*"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Legal Documents:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="handleLegalDocs"
            accept=".pdf,.jpg, .png"
          />
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex justify-end gap-[25rem] w-full px-[3rem] mt-[2rem]">
        <button
          v-if="currentStep > 1"
          type="button"
          class="text-white bg-[var(--primary-color)] py-[0.5rem] px-[2rem] rounded-md"
          @click="goBack"
        >
          Back
        </button>

        <button
          v-if="currentStep < 3"
          type="button"
          class="text-white bg-[var(--secondary-color)] py-[0.5rem] px-[2rem] rounded-md float-right"
          @click="goNext"
        >
          Next
        </button>

        <button
          v-if="currentStep === 3"
          type="submit"
          class="text-white bg-[var(--secondary-color)] py-[0.5rem] px-[2rem] rounded-md"
        >
          Report
        </button>
      </div>
    </form>
  </div>
</template>
<style>
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 1rem 0;
  position: relative;
}

.progress-fill {
  transition: width 0.3s ease;
}
</style>
