import React from 'react';
import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';



export default function Register({ navigation }) {
 

                            
  const pressHandler = () => { 
  navigation.navigate('Map'); 
                            
                             }
return(
  
    
      <View
        style={styles.container}
        contentOffset={{ x: 0, y: 24 }}
        ref={this._scrollViewRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 24 }}
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        extraHeight={32}
        extraScrollHeight={Platform.OS == "android" ? 32 : 0}
        enableResetScrollToCoords={false}
        onKeyboardDidShow={this._keyboardDidShowHandler}
      >
        <View style={styles.container}>

          <Text style={styles.header}>Registration</Text>

          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={this.editNextInput}
              onFocus={this.onInputFocus}
              onChangeText={this.onChangeInputHandler}
              ref={this.emailInputRef}
            />
            {/* {this.state.showEmailError &&
              <Text style={styles.errorText}>Please enter your email address.</Text>
            } */}
          </View>

          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={this.editNextInput}
              onFocus={this.onInputFocus}
              onChangeText={this.onChangeInputHandler}
              ref={this.passwordInputRef}
            />
            {/* {this.state.showPasswordError &&
              <Text style={styles.errorText}>Please enter a password.</Text>
            } */}
          </View>

          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Full Name"
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={this.editNextInput}
              onFocus={this.onInputFocus}
              onChangeText={this.onChangeInputHandler}
              ref={this.firstnameInputRef}
            />
            {/* {this.state.showFirstnameError &&
              <Text style={styles.errorText}>Please enter your full name.</Text>
            } */}
          </View>

          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={pressHandler} />
          </View>


        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 36,
    padding: 24,
    margin: 12,
    textAlign: "center",
  },
  inputTextWrapper: {
    marginBottom: 24,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    paddingRight: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 36,
  },
  btnContainer2: {
    backgroundColor: "#fff",
    marginTop: 120,
  }
})

