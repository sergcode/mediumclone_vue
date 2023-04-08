import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  isLoading: false,
  currentUser: null,
  validationErrors: null
}

/** Actions type внутри Redux.
 * Префикс [auth] - делает все эти мутации уникальными, по скольку у нас модуль уникален.
 * Мутации и Экшены в глобальном контексте - это просто строки
 **/
export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',

  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure',

  getCurrentUserStart: '[auth] Get current user start',
  getCurrentUserSuccess: '[auth] Get current user success',
  getCurrentUserFailure: '[auth] Get current user failure',

  updateCurrentUserStart: '[auth] Update current user start',
  updateCurrentUserSuccess: '[auth] Update current user success',
  updateCurrentUserFailure: '[auth] Update current user failure',

  logout: '[auth] Logout'
}

export const actionTypes = {
  register: '[auth] Register',
  login: '[auth] Login',
  getCurrentUser: '[auth] Get current user',
  updateCurrentUser: '[auth] Update current user',
  logout: '[auth] Logout'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

/** Getters - это часть Vuex. Если мы хотим вычислить новые данные из уже имеющихся данных из State.
 *  Геттеры - это глобальные вещи.
 */
const getters = {
  /** 1 Вариант: */
  /*currentUser: (state) => {
    return state.currentUser;
   },*/

  /** 2 Вариант: - в modules/auth нужно будет импортировать gettersType */
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    /** return state.isLoggedIn - такой код может вернуть NULL.
     * Нужно заврапить в Boolean(state.isLoggedIn), чтобы с конвертировать NULL в false.
     **/
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  }
}

/** В мутациях меняется только состояние */
const mutations = {
  /** registerStart() - это ключ внутри объекта */
  /** [mutationTypes.registerStart] - такая запись заставляет JS выполнить операцию внутри [],
   *  соответственно JS просто прочитает Value и запишет его ка ключ.
   *  Если не поставить [], то будет ошибка, т.к. это не валидный JS
   *  */
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null // Такой подход null избавляет от всяких магических багов
  },

  /** Payload - нужен для того, чтобы при успешном логине
   * мы хотим получить currentUser (текущего пользователя)
   **/
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    // payload - это наш обновленный пользователь, поэтому мы хотим в state.currentUser записать наш новый payload.
    // И это обновит currentUser во всем приложении сразу же
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFailure]() {},
  [mutationTypes.logout]() {
    state.currentUser = null
    state.isLoggedIn = false
  }
}

const actions = {
  [actionTypes.register](context, credentials) {
    /** Зачем return new Promise? Нам необходимо иногда в наше компоненте среагировать на экшен.
     * И самый простой способ сделать это работать с нашим эшкеном как с промисом.
     * Самый простой способ добавить resolve. И применить его в success, т.е. в .then
     **/
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(response => {
          /** response - это весь запрос в data - содержится наш ответ
           * и в поле users - содержатся данные пользователя
           **/
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors // result.response - это будет ответ
          )
          /** Здесь можно вызвать какую-то мутацию, который скажет о том,
           * что наш запрос провалился
           **/
          console.log('result errors', result)
        })
    })

    // setTimeout(() => {
    //   context.commit('registerStart');
    // }, 1000);
  },
  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart)

      /** На вход ничего не передаем .getCurrentUser() */
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          /** setItem('accessToken', response.data.user.token); - accessToken здесь не делаем,
           * т.к. он здесь не нужен, если мы по токину получает currentUser,
           * то это значит, что он у нас уже есть
           **/

          /** Дальше используем resolve,
           *  чтобы вернуть данные пользователя
           **/
          resolve(response.data.user)
        })
        .catch(() => {
          /** 1 Если у нас происходит catch нам ошибки не важны => */
          context.commit(
            mutationTypes.getCurrentUserFailure // 3 мы просто говорим, что у нас случился getCurrentUserFailure
            /** result.response.data.errors 2
             * и тогда мы не передаем никакие ошибки в наш failure =>
             **/
          )
        })
    })
  },
  // Здесь мы получаем наш currentUserInput. Он необходим для нашего api.
  // Мы можем его написать в фигурных скобках и это означает, что мы ожидаем объект с полем currentUserInput
  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateCurrentUserStart)
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch(result => {
          // На мутации мы можем реагировать в нескольких местах нашего приложения
          context.commit(
            mutationTypes.updateCurrentUserFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise(resolve => {
      setItem('accessToken', '')
      context.commit(mutationTypes.logout)
      resolve()
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
