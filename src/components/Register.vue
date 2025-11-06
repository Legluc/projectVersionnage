<template>
  <div
    class="flex items-center justify-start flex-col min-h-[100vh] w-full gap-[40px] px-[100px] pt-[60px]"
  >
    <h1 class="text-2xl font-bold uppercase">S'inscrire</h1>
    <div class="w-1/4">
      <form action="post" class="flex flex-col gap-[16px]">
        <div class="flex flex-col gap-[8px]">
          <label for="email"> email </label>
          <input
            type="text"
            id="email"
            placeholder="saisissez votre email"
            class="p-[8px] border-solid border-2 rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-[8px]">
          <label for="password"> mot de passe </label>
          <input
            type="text"
            id="password"
            placeholder="saisissez votre mot de passe"
            class="p-[8px] border-solid border-2 rounded-lg"
          />
          <label for="confPassword"> confirmation du mot de passe </label>
          <input
            type="text"
            id="confPassword"
            placeholder="confirmez votre mot de passe"
            class="p-[8px] border-solid border-2 rounded-lg"
          />
        </div>
      </form>
    </div>
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
