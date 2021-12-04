import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Theme from '../config/Theme';

export default function LoginScreen({navigation}) {
  const validation = {
    email: false,
    password: false,
  };

  const checkLogin = () => {
    // First do validation
    var errorMsg = '';
    if (validation.email === false) {
      errorMsg += '\nInvalid Email Address';
    }
    if (validation.password === false) {
      errorMsg +=
        '\nPassword must contain at least 8 characters and contain upper and lower characters, digits and special characters.';
    }
    if (errorMsg.length > 0) {
      Alert.alert('Oops', 'ERRORS:' + errorMsg);

      return false;
    }
    return true;
  };

  const validateEmail = text => {
    /* Does entered text conform to a valid email address? */
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) ? (validation.email = true) : (validation.email = false);
  };

  const validatePassword = pw => {
    /* Password must contain upper, lower, digit, special characters */
    const reg =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    reg.test(pw) ? (validation.password = true) : (validation.password = false);
  };

  const pressHandler = () => {
    navigation.navigate('Register');
  };
  const pressHandler2 = () => {
    /* Validate form and then despatch */
    if (checkLogin()) {
      navigation.navigate('Map');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.body}>
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={require('../assets/hot_props_logo.png')}
          />

          <View style={styles.controlsContainer}>
            <TextInput
              style={styles.inputControl}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={validateEmail}
            />
            <TextInput
              style={styles.inputControl}
              placeholder="Password"
              secureTextEntry
              onChangeText={validatePassword}
            />
            <Text style={styles.leadingText}>
              Login to continue to Hot Props. If you don't have an account,
              please register.
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={pressHandler2} style={styles.btn}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pressHandler}
            style={[styles.btn, styles.btnOutline]}>
            <Text style={styles.btnTextOutline}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '80%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  form: {
    width: '100%',
  },
  leadingText: {
    marginTop: 10,
    color: Theme.gray,
  },
  logo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
  },
  container: {
    backgroundColor: Theme.background,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    width: '100%',
  },
  inputControl: {
    width: '100%',
    backgroundColor: Theme.secondary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  btn: {
    width: '100%',
    backgroundColor: Theme.primary,
    marginTop: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutline: {
    backgroundColor: Theme.gray,
    borderColor: Theme.primary,
  },
  btnText: {
    color: Theme.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnTextOutline: {
    color: Theme.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
