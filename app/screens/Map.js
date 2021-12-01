import React from 'react';
import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Heatmap} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View, Text, Alert, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';
import points from '../config/postal_sectors';
import Theme from '../config/Theme';
const LATITUDE = 50.8677;
const LONGITUDE = -0.0866;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;
const WEATHER_UPDATE = 1000 * 60 * 5; // 5 minutes

const App = () => {
  const heatmap_grad = {
    colors: ['lightblue', 'yellow', 'red'],
    startPoints: [0.03, 0.33, 0.66],
    colorMapSize: 256,
  };
  const [location, setLocation] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });

  // Current Weather Data
  const [weatherData, setWeather] = useState({
    name: '',
    region: '',
    temp_c: 0,
    temp_f: 0,
    icon: '',
    cloud: 0,
    wind_mph: 0,
    wind_kph: 0,
    wind_dir: 0,
  });

  // Get current weather at this location
  const getWeatherData = weather_url => {
    return fetch(weather_url)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setWeather({
          name: data.location.name,
          region: data.location.region,
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          icon: 'https:' + data.current.condition.icon,
          cloud: data.current.cloud,
          wind_mph: data.current.wind_mph,
          wind_kph: data.current.wind_kph,
          wind_dir: data.current.wind_dir,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Update weather intermittently
  useEffect(() => {
    let weather_url =
      'https://api.weatherapi.com/v1/current.json?key=9bb972c1338243fea82161415213011&q=' +
      location.latitude +
      ',' +
      location.longitude +
      '&aqi=no';
    getWeatherData(weather_url);
    setInterval(() => {
      weather_url =
        'https://api.weatherapi.com/v1/current.json?key=9bb972c1338243fea82161415213011&q=' +
        location.latitude +
        ',' +
        location.longitude +
        '&aqi=no';
      getWeatherData(weather_url);
    }, WEATHER_UPDATE);
  }, [location]);

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
      const {latitude, longitude} = location;

      axios
        .post('https://ase2task3.herokuapp.com/api/create_locations/', {
          lat: latitude,
          lng: longitude,
          MAC: deviceId,
        })
        .then()
        .catch(err => {
          console.log(err);
          Alert.alert(
            'Ooops',
            'Something went wrong while trying to save location',
            [
              {text: 'Try again', onPress: () => sendLocation()},
              {text: 'Cancel'},
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
      {enableHighAccuracy: true, useSignificantChanges: true},
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
      {enableHighAccuracy: true, useSignificantChanges: true},
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
          <View style={styles.cloud}>
            <Image style={styles.icon} source={{uri: weatherData.icon}} />
            <Text style={styles.weatherTxt}> {weatherData.cloud}%</Text>
          </View>
          <View style={styles.place}>
            <Text style={styles.weatherTxt}>{weatherData.name}</Text>
          </View>
          <View style={styles.temp}>
            <Text style={styles.weatherTxt}>
              {' '}
              {weatherData.temp_c}C/{weatherData.temp_f}F
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
    height: '94%',
  },

  modalContainer: {
    flex: 1,
    position: 'absolute',
    height: '6%',
    width: '100%',
    minHeight: 44,
    backgroundColor: Theme.background,
    zIndex: 1,
    padding: 5,
  },
  modal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  cloud: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '15%',
  },
  place: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  temp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '15%',
  },
  title: {
    fontSize: 20,
    color: Theme.primary,
  },
  weatherTxt: {
    fontSize: 15,
    color: Theme.secondary,
  },
  lastUpdateLabel: {
    textAlign: 'left',
    color: 'gray',
  },
  lastUpdate: {
    textAlign: 'right',
    fontSize: 20,
  },
  icon: {
    width: 32,
    height: undefined,
    aspectRatio: 1,
    justifyContent: 'flex-start',
  },
});

export default App;
