<template>
  <div>
    <div class="sidebar">
      <p>Popular Tags</p>
      <mcv-loading v-if="isLoading" :text-message="'Loading tags...'" />
      <mcv-error-message v-if="error" />
      <mcv-articles-not
        v-if="feed.articlesCount === 0"
        :text-message="'No popular tags are here... yet.'"
      />
      <div v-if="popularTags" class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'tag', params: {slug: popularTag}}"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvArticlesNot from '@/components/ArticlesNot'

export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage,
    McvArticlesNot
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
}
</script>
