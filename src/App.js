import React from 'react';
import GuestBook from './GuestBook.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChatApp from './Chat/App';

function App() {
  return (
    <div>
      <ChatApp />
      <GuestBook />
      
    </div>
  );
}

export default App;
