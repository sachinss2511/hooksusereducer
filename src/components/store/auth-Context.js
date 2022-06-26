import React, { useState, useEffect } from 'react'




const AuthContext = React.createContext({
   isLoggedIn : false,
   onLogout : () => {},
   onLogin: ()=>{}
})



export const AuthContextProvider = (props) =>{
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const logoutHandler = ()=>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false)
    }
    const loginHandler = ()=>{
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true)
    }

    const AuthContextValue = {
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler, 
        onLogin: loginHandler}

    return <AuthContext.Provider 
    value={AuthContextValue}>
     {props.children}
     {console.log('hello i am in')}
     </AuthContext.Provider>
}
export default AuthContext;