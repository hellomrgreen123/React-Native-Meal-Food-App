import React from 'react'

import {FlatList,StyleSheet,View} from 'react-native'
import MealItem from './MealItem'
import {useStore} from '../hooks/store'
const MealList =props=>{
    const [state,dispatch] = useStore()
    const favoriteMeals = state.favorites
    const renderMealItem = itemData=>{
        const isFavorite = favoriteMeals.some(meal=>meal.id === itemData.item.id)
        return(
           <MealItem title={itemData.item.title}  
           duration={itemData.item.duration}
           complexity={itemData.item.complexity}
           affordability ={itemData.item.affordability}
           image={itemData.item.imageUrl} 
           onSelectMeal={()=>{
               props.navigation.navigate({ routeName:'MealDetail',
            params:{
                mealId: itemData.item.id,
                meal:itemData.item,
                isFav:isFavorite

            }})
           }}/>
        
           )
    }
    
return(
    <View style={styles.list}>
    <FlatList data={props.displayMeals} 
     renderItem={renderMealItem} /> 
</View>)

}


const styles=StyleSheet.create({
    list:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

})

export default MealList