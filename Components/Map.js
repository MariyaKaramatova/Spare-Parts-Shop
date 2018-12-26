import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text } from 'react-native';

export default class Map extends Component {
  state = { ready: false }

  render() {
    let { shops, favouriteShops, navigation } = this.props;
    let region = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }
    for (let i = 0; i < shops.length; i++) {
      region.latitude += shops[i].latitude;
      region.longitude += shops[i].longitude;
    }
    region.latitude /= shops.length;
    region.longitude /= shops.length;
    for (let i = 0; i < shops.length; i++) {
      let deltaLat = Math.abs(Math.abs(region.latitude) - Math.abs(shops[i].latitude));
      if (deltaLat > region.latitudeDelta) {
        region.latitudeDelta = deltaLat;
      }
      let deltaLon = Math.abs(Math.abs(region.longitude) - Math.abs(shops[i].longitude));
      if (deltaLon > region.longitudeDelta) {
        region.longitudeDelta = deltaLon;
      }
    }
    region.latitudeDelta *= 2;
    region.longitudeDelta *= 2;

    return (
      <MapView key={favouriteShops} style={styles.map} initialRegion={region} onLayout={() => { this.setState({ ready: true }) }}>
        {this.state.ready ? (shops.map(shop => (
          <Marker key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude
            }}
            pinColor={ favouriteShops.indexOf(shop.id) === -1 ? "linen" : "green"}
          >
            <Callout onPress={() => navigation.navigate('Details', {shop: shop})}>
              <Text>{shop.title}</Text>
              <Text>{shop.phone}</Text>
            </Callout>
          </Marker>
        ))) : null}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


