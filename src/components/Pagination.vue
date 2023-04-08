<template>
  <ul class="pagination">
    <!--Без :key не будет работать v-for
        В условии получаем объект :class где ключ active, а в значении условие,
        которое сравнивает текущую страницу с установленной в Feed.vue (currentPage: 5),
        если совпадают, то присваивается класс active
    -->
    <li
      v-for="page in pages"
      :key="page"
      class="page-item"
      :class="{active: currentPage === page}"
    >
      <router-link :to="{path: url, query: {page: page}}" class="page-link">
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {range} from '@/helpers/utils'

export default {
  name: 'McvPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    pages() {
      const pageCount = Math.ceil(this.total / this.limit) // Math.ceil - округляем в сторону большего, чтобы не получилось такое 501 / 10 = 50.1, а получить 51 статья
      return range(1, pageCount)
    }
  }
}
</script>
