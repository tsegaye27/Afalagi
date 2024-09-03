<!-- components/SkeletonLoader.vue -->
<template>
    <div class="relative w-[300px] flex flex-col bg-[#fafafa] rounded-lg border-2 border-[#d2d2d2] items-start animate-pulse">
      <!-- Skeleton for image -->
      <div class="w-full h-[280px] bg-gray-300"></div>
      <!-- Skeleton for title -->
      <div class="mt-4 h-6 bg-gray-300 w-3/4 mx-auto"></div>
      <!-- Skeleton for last seen location -->
      <div class="mt-2 h-4 bg-gray-300 w-2/3 mx-auto"></div>
      <!-- Skeleton for last seen date -->
      <div class="mt-2 h-4 bg-gray-300 w-1/2 mx-auto"></div>
      <!-- Skeleton for button -->
      <div class="mt-4 h-10 bg-gray-300 w-full"></div>
      <!-- Add more skeleton elements as needed -->
    </div>
  </template>
  
  <style scoped>
  .animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  