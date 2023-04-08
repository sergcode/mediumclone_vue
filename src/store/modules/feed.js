import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure'
}

export const actionTypes = {
  getFeed: '[feed] Get feed'
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true

    /** Обычно такое делается для того, чтобы избежать всяких лагов и багов в UI
     * Например здесь есть getFeed и если  мы будем переходить с одного фида на другой
     * и у нас уже фид заполнен в Redux или во Vuex -это значит, что у нас уже есть данные
     * и тогда у нас будет глюк, что на какую-то долю секунды мы будем видеть старый фид
     * хотя мы уже поменяли URL. Если же мы на getFeedStart сразу же все данные удаляем,
     * то у нас таких багов не будет. */
    state.data = null
  },

  /** На Success мы обратно получаем наш фид */
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false
  }
}

/** На вход мы получаем context, а второй параметр - это параметры.
 * Здесь когда дергаем getFeed нам необходимо внутри компонента передать apiUrl сюда,
 * иначе мы не будем знать с какого URL нам фетчить наши данные.
 * И мы могли бы написать вторым аргументом apiUrl, но лучше передавать данные в виде объекта,
 * по скольку если в будущем потребуется передать больше полей чем одно, то это легко можно сделать.
 * Поэтому по факту мы получаем какие-то PARAMS и их сразу же можно деструктурировать.
 * По скольку PARAMS на прямую нам не нужны, а нам все таки нужен apiUrl.
 *
 * ДЕСТРУКТУРИЗАЦИЯ - это фича из ES6, которая позволяет сразу из параметров получить локальную переменную,
 * которая внутри этого объекта. Т.е. вот этот код равняется тому, что есть локальная переменная apiUrl,
 * которую я получил из объекта, который был 2-м аргументом в этой функции */
const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart, apiUrl)
      feedApi
        .getFeed(apiUrl)
        /** Если был success то здесь будет .then() и в response получаю фид */
        .then(response => {
          /** И здесь хотим сделать коммит. Здесь хотим в success передать данные из response,
           * По этому будет response.data. Здесь мы хотим получить все и массив articles
           * и общее количество наших статей
           **/
          context.commit(mutationTypes.getFeedSuccess, response.data)

          /** Это нужно для того, чтобы если вдруг нам
           * понадобится получить эти данные внутри компонента
           **/
          resolve(response.data)
        })
        .catch(() => {
          /** То есть у нас случился какой-то Failure мы его выбросили,
           * мы его увидим во Vuex и нам будет легче дебажить
           **/
          context.commit(mutationTypes.getFeedFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
