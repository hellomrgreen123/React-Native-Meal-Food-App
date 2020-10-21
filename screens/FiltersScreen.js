import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  FlatList,
} from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Item } from "react-navigation-header-buttons";
import Colors from "../Constants/Colors";
import FilterSwitch from "../components/FilterSwitch";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import {useStore} from "../hooks/store"
const FilterScreen = (props) => {

  const [state,dispatch]= useStore();

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree: isGlutenFree,
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
    };
    dispatch( 'SAVE_FILTER', appliedFilters)
    
    ;
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    props.navigation.setParams({
      save: saveFilters,
    },console.log);
  }, [saveFilters]);

  return (
    <>
      <View style={styles.screen}>
        <Text style={styles.title}>Available Filters/ Restrictions</Text>
        <FilterSwitch
          label={"Gluten Free"}
          state={isGlutenFree}
          onChange={() => setIsGlutenFree(!isGlutenFree)}
        />
        <FilterSwitch
          label={"Vegan"}
          state={isVegan}
          onChange={() => setIsVegan(!isVegan)}
        />
        <FilterSwitch
          label={"Vegetarian"}
          state={isVegetarian}
          onChange={() => setIsVegetarian(!isVegetarian)}
        />
        <FilterSwitch
          label={"Lactose Free"}
          state={isLactoseFree}
          onChange={() => setIsLactoseFree(!isLactoseFree)}
        />
      </View>
    </>
  );
};
FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filters Screen",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (

      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 0.5,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 22,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
});

export default FilterScreen;
