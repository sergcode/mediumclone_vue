<template>
  <div class="article-preview">{{ textMessage }}</div>
</template>

<script>
export default {
  name: 'McvArticlesNot',
  props: {
    textMessage: {
      type: String,
      required: true
    }
  }
}
</script>
