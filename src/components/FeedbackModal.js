import React from 'react'
import { Text,TouchableOpacity,StyleSheet} from 'react-native'

const FeedbackModal = ({onPress}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        >
            <Text style={styles.text}>FeedBack</Text>
            
        </TouchableOpacity>

    )
};
const styles= StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 18
    }
});


export default FeedbackModal;
