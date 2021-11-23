// import React from 'react';
// import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
// import Theme from '../config/Theme';

// function LoginScreen(props) {
//     return (
//             <KeyboardAvoidingView style={styles.container} behavior="padding">
//                 <Image style={styles.logo } source={require("../assets/hot_props_logo.png") } />
//                 <View style={styles.controlsContainer}>
//                     <TextInput style={styles.inputControl } placeholder="Email"></TextInput>
//                     <TextInput style={styles.inputControl} placeholder="Password" secureTextEntry></TextInput>
//                     <View style={styles.btnContainer}>
//                         <TouchableOpacity onPress={() => { }} style={styles.btn}>
//                             <Text style={styles.btnText }>Log-in</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => { }} style={[styles.btn, styles.btnOutline]}>
//                             <Text style={styles.btnTextOutline }>Register</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     btn: {
//         width: "100%",
//         backgroundColor: Theme.primary,
//         marginTop: 12,
//         padding: 10,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     btnContainer: {
//         width: "75%",
//         marginTop: 30,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     btnOutline: {
//         backgroundColor: Theme.secondary,
//         borderColor: Theme.primary,
//         borderWidth: 2
//     },
//     btnText: {
//         color: Theme.secondary,
//         fontWeight: "800",
//         fontSize: 20
//     },
//     btnTextOutline: {
//         color: Theme.primary,
//         fontWeight: "800",
//         fontSize: 20
//     },
//     container: {
//         backgroundColor: Theme.background,
//         width: "100%",
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     controlsContainer: {
//         width: "80%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     inputControl: {
//         width: "100%",
//         backgroundColor: Theme.secondary,
//         padding: 10,
//         marginTop: 15,
//         borderRadius: 10,
//         fontWeight: "500",
//         fontSize: 18
//     },
//     logo: {
//         width: "60%",
//         height: undefined,
//         aspectRatio: 1,
//         justifyContent: "flex-start",
//         marginTop: 40,
//     }, 
// })

// export default LoginScreen;