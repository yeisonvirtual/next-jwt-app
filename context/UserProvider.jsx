"use client"

import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { getCookie } from 'cookies-next';
import { jwtVerify } from 'jose';

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    async function checkLogin(){

      const token = getCookie('token');

      if (!token) {
        setIsAuthenticated(false);
        setUser({});
        setIsLoading(false);
        return;
      }

      const secret = new TextEncoder().encode(process.env.SECRET);

      try {
        const res = await jwtVerify(token, secret);
        //console.log("res: ",res)
        const { payload } = res;
        //console.log("userData: ",payload);
        const { email, username } = payload;

        if (!payload) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser({ email, username });
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }

    }

    checkLogin();

  },[]);

  useEffect(()=>{
    console.log('auth: ',isAuthenticated);
    console.log('loading: ',isLoading);
    console.log('user: ',user);
  },[isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}
