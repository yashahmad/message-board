import React, { useState, createContext, useContext } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = () => {
  return useContext(MessageContext);
};

export { MessageProvider, useMessageContext };