"use client"

import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const DashboardPage = () => {

  const { user, setUser } = useContext(UserContext);

  const [userData, setUserData] = useState({});

  const router = useRouter();

  const getProfile = async ()=>{
    const res = await fetch('/api/profile');
    const data = await res.json();
    setUserData(data);
    setUser(data);
  }

  const logout = async ()=>{

    try {

      const res = await fetch('/api/auth/logout',{
        method: 'POST'
      });
      const data = await res.json();
      setUserData(data);
      setUser({});
      router.push('/login');
      router.refresh();

    } catch (error) {
      console.log(error);
      setUser({});
      router.push('/login');
      router.refresh();
    }
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  

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