import React, { useCallback } from 'react'
import FilterSwitch from "../components/FilterSwitch";
import {StyleSheet} from "react-native"
import Colors from "../Constants/Colors";
import { useStore } from '../hooks/store';
const  ModalFilterSwitch =()=>{
    const [state, dispatch]=useStore()

    const toggleFilters=useCallback(()=>{

    dispatch('TOGGLE_FILTERS', state)
    })
    return  <FilterSwitch state={state.isFiltersOn} onChange={toggleFilters} filterContainer={styles.filterContainer} title={styles.title} label={"Filter"}/> 
      _
}

const styles = StyleSheet.create({
    title: {
      color:Colors.accentColor,
      fontFamily: "open-sans-bold",
      fontSize: 15,
      margin:0,
      marginLeft:15,
      textAlign: "center",
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      width: "100%",
    },
  });
  
  export default ModalFilterSwitch