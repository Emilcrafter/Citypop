import * as React from "react";
import { SafeAreaView, Button, Text} from "react-native";

export default class ErrorScreen extends React.Component{

constructor(props){
    super(props);
    this.areaType = props.areaType;
    this.query = props.query;
    this.style = props.style;
    this.navigation = props.navigation;
}

render(){
    return(
<SafeAreaView style={this.style}>
          <Text style ={{ 
            fontSize: 20,
          }}>{"No " + this.areaType + " with the name " + this.query + " was found."}</Text>
              <Button 
              title="Go back"
              onPress={() => this.navigation.goBack()}
              />
  
      </SafeAreaView>)}}