import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import firebase from 'services/firebase';

export const AuthContext = createContext();

function Auth ({ children }) {
  const [user, setUser] = useState(null);
  const [checkedAuthState, setCheckedAuthState] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const firstName = user.displayName.split(' ')[0];
        setUser({ ...user, firstName });
      } else {
        setUser(null);
      }
      setCheckedAuthState(true);
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
      checkedAuthState
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
