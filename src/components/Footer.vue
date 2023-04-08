<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <span class="attribution">
        © 2023
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'McvFooter'
}
</script>
