import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

const CityListFromCountry = async () => {
  try{
    let response = await fetch(
      'http://api.geonames.org/searchJSON?q=london&username=weknowit'
    );
    let json = await response.json();
    let result = [json.geonames[0].name, json.geonames[0].population];
    return result;
  } catch(error){
    console.error(error);
    console.log('bruh');
  }
}

console.log(CityListFromCountry())

function CitiesScreen({ route, navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SearchBar/>
      <Text>Cities Screen</Text>
      <Button
  title="Go to Details... again"
  onPress={() => navigation.push('Cities')}
/>
    </View>
  )
}

function CityPop({ route, navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SearchBar/>
      <Text>Cities Screen</Text>
      <Button
  title="Go to Details... again"
  onPress={() => navigation.push('Cities')}
/>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}



