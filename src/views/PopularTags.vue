<template>
  <div class="sidebar">
    <p>Popular Tags</p>

    <mcv-tag-list :url="apiUrl"></mcv-tag-list>
  </div>
</template>

<script>
import McvTagList from '@/components/TagList';

export default {
  name: 'MvcPopularTags',
  components: {
    McvTagList
  },
  data() {
    return {
      apiUrl: '/tags'
    };
  }
};
</script>
