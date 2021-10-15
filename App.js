import React from "react";
// import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { StyleSheet, Text, View } from "react-native";





  export default () => (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 50.8677,
         longitude: 0.0875,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
 );



const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex:1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   flex: 1,
   
   
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});