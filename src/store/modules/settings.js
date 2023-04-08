// Мы хотим импортировать мутации из модуля store/modules/auth.js,
// поэтому их нужно переименовать, чтобы не ошибиться потом,
// когда уже есть mutationTypes локальные и импортированные из модуля store/modules/auth.js
import {mutationTypes as authMutationTypes} from '@/store/modules/auth'

const state = {
  isSubmitting: false,
  validationErrors: null
}

// Мы хотим подписаться на мутации модуля store/modules/auth.js и это возможно,
// т.к. все мутации глобальны
const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false
  },
  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload // Берется из модуля store/modules/auth.js
  }
}

export default {
  state,
  mutations
}
