"use client"

import React from 'react'
import { useSocket } from '@/components/providers/SocketProvider';

const SocketTest = () => {
  const { socket, isConnected } = useSocket(); // eslint-disable-line
  
  // React.useEffect(() => {
  //   if (!socket) return
  //   socket.emit('connection') // eslint-disable-line
  // }, [])

  return (
    <div>SocketTest</div>
  )
}

export default SocketTest