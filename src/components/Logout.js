import React, { useContext } from 'react'
import { Text,StyleSheet,TouchableOpacity } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const Logout = () => {
    const {signout} = useContext(AuthContext);
    return (
        <TouchableOpacity
            onPress={signout}
        >
            <Text style={styles.text}>LOGOUT</Text>
        </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 16
    }
});

export default Logout;
