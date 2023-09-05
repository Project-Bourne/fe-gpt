import React from 'react';
import ChatRoom from './components/chatRoom';

function Home() {
  return (
    <div className="mt-[8rem] h-[100%] rounded-[1rem] bg-sirp-secondary2 mx-5">
      <div>
        <ChatRoom/>
      </div>
    </div>
  );
}

export default Home;
