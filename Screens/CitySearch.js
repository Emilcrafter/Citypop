import * as React from 'react';
import SearchScreen from '../Components/SearchScreen';
import {StyleSheet} from 'react-native';


/**
 * The search window used for instant searches of cities.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @returns {SearchScreen} Search window with a TextInput search bar and a submit button
 */

export default function CitySearch({ navigation }){
    //Returns SearchScreen component with props differentiating it from CountrySearch()
      return(
        <SearchScreen 
        style = {styles.standardView}
        searchLabel = {'City'}
        buttonText = {'Search by City'}
        buttonDestination = {"CitySearchResult"}
        navigation = {navigation}
        />
      )
    }
    const styles = StyleSheet.create({
        container : {
          paddingTop: 30
        },
        text : {
          fontSize : 20
        },
        standardView : { flex: 1, alignItems: 'center', justifyContent: 'center'}
      })
      
      