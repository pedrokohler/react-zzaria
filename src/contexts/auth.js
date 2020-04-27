import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import firebase from 'services/firebase';

export const AuthContext = createContext();

function Auth ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, []);

  const handleLogout = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <AuthContext.Provider value={{
      handleLogin,
      handleLogout,
      user,
      setUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;
