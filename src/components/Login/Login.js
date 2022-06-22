import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action ) =>{
  if(action.type === 'user_input1'){
    return{value: action.val, isValid: action.val.includes('@')}
  }

  //console.log(action);
   if(action.type === 'INPUT_BLUR1'){
  // console.log(action, "in bllurrrrrrrrrrrrrrrrr");
    return{value: state.value, isValid: state.value.includes('@')}
  }
    return {value: '', isValid: false}
    
}


const passwordReducer = (state,action)=>{
  if(action.type === 'user_input2'){
    console.log(action);
    return{value: action.val, isValid: action.val.trim().length > 6}
  }
  //console.log(action);

  if(action.type === 'INPUT_BLUR2'){
    
    return{value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}                                                      
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

 const [emailState, dispatchEmail] = useReducer(emailReducer, {
   value: "",
   isValid: null,
 });
 const [passState, dispatchPass] = useReducer(passwordReducer,{
  value: "",
  isValid: null,
 })

  // useEffect(() => { 
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);
 const {isValid: emailIsValid} = emailState
 const {isValid: passwordIsValid} = passState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
       emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
   dispatchEmail({type: 'user_input1', val: event.target.value})

    // setFormIsValid(
    //  emailState.value.includes('@') && passState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPass({type: 'user_input2', val: event.target.value})

    // setFormIsValid(
    //   emailState.value.includes('@') && passState.isValid
    // );
  };

  const validateEmailHandler = () => {
    console.log('hello i am running after onblur');
    dispatchEmail({type: 'INPUT_BLUR1'})
   // setEmailIsValid(emailState.value.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPUT_BLUR2'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
