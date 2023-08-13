import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { TransitionPresets } from '@react-navigation/stack';


const backImage = require("../assets/background.jpg");

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const OnHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password) 
            .then( ()=> console.log("Logged in!"))
            .catch( (error)=> Alert.alert("Error", error.message));

        }
    };

    return( 
        <View style={styles.container}>
        <Image source={backImage} style={styles.backImage} />
        <View style={styles.whiteScreen}>
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
                {/* add a text input */}

                <TextInput style={styles.input} placeholder="Enter Email" keyboardType="email-address" textContentType="emailAddress" autoFocus={true} value={email} onChangeText={(text)=>setEmail(text) } />        


                <TextInput style={styles.input} placeholder="Enter Password" autoCapitalize="none" autoCorrect={false} secureTextEntry={true} textContentType="password" value={password} onChangeText={(text) => setPassword(text)} />


                <TouchableOpacity style={styles.button} onPress={OnHandleLogin}>
                    <Text style={{fontWeight: 'bold', color:"#fff", fontSize:18, color:'white'}}>Log In</Text>
                </TouchableOpacity>


                <View style={{marginTop:25, flexDirection: 'row', alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color:'gray', fontWeight:'600', fontSize:16, marginRight: 5}}>Don't have an Account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup", {}, TransitionPresets.RevealFromBottomAndroid)}>
                    <Text style ={{color:'#2EAAE8', fontWeight:'700', fontSize:16}}>Sign Up Now!</Text>
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
        height: 285,
        position: "absolute",
        top: 0,
        resizeMode: "cover"
    },

    whiteScreen: {
        width: "100%",
        height: "75%",
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


