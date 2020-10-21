import { initStore } from "./store";

const favoritesStore = () => {
  const actions = {
    TOGGLE_FAV: (state, favorite) => {


      const existingIndex = state.favorites.findIndex((meal) => {
      
        if (meal.id === favorite.id) {
          return true;
        }
      });

      if (existingIndex >= 0) {
        console.log("removed");
        const updatedFavorites = [...state.favorites];
        updatedFavorites.splice(existingIndex, 1);
        return { favorites: updatedFavorites };
      } else {
        console.log("added");

  
        return { favorites: state.favorites.concat(favorite) };
      }
    },
  };
  initStore(actions, {
    favorites: [],
  });
};
export default favoritesStore;
