import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput , StyleSheet, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react';




function HomeScreen({ navigation }){
  return(
    <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text>Home Screen</Text>
      <Button 
      title="Search by city"
      onPress={() => navigation.navigate('CitySearch')}
      />
    </View>
  )
}

function CitySearch({ navigation }){
  const [textInputValue, onChangeText] = React.useState('');
  return(
    <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text>Home Screen</Text>
      <TextInput
        style={{ width:300, height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        textInputValue={textInputValue}
    />
      <Button 
      title="Search by city"
      onPress={() => navigation.navigate('CitySearchResult', {textInputValue})}
      />
    </View>
  )
}




function CitySearchResult({ route, navigation }){
const [cityList, setCityList] = useState([]);  
  useEffect(()=> {
    var q = route.params.textInputValue;
    console.log(q);
    fetch(
      'http://api.geonames.org/searchJSON?username=weknowit&cities=cities1000&q=' + q)
      .then((response) => response.json())
      .then((json) => setCityList(json.geonames))
      .catch((error) => console.error(error))
    }, []);
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
      <Text>Cities Screen</Text>
      
      <FlatList 
      data = {cityList}
      renderItem={({item}) => (
        
        <TouchableHighlight onPress = {() => navigation.navigate( 
          "CityPop",
        {
          key: item.geonameID,
          cityName: item.name,
          population: item.population, 
        }
        
        )}>
          <View
          style = {{
            height: 50,
            backgroundColor: "aliceblue"
          }}
          
          >
          <Text style ={{ 
            fontSize: 20,
            marginRight: 150,
          }}>{(item.name)}</Text>
          </View>
        </TouchableHighlight>
      )} 
      contentContainerStyle = {styles.container}
      keyExtractor = {(item) => item.geonameID}
      />
    </View>
  )
}



function CityPop({ route, navigation }){
  console.log(route)
  return(
    <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text style = {styles.text}>{route.params.cityName}</Text>
      <Text style = {styles.text}>Population</Text>
      <Text style = {styles.text}>{route.params.population}</Text>
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
        name = "CitySearch" 
        component = {CitySearch}  
        options = {{title: "Search by city name"}}
        />
        <Stack.Screen 
        name = "CitySearchResult" 
        component = {CitySearchResult}  
        options = {{title: "Search results"}}
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
  },
  text : {
    fontSize : 20
  }
})

