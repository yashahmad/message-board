import React, { createContext, useContext, useReducer } from 'react';

const MessageContext = createContext();

const initialState = {
  messages: [],
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: action.payload,
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== action.payload),
      };
    default:
      return state;
  }
};

const MessageProvider = ({ children }) => {
  // const [message, setMessage] = useState([]);
  const [ state, dispatch ] = useReducer(messageReducer, initialState);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = () => {
  return useContext(MessageContext);
};

export { MessageProvider, useMessageContext };