import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/admin/DashboardView.vue'
import UpdateBarangView from '../views/admin/UpdateBarangView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        bodyClass: 'custom-body-style', // Class khusus untuk halaman ini
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/lupa-password',
      name: 'lupa-password',
      component: () => import('../views/LupaPasswordView.vue')
    },
    // admin
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: DashboardView
    },
    {
      path: '/admin-barang',
      name: 'admin-barang',
      component: () => import('../views/admin/BarangView.vue')
    },
    {
      path: '/admin-input-barang',
      name: 'admin-inputBarang',
      component: () => import('../views/admin/InputBarangView.vue')
    },
    {
      path: '/admin-update-barang/:id', // Menambahkan parameter :id
      name: 'admin-updateBarang',
      component: UpdateBarangView,
      props: true // Mengaktifkan pengiriman props sebagai parameter
    },
    {
      path: '/admin-note',
      name: 'adminnote',
      component: () => import('../views/admin/NoteView.vue')
    },
    {
      path: '/admin-input-note',
      name: 'admin-input-note',
      component: () => import('../views/admin/InputNoteView.vue')
    },
    {
      path: '/admin-update-note/:id', // Menambahkan parameter :id
      name: 'admin-updateNote',
      component: () => import('../views/admin/UpdateNoteView.vue'),
      props: true // Mengaktifkan pengiriman props sebagai parameter
    },
    {
      path: '/admin-input-tumpukan/:id', // Menambahkan parameter :id
      name: 'admin-InputTumpukan',
      component: () => import('../views/admin/InputTumpukanView.vue'),
      props: true // Mengaktifkan pengiriman props sebagai parameter
    },
    {
      path: '/admin-signature/:id', // Menambahkan parameter :id
      name: 'admin-signature',
      component: () => import('../views/admin/signatureView.vue'),
      props: true // Mengaktifkan pengiriman props sebagai parameter
    },
    {
      path: '/admin-detail-note/:id', // Menambahkan parameter :id
      name: 'admin-detailNote',
      component: () => import('../views/admin/DetailNoteView.vue'),
      props: true // Mengaktifkan pengiriman props sebagai parameter
    },
    {
      path: '/admin-users', // Menambahkan parameter :id
      name: 'admin-users',
      component: () => import('../views/admin/UserView.vue')
    },
    {
      path: '/admin-input-user', // Menambahkan parameter :id
      name: 'admin-input-user',
      component: () => import('../views/admin/InputUserView.vue')
    },
  ]
})


export default router
