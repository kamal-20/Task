import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header,Overlay,AirbnbRating,Input,Button} from 'react-native-elements';
import Logout from "../components/Logout";
import FeedbackModal from '../components/FeedbackModal';
import {Context as AuthContext} from '../context/AuthContext';


const FeedbackScreen = () => {
  const {submitFeedback} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [rating , setRating] = useState(3);
  const [feedback , setFeedback] = useState("");
  const toggleOverlay = () => {
    setVisible(!visible);
  };
    return (
        <View style={styles.centeredView}>
          <Header
            centerComponent={<FeedbackModal onPress={toggleOverlay} />}
            rightComponent={<Logout />}
          />
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Feedback Form</Text>
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "OK", "Good","Very Good"]}
              defaultRating={3}
              size={35}
              />
              <Input
                  label="Would You Like to say Something..."
                  value={feedback}
                  onChangeText={setFeedback}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputContainerStyle={styles.input}
                  labelStyle={{marginTop: 50, marginHorizontal: 20}}
                />
              <Button
            title="Submit"
            buttonStyle={{
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: "#000",
                marginLeft: 30,
                marginRight: 30,
                margin: 10,
                height: 50,
                width: 200
            }}
            onPress={() => {
              submitFeedback({ rating,feedback});
              toggleOverlay()
            }} />
            </View>
            
          </Overlay>
        </View>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        width: 280,
        height: 450,
        alignItems: "center",
      },
      title:{
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20
      },
      input:{
        marginHorizontal: 20,
      }
});
export default FeedbackScreen;