<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Set New Password</h1>
        <form @submit.prevent="resetPassword">
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-700 font-bold mb-2">New Password</label>
            <input
              type="password"
              v-model="newPassword"
              id="newPassword"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': newPasswordError }"
              placeholder="Enter new password"
              required
            />
            <p v-if="newPasswordError" class="text-red-500 text-xs italic mt-2">{{ newPasswordError }}</p>
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm New Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              id="confirmPassword"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': confirmPasswordError }"
              placeholder="Confirm new password"
              required
            />
            <p v-if="confirmPasswordError" class="text-red-500 text-xs italic mt-2">{{ confirmPasswordError }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </div>
        </form>
        <p v-if="successMessage" class="text-green-500 text-xs italic mt-2">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 text-xs italic mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  
import axios from 'axios'
  const route = useRoute()
  
  const newPassword = ref('')
  const confirmPassword = ref('')
  const newPasswordError = ref('')
  const confirmPasswordError = ref('')
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const validatePasswords = () => {
    let valid = true
    if (newPassword.value.length < 6) {
      newPasswordError.value = 'Password must be at least 6 characters'
      valid = false
    } else {
      newPasswordError.value = ''
    }
    if (confirmPassword.value !== newPassword.value) {
      confirmPasswordError.value = 'Passwords do not match'
      valid = false
    } else {
      confirmPasswordError.value = ''
    }
    return valid
  }
  
  const resetPassword = async () => {
    if (!validatePasswords()) {
      return
    }
    try {
      const response = await axios.post('/auth/reset-password', {
        newPassword: newPassword.value,
        passwordConfirm: confirmPassword.value,
        resetToken: route.params.token
      })
      successMessage.value = 'Password reset successfully!'
      errorMessage.value = ''
    } catch (error) {
      successMessage.value = ''
      errorMessage.value = error
    }
  }
  </script>