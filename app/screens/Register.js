import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Text,
  Alert,
} from 'react-native';
import Theme from '../config/Theme';
import Button from '../components/Button';
import validate from '../config/validation';
import ButtonLink from '../components/ButtonLink';
import useAuth from '../hooks/useAuth';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {register, isLoading, error} = useAuth();

  const onNameChange = value => {
    setName(value);
  };

  const onEmailChange = value => {
    setEmail(value);
    setEmailError(validate(value, 'email', true));
  };

  const onPasswordChange = value => {
    setPassword(value);
    setPasswordError(validate(value, 'password', true));
  };

  const handleRegister = async () => {
    const userRegistered = await register({name, email, password});

    if (userRegistered) {
      navigation.navigate('Login');
    } else {
      Alert.alert(
        'Ooops',
        `${
          error?.email
            ? error.email.toString()
            : 'Something went wrong, please try again'
        }`,
      );
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
              value={name}
              placeholder="Full name"
              style={styles.inputControl}
              onChangeText={onNameChange}
            />
            <TextInput
              style={styles.inputControl}
              value={email}
              placeholder="Email"
              onChangeText={onEmailChange}
            />
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              style={styles.inputControl}
              value={password}
              placeholder="Password"
              secureTextEntry
              onChangeText={onPasswordChange}
            />
            {!!passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Button
            onClick={handleRegister}
            disabled={
              emailError || passwordError || !email.length || !password.length
            }
            primary
            loading={isLoading}>
            Register
          </Button>
          <View style={styles.btnLinkText}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <ButtonLink onClick={() => navigation.navigate('Login')}>
              Login
            </ButtonLink>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '90%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  form: {
    width: '100%',
  },
  logo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
  },
  btnContainer: {
    width: '100%',
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
    backgroundColor: Theme.lightGray,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    borderRadius: 8,
  },
  btnLinkText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  loginText: {
    textAlign: 'left',
    color: Theme.white,
  },
  errorText: {
    color: Theme.error,
    marginTop: 10,
  },
});
