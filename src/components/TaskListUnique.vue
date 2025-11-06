<template>
  <div class="w-[80vw]">
    <h1 class="text-2xl font-bold !mb-[32px] uppercase">Détails de la tâche</h1>
    <div v-if="task" class="flex gap-[16px] flex-wrap items-stretch">
      <div class="mb-2 p-2 border rounded min-w-[30%]">
        {{ task.titre }} <br />
        {{ task.description }} <br />
        (À faire avant : {{ formatDate(task.datetime) }})
      </div>
      <div class="flex flex-col items-start justify-end gap-4">
        <router-link
          :to="`/tasks/${task.id}/edit`"
          class="text-indigo-600 hover:text-indigo-900 w-full border-solid border-2 rounded-lg !p-[8px] text-center"
        >
          Modifier
        </router-link>
        <router-link
          :to="`/tasks/${task.id}/delete`"
          class="text-red-600 hover:text-red-900 w-full border-solid border-2 rounded-lg !p-[8px] text-center"
        >
          Supprimer
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Chargement de la tâche...</p>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      task: null,
      error: null,
    }
  },
  async created() {
    const route = useRoute() // Récupère l'objet route
    const id = route.params.id // Récupère l'ID depuis l'URL
    if (!id) {
      this.error = 'ID de tâche manquant.'
      return
    }
    await this.fetchTask(id)
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
    async fetchTask(id) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`)
        if (!response.ok) throw new Error('Erreur lors de la récupération de la tâche')
        this.task = await response.json()
      } catch (error) {
        console.error('Erreur :', error)
        this.error = 'Impossible de charger la tâche.'
      }
    },
  },
}
</script>
