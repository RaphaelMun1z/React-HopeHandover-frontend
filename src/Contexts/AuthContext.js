import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Axios from 'axios';

export const AuthContext = createContext();

Axios.defaults.withCredentials = true;

function AuthProvider({ children }) {
  const [authuser, setAuthuser] = useState({
    token: null,
    acesslevel: null,
    usertype: null,
    firstname: null,
    lastname: null,
    email: null,
    id: null,
    image: null,
  });

  const verifyAuth = async () => {
    try {
      const token = Cookies.get('authToken');

      if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await Axios.get('http://localhost:8080/checkauth');

        if (response.data.Auth === true) {
          Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userData = response.data;

          setAuthuser({
            token,
            firstname: userData.firstname,
            lastname: userData.lastname,
            usertype: userData.usertype,
            accesslevel: userData.accesslevel,
            email: userData.email,
            id: userData.id,
            image: userData.image,
          });

          toast.success('Bem vindo(a) de volta!');
        } else {
          toast.error('Acesso negado!');
        }
      } else {
        delete Axios.defaults.headers.common['Authorization'];
      }
    } catch (err) {
      delete Axios.defaults.headers.common['Authorization'];
      toast.warn('Ocorreu um erro interno! ' + err);
      console.log("Erro: " + err)
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authuser, setAuthuser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
