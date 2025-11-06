<template>
  <div class="max-w-md mx-auto p-4 border rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4 uppercase">Créer une nouvelle tâche</h1>

    <!-- Formulaire de création -->
    <form
      @submit.prevent="handleSubmit"
      class="flex gap-4 flex-center flex-col"
      v-if="!createdTask"
    >
      <div>
        <label for="titre" class="block text-sm font-medium text-gray-700 pb-4">Titre</label>
        <input
          type="text"
          id="titre"
          v-model="form.titre"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 pb-4"
          >Description</label
        >
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div>
        <label for="datetime" class="block text-sm font-medium text-gray-700 pb-4"
          >Date limite</label
        >
        <input
          type="datetime-local"
          id="datetime"
          v-model="form.datetime"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Créer la tâche
        </button>
      </div>
    </form>

    <!-- Affichage de la tâche créée -->
    <div v-else class="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
      <h2 class="text-lg font-semibold text-green-800 mb-2">Tâche créée avec succès !</h2>
      <div class="space-y-2">
        <p class="font-medium text-black">
          <span class="font-medium text-black">Titre :</span> {{ createdTask.titre }}
        </p>
        <p class="font-medium text-black">
          <span class="font-medium text-black">Description :</span> {{ createdTask.description }}
        </p>
        <p class="font-medium text-black">
          <span class="font-medium text-black">À faire avant :</span>
          {{ formatDate(createdTask.datetime) }}
        </p>
        <div class="flex space-x-2 mt-4">
          <button
            @click="resetForm"
            class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer une autre tâche
          </button>
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
      form: {
        titre: '',
        description: '',
        done: false,
        datetime: '',
      },
      createdTask: null,
      error: '',
    }
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
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la création de la tâche')
        }

        this.createdTask = await response.json()
        this.error = ''
        console.log('Tâche créée :', this.createdTask)
      } catch (err) {
        this.error = err.message
        console.error('Erreur :', err)
      }
    },
    resetForm() {
      this.createdTask = null
      this.form = { titre: '', description: '', done: false, datetime: '' }
      this.error = ''
    },
  },
}
</script>
