import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import camiseta from '../../../images/camiseta.png';

const styles = StyleSheet.create({
  map: {
    marginLeft: '1%',
    marginRight: '1%',
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: '5%',
  },
});

const Map = (location) => {
  const { lng, lat } = location.location;
  const coords = { longitude: lng, latitude: lat };
  console.log(location);
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={coords}
          image={camiseta}
          rotation={Math.cos(Date.now() / 500) * 360}
        />
        <Circle
          center={coords}
          radius={parseFloat(700.0)}
          fillColor="rgba(112, 198, 255, 0.56)"
          strokeColor="rgba(112, 198, 255, 0.56)"
        />
      </MapView>
    </View>
  );
};

export default Map;
