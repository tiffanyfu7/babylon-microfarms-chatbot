import { useState } from "react";
import "./App.css";
import { createAssistant } from "./assistant.js";
import { InputBar } from "./components/InputBar.jsx";
import { Links } from "./components/Links.jsx";
import BabylonLogo from "./images/BabylonLogo.png";

function App() {
  console.log(import.meta.env.VITE_OPENAI_API_KEY);
  createAssistant();

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