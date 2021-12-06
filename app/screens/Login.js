import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from 'react-native';
import Theme from '../config/Theme';
import {validate} from '../config/validation';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const onEmailChange = value => {
    setEmail(value);
    setEmailError(validate(value, 'email'));
  };

  const onPasswordChange = value => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (!emailError) {
      setIsLoading(true);
      setIsDisabled(true);

      // TODO: handle authentication
      navigation.navigate('Map');
    }
  };

  useEffect(() => {
    setIsDisabled(emailError || !email.length || !password.length);
  }, [emailError, email, password]);

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
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={onEmailChange}
            />
            <TextInput
              style={styles.inputControl}
              value={password}
              placeholder="Password"
              secureTextEntry
              onChangeText={onPasswordChange}
            />
            <Text style={styles.leadingText}>
              Login to continue to Hot Props. If you don't have an account,
              please register.
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Button
            onClick={handleLogin}
            disabled={isDisabled}
            loading={isLoading}
            primary={true}>
            Log in.
          </Button>
          <View style={styles.btnLinkText}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <ButtonLink onClick={() => navigation.navigate('Register')}>
              Register
            </ButtonLink>
          </View>
          {/* <Button onClick={onRegister}>Register</Button> */}
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
  btnContainer: {
    width: '100%',
    marginTop: 'auto',
  },
  btnLinkText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  registerText: {
    textAlign: 'left',
    color: Theme.white,
  },
});
