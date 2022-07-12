import React, { useRef } from "react";
import "./App.css";
import { CreateConversation } from "./models/CreateChat";
import { initSdk } from "./models/initSdk";


function App() {
  // GLlH6o^9
 
  const { login } = initSdk();
//WMIHi=8p


  function createChat() {
    new CreateConversation().createChat({
      isPublic: true,
      isUber: true,
      title: "thecrosssama",
      usersId: [22167386,22168051],
    });
  }


  return (
    <div className="App">
      <button onClick={login}>log in</button>
    </div>
  );
}

export default App;
