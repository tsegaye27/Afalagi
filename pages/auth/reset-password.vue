<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Reset Password</h1>
      <form @submit.prevent="sendResetLink">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': emailError }"
            placeholder="Enter your email"
            required
          />
          <p v-if="emailError" class="text-red-500 text-xs italic mt-2">{{ emailError }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      <p v-if="successMessage" class="text-green-500 text-xs italic mt-2">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500 text-xs italic mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const emailError = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const validateEmail = () => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i
  if (!re.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const sendResetLink = async () => {
  if (!validateEmail()) {
    return
  }
  try {
    const response = await axios.post('/auth/reset-password', { email: email.value })
    successMessage.value = 'Reset link sent successfully!'
    errorMessage.value = ''
  } catch (error) {
    successMessage.value = ''
    errorMessage.value = 'Failed to send reset link. Please try again later.'
  }
}
</script>
