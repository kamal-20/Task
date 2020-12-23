import createDataContext from './createDataContext';
import {Alert} from 'react-native';
import { navigate } from '../hooks/navigatorRef';
import {firebase,db} from '../firebase';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'setEmailError':
      return {...state,emailError:action.payload };
    case 'setEmailValidity':
      return {...state, isEmailValid: action.payload};
    case 'setPasswordValidity':
      return {...state, isPasswordValid: action.payload};
    case 'setPasswordError':
      return {...state,passwordError:action.payload };
    case 'signin':
      return { errorMessage: '', user: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { user: null, errorMessage: '' };
    default:
      return state;
  }
};


function __isValidEmail(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

const setEmailValidity = dispatch => ({email}) => {
  if (!email) {
    dispatch({type:"setEmailError",payload:'Email required *'})
    dispatch({type:"setEmailValidity", payload:false})
  } else if (!__isValidEmail(email)) {
    dispatch({type:"setEmailError",payload:'Invalid Email'})
    dispatch({type:"setEmailValidity", payload:false})
  }else
  {
    dispatch({type:"setEmailValidity", payload:true})
  }

};

const setPasswordValidity = dispatch => ({password}) =>{
  password=password.trim();
  if (!password || password.length < 6) {
    dispatch({type:"setPasswordError",payload:"Weak password, minimum 5 chars"});
    dispatch({type:"setPasswordValidity", payload:false}); 
  }else{
    dispatch({type:"setPasswordError",payload:""});
    dispatch({type:"setPasswordValidity", payload:true}); 
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  if (!email) {
    dispatch({type:"setEmailError",payload:'Email required *'})
    dispatch({type:"setEmailValidity", payload:false})
    return
  } else if (!password && password.trim() && password.length > 6) {
    dispatch({type:"setPasswordError",payload:"Weak password, minimum 5 chars"})
    dispatch({type:"setPasswordValidity", payload:false})
    return
  } else if (!__isValidEmail(email)) {
    dispatch({type:"setEmailError",payload:'Invalid Email'})
    dispatch({type:"setEmailValidity", payload:false})
    return
  }
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email,password );
    if(response && response.user){
      Alert.alert("Success ✅", "Account created successfully");
    }
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.message
    });
  }
};


const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(response);
    dispatch({ type: 'signin', payload: response });
    
    navigate('Feedback');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.message
    });
  }
};

const signout = dispatch => async () => {
  await firebase.auth().signOut().then(function() {
    dispatch({ type: 'signout' });
    navigate('Signin');
  }).catch(function(error) {
    console.log(error.message);
  });
};


const submitFeedback = dispatch => async ({ rating,feedback }) => {
  try {
    db.collection("feedbacks").doc().set({
      rating,
      feedback
  })
  Alert.alert("Success ✅", "Feedback Submitted");
    return;
  
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.message
    });
  }
};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, setEmailValidity, setPasswordValidity,submitFeedback},
  { user: null, errorMessage: '', isEmailValid:true,isPasswordValid:false,emailError:'',passwordError:'' }
);