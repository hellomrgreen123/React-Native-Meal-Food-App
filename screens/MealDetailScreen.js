import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import HeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import { useStore } from "../hooks/store";

const MealDetailScreen = (props) => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    props.navigation.setParams(
      {
        toggle: toggleFav,
      },
    );
  }, [toggleFav]);

  

  const mealId = props.navigation.getParam("mealId");
  const meal = props.navigation.getParam("meal");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  let  currentMealIsFavorite=state.favorites.some(meal=> meal.id=== mealId)
  console.log(currentMealIsFavorite)
  const toggleFav = () => {
    dispatch("TOGGLE_FAV", selectedMeal);
  };
3

useEffect(()=>{
  props.navigation.setParams({isFav:currentMealIsFavorite})

},[currentMealIsFavorite])
  const ingredientsList = meal.ingredients.map((ingredient, index) => {
    return <DefaultText key={index}>{ingredient}</DefaultText>;
  });
  const stepsList = meal.steps.map((step, index) => {
    return <DefaultText key={index}> {step}</DefaultText>;
  });
  return (
    <>
      <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
        <ImageBackground source={{ uri: meal.imageUrl }} style={styles.bgImage}>
          <View style={styles.titleContainer}>
            <Text style={{ ...styles.title, color: "white" }} numberOfLines={1}>
              {" "}
              {meal.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
        <DefaultText> {meal.duration}m </DefaultText>
        <DefaultText> {meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText> {meal.affordability.toUpperCase()}</DefaultText>
      </View>
      <ScrollView style={styles.mealItem}>
        <View style={{ ...styles.ingredients, ...styles.mealDetail }}>
          <Text style={styles.title}>Ingredients</Text>
          {ingredientsList}
          <Text style={styles.title}> Steps </Text>
          {stepsList}
        </View>

        <View style={{ ...styles.mealDetail, margin: 10 }}>
          <Text>{selectedMeal.title}</Text>

          <Button
            title="Go Back to Categories"
            onPress={() => {
              props.navigation.navigate({
                routeName: "Categories"})
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const isFavorite = navigationData.navigation.getParam('isFav');
  console.log(isFavorite)
  console.log('isFavorite')
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favourite"
          iconName={isFavorite ? 'ios-star': 'ios-star-outline'}
          onPress={navigationData.navigation.getParam("toggle")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    width: "100%",
  },
  mealItem: {
    width: "100%",

    borderRadius: 10,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredients: {
    width: "90%",
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
