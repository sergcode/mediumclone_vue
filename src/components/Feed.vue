<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />

    <div v-if="feed" class="article-list">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvAddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'McvFeed',

  /** Что такое PROPS - мы хотим определить все зависимости нашего компонента,
   *  т.е. абсолютно все поля, которые мы хотим передать внутрь
   */
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites
  },
  /** COMPUTED - это декларативно и мутабельно. Мы просто описываем переменные которые хотим получить, это и мутабельно по скольку мы здесь производим какие-то вычисления,
   * но мы не меняем абсолютно никакие переменные, например в currentPage() вписать какие-то this.foo = 'bar' ЗАПРЕЩЕННО!!! Потому что это computed properties оно просто вычисляет currentPage().
   * И здесь нельзя делать никаких мутаций внутри this
   */
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    limit() {
      return limit
    },
    baseUrl() {
      return this.$route.path
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * limit - limit
      /** Формула работает так:
       * Если страница 1 умножаем на 10 статей минус 10 равно 0
       * Если страница 2 умножаем на 10 статей минус 10 равно 10
       */
    }
  },
  /** WATCH - это просто вещи написанные на callbacks, т.е. это полностью императивный код. Здесь просто пишется колбэк и он выполняется когда переменная поменяется.
   * Поэтому в 90% случаев лучше использовать COMPUTED!!!
   * Использовать WATCH - нужно только при самой крайней необходимости, например как сейчас когда нужно перезагрузить данные для новой странице  */
  watch: {
    /** currentPage() - это локальная переменная ввиду функции за которой мы хотим наблюдать */
    currentPage() {
      console.log('currentPage change')
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },

  /** mounted() метод - это метод который произойдет при инициализации компонента.
   * ВАЖНОЕ!!! Вторым параметром необходимо передать apiUrl, мы передаем его как параметр внутри объекта.
   * Поэтому рекомендуется всегда делать объекты
   **/
  mounted() {
    console.log('init feed')
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      console.log(apiUrlWithParams)
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>
