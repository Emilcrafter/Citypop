import * as React from 'react';
import {StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import ErrorScreen from './Components/ErrorScreen';
import CityListCountry from './Components/CityListCountry';
import HomeScreen from './Screens/HomeScreen';
import CitySearchResult from './Screens/CitySearchResult';
import CitySearch from './Screens/CitySearch';
import CountrySearch from './Screens/CountrySearch';
import Country from './Screens/Country';

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

