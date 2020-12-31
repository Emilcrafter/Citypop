import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput , StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import SearchScreen from './Components/SearchScreen';
import ErrorScreen from './Components/ErrorScreen';
import PopulationScreen from './Components/PopulationScreen';
import CityListCountry from './Components/CityListCountry';
import HomeScreen from './Screens/HomeScreen';
import CitySearchResult from './Screens/CitySearchResult';
import CitySearch from './Screens/CitySearch';
import CountrySearch from './Screens/CountrySearch';


/**
 * The first window in the Stack, with navigation buttons to access search windows.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @returns {SafeAreaView} Home screen with navigation buttons
 */

 /**
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  * @param {*} string 
  * @returns {String} with escaped regexp characters so users will have a harder time 
  */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}




/**
 * The result window for country searches.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @param {Object} route passed from prior windows to make the function return the proper information
 * @returns {SafeAreaView} With a FlatList displaying the cities of a country in descending order of population
 */
function Country({ route, navigation }){
  //Initializes the states used for handling the API call
  const [cityList, setCityList] = useState([]); 
  const [isLoading, setLoading] = useState(true);
  console.log(route)
  //Removes whitespace around user input to avoid unnecessary errors
  var q = escapeRegExp(route.params.textInputValue.trim());
    useEffect(()=> {
      //Requests a JSON response from the geonames API with a pre-written query(?) ending with a dynamic search term
      fetch(
        'http://api.geonames.org/searchJSON?username=weknowit&cities=cities1000&q=' + q)
        //.then() waits until the response has arrived, since it does not happen instantly
        .then((response) => response.json())
        //sets the state of cityList to json.geonames, which is the only child of the response JSON
        .then((json) => setCityList(json.geonames))
        //if there was an error, print it to the console
        .catch((error) => console.error(error))
        //after the response has been handled and placed into a program variable, the isLoading state is set to false
        .finally(() => setLoading(false))
      }, []);
      //conditional used to display a loading animation while the fetch has not yet delivered on its promised response
      if(isLoading){
        return(
          <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator></ActivityIndicator>
          </SafeAreaView>
        )
      }
      //if it's not still loading, starts to handle the response to display its information as per the specification
      else{
        //Array.map used to weed out cities that are not located in the country that was searched for by the user
      var purgedList = cityList.map((item) => {
        //if the country the city is located in and the user's input are the same, return the city
        if(item.countryName.toLowerCase() === q.toLowerCase()){
          return(item)
        }
        //if there is a spelling error or invalid country searched for, return a null element
        else{
          return(null)
        }
      })
      //deletes null elements from the list and sorts cities by their population size
      purgedList = purgedList.filter((item) => {return(item != null)}).sort((i1, i2) => i2.population-i1.population);
      //gets the city with the biggest population in the country into a constant
      const firstElem = purgedList.map((item) => item.countryName)[0];
      //if there is a first element, checks if that element is actually from the specified country in case of bugs
      if(firstElem){
      var valid = (q) => {return(q.toLowerCase() === firstElem.toLowerCase())}
      //if it was actually a valid element, display all of purgedList, allowing users to press each city as a button and get sent to another window
      if(valid(q)){
        return(
          <CityListCountry
          style = {styles.standardView}
          inputArray = {purgedList}
          navigation = {navigation}
          contentContainerStyle = {styles.container}
          />
        )}
              }
        else{
          //if it wasn't a valid search, displays an error message to the user ant promt them to search again
          return(
            <ErrorScreen
            areaType = {"country"}
            query = {q}
            style = {styles.standardView}
            navigation = {navigation}
            />
    
    
          )
        }
}
}

  
  


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name = "Home"
         component = {HomeScreen}
         options = {{ title: 'Overview'}}
         />
        <Stack.Screen 
        name = "CitySearch" 
        component = {CitySearch}  
        options = {{title: "Search by city name"}}
        />
        <Stack.Screen 
        name = "CountrySearch" 
        component = {CountrySearch}  
        options = {{title: "Search by country name"}}
        />        
        <Stack.Screen 
        name = "Country" 
        component = {Country}  
        options = {{title: "Search results"}}
        />
        <Stack.Screen 
        name = "CitySearchResult" 
        component = {CitySearchResult}  
        options = {{title: "Search results"}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
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

