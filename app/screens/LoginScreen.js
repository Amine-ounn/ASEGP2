/*
    Login Screen 
    version: 2021-11-20
*/

import { returnStatement } from '@babel/types';
import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Theme from '../config/Theme';


  
function LoginScreen(props) {
    const validation = {
        email: false,
        password: false
    }

    const doLogin = () => {
        // First do validation
        var errorMsg = "";
        if (validation.email === false) {
            errorMsg += "\nInvalid Email Address";
        }
        if (validation.password === false) {
            errorMsg += "\nPassword must contain at least 8 characters and contain upper and lower characters, digits and special characters."
        }
        if (errorMsg.length > 0) {
            alert("ERRORS:" + errorMsg);
            return;
        } else {
            // Do form submit
        }
    }
    
    const validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            validation.email = false;
            return false;
        }
        else {
            console.log("Email is Correct");
            validation.email = true;
            return true;
        }
    }

    const validatePassword = (pw) => {
        /* Password must contain upper, lower, digit, special characters */
        const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
        if (reg.test(pw) === false) {
            console.log("Password is invalid");
            validation.password = false;
            return false;
        }
        else {
            console.log("Password is valid");
            validation.password = true;
            return true;
        }
    }

    return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image style={styles.logo } source={require("../assets/hot_props_logo.png") } />
                <View style={styles.controlsContainer}>
                <TextInput
                    style={styles.inputControl}
                    placeholder="Email"
                    onChangeText={validateEmail}
                >
                    
                    </TextInput>
                <TextInput
                    style={styles.inputControl}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={validatePassword}
                >
                </TextInput>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={doLogin} style={styles.btn}>
                            <Text style={styles.btnText }>Log-in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={[styles.btn, styles.btnOutline]}>
                            <Text style={styles.btnTextOutline }>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: "100%",
        backgroundColor: Theme.primary,
        marginTop: 12,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    btnContainer: {
        width: "75%",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    btnOutline: {
        backgroundColor: Theme.secondary,
        borderColor: Theme.primary,
        borderWidth: 2
    },
    btnText: {
        color: Theme.secondary,
        fontWeight: "800",
        fontSize: 20
    },
    btnTextOutline: {
        color: Theme.primary,
        fontWeight: "800",
        fontSize: 20
    },
    container: {
        backgroundColor: Theme.background,
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    controlsContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    inputControl: {
        width: "100%",
        backgroundColor: Theme.secondary,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        fontWeight: "500",
        fontSize: 18
    },
    logo: {
        width: "60%",
        height: undefined,
        aspectRatio: 1,
        justifyContent: "flex-start",
        marginTop: 40,
    }, 
})

export default LoginScreen;