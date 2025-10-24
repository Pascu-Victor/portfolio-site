<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import ConwayLogo from './components/ConwayLogo.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-content">
        <ConwayLogo />
        <ul class="nav-links">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
        </ul>
        <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <ul class="mobile-menu" v-show="isMenuOpen">
        <li>
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/projects" @click="closeMenu">Projects</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  width: 100%;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-flex;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #FAA700 0%, #6699FF 100%);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #FAA700;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a.router-link-active {
  color: #6699FF;
}

.nav-links a.router-link-active::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  gap: 5px;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
  padding: 1rem 2rem;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu li a {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.mobile-menu li a:hover {
  color: #FAA700;
}

.mobile-menu li a.router-link-active {
  color: #6699FF;
}

.main-content {
  flex: 1;
  overflow: auto;
  height: 100%;
  display: grid;
  place-content: center;
}

@media (max-width: 768px) {
  .nav-content {
    justify-content: space-between;
    padding: 1rem;
  }

  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }

  .logo {
    font-size: 1.4rem;
  }
}
</style>
