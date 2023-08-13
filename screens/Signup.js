import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, SafeAreaView, Image, TouchableOpacity, StatusBar, Alert } from "react-native";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TransitionPresets } from '@react-navigation/stack';


const backImage = require("../assets/background3.jpg");

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleSignup = () => {
        if ( email !== '' & password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
            .then (()=> console.log('User account created & signed in!'))
            .catch((error) => Alert.alert("Error", error.message));
        }
    };




    return(
        <View style={styles.container}>
        <Image source={backImage} style={styles.backImage} />
        <View style={styles.whiteScreen}>
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                {/* add a text input */}
    
                <TextInput style={styles.input} placeholder="Enter Email" autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoFocus={true} value={email} onChangeText={(text)=>setEmail(text)} autoCorrect={false}  />
    
    
                <TextInput style={styles.input} placeholder="Enter Password" autoCapitalize="none" autoCorrect={false} secureTextEntry={true} textContentType="password" value={password} onChangeText={(text) => setPassword(text)} />
    
    
                <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                    <Text style={{fontWeight: 'bold', color:"#fff", fontSize:18, color:'white'}}>Sign Up</Text>
                </TouchableOpacity>
    
    
                <View style={{marginTop:25, flexDirection: 'row', alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color:'gray', fontWeight:'600', fontSize:16, marginRight:5}}>Already have an Account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login", {}, TransitionPresets.RevealFromBottomAndroid)}>
                    <Text style ={{color:'#2EAAE8', fontWeight:'700', fontSize:16}}>Log in</Text>
                    </TouchableOpacity>
                </View>
    
    
            </SafeAreaView>
        </View>
    
     </View>    
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },

    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "orange",
        alignSelf: "center",
        paddingBottom: 28
    },

    input: {
        backgroundColor: "#e6d8ed",
        height: 60,
        marginBottom: 28,
        fontSize: 18,
        borderRadius: 10,
        padding: 13
    },

    backImage:{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        resizeMode: "cover"
    },

    whiteScreen: {
        width: "100%",
        height: "80%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,




    },

    form: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 35,
    },

    button: {
        backgroundColor: "#2EAAE8",
        height: 60,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 42,

    }
});



