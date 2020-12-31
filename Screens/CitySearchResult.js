import * as React from 'react';
import  PopulationScreen  from "../Components/PopulationScreen";
import  ErrorScreen  from "../Components/ErrorScreen";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import {useEffect, useState} from 'react';

/**
 * Displays the population of a searched city, whether from CitySearch or from CountrySearch.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @param {Object} route passed from prior windows to make the function return the proper information
 * @returns {SafeAreaView} Displaying simple rows of text showing the amount of people living in a city
 */
export default function CitySearchResult({ route, navigation }){
    
 /**
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  * @param {*} string 
  * @returns {String} with escaped regexp characters so users will have a harder time 
  */
 function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
    //initializes states used for handling the API call
  const [cityList, setCityList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //skip the API call if it was already made in the Country window and a city was passed in the route
  if(route.params.population){
    //simply display the population of a city, as the app was designed to do
    return(
      <PopulationScreen
      cityName = {route.params.cityName}
      population = {route.params.population}
      style = {styles.standardView}
      textStyle = {styles.text}
      />
    )
  }
  var q = escapeRegExp(route.params.textInputValue.trim());
  useEffect(()=> {
    console.log(q);
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
        <SafeAreaView style={styles.standardView}>
          <ActivityIndicator/>
        </SafeAreaView>
      )
    }
    //if it's not still loading, starts to handle the response to display its information as per the specification
    else{
      //gets the most populous (probably) city with the best matching name in the search
      var firstElem = cityList.map((item) => item.name)[0];
      //if there was even anything received from the search, checks if the name matches what the user did input
      if(firstElem){
        var valid = (q) => {return(firstElem.toLowerCase() === q.toLowerCase())};
        console.log(q + "fdsfd")
    //initializes a constant "population" which is exactly what you'd think
    const population = cityList.map((item) => item.population)[0];
        //if the search result matched the search term, display the population count for the searched city
      if(valid(q))
      {
        return(
          <PopulationScreen
          cityName = {firstElem}
          population = {population}
          style = {styles.standardView}
          textStyle = {styles.text}
          />
      )}
      else{
        console.log(q)
        return(
          <ErrorScreen
          areaType = {"city"}
          query = {q}
          style = {styles.standardView}
          navigation = {navigation}
          />
        )
      }
        }
  //if it didn't, show the user an error message on screen and prompt them to try searching again
  else{

    return(
      <ErrorScreen
      areaType = {"city"}
      query = {q}
      style = {styles.standardView}
      navigation = {navigation}
      />
    )
  }
  }

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
  