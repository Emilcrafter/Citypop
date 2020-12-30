import * as React from "react";
import {StatusBar} from 'expo-status-bar';
import { SafeAreaView, Text} from "react-native";

export default class PopulationScreen extends React.Component{

constructor(props){
    super(props);
    this.cityName = props.cityName;
    this.population = props.population;
    this.style = props.style;
    this.textStyle = props.textStyle;
}

render(){
    return(
        <SafeAreaView style={this.style}>
        <StatusBar></StatusBar>
        <Text style = {this.textStyle}>{this.cityName}</Text>
        <Text style = {this.textStyle}>Population</Text>
        <Text style = {this.textStyle}>{this.population}</Text>
      </SafeAreaView>)}}