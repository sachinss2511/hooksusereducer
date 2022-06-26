import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-Context';
import Input from '../input/input';

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

const authctx = useContext(AuthContext)

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
    authctx.onLogin(emailState.value, passState.value);
  };
const [render, setrender] =  useState(0)
useEffect(() => {
  setrender(prev =>(prev+1))

}, [])
  const rendercount = useRef(0)
  useEffect(() => {
    rendercount.current = rendercount.current +1
  
    
  }, )
  

  return (
    <Card className={classes.login}>
      <div>{render}                   {rendercount.current}</div>
      <form onSubmit={submitHandler}>
        
        <Input
          id="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
         
         <Input
          id="password"
          label="password"
          type='password'
          isValid={passwordIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
       
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
