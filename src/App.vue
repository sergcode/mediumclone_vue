<template>
  <div id="app">
    <mcv-topbar />
    <router-view></router-view>
    <mcv-footer />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'
import McvFooter from '@/components/Footer'

export default {
  name: 'App',
  components: {
    McvTopbar,
    McvFooter
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
