<template>
  <div>
    <mcv-loading v-if="isLoading"></mcv-loading>
    <mcv-article-form
      v-else
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-Submittiong="isSubmitting"
      @articleSubmit="inSubmit"
    ></mcv-article-form>
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/editArticle';
import McvLoading from '@/components/Loading';

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      article: state => state.editArticle.article,
      isLoading: state => state.editArticle.isLoading
    }),
    initialValues() {
      if (!this.article) {
        return {
          title: '',
          description: '',
          body: '',
          tagList: []
        };
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.bodycy,
        tagList: this.article.tagList
      };
    }
  },
  methods: {
    inSubmit(articleInput) {
      let slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, {slug, articleInput})
        .then(article => {
          this.$router.push({name: 'article', params: {slug: article.slug}});
        });
      console.log('submitValue', articleInput);
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    });
  }
};
</script>
