"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {

  const [user, setUser] = useState({});

  const router = useRouter();

  const getProfile = async ()=>{
    const res = await fetch('/api/profile');
    const data = await res.json();
    setUser(data);
  }

  const logout = async ()=>{

    try {

      const res = await fetch('/api/auth/logout',{
        method: 'POST'
      });
      const data = await res.json();
      setUser(data);
      router.push('/login');

    } catch (error) {
      console.log(error);
      router.push('/login');
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user]);
  

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h3>{JSON.stringify(user)}</h3>
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