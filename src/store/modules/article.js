import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null
};

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure'
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
    state.error = true;
  },

  [mutationTypes.deleteArticleStart]() {
    console.log('start');
  },
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {}
};

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle'
};

// export const getterTypes = {
//   currentUser: '[auth] currentUser'
// };

// const getters = {
//   [getterTypes.currentUser]: state => {
//     return state.currentUser;
//   }
// };

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart, {slug});
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(result => {
          context.commit(mutationTypes.getArticleFailure);
          console.log(result);
        });
    });
  },
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteArticleStart, slug);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
  //getters
};
