"use client"

import { UserContext } from "@/context/UserContext"
import { useContext } from "react"

export const NavBar = () => {

  const { user } = useContext(UserContext);

  return (
    <nav>
      <h3>user: {user.email}</h3>
    </nav>
  )
}
