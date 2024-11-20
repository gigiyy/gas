<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Welcome" />

      <nav>
        <RouterLink to="/" class="tab">
          <i class="fa fa-house"></i>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/gasoline" class="tab">
          <i class="fa fa-gas-pump"></i>
          <span>Gasoline</span>
        </RouterLink>
        <RouterLink to="/about" class="tab">
          <i class="fa fa-circle-info"></i>
          <span>About</span>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-bottom: 2rem;
}

.wrapper {
  width: auto;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: left;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav a.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a.tab i {
  width: 24px;
  text-align: center;
  font-size: 1.2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: hsla(160, 100%, 37%, 0.1);
}

nav a.router-link-exact-active:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    width: 200px;
  }
}
</style>
