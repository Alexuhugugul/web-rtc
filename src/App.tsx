import React, { useRef } from "react";
import "./App.css";
import { MessengerService } from "./models/CreateChat";
import { initSdk } from "./models/initSdk";


function App() {
  // GLlH6o^9
 
  const { login } = initSdk();
//WMIHi=8p





  return (
    <div className="App">
      <button onClick={login}>log in</button>
    </div>
  );
}

export default App;
