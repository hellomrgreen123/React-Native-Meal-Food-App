import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import Colors from "../Constants/Colors";

const FilterSwitch = (props) => {
  return (
    <View style={{...styles.filterContainer,...props.filterContainer}}>
      <Text style={{...styles.title, ...props.title}}>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : "white"}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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

export default FilterSwitch
