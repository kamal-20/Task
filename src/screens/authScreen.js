import React, { useEffect,useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import {View,StyleSheet} from 'react-native'; 
import {firebase} from '../firebase';
import {navigate} from '../hooks/navigatorRef';

const authScreen = ()=> {
    const tryLocalSignin = () => {
        const user=firebase.auth().currentUser;
            if(user){
                navigate("Feedback");
            }else{
                navigate("Signup");
            }
      };
    useEffect(() => {
        tryLocalSignin()
        //console.log(state.user);
      }, []);

    return (
        <View style={styles.container}>
        <ActivityIndicator large />
        </View>
    )
  };

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default authScreen;