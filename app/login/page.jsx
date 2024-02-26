"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

const LoginPage = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e)=>{
    e.preventDefault();

    console.log(credentials);

    const res = await fetch('/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    console.log(res);

    const data = await res.json();

    console.log(data);

    if (res.status===200) {
    
      router.push('/dashboard');
      
    } else {
      setError(data);
    }

  }

  return (
    <div>
      {
        error && (
          <h3>{error.message}</h3>
        )
      }
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="email" onChange={handleChange} />
        <input type="password" name="password" placeholder="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage