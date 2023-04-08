<template>
  <!--Внутри :class - это динамические классы-->
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic
    }"
  >
    <i class="ion-heart"></i>
    <span v-if="routeName !== 'article'">
      &nbsp;{{ favoritesCountOptimistic }}
    </span>
    <span v-else>
      &nbsp;{{ favoritesToggleText }} &nbsp;({{ favoritesCountOptimistic }})
    </span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    favoritesToggleText() {
      if (!this.isFavoritedOptimistic) {
        return 'Favorite Articles'
      } else {
        return 'Unfavorite Articles'
      }
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1
      } else {
        this.favoritesCountOptimistic += 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>
