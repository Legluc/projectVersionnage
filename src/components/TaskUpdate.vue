<template>
  <div class="max-w-md mx-auto p-4 border rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4">Modifier la tâche</h1>

    <!-- Message de chargement -->
    <div v-if="loading" class="text-center py-4">
      <p>Chargement de la tâche...</p>
    </div>

    <!-- Formulaire de modification -->
    <form @submit.prevent="handleSubmit" class="space-y-4" v-else-if="task && !updatedTask">
      <div>
        <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          id="titre"
          v-model="task.titre"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="task.description"
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div>
        <label for="datetime" class="block text-sm font-medium text-gray-700">Date limite</label>
        <input
          type="datetime-local"
          id="datetime"
          v-model="task.datetime"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="done"
          v-model="task.done"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="done" class="ml-2 block text-sm text-gray-700">Tâche terminée</label>
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Mettre à jour la tâche
        </button>
      </div>
    </form>

    <!-- Affichage de la tâche mise à jour -->
    <div v-if="updatedTask" class="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
      <h2 class="text-lg font-semibold text-green-800 mb-2">Tâche mise à jour avec succès !</h2>
      <div class="space-y-2">
        <p class="font-medium text-black">
          <span class="font-medium text-black">Titre :</span> {{ updatedTask.titre }}
        </p>
        <p class="font-medium text-black">
          <span class="font-medium text-black">Description :</span> {{ updatedTask.description }}
        </p>
        <p class="font-medium text-black">
          <span class="font-medium text-black">Statut :</span>
          {{ updatedTask.done ? 'Terminée' : 'En cours' }}
        </p>
        <p class="font-medium text-black">
          <span class="font-medium text-black">À faire avant :</span>
          {{ formatDate(updatedTask.datetime) }}
        </p>
        <div class="flex space-x-2 mt-4">
          <router-link
            to="/tasks"
            class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            Retour à la liste
          </router-link>
        </div>
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
      updatedTask: null,
      loading: true,
      error: '',
    }
  },
  async created() {
    const id = this.$route.params.id // Utilise this.$route au lieu de useRoute()
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
        // Formater la date pour le champ datetime-local
        if (this.task.datetime) {
          const date = new Date(this.task.datetime)
          this.task.datetime = date.toISOString().slice(0, 16) // Format YYYY-MM-DDTHH:MM
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async handleSubmit() {
      try {
        const id = this.$route.params.id // Utilise this.$route au lieu de useRoute()
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.task),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la tâche')
        }

        this.updatedTask = await response.json()
        this.error = ''
        console.log('Tâche mise à jour :', this.updatedTask)
      } catch (err) {
        this.error = err.message
        console.error('Erreur :', err)
      }
    },
  },
}
</script>
