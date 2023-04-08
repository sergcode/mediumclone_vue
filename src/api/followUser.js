import axios from '@/api/axios'

const getUrl = slug => `/profiles/${slug}/follow`

const followUser = slug => {
  const url = getUrl(slug)
  console.log(url)
  return axios.post(url, {}).then(response => response.data.profile)
}

const removeFromFollowUser = slug => {
  const url = getUrl(slug)
  return axios.delete(url).then(response => response.data.profile)
}

export default {
  followUser,
  removeFromFollowUser
}
