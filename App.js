import React from 'react';
import {useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View} from 'react-native';

const App = () => {
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
        initialRegion={{
          latitude: 50.8677,
          longitude: 0.0875,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />
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
});

export default App;
