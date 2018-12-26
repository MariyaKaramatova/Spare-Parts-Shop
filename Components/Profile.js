import React, {Component} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, Button} from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.user.image }} />
        <Text>Username: {this.props.user.username}</Text>
        <Button title="Logout" onPress={this.props.logout}></Button>
        <Text>Favourite shops:</Text>        
        <FlatList
          horizontal={false}
          numColumns={3}
          data={this.props.shops.filter(shop => this.props.user.favouriteShops.indexOf(shop.id) !== -1)}
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