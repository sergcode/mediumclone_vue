import followUserApi from '@/api/followUser'

export const actionTypes = {
  followUser: '[followUser] Follow user'
}

export const mutationTypes = {
  followUserStart: '[followUser] Follow user start',
  followUserSuccess: '[followUser] Follow user success',
  followUserFailure: '[followUser] Follow user failure'
}

const mutations = {
  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {}
}

const actions = {
  [actionTypes.followUser](context, {slug, isFollowed}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.followUserStart)
      const promise = isFollowed
        ? followUserApi.removeFromFollowUser(slug)
        : followUserApi.followUser(slug)
      promise
        .then(username => {
          context.commit(mutationTypes.followUserSuccess, username)
          resolve(username)
        })
        .catch(() => {
          context.commit(mutationTypes.followUserFailure)
        })
    })
  }
}

export default {
  actions,
  mutations
}
