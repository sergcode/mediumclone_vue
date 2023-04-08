<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Need an account?
            </router-link>
          </p>

          <!-- Здесь мы создали новый props, который еще не описан в validationErrors-->
          <!-- :validation-errors можно писать и через camelCase оба варианта написания будут работать -->
          <!-- Чтобы не было ошибок в консоли нужно заврапить этот компонент воспользовавшись v-if.
                Если нет ошибок, т.е. validationErrors = null, то ничего не выводить иначе вывести ошибки валидации
           -->
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Это специальная функция, которая позволяет
// более легким образом создавать computed properties (вычисляемые свойства)
import {mapState} from 'vuex'

import McvValidationErrors from '@/components/ValidationErrors.vue'
// {actionTypes} здесь используется деструктуризация, потому что в auth.js написал export const actionTypes
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  /** Для того, чтобы подписаться мы используем Computed property
    Например мы можем создать переменную foo и это должно быть обязательно функцией
    С помощью Computed property мы можем очень легко получать данные из нашего глобального State
   **/
  computed: {
    // foo - это просто локальная переменная, т.е. мы её теперь можем везде писать в нашем шаблоне
    // foo() {
    //   return this.bar + 'baz'
    // }

    // count() {
    //   return this.$store.state.count; // Здесь поле в root
    // },

    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          // Таким образом рекомендуется создавать простые формы,
          // если было 10 страниц форм, то этот способ не подошел,
          // потому что он не достаточно гибкий
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          // Так делается редирект на главную страницу
          // после успешной регистрации пользователя
          this.$router.push({name: 'globalFeed'})
          // Откуда нам доступен $router - в main.js мы передали router внутрь Vue
        })
    }

    // Создали новый метод и коммитим нашу мутацию
    // increaseCounter() {
    //   console.log('increaseCounter');
    //   this.$store.commit('increment');
    // },
  }
}
</script>
