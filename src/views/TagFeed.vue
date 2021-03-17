<template>
  <div class="home-page">
    <mcv-banner></mcv-banner>
    <div class=" container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName"></mcv-feed-toggler>
          <mcv-feed :api-url="apiUrl"></mcv-feed>
        </div>
        <div class="col-md-3"><mcv-popular-tags></mcv-popular-tags></div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed';
import McvPopularTags from '@/views/PopularTags';
import McvBanner from '@/components/Banner';
import McvFeedToggler from '@/components/FeedToggler';

export default {
  name: 'McvTagFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggler
  },
  data() {
    return {
      // apiUrl: '/articles/'
    };
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      const route = `/articles?tag=${this.tagName}`;
      return route;
    }
  }
};
</script>
