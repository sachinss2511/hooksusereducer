
import React, { useContext }  from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-Context';

function App() {

 const ctx = useContext(AuthContext)
 console.log(ctx.isLoggedIn);
  return (
    <React.Fragment>
     
      <MainHeader  />    { //got this out  isAuthenticated = {isLogged} onLogout={logoutHandler}} 
      }
      <main>
        {ctx.isLoggedIn ? <Home /> : <Login  />}       
        { //onLogin={loginHandler}
        }
        {// onLogout={logoutHandler} 
        }
      </main>
      
    </React.Fragment>
  );
}

export default App;