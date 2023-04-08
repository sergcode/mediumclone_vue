<template>
  <div class="loading">
    <img v-if="spinner" src="@/assets/loading.svg" alt="" />
    <span>{{ textMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'McvLoading',
  props: {
    textMessage: {
      type: String,
      required: true
    },
    spinner: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  width: 100%;
}

.loading img {
  width: 50px;
  height: 50px;
  margin-right: 12px;
}

.loading__center {
  flex-wrap: wrap;
  justify-content: center;
}

.loading__center span {
  display: block;
  width: 100%;
  text-align: center;
}

.loading__center img {
  margin-bottom: 1rem;
}

.pb-1 {
  padding-bottom: 1rem;
}
.loading__font-size {
  font-size: 22px;
}
</style>
