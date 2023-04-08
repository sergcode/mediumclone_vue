<template>
  <ul class="error-messages">
    <!-- v-for не работает без :key -->
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    /** Мы хотим сказать, что на вход мы ожидаем получить validationErrors поле
        и что тип у этого поля должен быть Object
     */
    validationErrors: {
      type: Object,
      required: true // Без этого поля ничего не работает
    }
  },

  /** Если нужно вычислить какие-то новые переменные на основании других,
   * которые у нас уже есть - это отличный use case для computed property
   */
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        // Object.keys - вернет нам email, password и username
        const messages = this.validationErrors[name].join(', ')

        return `${name} ${messages}`
      })
    }
  }
}
</script>
