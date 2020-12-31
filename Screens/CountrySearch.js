    import * as React from 'react';
    import SearchScreen from '../Components/SearchScreen';
    import {StyleSheet} from 'react-native';

    /**
     * The search window used for searches of top populated cities in a country.
     * 
     * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
     * @returns {SearchScreen} Search window with a TextInput search bar and a submit button
     */
    export default function CountrySearch({ navigation }){
      //Returns SearchScreen component with props differentiating it from CitySearch()
      return(
        <SearchScreen 
        style = {styles.standardView}
        searchLabel = {'Country'}
        buttonText = {'Search by Country'}
        buttonDestination = {"Country"}
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
      
      