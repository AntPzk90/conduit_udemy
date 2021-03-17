<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOpimistic,
      'btn-outline-primary': !isFavoritedOpimistic
    }"
  >
    <i class="ion-heart"></i>
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites.js';

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOpimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOpimistic
      });
      if (this.isFavoritedOpimistic) {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1;
      } else {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1;
      }
      this.isFavoritedOpimistic = !this.isFavoritedOpimistic;
    }
  }
};
</script>
