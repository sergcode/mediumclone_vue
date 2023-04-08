<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <mcv-user-info-and-buttons
          :article-author-username="article.author.username"
          :article-author-image="article.author.image"
          :article-created-at="article.createdAt"
          :is-author="isAuthor"
          :article-slug="article.slug"
          :delete-article="deleteArticle"
          :article-favorited="article.favorited"
          :article-favorites-count="article.favoritesCount"
        />
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="isLoading" :message="error" />

      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tags="article.tagList" />
        </div>
      </div>

      <hr />

      <div class="article-actions" v-if="article">
        <mcv-user-info-and-buttons
          :article-author-username="article.author.username"
          :article-author-image="article.author.image"
          :article-created-at="article.createdAt"
          :is-author="isAuthor"
          :article-slug="article.slug"
          :delete-article="deleteArticle"
          :article-favorited="article.favorited"
          :article-favorites-count="article.favoritesCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {mapState, mapGetters} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvUserInfoAndButtons from '@/components/UserInfoAndButtons'

export default {
  name: 'McvArticle',
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvUserInfoAndButtons
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug // params.slug - берем из объекта $route. Можно найти params в консоли console.log(this.$route)
    })
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    }
  }
}
</script>
