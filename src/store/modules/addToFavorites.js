import addToFavoritesApi from '@/api/addToFavorites';

export const mutationTypes = {
  addToFavoritesStart: '[addToFavoritesStart] Add ti favorites start',
  addToFavoritesSuccess: '[addToFavoritesStart] Add ti favorites success',
  addToFavoritesFailure: '[addToFavoritesStart] Add ti favorites failure'
};

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to Favorites'
};

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSiccess]() {},
  [mutationTypes.addToFavoritesFailure]() {}
};

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart);
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug);
      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure);
        });
    });
  }
};

export default {
  actions,
  mutations
};
