<template>
  <div class="w-[80vw] flex flex-col gap-[40px]">
    <h1 class="text-2xl font-bold !mb-[32px] uppercase">Liste des tâches</h1>
    <ul class="flex gap-[16px] flex-wrap items-stretch">
      <li v-for="task in tasks" :key="task.id" class="mb-2 p-2 border rounded min-w-[30%]">
        <router-link :to="`/tasks/${task.id}`">
          {{ task.titre }} <br />
          {{ task.description }} <br />
          (À faire avant : {{ formatDate(task.datetime) }})
        </router-link>
      </li>
    </ul>
    <router-link
      to="/tasks/new"
      class="text-indigo-600 hover:text-indigo-900 w-fit border-solid border-2 rounded-lg !p-[8px]"
    >
      Créer une nouvelle tâche
    </router-link>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
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
    formatDate(value) {
      if (!value) return ''
      try {
        const date = parseISO(value)
        return format(date, 'dd/MM/yyyy')
      } catch (e) {
        console.error('Erreur de formatage :', e)
        return value
      }
    },
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
