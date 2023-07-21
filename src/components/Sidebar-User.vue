<template>
  <!-- Sidebar -->
      <ul
      class="navbar-nav bg-gradient-light sidebar sidebar-dark accordion"
      id="accordionSidebar"
      :class="{'toggled': sidebarToggled}"
    >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="#"
    >
      <div class="sidebar-brand-icon mt-2">
        <img src="/img/logo.png" alt="logo" width="50" />
      </div>
      <div class="sidebar-brand-text ms-3"><span class="text-primary">Tally</span> <span class="text-warning">Sheet</span></div>
    </a>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider my-0 mt-5"> -->

    <!-- Heading -->
    <div class="sidebar-heading mt-5 text-primary">Menu</div>
    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link class="nav-link text-primary" to="/user-dashboard">
        <i class="bi bi-speedometer2 text-primary"></i>
        <span>Dashboard</span>
      </router-link>
    </li>

    <!-- Nav Item - note -->
    <li class="nav-item">
      <router-link class="nav-link text-primary" to="/user-note">
        <i class="bi bi-journal-text text-primary"></i>
        <span>Note</span>
      </router-link>
    </li>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider d-none d-md-block" /> -->

   <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0 bg-primary" id="sidebarToggle" @click="toggleSidebar"></button>
      </div>
    </ul>
    <!-- End of Sidebar -->
</template>
<script>
export default {
  data() {
    return {
      sidebarToggled: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
    }
  }
};
</script>