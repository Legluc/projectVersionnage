import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import TaskList from '@/components/TaskList.vue'
import TaskListUnique from '@/components/TaskListUnique.vue'
import TaskCreate from '@/components/TaskCreate.vue'
import TaskUpdate from '@/components/TaskUpdate.vue'
import TaskDelete from '@/components/TaskDelete.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/tasks/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/tasks/:id',
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
