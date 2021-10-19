import React from 'react';
import {useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View, Text} from 'react-native';

const App = () => {
  const [location, setLocation] = React.useState({
    latitude: 50.8677,
    longitude: 0.0875,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    const handleLocationPermission = async () => {
      let checkIfGranted = '';

      if (Platform.OS === 'ios') {
        checkIfGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (
          checkIfGranted === RESULTS.BLOCKED ||
          checkIfGranted === RESULTS.DENIED
        ) {
          await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
      }
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

    handleLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />

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
    width: '100%',
    minHeight: 100,
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 20,
  },
  modal: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
  },
  coordinates: {
    fontSize: 20,
    color: 'gray',
  },
});

export default App;
