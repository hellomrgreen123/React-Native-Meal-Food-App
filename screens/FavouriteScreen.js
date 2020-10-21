import React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useStore} from '../hooks/store'
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText"
import {View, StyleSheet} from 'react-native'
const FavouritesScreen = (props) => {

  const [state,dispatch] = useStore()
 const displayMeals = state.favorites

  if(displayMeals.length === 0 ){
    return<View style={styles.content}>
      <DefaultText>No meals found</DefaultText>
      <DefaultText>Please add some meals to your favorites</DefaultText>
    </View>
  }
  return <MealList displayMeals={displayMeals} navigation={props.navigation} />;
};
FavouritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favourites",
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
  };
};

const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default FavouritesScreen;
