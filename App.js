import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
} from 'react-native';

import { styles } from './style';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: []
    }
  }

  async componentDidMount() {
    try {
      await fetch('https://15euros.nl/api/bier_basic.php')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            content: responseJson
          });

          this.contentArray = responseJson;
        });
    }
    catch (error) {
      Alert.alert(
        'Connection Failed',
        'There is an error occured, try again later. Status: ' + error.status,
        [
          { text: 'OK' }
        ]
      );
    }
  }

  render() {
    return (
      <View style={styles.welcome}>
        <FlatList
          data={this.state.content}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <View style={styles.biertje}>
              <h5>Speciaalbiertje gegevens</h5>
              <Text>ID: {item.id}</Text>
              <Text>Naam: {item.naam}</Text>
              <Text>Brouwer: {item.brouwer}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Gisting: {item.gisting}</Text>
              <Text>Percentage: {item.perc}%</Text>
              <Text >Inkoopprijs: €{item.inkoop_prijs}</Text>
            </View>
          }
        />
      </View>
    );
  }
}