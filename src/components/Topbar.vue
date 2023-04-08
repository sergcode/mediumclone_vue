<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <!-- Когда при переходе на другие страницы предыдущая в меню остается активной,
        то можно решить эту проблему добавив атрибут Exact.
        По дефолту VUE-ROUTER, как и во всех фреймворках, сравнивает ссылку не полностью, а
        только по инклуду, т.е. по слешу "/". Т.е. у страницы home заканчивается URL на "/",
        но и у других страниц он есть, поэтому нужен атрибут Exact.
        Атрибут Exact - нужен для того, что бы проверялось совпадение URL страницы полным,
        т.е. если страница home значит "/", если страница login значит "/login" и т.д.
        -->

        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'globalFeed'}"
            exact
            active-class="active"
          >
            Home
          </router-link>
        </li>

        <!-- Template - специальный элемент Vue, который не рендерится внутри DOM.
          Он нужен для того, чтобы писать логику для нескольких элементов.
          В этом случае он нужен для того, чтобы показать доп. элементы меню только, если
          человек залогинен (v-if='isLoggedIn').
         -->
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'createArticle'}"
              active-class="active"
            >
              <i class="ion-compose" />
              &nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'settings'}"
              active-class="active"
            >
              <i class="ion-gear-a" />
              &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <!--В :to - можно передавать не только имя нашего раута, но и так же параметры,
                которые нужны нам в этом рауте, чтобы на него перейти.-->
            <router-link
              class="nav-link"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              active-class="active"
            >
              <img class="user-pic" :src="currentUser.image" />
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>

        <!-- В этом случае он нужен для того, чтобы показать доп. элементы меню только,
            если человек не залогинен (v-if='!isLoggedIn'). -->
        <!-- Новое (правильное): при использовании getters условие в v-if меняется на подготовленную переменную isAnonymous со значением false.
        Этим избавились от отрицания !, что более правильно и понятнее читать.-->
        <template v-if="isAnonymous">
          <!-- Для того, чтобы подсветить раут, т.е. сделать активным пункт меню, нужно добавить атрибут active-class.
         Что он делает, по дефолту в рауте active-class совсем другой и мы хотим его засетить в active,
         потому что этот класс написал в css.-->
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'login'}"
              active-class="active"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
              active-class="active"
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'
// import {mapState} from 'vuex'; Заменили mapState другой библой mapGetters

export default {
  name: 'McvTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser, // Значение свойства теперь уже не функция, а строка
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })

    /** Такая запись больше не понадобится при использовании mapGetters */
    // ...mapState({
    //   currentUser: state => state.auth.currentUser,
    //   isLoggedIn: (state) => state.auth.isLoggedIn,
    // }),

    /** Запись меняется и сокращается при использовании mapGetters */
    // currentUser() {
    //   /** Запись для 1 - го варианта Getters */
    //   // return this.$store.getters.currentUser;
    //
    //   /** Запись для 2 - го варианта Getters */
    //   return this.$store.getters[getterTypes.currentUser];
    // },
    // isLoggedIn() {
    //   return this.$store.getters[getterTypes.isLoggedIn];
    // },
    // isAnonymous() {
    //   return this.$store.getters[getterTypes.isAnonymous];
    // },
  }
}
</script>
