import axios from '@/api/axios'

/** Нормалайзер - это мы нормализируем для фронтэенда данные превращая их в тот вид в который нам удобно  */
const getPopularTags = () => {
  return axios.get('/tags').then(response => response.data.tags)
}

export default {
  getPopularTags
}
