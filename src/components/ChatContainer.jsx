import { useEffect, useState } from "react";
import { MessageChannel } from "./MessageChannel.jsx";
import {
  createThread,
  createMessage,
  listMessages,
  createRun,
  createResponse,
} from "../assistant.js";

export const ChatContainer = () => {
  //current prompt being sent
  const [currentPrompt, setCurrentPrompt] = useState("none");
  const [threadID, setThreadID] = useState("");
  //messageList = [{role: , text: }...]
  const [messageList, setMessageList] = useState([{}]);
  const [assistantResponse, setAssistantResponse] = useState("");

  useEffect(() => {
    createThread()
      .then((obj) => {
        setThreadID(String(obj.id));
      })
      .catch((error) => console.log(error));
  }, []);

  async function handleSubmit(prompt) {
    prompt.preventDefault(); // prevents the form from autosubmitting, if you see a question mark at the https part then it is not processing the code
    const inputOfUser = prompt.target.userInput.value;
    setCurrentPrompt(inputOfUser);
    prompt.target.userInput.value = "";

    const message = await createMessage(threadID, inputOfUser)

    const run = await createRun(threadID)

    const response = await createResponse(threadID, run.id)

    const messages = await listMessages(threadID)

    let responseMessage = messages.filter((obj) => obj.run_id === run.id && obj.role === "assistant")
    .pop();

    responseMessage = responseMessage.content[0]["text"].value;

    setMessageList([...messageList, { role: "user", text: inputOfUser }, { role: "assistant", text: responseMessage }])
    setAssistantResponse(responseMessage)

    console.log(messageList);
    setCurrentPrompt("none");

   }
  return (
    <div>
      <div>
        { messageList.map((message_obj, index) => (
          <MessageChannel
            key={index}
            message={message_obj.text}
            role={message_obj.role}
          />
          )
        )}
      </div>

      <div>
        {/* display current prompt */}
        {currentPrompt !== "none" &&
          <div>
            <h3> You </h3>
            <p> {currentPrompt} </p>
          </div>
        }
      </div>

      <form
        className="box"
        method="post"
        onSubmit={(prompt) => handleSubmit(prompt)}
      >
        <input
          className="inputbox"
          type="text"
          name="userInput"
          placeholder="Enter prompt here"
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};
