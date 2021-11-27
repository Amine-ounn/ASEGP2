import React from 'react';
import { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { StyleSheet, Platform, View, Text, Alert } from 'react-native'; 
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';
import moment from 'moment';
import points from '../config/postal_sectors';

const LATITUDE = 50.8677;
const LONGITUDE = 50.8677;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

const Map = () => {
  const heatmap_grad = {
    'colors': ['lightblue','yellow', 'red'],
    'startPoints': [0.03, 0.33, 0.66],
    'colorMapSize': 256
  };
  const [location, setLocation] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });

  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    try {
      handleLocationPermission();
      // getCurrentLocation();

      const watchId = trackUserLocation();

      return () => {
        Geolocation.clearWatch(watchId);
      };
    } catch (e) {
      Alert.alert('Ooops', 'Something went wrong');
    }
  }, []);

  useEffect(() => {
    const deviceId = getUniqueId();

    // send location to server
    const sendLocation = async () => {
      const { latitude, longitude } = location;

      axios
        .post('https://ase2task3.herokuMap.com/api/create_locations/', {
          lat: latitude,
          lng: longitude,
          MAC: deviceId,
        })
        .then(res => {
          setLastUpdate(res.data.time);
        })
        .catch(err => {
          console.log(err);
          Alert.alert(
            'Ooops',
            'Something went wrong while trying to save location',
            [
              { text: 'Try again', onPress: () => sendLocation() },
              { text: 'Cancel' },
            ],
          );
        });
    };

    sendLocation();
  }, [location]);

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
      }
    }
  };

  const trackUserLocation = () => {
    // will track the user location
    const watchId = Geolocation.watchPosition(
      position =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true, useSignificantChanges: true },
    );

    return watchId;
  };

  const getCurrentLocation = () => {
    return Geolocation.getCurrentPosition(
      position =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true, useSignificantChanges: true },
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
        <Heatmap
          points={points.data}
          radius={50}
          opacity={0.8}
          gradient={heatmap_grad}
        />
      </MapView>

      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.title}>Coordinates</Text>
            <Text style={styles.coordinates}>
              {location.latitude}, {location.longitude}
            </Text>
          </View>
          <View>
            <Text style={styles.lastUpdateLabel}>Last Saved</Text>
            <Text style={styles.lastUpdate}>
              {moment(lastUpdate).format('h:mm:ss A')}
            </Text>
          </View>
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
    padding: 20,
  },
  modal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: 'red',
  },
  coordinates: {
    fontSize: 15,
    color: 'gray',
  },
  lastUpdateLabel: {
    textAlign: 'left',
    color: 'gray',
  },
  lastUpdate: {
    textAlign: 'right',
    fontSize: 20,
  },
});

export default Map;
