<script setup>
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const dob = ref("");
const gender = ref("");
const lastSeenDate = ref("");
const lastSeenLocation = ref("");
const lastSeenWearing = ref("");
const description = ref("");
const height = ref("");
const nationality = ref("");
const languageSpoken = ref("");
const skinColor = ref("");
const hairColor = ref("");
const recognizableFeature = ref("");
const physicalDisability = ref("");
const mentalDisability = ref("");
const healthCondition = ref("");
const educationalQualification = ref("");
const martialStatus = ref("");
const video = ref("");
const image = ref("");
const legalDocuments = ref("");

// const handleSelection = (event, prop) => {
//   prop.value = event.target.value;
// };

const reportMissing = () => {
  console.log({
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value,
    dob: dob.value,
    gender: gender.value,
    nationality: nationality.value,
    languageSpoken: languageSpoken.value,
    lastSeenDate: lastSeenDate.value,
    lastSeenLocation: lastSeenLocation.value,
    lastSeenWearing: lastSeenWearing.value,
    description: description.value,
    height: height.value,
    skinColor: skinColor.value,
    hairColor: hairColor.value,
    recognizableFeature: recognizableFeature.value,
    physicalDisability: physicalDisability.value,
    mentalDisability: mentalDisability.value,
    healthCondition: healthCondition.value,
    educationalQualification: educationalQualification.value,
    martialStatus: martialStatus.value,
    video: video.value,
    image: image.value,
    legalDocuments: legalDocuments.value,
  });
};
</script>
<template>
  <div class="report-form flex justify-center items-start my-[2rem]">
    <form
      @submit.prevent="reportMissing"
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
            v-model="firstName"
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
            v-model="middleName"
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
            v-model="lastName"
            placeholder="Feleke"
            id="lastName"
          />
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Gender:</label
          >
          <select
            v-model="gender"
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option value="" selected disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="flex justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Nationality:</label
          >
          <select
            v-model="nationality"
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
            v-model="dob"
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
            v-model="lastSeenDate"
            id="lastSeenDate"
          />
        </div>
        <div class="flex gap-[5.5rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Location:
          </label>
          <div class="flex gap-[0.5rem] w-[320px] flex-wrap">
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
              id="country"
            >
              <option value="" disabled selected>Country</option>
              <option value="ethiopia">Ethiopia</option>
              <option value="other">Other</option>
            </select>
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
              id="state"
            >
              <option value="" disabled selected>State</option>
              <option value="addis-ababa">Addis-Ababa</option>
              <option value="other">other</option>
            </select>
            <select
              class="outline-none h-[30px] rounded-md p-1 border border-[var(--primary-color)] text-[var(--primary-color)]"
              v-model="lastSeenLocation"
              id="city"
            >
              <option value="" disabled selected>City</option>
              <option value="nefas-silk">nefas-silk</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Last Seen Wearing:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="lastSeenWearing"
            id="lastSeenWearing"
            placeholder="yellow jacket, blue jeans..."
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Description:
          </label>
          <textarea
            class="border border-[var(--primary-color)] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pt-[0.5rem] pl-[0.5rem] w-[320px]"
            v-model="description"
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
            v-model="height"
            placeholder="180"
            id="height"
          />
        </div>
        <div class="flex gap-2 justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Language Spoken:
          </label>
          <input
            type="text"
            class="border border-[var(--primary-color)] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="languageSpoken"
            placeholder="Amharic"
            id="languageSpoken"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Skin Color:
          </label>
          <select
            class="border border-[var(--primary-color)] h-[30px] rounded w-[320px] outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            v-model="skinColor"
            id="skinColor"
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
            v-model="hairColor"
            id="hairColor"
          >
            <option selected disabled>Select the Hair Color</option>
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
            v-model="recognizableFeature"
            id="recognizableFeature"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Physical Disability:
          </label>
          <select
            v-model="physicalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="none">None</option>
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
            v-model="mentalDisability"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="none">None</option>
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
            v-model="healthCondition"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="none">None</option>
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
            <option value="">Other</option>
          </select>
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Education Qualification:
          </label>
          <select
            v-model="educationalQualification"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="none">None</option>
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
            v-model="martialStatus"
            class="border border-[var(--primary-color)] rounded outline-none h-[30px] text-[var(--primary-color)] p-[0.1rem] w-[320px]"
          >
            <option selected value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
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
            @change="(e) => (image = e.target.files[0])"
            id="image"
            accept=".jpg, .jpeg, .png, .gif"
          />
        </div>
        <div class="flex gap-[1.8rem] justify-between px-[3rem] items-center">
          <label class="text-[var(--primary-color)] text-[1rem] font-medium"
            >Video Message:
          </label>
          <input
            type="file"
            class="border border-[var(--primary-color)] w-[320px] rounded outline-none text-[var(--primary-color)] p-[0.1rem] pl-[0.5rem]"
            @change="(e) => (video = e.target.files[0])"
            id="video"
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
            @change="(e) => (legalDocuments = e.target.files[0])"
            id="legalDocuments"
            accept=".pdf, .doc, .docx, .txt"
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
