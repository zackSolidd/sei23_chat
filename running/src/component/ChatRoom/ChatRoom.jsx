import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import io from "socket.io-client";
import Axios from "axios";
import { animateScroll } from "react-scroll";

const URL = process.env.REACT_APP_URL;
const socket = io.connect("http://localhost:5555/");

export default function ChatRoom(props) {
  const [state, setState] = useState({ message: "", username: "", userid: "" });
  const [chat, setChat] = useState([]);
  const [chatlog, setChatLog] = useState([]);

  useEffect(() => {
    Axios.get(`${URL}/chatroom/showchat`)
      .then((res) => {
        console.log(res.data.chats[0].userid.username);
        setChatLog(res.data.chats);
        scrollToBottom();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (props.user) {
      setState({
        username: `${props.user.username}`,
        message: "",
        userid: `${props.user._id}`,
      });
    }
  }, [props.user]);

  useEffect(() => {
    if (state.username) {
      socket.on("message", ({ username, message }) => {
        setChat([...chat, { username, message }]);
      });
      scrollToBottom();
    }
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { username, message, userid } = state;
    socket.emit("message", { username, message, userid });
    let token = localStorage.getItem("token");
    Axios.post(`${URL}/chatroom/postMessage`, state, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        console.log("msg saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setState({ message: "", username, userid });
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chatbox",
    });
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  }

  const renderChat = () => {
    return chat.map(({ username, message }, index) => (
      <div key={index}>
        <h3>
          {username}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  const renderPastChat = () => {
    return chatlog.map((chat, index) => (
      <div key={index}>
        <h3>
          {chat.userid.username}: <span>{chat.message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="App">
      <Container>
        <h1>Global Chat</h1>
        <div className="render-chat" id="chatbox">
          {renderPastChat()}
          {renderChat()}
        </div>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Message"
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          label="Message"
          autoFocus={true}
          onKeyPress={onEnter}
        ></Form.Control>
        <Button onClick={sendMessage}>Send Message</Button>
      </Container>
    </div>
  );
}
