<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import './Header.css'


const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const handleLoginClick = () => {
  router.push('/login');
};

const handleRegisterClick = () => {
  router.push('/register');
};

const handleMainClick = () => {
  router.push('/main');
};

const handleLogout = async () => {
  await authStore.logout();
  await router.push('/login');
};

const handleProfileClick = () => {
  router.push('/profile');
};
</script>

<template>
  <header class="header">
    <h1 @click="handleMainClick" class="header-title">AUTO KOMIS</h1>

    <div v-if="isAuthenticated" class="header-buttons-container">
      <span class="user-email-display">{{ user?.email }}</span>
      <button
          class="icon-button profile-button"
          @click="handleProfileClick"
          aria-label="Profile"
      >
        <i class="fi fi-user button-icon"></i>
      </button>
      <button
          class="icon-button logout-button"
          @click="handleLogout"
          aria-label="Logout"
      >
        <i class="fi fi-log-out button-icon"></i>
      </button>
    </div>
    <div v-else class="header-nav-buttons">
      <button
          class="header-nav-login-button"
          @click="handleLoginClick"
      >
        Zaloguj
      </button>
      <button
          class="header-nav-register-button"
          @click="handleRegisterClick"
      >
        Zarejestruj
      </button>
    </div>
  </header>
</template>

