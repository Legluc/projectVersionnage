import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index.vue'
import TaskList from '@/components/TaskList.vue'
import TaskListUnique from '@/components/TaskListUnique.vue'
import TaskCreate from '@/components/TaskCreate.vue'
import TaskUpdate from '@/components/TaskUpdate.vue'
import TaskDelete from '@/components/TaskDelete.vue'

const routes = [
  {
    path: '/', // Route racine pour afficher la liste des tâches
    name: 'Index',
    component: Index,
  },
  {
    path: '/tasks/', // Route racine pour afficher la liste des tâches
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/tasks/:id', // Route pour afficher une tâche unique
    name: 'TaskDetail',
    component: TaskListUnique,
  },
  {
    path: '/tasks/new',
    name: 'TaskCreate',
    component: TaskCreate,
  },
  {
    path: '/tasks/:id/edit',
    name: 'TaskUpdate',
    component: TaskUpdate,
  },
  {
    path: '/tasks/:id/delete',
    name: 'TaskDelete',
    component: TaskDelete,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
