<template>
  <footer>
    <div class="container center">
      <router-link class="logo-font" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <span class="attribution">&nbsp;© {{ year }} </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'McvFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
footer .center {
  text-align: center;
}
footer .attribution {
  margin-left: 0;
  font-size: 1rem;
}
</style>
