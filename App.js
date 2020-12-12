import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchBar = () => {
  const [value, onChangeText] = React.useState('');

  return(
    <TextInput
    style={{ width:300, height: 50, borderColor: 'gray', borderWidth: 1}}
    onChangeText={text => onChangeText(text)}
    value={value}
    />
  )
}

function HomeScreen({ navigation }){
  return(
    <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text>Home Screen</Text>
      <Button 
      title="Search by city"
      onPress={() => navigation.navigate('Cities')}
      />
    </View>
  )
}



/* 
const CityListFromCountry = async () => {
  try{
    let response = await fetch(
      'http://api.geonames.org/searchJSON?q=london&username=weknowit'
    );
    let json = await response.json();
    var items = [];
    console.log(Object.keys(json.geonames).length);
    for(var i = 0; i < Object.keys(json.geonames).length; i++){
      items[i] = <li>json.geonames[i].name</li>;
    }
    console.log(items[0]);
    return items;
  } catch(error){
    console.error(error);
    console.log('bruh');
  }
}
*/
///console.log(<CityListFromCountry></CityListFromCountry>)




function CitiesScreen({ route, navigation }){
const [cityList, setCityList] = useState([]);  
  useEffect(()=> {
    fetch(
      'http://api.geonames.org/searchJSON?q=london&username=weknowit')
      .then((response) => response.json())
      .then((json) => setCityList(json.geonames))
      .catch((error) => console.error(error))
    }, []);
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SearchBar/>
      <Text>Cities Screen</Text>
      <FlatList 
      data = {cityList}
      renderItem={({item}) => (
        <Text>{item.name}</Text>
      )} 
      contentContainerStyle = {styles.container}
      keyExtractor = {(item) => item.geonameID}
      />
      
      <Button
  title="Go to City list"
  onPress={() => navigation.push('CityPop')}
/>
    </View>
  )
}

  

function CityPop({ route, navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

    </View>
  )
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
        name = "Cities" 
        component = {CitiesScreen}  
        options = {{title: "Search by city name"}}
        />
        <Stack.Screen 
        name = "CityPop" 
        component = {CityPop}  
        options = {{title: "Population"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container : {
    paddingTop: 30
  }
})

