/** Сюда мы пишем абсолютно все методы, которые работают с сущностью Feed **/
import axios from '@/api/axios'

/** Дальше создаем метод getFeed.
 * И мы знаем для того, чтобы зафетчить фид нам необходимо передать сюда apiUrl
 * И это будет та apiUrl которую мы пердали из нашего парента **/
const getFeed = apiUrl => {
  return axios.get(apiUrl)

  /** Почему это хорошо? По факту наш фид вообще ничего не знает об apiUrl и
   * просто фетчит её. И мы уверены в том, что все данные в респонсив будут выглядеть одинаково,
   * соответственной мы можем их сохранить и использовать **/
}

export default {
  getFeed
}
