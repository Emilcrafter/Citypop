import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput , StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import SearchScreen from './SearchScreen';




/**
 * The first window in the Stack, with navigation buttons to access search windows.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @returns {SafeAreaView} Home screen with navigation buttons
 */
function HomeScreen({ navigation }){
  return(
    <SafeAreaView style={styles.standardView}>
      <StatusBar></StatusBar>
      <Text>Home Screen</Text>
      <Button 
      title="Search by city"
      onPress={() => navigation.navigate('CitySearch')}
      />
            <Button 
      title="Search by country"
      onPress={() => navigation.navigate('CountrySearch')}
      />
    </SafeAreaView>
  )
}
/**
 * The search window used for instant searches of cities.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @returns {SearchScreen} Search window with a TextInput search bar and a submit button
 */
function CitySearch({ navigation }){
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
/**
 * The search window used for searches of top populated cities in a country.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @returns {SearchScreen} Search window with a TextInput search bar and a submit button
 */
function CountrySearch({ navigation }){
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



/**
 * Displays the population of a searched city, whether from CitySearch or from CountrySearch.
 * 
 * @param {*} navigation object passed to keep track of navigation state in NavigationContainer
 * @param {Object} route passed from prior windows to make the function return the proper information
 * @returns {SafeAreaView} Displaying simple rows of text showing the amount of people living in a city
 */
function CitySearchResult({ route, navigation }){
  //initializes states used for handling the API call
const [cityList, setCityList] = useState([]);
const [isLoading, setLoading] = useState(true);
//skip the API call if it was already made in the Country window and a city was passed in the route
if(route.params.population){
  //simply display the population of a city, as the app was designed to do
  return(
    <SafeAreaView style={styles.standardView}>
    <StatusBar></StatusBar>
    <Text style = {styles.text}>{route.params.cityName}</Text>
    <Text style = {styles.text}>Population</Text>
    <Text style = {styles.text}>{route.params.population}</Text>
  </SafeAreaView>
  )
}
var q = route.params.textInputValue.trim();
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
    //initializes a constant "population" which is exactly what you'd think
    const population = cityList.map((item) => item.population)[0];
        //if the search result matched the search term, display the population count for the searched city
      if(valid(q))
      {
        return(
          <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
            <StatusBar></StatusBar>
            <Text style = {styles.text}>{firstElem}</Text>
            <Text style = {styles.text}>Population</Text>
            <Text style = {styles.text}>{population}</Text>
          </SafeAreaView>
      )}
        }
  //if it didn't, show the user an error message on screen and prompt them to try searching again
  else{
    return(
      <SafeAreaView style={styles.standardView}>
          <Text style ={{ 
            fontSize: 20,
          }}>{"No city with the name " + q + " was found."}</Text>
              <Button 
              title="Return to search"
              onPress={() => navigation.goBack()}
              />
  
      </SafeAreaView>
    )
  }
  }

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
  var q = route.params.textInputValue.trim();
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
          <SafeAreaView style={styles.standardView}>
            <FlatList 
            data = {purgedList.map((item) => item)}
            key = {(item) => item.geonameID}
            renderItem={({item}) => (
              
              <TouchableHighlight onPress = {() => navigation.navigate( 
                "CitySearchResult",
              {
                key: (item) => item.geonameID,
                cityName:  item.name,
                population: item.population, 
              }
              
              )}>
    
                <SafeAreaView
                style = {{
                  height: 50,
                  backgroundColor: "aliceblue"
                }}
                
                >
                <Text style ={{ 
                  fontSize: 20,
                  marginRight: 150,
                }}>{(item.name)}</Text>
                </SafeAreaView>
              </TouchableHighlight>
            )} 
            contentContainerStyle = {styles.container}
            keyExtractor = {(item) => item.geonameID}
            />
          </SafeAreaView>
        )}
              }
        else{
          //if it wasn't a valid search, displays an error message to the user ant promt them to search again
          return(
            <SafeAreaView style={styles.standardView}>
                <Text style ={{ 
                  fontSize: 20,
                }}>{"No country with the name " + q + " was found."}</Text>
                    <Button 
                    title="Return to search"
                    onPress={() => navigation.goBack()}
                    />
    
            </SafeAreaView>
    
    
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
        options = {({ route }) => ({title: route.params.textInputValue})}
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

