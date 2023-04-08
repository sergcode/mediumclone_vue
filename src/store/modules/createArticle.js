import articleApi from '@/api/article'

const state = {
  isSubmitting: false, // это нужно, чтобы заблокировать кнопку формы disabled
  validationErrors: null
}

export const mutationTypes = {
  createArticleStart: '[createArticle] Create article start',
  createArticleSuccess: '[createArticle] Create article success',
  createArticleFailure: '[createArticle] Create article failure'
}

export const actionTypes = {
  createArticle: '[createArticle] Create article'
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  // Обычно мы первым аргументом context, вторым articleInput
  // Как обычно здесь применили деструктуризацию, потому что мы ожидаем от нашего компонента получить объект и внутри него будет поле articleInput
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then(article => {
          context.commit(mutationTypes.createArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
