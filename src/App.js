import React from "react";
import PostMessage from "./components/PostMessage";
import MessageList from "./components/MessageList";

const App = () => {
  return(
    <div className="container mt-5">
      <h3>Message Board</h3>
      <PostMessage/>
      <MessageList/>
    </div>
  )
}

export default App;