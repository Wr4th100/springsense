"use client"

import React, {useState, useEffect} from 'react'
import { get, onValue, ref } from "firebase/database";
import database from '@/lib/firebaseConfig';

const RealtimeDB = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('useEffect')
    const usersRef = ref(database , '/MQ135&Temp');
    console.log(usersRef)
    get(usersRef).then((snapshot) => {
      console.log(snapshot)
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setUsers(snapshot.val()) // eslint-disable-line
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])



  return (
    <div></div>
  )
}

export default RealtimeDB