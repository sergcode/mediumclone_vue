<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Have an account?
            </router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** Это специальная функция, которая позволяет более
 * легким образом создавать computed properties (вычисляемые свойства)
 **/
import {mapState} from 'vuex'

import McvValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvLogin',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    /** Чтобы работала такая функция её надо ЗАСПРЕЙДИТЬ «SPREAD, троеточие».
     Spread - это фича из ECMAScript 6, которая позволяет результат этого объекта,
     по факту каждое поле в объекте поместить в наш объект computed.
     Computed - это объект и мы не можем просто взять один объект "mapState" и поместить его с другими foo() {}.
     Spread - берет и каждое значение из объекта "mapState" записывает внутрь нашего объекта Computed.
     Это очень важно делать, т.к. если этого не делать, то не смогу писать дополнительные computed properties (вычисляемые свойства)
     внутри каждого объекта и поэтому мы всегда должны делать Spread иначе мы не получим результат "mapState" внутри Computed
     */
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })

    /*foo() {

     }*/

    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting;
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors;
    // },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    }
  }
}
</script>
