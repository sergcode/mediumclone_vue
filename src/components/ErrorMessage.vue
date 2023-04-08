<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'McvErrorMessage',
  props: {
    message: {
      type: String,
      // false - значит, что сюда мы можем ничего не передавать, если у нас нет ошибки,
      // но тогда мы хотим вывести дефолтную ошибку. Если ничего не передали, то эта дефолтная строка будет использована.
      required: false,
      default: 'Something went wrong'
    }
  }
}
</script>
