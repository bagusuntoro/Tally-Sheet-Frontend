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
      path: '/admin-update-note/:id', // Menambahkan parameter :id
      name: 'admin-updateNote',
      component: () => import('../views/admin/UpdateNoteView.vue'),
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
    {
      path: '/admin-laporan/:id', // Menambahkan parameter :id
      name: 'admin-laporan',
      component: () => import('../views/admin/Laporan.vue'),
      props: true
    },
    
    
    
    // users
    {
      path: '/user-dashboard', // Menambahkan parameter :id
      name: 'user-dashboard',
      component: () => import('../views/user/DashboardView.vue')
    },
    {
      path: '/user-note', // Menambahkan parameter :id
      name: 'user-note',
      component: () => import('../views/user/NoteView.vue')
    },
    {
      path: '/user-detail-note/:id', // Menambahkan parameter :id
      name: 'user-detail-note',
      component: () => import('../views/user/DetailNoteView.vue'),
      props: true
    },
    {
      path: '/user-input-note', // Menambahkan parameter :id
      name: 'user-input-note',
      component: () => import('../views/user/InputNoteView.vue')
    },
    {
      path: '/user-input-tumpukan/', // Menambahkan parameter :id
      name: 'user-input-tumpukan',
      component: () => import('../views/user/InputTumpukanView.vue'),
      // props: true
    },
    {
      path: '/user-signature/', // Menambahkan parameter :id
      name: 'user-signature',
      component: () => import('../views/user/SignatureView.vue'),
      // props: true
    },

    {
      path: '/unauthorized', // Menambahkan parameter :id
      name: 'unauthorized',
      component: () => import('../views/Unauthorized.vue')
    },
    {
      path: '/user-laporan/:id',
      name: 'user-laporan',
      component: () => import('../views/user/Laporan.vue'),
      props: true,
      // alias: '/laporan' , // Path alternatif yang akan ditampilkan di browser
    }
    
    
  ]
})


export default router
