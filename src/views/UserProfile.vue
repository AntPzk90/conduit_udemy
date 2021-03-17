<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            followUserButton
            <router-link
              v-if="isCurrentUserProfile"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{name: 'settings'}"
            >
              edit profile settings
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: {slug: userProfile.username}
                }"
                class="nav-link"
                :class="{active: routeName === 'userProfile'}"
                >My Posts</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{
                  name: 'userPropfileFavorites',
                  params: {slug: userProfile.username}
                }"
                class="nav-link"
                :class="{active: routeName === 'userPropfileFavorites'}"
                >Favorites Posts</router-link
              >
            </li>
          </ul>
        </div>
        <mcv-feed :api-url="apiUrl" class="col-xs-12 col-md-10 offset-md-1"
          >"></mcv-feed
        >
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import McvFeed from '@/components/Feed';

export default {
  name: 'McvUserProfile',
  components: {
    McvFeed
  },
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      error: state => state.userProfile.error,
      userProfile: state => state.userProfile.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `articles?favorited=${this.userprofileSlug}`
        : `/articles?author=${this.userprofileSlug}`;
    },
    userprofileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    userprofileSlug() {
      this.fetchUserProfile();
    }
  },
  methods: {
    fetchUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userprofileSlug
      });
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>
