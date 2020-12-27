import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView, TextInput, Button, Text } from "react-native";

export default class SearchScreen extends React.Component{
    constructor(searchlabel, text, textInputValue, buttonText, buttonDestination, navigation){
        super();
        this.searchlabel = searchlabel;
        this.text = text;
        this.textInputValue = textInputValue;
        this.buttonText = buttonText;
        this.buttonDestination = buttonDestination;
        this.navigation = navigation;
    }
    render(){
        return(
    <SafeAreaView style={styles.standardView}>
      <StatusBar></StatusBar>
      <Text>{this.searchlabel}</Text>
      <SafeAreaView height = {50}></SafeAreaView>
      <TextInput
        style={{ width:300, height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        textInputValue={this.textInputValue}
        onSubmitEditing={() => this.navigation.navigate(this.buttonDestination, this.textInputValue)}
    />
      <Button 
      title={this.buttonText}
      onPress={() => this.navigation.navigate(this.buttonDestination, this.textInputValue)}
      />
    </SafeAreaView>
    )}}