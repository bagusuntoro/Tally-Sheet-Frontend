<template>
  <!-- SIDEBAR -->
	<section id="sidebar">
		<a href="#" class="brand">
			<!-- <i class='bx bxs-smile'></i> -->
      <img src="img/logo.png" class="mt-3 ms-2" alt="logo" width="50">
			<span class="text ms-3">TallySheet</span>
		</a>
		<ul class="side-menu top">
			<li class="active">
        <router-link to="/admin-dashboard">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Dashboard</span>
        </router-link>
			</li>
			<li>
        <router-link to="/admin-barang">
					<i class='bx bxs-shopping-bag-alt' ></i>
					<span class="text">Barang</span>
        </router-link>
			</li>
			<li>
        <router-link to="/admin-note">
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">Note</span>
        </router-link>
			</li>
			<!-- <li>
				<a href="#">
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Message</span>
				</a>
			</li> -->
			<li>
				<a href="#">
					<i class='bx bxs-group' ></i>
					<span class="text">Users</span>
				</a>
			</li>
		</ul>
		<ul class="side-menu">
			<li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li>
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
	<!-- SIDEBAR -->



	<!-- CONTENT -->
	<section id="content">
		<!-- NAVBAR -->
		<nav>
			<i class='bx bx-menu' ></i>
			<a href="#" class="nav-link">Categories</a>
			<form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search...">
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden>
			<label for="switch-mode" class="switch-mode"></label>
			<a href="#" class="notification">
				<i class='bx bxs-bell' ></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src="img/nobi.jpg">
			</a>
		</nav>
		<!-- NAVBAR -->

		<!-- MAIN -->
		<main>
			<router-view/>
		</main>
		<!-- MAIN -->
	</section>
	<!-- CONTENT -->
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const allSideMenu = ref(null);
    const menuBar = ref(null);
    const searchButton = ref(null);
    const searchButtonIcon = ref(null);
    const searchForm = ref(null);
    const switchMode = ref(null);
    const sidebar = ref(null);

    onMounted(() => {
      allSideMenu.value = document.querySelectorAll('#sidebar .side-menu.top li a');
      menuBar.value = document.querySelector('#content nav .bx.bx-menu');
      searchButton.value = document.querySelector('#content nav form .form-input button');
      searchButtonIcon.value = document.querySelector('#content nav form .form-input button .bx');
      searchForm.value = document.querySelector('#content nav form');
      switchMode.value = document.getElementById('switch-mode');
      sidebar.value = document.getElementById('sidebar');

      allSideMenu.value.forEach((item) => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
          allSideMenu.value.forEach((i) => {
            i.parentElement.classList.remove('active');
          });
          li.classList.add('active');
        });
      });

      menuBar.value.addEventListener('click', function () {
        sidebar.value.classList.toggle('hide');
      });

      searchButton.value.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
          e.preventDefault();
          searchForm.value.classList.toggle('show');
          if (searchForm.value.classList.contains('show')) {
            searchButtonIcon.value.classList.replace('bx-search', 'bx-x');
          } else {
            searchButtonIcon.value.classList.replace('bx-x', 'bx-search');
          }
        }
      });

      if (window.innerWidth < 768) {
        sidebar.value.classList.add('hide');
      } else if (window.innerWidth > 576) {
        searchButtonIcon.value.classList.replace('bx-x', 'bx-search');
        searchForm.value.classList.remove('show');
      }

      window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
          searchButtonIcon.value.classList.replace('bx-x', 'bx-search');
          searchForm.value.classList.remove('show');
        }
      });

      switchMode.value.addEventListener('change', function () {
        if (this.checked) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      });
    });

    return {
      allSideMenu,
      menuBar,
      searchButton,
      searchButtonIcon,
      searchForm,
      switchMode,
      sidebar,
    };
  },
};
</script>


<style scoped>
</style>
