import React, { Component } from 'react';
import { Text, View, Image, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class Home extends Component {
  state = {
    columns: 1
  }

  componentWillMount() {
    this.props.getShops();
  }

  getStyle() {
    if(this.state.columns === 1) {
      return styles.listItem1;
    } else if(this.state.columns === 2) {
      return styles.listItem2;
    } else if(this.state.columns === 3) {
      return styles.listItem3;
    }
  }

  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="1" onPress={() => this.setState({ columns: 1 })} />
          </View>
          <View style={styles.button}>
            <Button title="2" onPress={() => this.setState({ columns: 2 })} />
          </View>
          <View style={styles.button}>
            <Button title="3" onPress={() => this.setState({ columns: 3 })} />
          </View>
        </View>
        <FlatList
          key={this.state.columns}
          horizontal={false}
          numColumns={this.state.columns}
          data={this.props.shops}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {shop: item})}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: item.image }} />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex'
  }
});