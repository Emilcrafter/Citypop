import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Text, View, Button, TextInput , StyleSheet, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';




function HomeScreen({ navigation }){
  return(
    <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
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
function CitySearch({ navigation }){
  const [textInputValue, onChangeText] = React.useState('');
  return(
    <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text>City Search</Text>
      <SafeAreaView height = {50}></SafeAreaView>
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
    </SafeAreaView>
  )
}

function CountrySearch({ navigation }){
  const [textInputValue, onChangeText] = React.useState('');
  return(
    <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar></StatusBar>
      <Text>Country Search</Text>
      <SafeAreaView height = {50}></SafeAreaView>
      <TextInput
        style={{ width:300, height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        textInputValue={textInputValue}
        onSubmitEditing={() => navigation.navigate('Country', {textInputValue})}
    />
      <Button 
      title="Search by country"
      onPress={() => navigation.navigate('Country', {textInputValue})}
      />
    </SafeAreaView>
  )
}




function CitySearchResult({ route, navigation }){
const [cityList, setCityList] = useState([]);
const [isLoading, setLoading] = useState(true);
if(route.params.population){
  return(
    <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
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
      .then((response) => response.json())
      .then((json) => setCityList(json.geonames))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
    }, []);
    if(isLoading){
      return(
        <SafeAreaView style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator/>
        </SafeAreaView>
      )
    }
    else{

      var firstElem = cityList.map((item) => item.name)[0];
      var valid = (q) => {return(firstElem.toLowerCase() === q.toLowerCase())};
    

    const population = cityList.map((item) => item.population)[0];
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
  else{
    return(
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

function Country({ route, navigation }){
  const [cityList, setCityList] = useState([]); 
  const [isLoading, setLoading] = useState(true);
  var q = route.params.textInputValue.trim();
    useEffect(()=> {
      console.log(q);
      fetch(
        'http://api.geonames.org/searchJSON?username=weknowit&cities=cities1000&q=' + q)
        .then((response) => response.json())
        .then((json) => setCityList(json.geonames))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
      }, []);
      if(isLoading){
        return(
          <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator></ActivityIndicator>
          </SafeAreaView>
        )
      }
      else{
      var purgedList = cityList.map((item) => {
        if(item.countryName.toLowerCase() === q.toLowerCase()){
          return(item)
        }
        else{
          console.log(item.countryName)
          return(null)
        }
      })
      purgedList = purgedList.filter((item) => {return(item != null)}).sort((i1, i2) => i2.population-i1.population);
      const firstElem = purgedList.map((item) => item.countryName)[0];
      var valid = (q) => {return(q === firstElem)}
      if(valid(q)){
        return(
          <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
        else{
          return(
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
        name = "CitySearchResult" 
        component = {CitySearchResult}  
        options = {{title: "Search results"}}
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

