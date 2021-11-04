import React from 'react';
import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View, Text, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from ‘axios’;

const LATITUDE = 50.8677;
const LONGITUDE = 50.8677;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

const App = () => {
  const [location, setLocation] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });

  useEffect(() => {
    const handleLocationPermission = async () => {
      let checkIfGranted = '';

      // check if location permission is granted
      // if not, request for permission

      // iOS
      if (Platform.OS === 'ios') {
        checkIfGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (
          checkIfGranted === RESULTS.BLOCKED ||
          checkIfGranted === RESULTS.DENIED
        ) {
          await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
          getCurrentLocation();
        }
      }

      // Android
      if (Platform.OS === 'android') {
        checkIfGranted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (
          checkIfGranted === RESULTS.BLOCKED ||
          checkIfGranted === RESULTS.DENIED
        ) {
          await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        } else {
          getCurrentLocation();
        }
      }
    };

    handleLocationPermission();
    getCurrentLocation();
    trackUserLocation();
  });

  const getCurrentLocation = () => {
    // will give you the current location
    const id = Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        Alert.alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 5000},
    );

    return id;
  };

  const trackUserLocation = () => {
    // will track the user location
    Geolocation.watchPosition(
      position =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        Alert.alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 5000},
    );
  };
  
 const params = JSON.stringify({

"lat": position.coords.latitude,
"lng": position.coords.longitude,
"MAC": ,   

});
  
 // Send a POST request
axios.post("https://ase2task3.herokuapp.com/api/create_locations/", params,{

"headers": {

"content-type": "application/json",

},

}); 
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        <Marker
          coordinate={location}
          title="You"
          description="This is your current location"
        />
      </MapView>

      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>Coordinates</Text>
          <Text style={styles.coordinates}>
            {location.latitude}, {location.longitude}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '88%',
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    height: '12%',
    width: '100%',
    minHeight: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    padding: 10,
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'red',
  },
  coordinates: {
    fontSize: 15,
    color: 'gray',
  },
});

export default App;
