'use client'
import React from 'react'
import { StateModal } from '../interface/models'

export const Modal: React.FC<StateModal>  = ({stateModal, children, onClick}) =>{
  return (
    <div id="loginModal" onClick={onClick} className={`${stateModal? "block":"hidden"} z-50 modal fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center`}>
      {
        children
      }
    </div>  
    )
}
