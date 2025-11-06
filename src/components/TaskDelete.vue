<template>
  <div class="max-w-md mx-auto p-4 border rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4 uppercase">Supprimer la tâche</h1>

    <!-- Message de chargement -->
    <div v-if="loading" class="text-center py-4">
      <p>Chargement de la tâche...</p>
    </div>

    <!-- Affichage de la tâche à supprimer -->
    <div v-else-if="task && !deleted" class="space-y-4">
      <div class="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <h2 class="text-lg font-semibold text-yellow-800 mb-2">Attention !</h2>
        <p class="text-yellow-700">Vous allez supprimer la tâche suivante :</p>
        <div class="mt-2 p-2 bg-white rounded border border-gray-200">
          <p class="font-medium text-black">
            <span class="font-medium">Titre :</span> {{ task.titre }}
          </p>
          <p class="font-medium text-black">
            <span class="font-medium">Description :</span> {{ task.description }}
          </p>
          <p class="font-medium text-black">
            <span class="font-medium">À faire avant :</span> {{ formatDate(task.datetime) }}
          </p>
        </div>
      </div>

      <div class="flex space-x-2">
        <button
          @click="handleDelete"
          class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Supprimer définitivement
        </button>
        <router-link
          to="/tasks"
          class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
        >
          Annuler
        </router-link>
      </div>
    </div>

    <!-- Message de succès -->
    <div v-if="deleted" class="p-4 border border-green-200 rounded-lg bg-green-50">
      <h2 class="text-lg font-semibold text-green-800 mb-2">Tâche supprimée avec succès !</h2>
      <div class="flex space-x-2 mt-4">
        <router-link
          to="/tasks"
          class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
        >
          Retour à la liste des tâches
        </router-link>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="mt-4 p-2 text-center text-sm text-red-600 bg-red-50 rounded-md">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'

export default {
  data() {
    return {
      task: null,
      loading: true,
      deleted: false,
      error: '',
    }
  },
  async created() {
    const id = this.$route.params.id
    if (!id) {
      this.error = 'ID de tâche manquant.'
      this.loading = false
      return
    }
    await this.fetchTask(id)
  },
  methods: {
    formatDate(value) {
      if (!value) return ''
      try {
        const date = parseISO(value)
        return format(date, 'dd/MM/yyyy HH:mm')
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
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async handleDelete() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la tâche')
        }

        this.deleted = true
        this.error = ''
      } catch (err) {
        this.error = err.message
        console.error('Erreur :', err)
      }
    },
  },
}
</script>
