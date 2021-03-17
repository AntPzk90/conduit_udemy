<template>
  <div class="tag-list">
    <div v-if="isLoading">
      <mcv-loading></mcv-loading>
    </div>
    <div v-if="error">
      <mcv-error-message :message="error"></mcv-error-message>
    </div>
    <router-link
      class="tag-default tag-pill"
      v-for="tag in tags"
      :key="tag"
      :to="{name: 'tag', params: {slug: tag}}"
    >
      {{ tag }}
    </router-link>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/tags';
import {mapState} from 'vuex';
import McvLoading from '@/components/Loading';
import McvErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'McvTagList',
  components: {
    McvLoading,
    McvErrorMessage
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      tags: state => state.tags.data,
      error: state => state.tags.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags, {apiUrl: this.url});
  }
};
</script>
