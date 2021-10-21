import React from 'react';
import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View, Text, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

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
  }, []);

  const getCurrentLocation = () => {
    // will give you the current location
    Geolocation.getCurrentPosition(
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
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    width: '40%',
    minHeight: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    zIndex: 1,
    padding: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'red',
  },
  coordinates: {
    fontSize: 13,
    color: 'gray',
  },
});

export default App;
