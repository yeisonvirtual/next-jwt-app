"use client"

import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { deleteCookie } from 'cookies-next';

const DashboardPage = () => {

  const { setUser } = useContext(UserContext);

  const [userData, setUserData] = useState({});

  const router = useRouter();

  const getProfile = async ()=>{
    const res = await fetch('/api/profile');
    const data = await res.json();
    setUserData(data);
  }

  const logout = async ()=>{

    try {

      const res = await fetch('/api/auth/logout',{
        method: 'POST'
      });

      const data = await res.json();
      console.log(data);

      deleteCookie('token');
      setUser({});
      router.push('/login');

    } catch (error) {
      console.log(error);
      deleteCookie('token');
      setUser({});
      router.push('/login');
    }
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h3>{JSON.stringify(userData)}</h3>
      <button onClick={getProfile}>
        get profile
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default DashboardPage