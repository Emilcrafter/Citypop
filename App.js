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
            <Button 
      title="Search by country"
      onPress={() => navigation.navigate('CountrySearch')}
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
        onSubmitEditing={() => navigation.navigate('CitySearchResult', {textInputValue})}
    />
      <Button 
      title="Search by city"
      onPress={() => navigation.navigate('CitySearchResult', {textInputValue})}
      />
    </View>
  )
}

function CountrySearch({ navigation }){
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
      title="Search by country"
      onPress={() => navigation.navigate('Country', {textInputValue})}
      />
    </View>
  )
}




function CitySearchResult({ route, navigation }){
const [cityList, setCityList] = useState([]);  
var q = route.params.textInputValue.trim();
  useEffect(()=> {
    var q = route.params.textInputValue;
    console.log(q);
    fetch(
      'http://api.geonames.org/searchJSON?username=weknowit&cities=cities1000&q=' + q)
      .then((response) => response.json())
      .then((json) => setCityList(json.geonames))
      .catch((error) => console.error(error))
    }, []);
    const firstElem = cityList.map((item) => item.name)[0];
      var valid = (q) => {return(firstElem === q)};
  if(valid(q)){
    const population = cityList.map((item) => item.population)[0];
  return(
    /*
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
    */
   <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
   <StatusBar></StatusBar>
   <Text style = {styles.text}>{firstElem}</Text>
   <Text style = {styles.text}>Population</Text>
   <Text style = {styles.text}>{population}</Text>
 </View>
  )
}
else{
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style ={{ 
          fontSize: 20,
        }}>{"No city with the name " + q + " was found."}</Text>
            <Button 
            title="Return to search"
            onPress={() => navigation.goBack()}
            />

    </View>
  )
}
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
function Country({ route, navigation }){
  const [cityList, setCityList] = useState([]); 
  var q = route.params.textInputValue.trim();
    useEffect(()=> {
      console.log(q);
      fetch(
        'http://api.geonames.org/searchJSON?username=weknowit&cities=cities1000&q=' + q)
        .then((response) => response.json())
        .then((json) => setCityList(json.geonames))
        .catch((error) => console.error(error))
      }, []);
      const firstElem = cityList.map((item) => item.countryName)[0];
      var valid = (q) => {return(firstElem === q)};
        console.log(valid(q))
    if(valid(q)){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList 
        data = {cityList.map((item) => item)}
        key = {(item) => item.geonameID}
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
    )}
    else{
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style ={{ 
              fontSize: 20,
            }}>{"No country with the name " + q + " was found."}</Text>
                <Button 
                title="Return to search"
                onPress={() => navigation.goBack()}
                />

        </View>


      )
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
        name = "CitySearchResult" 
        component = {CitySearchResult}  
        options = {{title: "Search results"}}
        />
        <Stack.Screen 
        name = "CityPop" 
        component = {CityPop}  
        options = {{title: "Population"}}
        />
        <Stack.Screen 
        name = "Country" 
        component = {Country}  
        options = {({ route }) => ({title: route.params.textInputValue})}
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

