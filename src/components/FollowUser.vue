<template>
  <button
    @click="followUser"
    :class="{
      btn: true,
      'btn-sm': true,
      'action-btn': true,
      'btn-outline-secondary': !isFollowedOptimistic,
      'btn-secondary': isFollowedOptimistic
    }"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ followedToggleText }}
  </button>
</template>

<script>
// import {mapState, mapGetters} from 'vuex'
import {actionTypes} from '@/store/modules/followUser'

export default {
  name: 'McvFollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    followedToggleText(el) {
      if (this.isFollowedOptimistic) {
        return (el.isFollowedOptimisticText = `Unfollow Serge`)
      } else {
        return (el.isFollowedText = `Follow Serge`)
      }
    }
  },
  data() {
    return {
      isFollowedOptimistic: this.isFollowed,
      isFollowedOptimisticText: this.isFollowed
    }
  },
  methods: {
    followUser() {
      this.$store.dispatch(actionTypes.followUser, {
        isFollowed: this.isFollowedOptimistic
      })
      if (this.isFollowedOptimistic) {
        this.isFollowedOptimisticText = `Unfollow Serge`
      } else {
        this.isFollowedOptimisticText = `Follow Serge`
      }
      this.isFollowedOptimistic = !this.isFollowedOptimistic
    }
  }
}
</script>
