import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView, TextInput, Button, Text } from "react-native";

export default class SearchScreen extends React.Component{
    constructor(props){
      console.log(props)
        super(props);
        this.searchlabel = props.searchlabel;
        this.buttonText = props.buttonText;
        this.buttonDestination = props.buttonDestination;
        this.navigation = props.navigation;
        this.style = props.style;
        this.state = {textInputValue: ""};
    }

    render(){
    return(
    <SafeAreaView style={this.style}>
      <StatusBar></StatusBar>
      <Text>{this.searchlabel}</Text>
      <SafeAreaView height = {50}></SafeAreaView>
      <TextInput
        style={{ width:300, height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={ (text) => {this.setState({textInputValue: text}); console.log(this.state.textInputValue)}}
        textInputValue={this.state.textInputValue}
        onSubmitEditing={() => this.navigation.navigate(this.buttonDestination, this.state.textInputValue)}
    />
      <Button 
      title= {this.buttonText}
      onPress={() => this.navigation.navigate(this.buttonDestination, {textInputValue : this.state.textInputValue})}
      />
    </SafeAreaView>
    )}}