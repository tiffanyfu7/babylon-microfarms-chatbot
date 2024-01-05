import { useEffect, useState } from "react";
import "./App.css";
import {
  createThread,
  retrieveThread,
  retrieveAssistant,
} from "./assistant.js";
import { InputBar } from "./components/InputBar.jsx";
import { Links } from "./components/Links.jsx";
import BabylonLogo from "./images/BabylonLogo.png";

function App() {
  const [threadID, setThreadID] = useState("");

  useEffect(() => {

      createThread()
        .then((obj) => {
          console.log(obj), setThreadID(obj.id);
        })
        .catch((error) => console.log(error));


  }, []);

  console.log(threadID)

  useEffect(() => {
    
      retrieveThread(threadID)
        .then((obj) => console.log(obj))
        .catch((error) => console.log(error))
      
    
  }, [])

  

  return (
    <>
      <h1 className="chatBotHeader">
        {" "}
        <img className="babyImg" src={BabylonLogo} alt="Babylon Farms Logo" />
        WaterBoy ChatBot
      </h1>

      <p className="chatBotSlogan"> Meet WaterBoy, your personal Babylon AI</p>

      <InputBar />

      <Links />
    </>
  );
}

export default App;
