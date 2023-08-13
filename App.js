import React, {useState, createContext, useContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Image, TextInput,Button,Text,SafeAreaView,StatusBar, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';


// Import your components
import Message from './screens/Message';
// Import your Login component (assuming it's defined in './screens/Login')
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import { auth } from './config/firebase';

//  It is used to define a navigation stack for the app.
const Stack = createStackNavigator(); 

const AuthContext = createContext({});

const AuthUserProvider = ({children})=>{
  const [user, setUser] = useState(null);

  return(
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

// ++++++++++++++++ STACK NAVIGATOR ++++++++++++++++++++++++

function MessageStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      {/* Use the correct component name */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Message" component={Message} />

    </Stack.Navigator>
  );
}

function AuthStack () {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

    </Stack.Navigator>
    );
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



function RootNavigator() {

  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async authUser => {
      authUser ? setUser(authUser)  : setUser(null);
      setIsLoading(false);
    }
    );
    return unsubscribe;

  }, [user]);
  
  if (isLoading) {
    return (
      <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { user ? <MessageStack /> : <AuthStack />}
    </NavigationContainer>
  );
}







export default function App() {
  return (
    <AuthUserProvider>
      <RootNavigator />
    </AuthUserProvider>

  );
}
