<template>
  <div
    class="flex items-center justify-start flex-col min-h-[100vh] w-full gap-[40px] px-[100px] pt-[60px]"
  >
    <h1 class="text-2xl font-bold uppercase">Accueil</h1>
    <div class="flex gap-[20px] w-1/4 justify-self-center">
      <router-link
        to="/login"
        class="text-indigo-600 hover:text-indigo-900 text-center w-full border-solid border-2 rounded-lg !p-[8px]"
      >
        Se connecter
      </router-link>
      <router-link
        to="/register"
        class="text-indigo-600 hover:text-indigo-900 text-center w-full border-solid border-2 rounded-lg !p-[8px]"
      >
        S'inscrire
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>
