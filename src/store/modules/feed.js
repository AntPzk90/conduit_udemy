import feedApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  errror: null
};

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[fedd] getFeedFailure'
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  }
};

export const actionTypes = {
  getFeed: '[feed] getFeed'
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
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(result => {
          context.commit(mutationTypes.getFeedFailure);
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
