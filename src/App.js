import React from "react";
import PostMessage from "./components/PostMessage";

const App = () => {
  return(
    <div className="container mt-5">
      <h3>Message Board</h3>
      <PostMessage/>
    </div>
  )
}

export default App;