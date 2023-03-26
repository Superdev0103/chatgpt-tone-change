import ChatView from '../components/ChatView';
import React from 'react'
import ChatViewSample from '../components/ChatViewSample';

const Home = () => {
  return (
    <div className="flex transition duration-500 ease-in-out">
      {
        window.location.pathname === "/tone" ?
          <ChatView /> :
          <ChatViewSample />
      }
    </div>
  )
}

export default Home