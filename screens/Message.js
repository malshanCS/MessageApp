import React, {useState,useEffect,useLayoutEffect,useCallback} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from '../config/firebase'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../colors";





export default function Message(){

    const [messages, , setMessages] = useState([]);
    const navigation = useNavigation();

    
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error!! ', error));

    };


    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight:10}} onPress={onSignOut}>
                    <AntDesign name="logout" size={24} color={colors.white} style = {{marginRight:10}} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);
    
    useLayoutEffect(()=>{

        const collection_id = collection(db, 'msgs');
        const query1 = query(collection_id, orderBy('createdAt','desc'));

        const unsubscribe = onSnapshot(query1, querySnapshot => {
            console.log('snapshot expired' );

            setMessages(
                querySnapshot.docs.map(doc=>({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
        
        );
    });


    return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(prevMessages =>
            GiftedChat.append(prevMessages, messages)
            );

    const { _id , text, user, date } = messages[0];

    addDoc(collection(database, 'msgs') , {
        _id,
        text,
        user,
        date
    });
    }, []);

    return (
        <GiftedChat message = {messages} showAvatarForEveryMessage = {false} showUserAvatar = {false} onSend={messages => onSend(messages)} messagesContainerStyle={{backgroundColor: 'gray'}} textInputStyle = {{backgroundColor: 'white', borderRadius: 25}} user = {{_id: auth?.currentUser?.email , avatar: 'https://i.pravatar.cc/300'}} />
    );
}