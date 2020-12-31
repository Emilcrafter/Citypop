import { SafeAreaView, Text } from "react-native";
import * as React from 'react';
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";


export default class CityListCountry extends React.Component{
    constructor(props){
        super(props);
        this.style = props.style;
        this.inputArray = props.inputArray;
        this.navigation = props.navigation;
        this.contentContainerStyle = props.contentContainerStyle;
    }
    
    render(){
        return(
        <SafeAreaView style={this.style}>
            <FlatList 
            data = {this.inputArray.map((item) => item)}
            key = {(item) => item.geonameID}
            renderItem={({item}) => (
            
            <TouchableHighlight onPress = {() => this.navigation.navigate( 
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
                backgroundColor: "aliceblue",
                key: 1,
                }}
                
                >
                <Text style ={{ 
                fontSize: 20,
                marginRight: 150,
                }}>{(item.name)}
                </Text>
                </SafeAreaView>
            </TouchableHighlight>
            )} 
            contentContainerStyle = {this.contentContainerStyle}
            keyExtractor = {(item) => item.geonameID}
            />
        </SafeAreaView>
)}}