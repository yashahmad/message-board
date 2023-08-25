import React from "react";
import PostMessage from "./components/PostMessage";
import MessageList from "./components/MessageList";
import { MessageProvider } from "./context/MessageContext";

const App = () => {
  return (
    <MessageProvider>
      <div className="container mt-5">
        <h3>Message Board</h3>
        <PostMessage />
        <MessageList />
      </div>
    </MessageProvider>
  )
}

export default App;