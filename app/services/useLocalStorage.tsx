import React, { useState } from 'react';

// type InitialValue<T> = T | (() => T);

// const UseLocalStorage = (key: string, initialValue) => {
//   const [storedValue, setStoredValue] = useState(()=>{
//     try{
//       const item = window.localStorage.getItem(key)
//       return item ? JSON.parse(item) : initialValue
//     }catch(error){
//       return initialValue
//     }
//   })

//   const setValue = value =>{
//     try{
//       setStoredValue(value)
//       window.localStorage.setItem(key, JSON.stringify(value))
//     }catch(error){
//       console.error(error)
//     }
//   }
//   return [storedValue, setValue]
// }

// export default UseLocalStorage;

export const getItem = (key: string):any =>{
  return JSON.parse(localStorage.getItem(key))
}

export const setItem = (key: string, data:any )=>{
  return localStorage.setItem(key, JSON.stringify(data))
}