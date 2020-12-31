import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {SafeAreaView, Text, Button} from 'react-native'
export default function HomeScreen({navigation}){
    return(
        <SafeAreaView style= {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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