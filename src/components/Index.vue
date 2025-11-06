<template>
  <div class="w-[80vw] flex items-start justify-start flex-col gap-[40px]">
    <h1 class="text-2xl font-bold !mb-[32px]">Accueil</h1>
    <div>
      <router-link
        to="/loggin"
        class="text-indigo-600 hover:text-indigo-900 w-fit border-solid border-2 rounded-lg !p-[8px]"
      >
        Se connecter
      </router-link>
      <router-link
        to="/register"
        class="text-indigo-600 hover:text-indigo-900 w-fit border-solid border-2 rounded-lg !p-[8px]"
      >
        S'inscrire
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    }
  },
  async created() {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost:3000/tasks')
        if (!response.ok) throw new Error('Erreur lors de la récupération des tâches')
        this.tasks = await response.json()
      } catch (error) {
        console.error('Erreur :', error)
      }
    },
  },
}
</script>
