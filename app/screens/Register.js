import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Theme from '../config/Theme';

export default function Register({navigation}) {
  const validation = {
    email: false,
    password: false,
  };

  const checkRegistration = () => {
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
    const newLocal = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    /* Does entered text conform to a valid email address? */
    let reg = newLocal;
    reg.test(text) ? (validation.email = true) : (validation.email = false);
  };

  const validatePassword = pw => {
    /* Password must contain upper, lower, digit, special characters */
    const reg =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    reg.test(pw) ? (validation.password = true) : (validation.password = false);
  };

  const pressHandler = () => {
    /* Validate form and then despatch */
    if (checkRegistration()) {
      navigation.navigate('Map');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.controlsContainer}>
        <TextInput style={styles.inputControl} placeholder="Full name" />
        <TextInput
          style={styles.inputControl}
          placeholder="Email"
          onChangeText={validateEmail}
        />
        <TextInput
          style={styles.inputControl}
          placeholder="Password"
          secureTextEntry
          onChangeText={validatePassword}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={pressHandler} style={styles.btn}>
            <Text style={styles.btnText}>Sign-Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: Theme.primary,
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '75%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Theme.secondary,
    fontWeight: '800',
    fontSize: 20,
  },
  container: {
    backgroundColor: Theme.background,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputControl: {
    width: '100%',
    backgroundColor: Theme.secondary,
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 18,
  },
});
