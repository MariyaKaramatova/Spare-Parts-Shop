import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import call from 'react-native-phone-call';

export default class Details extends Component {
  openMapLink(lat, lng, label) {
    let scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    let latLng = `${lat},${lng}`;
    let url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url); 
  }
  
  render() {
    let shop = this.props.navigation.state.params.shop;
    return (
      <View>
        <Text>{shop.title}</Text>
        <TouchableOpacity onPress={() => this.props.toggleFavouriteShop(shop.id)}>
          <Text>{this.props.favouriteShops.indexOf(shop.id) !== -1 ? '♥' : '♡'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => call({ number: shop.phone, prompt: true })}>
          <Text>{shop.phone}</Text>
        </TouchableOpacity>
        <View>
          <Text>Categories:</Text>
          {(shop.categories || []).map((cat, index) => 
            <Text key={index}>{cat}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => this.openMapLink(shop.latitude, shop.longitude, shop.title)}>
          <Text>{shop.address}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(shop.website)}><Text>{shop.website}</Text></TouchableOpacity>
      </View>
    );
  }
}