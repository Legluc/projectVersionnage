<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Liste des tâches</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="mb-2 p-2 border rounded">
        {{ task.titre }} - {{ task.description }} (À faire avant : {{ task.datetime }})
      </li>
    </ul>
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
