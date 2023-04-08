<template>
  <div id="app">
    <mcv-topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'App',
  components: {
    McvTopbar
  },

  /** mounted - это метод который вызывается когда у нас компонента примонтирована в DOM.
   * Если написать console.log('hello app'); то в консоли можно увидеть это сообщение
   * на всех страницах, где у нас загружается приложение App.
   * И это отличное место, чтобы задиспачить наш экшен
   **/
  mounted() {
    // И на вход нам ничего не нужно передавать
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
