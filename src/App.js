import "./App.css";
import chatgpt from "./assets/chatgpt.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import Home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAi } from "./openai";
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "This is Your Personal Assistant ., How Can I assist U Today ...?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAi(text);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const customBackgroundColor = {
    backgroundColor: "rgba(75, 72, 72, 0.5)", // Setting background color with reduced opacity
    borderRadius: "9px",
    marginTop: "14px",
    // bgopacity: '0.5',
    padding: "1.5rem",
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={chatgpt} alt="" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="New Chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom ">
            <button className="query">
              <img src={msgIcon} alt="" /> What is Programming ?
            </button>
            <button className="query">
              <img src={msgIcon} alt="" /> Give me Some Random ideas?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={Home} alt="" className="listitemImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listitemImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listitemImg" />
            Upgrade to PRO
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {/* <div className="chat ">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt opacity-75">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              laborum, porro libero quidem ab iure suscipit nisi sequi non,
              deserunt vel neque eos eius possimus. Esse, aspernatur ratione.
              Sed, porro!
            </p>
          </div> */}
          {/* <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt " style={customBackgroundColor}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              laborum, porro libero quidem ab iure suscipit nisi sequi non,
              deserunt vel neque eos eius possimus. Esse, aspernatur ratione.
              Sed, porro!
            </p>
          </div> */}
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatImg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt " style={customBackgroundColor}>
                {message.text}
              </p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter ">
          <div className="inp">
            <input
              type="text"
              name=""
              id=""
              placeholder="Send a message ..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
