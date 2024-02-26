"use client"

import { contexto } from "@/app/layout"
import { useContext } from "react"

export const Contador = () => {

  const { state, dispatch } = useContext(contexto);

  const sumar = ()=>{
    dispatch({type: 'sumar'});
  }

  const restar = ()=>{
    dispatch({type: 'restar'});
  }

  return (
    <div>
      <h2>Valor: {state.contador}</h2>
      <button onClick={sumar}>sumar</button>
      <button onClick={restar}>restar</button>
    </div>
  )
}
