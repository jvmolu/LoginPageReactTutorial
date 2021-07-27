import React, {useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContex from './store/auth-context';

function App() {
  
  const AuthCtx = useContext(AuthContex)

  return (
    <>
      <MainHeader/>
      <main>
        {!AuthCtx.isLoggedIn && <Login/>}
        {AuthCtx.isLoggedIn && <Home/>}
      </main>
    </>
  );
}

export default App;
