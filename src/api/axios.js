/** Axios - нужен как wrapper вокруг библы axios, зачем это нужно?
 * 1. Хотим сконфигурировать Axios, т.е. добавить туда base url и потом позже мы захотим добавить туда токен пользователя,
 * т.е. нам выгодно сделать какую-то прослойку, которую мы можем конфигурировать
 * */

import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

/** INTERCEPTORS - это что-то по середине между началом отправки запроса и
 * реальной отправкой запроса на наш api и это отличная штука например для
 * прикрепления Токина каждый раз, каждому запросу  **/
axios.interceptors.request.use(config => {
  /** Мы читает Токен из localStorage. Для этого ы вызываем getItem и на вход передаем 'accessToken' как строку.
   * В этом случае есть 3 варианта:
   * 1. Это NULL - это если в localStorage ничего нет.
   * 2. Валидный accessToken
   * 3. Не валидный accessToken.
   * В принципе нас не интересует разница между валидный или не валидный accessToken. Мы просто пихаем его в header (который находится в config) и его валидирует бэкенд.
   * Единственное, что нам нужно сделать это передавать строку вида "Token iuiuioYghsdmm <= сам токен".
   * Если у нас Токена нет, то мы просто передаем пустую строку. **/

  const token = getItem('accessToken')
  const authorizisationToken = token ? `Token ${token}` : ''

  /** Мы создали объект .headers мы создали новый ключ в объекте с именем Authorization и засунули туда нашу строку.
   * После чего вернули модифицированный конфиг "return config".
   * И это очень важно вернуть CONFIG, т.к. с ним дальше работает Axios */
  config.headers.Authorization = authorizisationToken

  /** Мы обязаны вернуть наш config.
   * CONFIG - это то что передается внутрь AXIOS и что генерирует AXIOS, чтобы сделать запрос.
   * И здесь мы можем как-то поменять и передать  CONFIG дальше, вот что INTERCEPTORS делает
   */
  return config
})

export default axios
