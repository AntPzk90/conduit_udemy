import tagsApi from '@/api/tags';

const state = {
  data: null,
  isLoading: false,
  errror: null
};

export const mutationTypes = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailure: '[tags] getTagsFailure'
};

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getTagsFailure](state) {
    state.isLoading = false;
  }
};

export const actionTypes = {
  getTags: '[Tags] getTags'
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
  [actionTypes.getTags](context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getTagsStart);
      tagsApi
        .getTags(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getTagsSuccess, response.data.tags);
          resolve(response.data);
        })
        .catch(result => {
          context.commit(mutationTypes.getTagsFailure);
          console.log(result);
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
