<template>
  <div class="article-meta">
    <router-link
      :to="{name: 'userProfile', params: {slug: articleAuthorUsername}}"
    >
      <img :src="articleAuthorImage" alt="" />
    </router-link>
    <div class="info">
      <router-link
        class="author"
        :to="{
          name: 'userProfile',
          params: {slug: articleAuthorUsername}
        }"
      >
        {{ articleAuthorUsername }}
      </router-link>
      <!--.createdAt - взят из Сети в инструменте разраба в объекте article-->
      <span class="date">{{ articleCreatedAt }}</span>
    </div>

    <span v-if="isAuthor">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{name: 'editArticle', params: {slug: articleSlug}}"
      >
        <i class="ion-edit" />
        Edit Article
      </router-link>
      &nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a" />
        Delete Article
      </button>
    </span>

    <span v-else>
      <button class="btn btn-sm btn-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;Unfollow {{ articleAuthorUsername }}
      </button>
      &nbsp;
      <mcv-add-to-favorites
        :is-favorited="articleFavorited"
        :article-slug="articleSlug"
        :favorites-count="articleFavoritesCount"
      />
    </span>
  </div>
</template>

<script>
import McvAddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'McvUserInfoAndButtons',
  components: {
    McvAddToFavorites
  },
  props: {
    articleAuthorUsername: {
      type: String,
      required: true
    },
    articleAuthorImage: {
      type: String,
      required: true
    },
    articleCreatedAt: {
      type: String,
      required: true
    },
    isAuthor: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    deleteArticle: {
      type: Function,
      required: true
    },
    articleFavorited: {
      type: Boolean,
      required: true
    },
    articleFavoritesCount: {
      type: Number,
      required: true
    }
  }
}
</script>
