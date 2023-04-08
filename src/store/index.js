import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'
import editArticle from '@/store/modules/editArticle'
import settings from '@/store/modules/settings'
import addToFavorites from '@/store/modules/addToFavorites'
import userProfile from '@/store/modules/userProfile'
import followUser from '@/store/modules/followUser'

Vue.use(Vuex)

export default new Vuex.Store({
  /** Мы можем в абсолютно всех компонентах подписаться на этот count
      И когда как только мы изменим этот count в объекте, то автоматически все компоненты узнают об этом
   **/
  state: {
    // count: 0,
  },
  mutations: {
    /** Мы сказали как мутация должна менять наш state
     increment(state) {
        state.count++;
     },
     **/
  },
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
    followUser
  }
})
