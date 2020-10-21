import React from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";

import MealList from "../components/MealList";
import {View, StyleSheet} from 'react-native'
import { useStore } from "../hooks/store";
import DefaultText from "../components/DefaultText";

const CatergoriesMealScreen = (props) => {
  const [state, dispatch] = useStore();

  const catId = props.navigation.getParam("catergoryId");

  let displayMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

if(state.isFiltersOn){
 displayMeals = displayMeals.filter((meal) => {
    return (
      meal.isGlutenFree == state.filters.isGlutenFree &&
      meal.isLactoseFree === state.filters.isLactoseFree &&
      meal.isVegan === state.filters.isVegan &&
      meal.isVegetarian === state.filters.isVegetarian
    );
  });}

  if(displayMeals.length === 0 ){
    return<View style={styles.content}>
      <DefaultText>No meals found, change your filters</DefaultText>
    </View>
  }
  return (
    <MealList displayMeals={displayMeals} navigation={props.navigation} />
  );
};

CatergoriesMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("catergoryId");

  const selectedCatergory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCatergory.title,
  };
};

const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});


export default CatergoriesMealScreen;
