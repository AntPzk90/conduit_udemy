import userProfileApi from '@/api/userProfile';

const state = {
  data: null,
  isLoading: false,
  errror: null
};

export const mutationTypes = {
  getUserProfileStart: '[UserProfile] getUserProfileStart',
  getUserProfileSuccess: '[UserProfile] getUserProfileSuccess',
  getUserProfileFailure: '[UserProfile] getUserProfileFailure'
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    console.log(payload);
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false;
  }
};

export const actionTypes = {
  getUserProfile: '[UserProfile] UserProfile'
};

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileStart);
      userProfileApi
        .getUserProfile(slug)
        .then(response => {
          console.log(response);
          context.commit(mutationTypes.getUserProfileSuccess, response);
          resolve(response.data);
        })
        .catch(result => {
          context.commit(mutationTypes.getUserProfileFailure);
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
