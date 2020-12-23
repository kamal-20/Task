import React, { useContext, useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext' ;

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {state,setEmailValidity,setPasswordValidity}= useContext(AuthContext);
  console.log(state.isPasswordValid);

  return (
    <>
        <Text h2 style={styles.title}>{headerText}</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={text=>{
          setEmailValidity({email:text})
          setEmail(text)
        }}
        autoCapitalize="none"
        autoCorrect={false}
        inputContainerStyle={styles.input}
      />
      {!state.isEmailValid ? (
        <Text style={styles.errorMessage}>{state.emailError}</Text>
      ) : null}
      <Input
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={text=>{
          setPasswordValidity({password:text})
          setPassword(text)
        }}
        autoCapitalize="none"
        autoCorrect={false}
        inputContainerStyle={styles.input}
      />
      {!state.isPasswordValid ? (
        <Text style={styles.errorMessage}>{state.passwordError}</Text>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
        <Button
            title={submitButtonText}
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
                width: 300
            }}
            onPress={() => onSubmit({ email, password })}
            
        />
    </>
  );
};

const styles = StyleSheet.create({

  title:{
    fontFamily: "Nato Sans",
    marginTop: 50,
    marginBottom: 50
  },
  input:{
    marginHorizontal: 20
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginHorizontal: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
  }
});

export default AuthForm;