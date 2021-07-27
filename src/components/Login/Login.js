import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (currEmailState, action) => {
  if(action.type === 'USER_INPUT')
    return {val: action.value, isValid: action.value.includes('@')};
  
  if(action.type === 'INPUT_BLUR')
    return {val: currEmailState.val, isValid: currEmailState.val.includes('@')};

  return {val: '', isValid: false}
}

const passwordReducer = (currPasswordState, action) => {
  if(action.type === 'USER_INPUT')
    return {val: action.value, isValid: action.value.trim().length > 6};
  
  if(action.type === 'INPUT_BLUR')
    return {val: currPasswordState.val, isValid: currPasswordState.val.trim().length > 6};
  
  return {val: '', isValid: false}
}

const Login = () => {

  const AuthCtx = useContext(AuthContext)
  const [emailState, emailDispatch] = useReducer(emailReducer, {val: '', isValid: null})
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {val: '', isValid: null})
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {

    const timeOut = setTimeout(() => {
      console.log('CHECKING FORM VALIDITY')
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500)

    return () => {
      console.log('Checkup')
      clearTimeout(timeOut)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    emailDispatch({type: 'USER_INPUT', value: event.target.value});
  };

  const emailValidateHandler = (event)=> {
    emailDispatch({type: 'INPUT_BLUR'})
  }

  const passwordChangeHandler = (event) => {
    passwordDispatch({type: 'USER_INPUT', value: event.target.value});
  };

  const passwordValidateHandler = (event)=> {
    passwordDispatch({type: 'INPUT_BLUR'})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.val, passwordState.val);
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
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={emailValidateHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={passwordValidateHandler}
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
